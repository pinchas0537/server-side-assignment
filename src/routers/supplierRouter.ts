import { Router } from "express";
import {
    createSupplier,
    deleteSupplier,
    getSupplierById,
    getAllSuppliers,
    updateSupplier,
} from "../controllers/supplier.controller";
import { isNameUnique, supplierExists } from "../middleware/supplierMiddleware";
import { validateRequest } from "../middleware/validate";
import { createSupplierSchema, supplierIdSchema, updateSupplierSchema } from "../validations/supplier.validation";

const router = Router();

router.post("/", validateRequest(createSupplierSchema), isNameUnique, createSupplier);

router.get("/", getAllSuppliers);

router.get("/:id", validateRequest(supplierIdSchema), supplierExists, getSupplierById);

router.put("/:id", validateRequest(updateSupplierSchema), supplierExists, isNameUnique, updateSupplier);

router.delete("/:id", validateRequest(supplierIdSchema), supplierExists, deleteSupplier);

export default router;
