import {Router} from "express"
import { registerSupplier , getAllSupplierController, deleteSupplier, updateSupplierController } from "../controller/supplierController";
import { verifyToken } from "../middleware/authenticate";
import { validationSupplier, deleteSupplierParams, updateSupplierValidation, listSupplierQueryValidation } from "../validators/validationSupplier";
import { validate } from "../middleware/validate";


const supplierRoutes = Router();
 
supplierRoutes.post("/supplier", verifyToken , validate(validationSupplier , "body"), registerSupplier);
supplierRoutes.get("/supplier", verifyToken, validate(listSupplierQueryValidation, "query"), getAllSupplierController);
supplierRoutes.delete("/supplier/:id" , verifyToken, validate(deleteSupplierParams , "params"), deleteSupplier);
supplierRoutes.patch("/supplier/:id", verifyToken, validate(deleteSupplierParams, "params"), validate(updateSupplierValidation, "body"), updateSupplierController);
supplierRoutes.put("/supplier/:id", verifyToken, validate(deleteSupplierParams, "params"), validate(updateSupplierValidation, "body"), updateSupplierController);

export default supplierRoutes
