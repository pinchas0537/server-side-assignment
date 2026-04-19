import { Router } from "express";
import { createItem, getItemById, getItems } from "../controllers/itemC";
import { validateRequest } from "../middleware/validate";
import { itemValidationSchema } from "../validations/item.validation";
import { validateItemId } from "../middleware/itemM";

const router = Router();

router.post("/", validateRequest(itemValidationSchema), createItem);

router.get("/", getItems);

router.get("/:id", validateItemId, getItemById);

export default router;
