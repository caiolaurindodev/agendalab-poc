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
exports.AvailabilityDto = exports.CreateReservationDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateReservationDto {
    organization;
    requestType;
    requestDetail;
    resourceId;
    title;
    notes;
    participants;
    startAt;
    endAt;
}
exports.CreateReservationDto = CreateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ["Perpart", "Seduh"] }),
    (0, class_validator_1.IsIn)(["Perpart", "Seduh"]),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "organization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ["Reunião interna", "Atendimento externo", "Capacitação"],
    }),
    (0, class_validator_1.IsIn)(["Reunião interna", "Atendimento externo", "Capacitação"]),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 120 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "requestDetail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "sala-capibaribe",
        minLength: 1,
        description: "Identificador de um recurso do catálogo.",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Alinhamento da equipe",
        minLength: 3,
        maxLength: 120,
    }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? value.trim() : value),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: "O título deve ter pelo menos 3 caracteres." }),
    (0, class_validator_1.MaxLength)(120, { message: "O título deve ter até 120 caracteres." }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Apresentação do planejamento",
        maxLength: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: "integer",
        minimum: 1,
        example: 4,
        description: "Até a capacidade da sala. Para equipamentos, informe 1.",
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: "Informe pelo menos um participante." }),
    __metadata("design:type", Number)
], CreateReservationDto.prototype, "participants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        format: "date-time",
        example: "2027-01-12T09:00:00-03:00",
        description: "Início futuro com fuso explícito. Mesmo dia do término, entre 08h e 18h em Brasília, sem segundos.",
    }),
    (0, class_validator_1.IsISO8601)({ strict: true }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        format: "date-time",
        example: "2027-01-12T10:00:00-03:00",
        description: "Término posterior ao início, com fuso explícito, até 18h em Brasília, sem segundos.",
    }),
    (0, class_validator_1.IsISO8601)({ strict: true }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "endAt", void 0);
class AvailabilityDto {
    startAt;
    endAt;
}
exports.AvailabilityDto = AvailabilityDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        format: "date-time",
        example: "2027-01-12T09:00:00-03:00",
        description: "Início da consulta com fuso explícito. Informe junto com endAt, no mesmo dia, entre 08h e 18h em Brasília.",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)({ strict: true }),
    __metadata("design:type", String)
], AvailabilityDto.prototype, "startAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        format: "date-time",
        example: "2027-01-12T10:00:00-03:00",
        description: "Término da consulta com fuso explícito, posterior ao início. Informe junto com startAt.",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)({ strict: true }),
    __metadata("design:type", String)
], AvailabilityDto.prototype, "endAt", void 0);
//# sourceMappingURL=reservation.dto.js.map