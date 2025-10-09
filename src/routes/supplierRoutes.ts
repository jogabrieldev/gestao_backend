import {Router} from "express"
import { registerSupplier } from "../controller/supplierController";
import { verifyToken } from "../middleware/authenticate";
import { validationSupplier } from "../validators/validationSupplier";
import { validate } from "../middleware/validate";


const supplierRoutes = Router();
 

supplierRoutes.post("/supplier", verifyToken , validate(validationSupplier), registerSupplier)


export default supplierRoutes