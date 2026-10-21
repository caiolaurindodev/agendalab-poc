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
exports.ApiErrorResponseDto = exports.ReservationResponseDto = exports.ResourceResponseDto = exports.CollaboratorResponseDto = exports.HealthResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class HealthResponseDto {
    status;
    application;
}
exports.HealthResponseDto = HealthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "ok" }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "AgendaLab" }),
    __metadata("design:type", String)
], HealthResponseDto.prototype, "application", void 0);
class CollaboratorResponseDto {
    id;
    name;
    email;
    department;
}
exports.CollaboratorResponseDto = CollaboratorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "colaborador-demo" }),
    __metadata("design:type", String)
], CollaboratorResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Ana Silva" }),
    __metadata("design:type", String)
], CollaboratorResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "ana.silva@example.com", format: "email" }),
    __metadata("design:type", String)
], CollaboratorResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Secretaria de Administração" }),
    __metadata("design:type", String)
], CollaboratorResponseDto.prototype, "department", void 0);
class ResourceResponseDto {
    id;
    name;
    type;
    location;
    description;
    capacity;
    features;
    available;
}
exports.ResourceResponseDto = ResourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "sala-capibaribe" }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Sala Capibaribe" }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ["room", "projector", "notebook"], example: "room" }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Edifício Sede · 1º andar" }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Um espaço reservado para reuniões de equipe." }),
    __metadata("design:type", String)
], ResourceResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", minimum: 1, example: 8 }),
    __metadata("design:type", Number)
], ResourceResponseDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: ["Wi-Fi", "Quadro branco"] }),
    __metadata("design:type", Array)
], ResourceResponseDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: "No catálogo, indica disponibilidade no período consultado (ou agora, sem período). " +
            "Na resposta de uma reserva, é apenas o valor padrão do cadastro do recurso; consulte /api/resources para verificar disponibilidade.",
    }),
    __metadata("design:type", Boolean)
], ResourceResponseDto.prototype, "available", void 0);
class ReservationResponseDto {
    id;
    resourceId;
    collaboratorId;
    title;
    organization;
    requestType;
    requestDetail;
    notes;
    participants;
    startAt;
    endAt;
    status;
    createdAt;
    resource;
}
exports.ReservationResponseDto = ReservationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "sala-capibaribe" }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "colaborador-demo" }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "collaboratorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Alinhamento da equipe" }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ["Perpart", "Seduh"], example: "Perpart" }),
    __metadata("design:type", Object)
], ReservationResponseDto.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ["Reunião interna", "Atendimento externo", "Capacitação"],
        example: "Reunião interna",
    }),
    __metadata("design:type", Object)
], ReservationResponseDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Secretaria de Administração" }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "requestDetail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Apresentação do planejamento",
        description: "String vazia quando não informada.",
    }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", minimum: 1, example: 4 }),
    __metadata("design:type", Number)
], ReservationResponseDto.prototype, "participants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        format: "date-time",
        example: "2027-01-12T12:00:00.000Z",
        description: "Início normalizado em UTC; equivale a 09h em Brasília.",
    }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        format: "date-time",
        example: "2027-01-12T13:00:00.000Z",
        description: "Término normalizado em UTC; equivale a 10h em Brasília.",
    }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "endAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ["confirmed", "cancelled"],
        example: "confirmed",
        description: "Reservas concluídas continuam com status confirmed; a conclusão é calculada a partir de endAt.",
    }),
    __metadata("design:type", Object)
], ReservationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: "date-time", example: "2027-01-11T15:00:00.000Z" }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ResourceResponseDto }),
    __metadata("design:type", ResourceResponseDto)
], ReservationResponseDto.prototype, "resource", void 0);
class ApiErrorResponseDto {
    statusCode;
    message;
    error;
}
exports.ApiErrorResponseDto = ApiErrorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: "integer", example: 400 }),
    __metadata("design:type", Number)
], ApiErrorResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [{ type: "string" }, { type: "array", items: { type: "string" } }],
        example: "O horário de término deve ser posterior ao início.",
    }),
    __metadata("design:type", Object)
], ApiErrorResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Bad Request" }),
    __metadata("design:type", String)
], ApiErrorResponseDto.prototype, "error", void 0);
//# sourceMappingURL=response.dto.js.map