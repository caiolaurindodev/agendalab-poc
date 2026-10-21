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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const reservation_dto_1 = require("./reservation.dto");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../docs/response.dto");
let ReservationsController = class ReservationsController {
    reservations;
    constructor(reservations) {
        this.reservations = reservations;
    }
    mine() {
        return this.reservations.mine();
    }
    create(dto) {
        return this.reservations.create(dto);
    }
    cancel(id) {
        return this.reservations.cancel(id);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.Get)("mine"),
    (0, swagger_1.ApiOperation)({
        summary: "Consultar minhas reservas",
        description: "Lista todas as reservas do colaborador de demonstração, incluindo canceladas, por início decrescente.",
    }),
    (0, swagger_1.ApiOkResponse)({ type: response_dto_1.ReservationResponseDto, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "mine", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: "Criar reserva",
        description: "Confirma uma reserva futura. Valida capacidade e período e impede sobreposição de reservas confirmadas do mesmo recurso. A identidade do colaborador é definida pela API. Atualize a data do exemplo antes de executar.",
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: "Reserva confirmada.",
        type: response_dto_1.ReservationResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Dados inválidos, capacidade excedida ou período inválido/no passado.",
        type: response_dto_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Recurso não encontrado.",
        type: response_dto_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: "O recurso já está reservado nesse período.",
        type: response_dto_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id/cancel"),
    (0, swagger_1.ApiOperation)({
        summary: "Cancelar reserva",
        description: "Cancela uma reserva do colaborador de demonstração que ainda não começou e libera o período. Repetir o cancelamento retorna a reserva já cancelada.",
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "UUID da reserva, retornado na criação ou em minhas reservas.",
        format: "uuid",
        example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    (0, swagger_1.ApiOkResponse)({
        description: "Reserva cancelada.",
        type: response_dto_1.ReservationResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: "UUID inválido ou reserva que já começou.",
        type: response_dto_1.ApiErrorResponseDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Reserva não encontrada para o colaborador atual.",
        type: response_dto_1.ApiErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)("id", new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReservationsController.prototype, "cancel", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, swagger_1.ApiTags)("Reservas"),
    (0, common_1.Controller)("reservations"),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map