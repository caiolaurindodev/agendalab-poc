"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
        : true;
    app.enableCors({ origin: corsOrigins });
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableShutdownHooks();
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("AgendaLab API")
        .setDescription("API de reserva de ambientes e equipamentos. POC com colaborador fixo de demonstração, sem autenticação. " +
        "Reservas no mesmo dia, entre 08h e 18h no horário de Brasília (UTC−03), com início no futuro. " +
        "Use uma data futura nos exemplos ao executar solicitações.")
        .setVersion("0.1.0")
        .addTag("Sistema", "Estado da API e colaborador de demonstração")
        .addTag("Recursos", "Catálogo e consulta de disponibilidade")
        .addTag("Reservas", "Criação, consulta e cancelamento de reservas")
        .build();
    swagger_1.SwaggerModule.setup("api/docs", app, () => swagger_1.SwaggerModule.createDocument(app, swaggerConfig), {
        jsonDocumentUrl: "api/docs-json",
        customSiteTitle: "AgendaLab | Documentação da API",
        swaggerOptions: { displayRequestDuration: true, validatorUrl: null },
    });
    await app.listen(Number(process.env.PORT ?? 3001), process.env.HOST ?? "0.0.0.0");
}
void bootstrap();
//# sourceMappingURL=main.js.map