import {Router} from "express"
import { registerSupplier , getAllSupplierController, getSupplierByCnpjController, deleteSupplier, updateSupplierController } from "../controller/supplierController";
import { verifyToken } from "../middleware/authenticate";
import { validationSupplier , deleteSupplierParams,updateSupplierValidation } from "../validators/validationSupplier";
import { validate , blockImmutableSupplierFields } from "../middleware/validate";


const supplierRoutes = Router();
 

supplierRoutes.post("/supplier", verifyToken , validate(validationSupplier , "body"), registerSupplier);
supplierRoutes.get("/supplier" ,verifyToken, getAllSupplierController);
supplierRoutes.get("/supplier/:cnpj" , verifyToken, getSupplierByCnpjController);
supplierRoutes.delete("/supplier/:id" , verifyToken, validate(deleteSupplierParams , "params"), deleteSupplier);
supplierRoutes.put("/supplier/:id" , verifyToken, blockImmutableSupplierFields, validate(updateSupplierValidation, "body"), updateSupplierController);

export default supplierRoutes