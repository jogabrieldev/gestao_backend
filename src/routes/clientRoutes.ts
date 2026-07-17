import { Router } from "express";
import { registerClient , getAllClientsController, deleteClient,updateClientController } from "../controller/clientController";
import { verifyToken } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { validationClient, deleteClientParams, updateClientValidation, listQueryValidation } from "../validators/validationClient";

const clientRoutes = Router();

clientRoutes.post("/client", verifyToken, validate(validationClient), registerClient);
clientRoutes.get("/client", verifyToken, validate(listQueryValidation, "query"), getAllClientsController)
clientRoutes.delete("/client/:id", verifyToken, validate(deleteClientParams , "params"), deleteClient )
clientRoutes.patch("/client/:id", verifyToken, validate(deleteClientParams, "params"), validate(updateClientValidation, "body"), updateClientController)
clientRoutes.put("/client/:id", verifyToken, validate(deleteClientParams, "params"), validate(updateClientValidation, "body"), updateClientController)
export default clientRoutes;
