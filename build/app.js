import 'express-async-errors';
import "reflect-metadata";
import express from 'express';
import { UserController } from './controllers/users/user.controller.js';
import AuthController from './controllers/auth/auth.controller.js';
import { getMetadataArgsStorage, useExpressServer } from "routing-controllers";
import { errorMiddleware, getAuthenticator } from "@panenco/papi";
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataStorage } from 'class-validator';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
export class App {
    host;
    constructor(){
        // Init server
        this.host = express();
        // Allow json body
        this.host.use(express.json());
        // Example root endpoint
        this.host.get("/", (req, res)=>{
            res.send("Hello World!");
        });
        // Custom before middleware
        this.host.use((req, res, next)=>{
            console.log(req.method, req.url);
            next();
        });
        this.initializeControllers([
            UserController,
            AuthController
        ]);
        // Custom after middleware (only used when res.send or json is not called in a previous middleware (no endpoint found))
        this.host.use((req, res, next)=>{
            res.status(404).send("No Endpoint found");
        });
        this.host.use(errorMiddleware);
    }
    initializeControllers(controllers) {
        useExpressServer(this.host, {
            cors: {
                origin: "*",
                exposedHeaders: [
                    "x-auth"
                ]
            },
            controllers,
            defaultErrorHandler: false,
            routePrefix: "/api",
            authorizationChecker: getAuthenticator('jwtSecretFromConfigHere')
        });
    }
    initializeSwagger() {
        const schemas = validationMetadatasToSchemas({
            classValidatorMetadataStorage: getMetadataStorage(),
            refPointerPrefix: "#/components/schemas/"
        });
        const routingControllersOptions = {
            routePrefix: "/api"
        };
        const storage = getMetadataArgsStorage();
        const spec = routingControllersToSpec(storage, routingControllersOptions, {
            components: {
                schemas,
                securitySchemes: {
                    JWT: {
                        in: "header",
                        name: "x-auth",
                        type: "apiKey",
                        bearerFormat: "JWT",
                        description: "JWT Authorization header using the JWT scheme. Example: \"x-auth: {token}\""
                    }
                }
            },
            security: [
                {
                    JWT: []
                }
            ]
        });
        this.host.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
    }
    listen() {
        this.host.listen(3000, ()=>{
            console.info(`🚀 http://localhost:3000`);
            console.info(`=================================`);
        });
    }
}

//# sourceMappingURL=app.js.map