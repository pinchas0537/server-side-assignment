import { Router } from "express";
import { createItem, deleteItem, getItemById, getAllItems, updateItem } from "../controllers/item.controller";
import { checkItemExists } from "../middleware/itemMiddleware";
import { supplierExists } from "../middleware/supplierMiddleware";
import { validateRequest } from "../middleware/validate";
import { createItemSchema, itemIdSchema, updateItemSchema } from "../validations/item.validation";

const router = Router();

router.post("/", validateRequest(createItemSchema), supplierExists, createItem);

router.get("/", getAllItems);

router.get("/:id", validateRequest(itemIdSchema), checkItemExists, getItemById);

router.put("/:id", validateRequest(updateItemSchema), checkItemExists, updateItem);

router.delete("/:id", validateRequest(itemIdSchema), checkItemExists, deleteItem);

export default router;
