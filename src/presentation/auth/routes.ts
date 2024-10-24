import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infraestructure";
import { BcryptAdapter } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {


    static get routes(): Router{
        const router = Router();
        const db = new AuthDatasourceImpl(
            BcryptAdapter.hash,
            BcryptAdapter.compare
        );
        const authRepository = new AuthRepositoryImpl(db);
        const controller = new AuthController(authRepository);
        router.post('/login',controller.loginUser);
        router.post('/register', controller.registerUser);
        router.get('/users',AuthMiddleware.validateJWT, controller.getUsers);
        return router;
    }
}