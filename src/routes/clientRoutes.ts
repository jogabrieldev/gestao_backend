import { Router } from "express";
import { registerClient , getAllClientsController, deleteClient,updateClientController } from "../controller/clientController";
import { verifyToken } from "../middleware/authenticate";
import { validate,blockImmutableClientFields } from "../middleware/validate";
import { validationClient ,deleteClientParams,updateClientValidation } from "../validators/validationClient";

const clientRoutes = Router();

clientRoutes.post("/client", verifyToken, validate(validationClient), registerClient);
clientRoutes.get("/client", verifyToken, getAllClientsController)
clientRoutes.delete("/client/:id", verifyToken, validate(deleteClientParams , "params"), deleteClient )
clientRoutes.put("/client/:id", verifyToken, blockImmutableClientFields, validate(updateClientValidation , "body"), updateClientController )
export default clientRoutes;