import { Request, Response } from "express";
import {createNewSupplier} from "../services/supplierS.js";
import logger from "../utils/Logger.js";
import { ISupplier } from "../interfaces/Supplier.js";

export const createSupplier = async (req: Request, res: Response): Promise<void> => {
    try {
        const supplierData = req.body;
        const newSupplier = await createNewSupplier(supplierData);
        res.status(201).json(newSupplier);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        logger.error("Failed to create supplier", { error: errorMessage });
        res.status(500).json({ error: errorMessage });
    }
};