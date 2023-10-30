import 'express-async-errors';
import "reflect-metadata";
import express, { Application, NextFunction, Request, Response } from 'express';

import { UserController } from './controllers/users/user.controller.js';
import AuthController from './controllers/auth/auth.controller.js';
import { useExpressServer } from "routing-controllers";
import { errorMiddleware, getAuthenticator } from "@panenco/papi";


export class App {
  host: Application;

  constructor() {
    // Init server
    this.host = express();

    // Allow json body
    this.host.use(express.json());

    // Example root endpoint
    this.host.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    // Custom before middleware
    this.host.use((req: Request, res: Response, next: NextFunction) => {
      console.log(req.method, req.url);
      next();
    });

    this.initializeControllers([UserController, AuthController]);

    // Custom after middleware (only used when res.send or json is not called in a previous middleware (no endpoint found))
    this.host.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send("No Endpoint found");
    });

    this.host.use(errorMiddleware);
  }

  private initializeControllers(controllers: Function[]) {
    useExpressServer(this.host, { // Link the express host to routing-controllers
      cors: {
        origin: "*", // Allow all origins, any application on any url can call our api. This is why we also added the `cors` package.
        exposedHeaders: ["x-auth"], // Allow the header `x-auth` to be exposed to the client. This is needed for the authentication to work later.
      },
      controllers, // Provide the controllers. Currently this won't work yet, first we need to convert the Route to a routing-controllers controller.
      defaultErrorHandler: false, // Disable the default error handler. We will handle errors through papi later.
      routePrefix: "/api", // Map all routes to the `/api` path.
      authorizationChecker: getAuthenticator('jwtSecretFromConfigHere'), // Tell routing-controllers to use the papi authentication checker
    });
 }

  listen() {
    this.host.listen(3000, () => {
      console.info(`🚀 http://localhost:3000`);
      console.info(`=================================`);
    });
  }
}
