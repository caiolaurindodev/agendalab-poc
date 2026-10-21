"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const node_sqlite_1 = require("node:sqlite");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const seed_1 = require("./seed");
let DatabaseService = class DatabaseService {
    db;
    constructor() {
        const defaultDbPath = process.env.VERCEL
            ? "/tmp/agendalab.sqlite"
            : "./data/agendalab.sqlite";
        const path = (0, node_path_1.resolve)(process.env.DATABASE_PATH ?? defaultDbPath);
        (0, node_fs_1.mkdirSync)((0, node_path_1.dirname)(path), { recursive: true });
        this.db = new node_sqlite_1.DatabaseSync(path);
        this.db.exec(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;
      PRAGMA busy_timeout = 5000;
      CREATE TABLE IF NOT EXISTS resources (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL,
        location TEXT NOT NULL, description TEXT NOT NULL,
        capacity INTEGER NOT NULL, features TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS reservations (
        id TEXT PRIMARY KEY, resourceId TEXT NOT NULL REFERENCES resources(id),
        collaboratorId TEXT NOT NULL, title TEXT NOT NULL, notes TEXT NOT NULL,
        participants INTEGER NOT NULL, startAt TEXT NOT NULL, endAt TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('confirmed', 'cancelled')), createdAt TEXT NOT NULL,
        organization TEXT NOT NULL DEFAULT 'Perpart',
        requestType TEXT NOT NULL DEFAULT 'Reunião interna', requestDetail TEXT NOT NULL DEFAULT ''
      );
      CREATE INDEX IF NOT EXISTS reservations_period ON reservations(resourceId, status, startAt, endAt);
    `);
        const reservationColumns = this.db
            .prepare("PRAGMA table_info(reservations)")
            .all();
        if (!reservationColumns.some((column) => column.name === "organization"))
            this.db.exec("ALTER TABLE reservations ADD COLUMN organization TEXT NOT NULL DEFAULT 'Perpart'");
        if (!reservationColumns.some((column) => column.name === "requestType"))
            this.db.exec("ALTER TABLE reservations ADD COLUMN requestType TEXT NOT NULL DEFAULT 'Reunião interna'");
        if (!reservationColumns.some((column) => column.name === "requestDetail"))
            this.db.exec("ALTER TABLE reservations ADD COLUMN requestDetail TEXT NOT NULL DEFAULT ''");
        const insert = this.db.prepare("INSERT OR IGNORE INTO resources VALUES (?, ?, ?, ?, ?, ?, ?)");
        for (const resource of seed_1.SEED_RESOURCES) {
            insert.run(resource.id, resource.name, resource.type, resource.location, resource.description, resource.capacity, JSON.stringify(resource.features));
        }
    }
    resources() {
        const rows = this.db
            .prepare("SELECT * FROM resources ORDER BY rowid")
            .all();
        return rows.map((row) => ({
            ...row,
            features: JSON.parse(row.features),
            available: true,
        }));
    }
    resource(id) {
        return this.resources().find((resource) => resource.id === id);
    }
    hasConflict(resourceId, startAt, endAt) {
        return Boolean(this.db
            .prepare(`SELECT id FROM reservations
      WHERE resourceId = ? AND status = 'confirmed' AND startAt < ? AND endAt > ? LIMIT 1`)
            .get(resourceId, endAt, startAt));
    }
    hydrate(row) {
        return { ...row, resource: this.resource(row.resourceId) };
    }
    onModuleDestroy() {
        this.db.close();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
//# sourceMappingURL=database.service.js.map