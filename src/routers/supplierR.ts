import { Router } from "express";
import { createSupplier } from "../controllers/supplierC";
import { isNsameUnique } from "../middleware/supplierM";

const router = Router();

router.post("/", isNsameUnique, createSupplier);

export default router;
