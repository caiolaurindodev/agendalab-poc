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
exports.ReservationsService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const database_service_1 = require("../database/database.service");
const period_1 = require("./period");
const demo_collaborator_1 = require("../demo-collaborator");
let ReservationsService = class ReservationsService {
    database;
    constructor(database) {
        this.database = database;
    }
    mine() {
        const rows = this.database.db
            .prepare("SELECT * FROM reservations WHERE collaboratorId = ? ORDER BY startAt DESC, createdAt DESC")
            .all(demo_collaborator_1.DEMO_COLLABORATOR.id);
        return rows.map((row) => this.database.hydrate(row));
    }
    create(dto) {
        if (dto.requestType !== "Reunião interna" && !dto.requestDetail?.trim())
            throw new common_1.BadRequestException("Informe o detalhe solicitado para este tipo de solicitação.");
        const resource = this.database.resource(dto.resourceId);
        if (!resource)
            throw new common_1.NotFoundException("Recurso não encontrado.");
        if (dto.participants > resource.capacity)
            throw new common_1.BadRequestException(resource.type === "room"
                ? `Esta sala comporta até ${resource.capacity} pessoas.`
                : "Reserve um equipamento para um responsável.");
        const period = (0, period_1.validatePeriod)(dto.startAt, dto.endAt, true);
        const reservation = {
            id: (0, node_crypto_1.randomUUID)(),
            resourceId: dto.resourceId,
            collaboratorId: demo_collaborator_1.DEMO_COLLABORATOR.id,
            title: dto.title,
            organization: dto.organization,
            requestType: dto.requestType,
            requestDetail: dto.requestDetail?.trim() ?? "",
            notes: dto.notes?.trim() ?? "",
            participants: dto.participants,
            ...period,
            status: "confirmed",
            createdAt: new Date().toISOString(),
        };
        // Consulta e inserção na mesma transação: duas solicitações não podem ocupar o mesmo período.
        this.database.db.exec("BEGIN IMMEDIATE");
        try {
            if (this.database.hasConflict(dto.resourceId, period.startAt, period.endAt))
                throw new common_1.ConflictException("Este recurso já está reservado nesse período. Escolha outro horário.");
            this.database.db
                .prepare("INSERT INTO reservations (id, resourceId, collaboratorId, title, notes, participants, startAt, endAt, status, createdAt, organization, requestType, requestDetail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
                .run(reservation.id, reservation.resourceId, reservation.collaboratorId, reservation.title, reservation.notes, reservation.participants, reservation.startAt, reservation.endAt, reservation.status, reservation.createdAt, reservation.organization, reservation.requestType, reservation.requestDetail);
            this.database.db.exec("COMMIT");
        }
        catch (error) {
            this.database.db.exec("ROLLBACK");
            throw error;
        }
        return this.database.hydrate(reservation);
    }
    cancel(id) {
        const row = this.database.db
            .prepare("SELECT * FROM reservations WHERE id = ? AND collaboratorId = ?")
            .get(id, demo_collaborator_1.DEMO_COLLABORATOR.id);
        if (!row)
            throw new common_1.NotFoundException("Reserva não encontrada.");
        if (row.status === "cancelled")
            return this.database.hydrate(row);
        if (new Date(row.startAt).getTime() <= Date.now())
            throw new common_1.BadRequestException("Só é possível cancelar reservas que ainda não começaram.");
        this.database.db
            .prepare("UPDATE reservations SET status = 'cancelled' WHERE id = ?")
            .run(id);
        return this.database.hydrate({ ...row, status: "cancelled" });
    }
};
exports.ReservationsService = ReservationsService;
exports.ReservationsService = ReservationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ReservationsService);
//# sourceMappingURL=reservations.service.js.map