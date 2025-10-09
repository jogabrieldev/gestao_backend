import { Router } from "express";
import { registerClient , getAllClientsController } from "../controller/clientController";
import { verifyToken } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { validationClient } from "../validators/validationClient";

const clientRoutes = Router();

clientRoutes.post("/client", verifyToken, validate(validationClient), registerClient);
clientRoutes.get("/client", verifyToken, getAllClientsController)
export default clientRoutes;