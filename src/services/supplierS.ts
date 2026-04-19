import { ISupplier } from "../interfaces/Supplier";
import { Supplier } from "../models/Supplier";

export const createNewSupplier = async (supplierData: Partial<ISupplier>): Promise<ISupplier> => {
    try {
        const newSupplier = new Supplier(supplierData);
        return await newSupplier.save();
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(`Failed to create new supplier: ${errorMessage}`);
    }
};

export const getSupplierById = async (id: string): Promise<ISupplier | null> => {
    try {
        return await Supplier.findById(id);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(`Failed to fetch supplier: ${errorMessage}`);
    }
};

export const getSupplierByName = async (name: string): Promise<ISupplier | null> => {
    try {
        return await Supplier.findOne({ name });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(`Failed to fetch supplier: ${errorMessage}`);
    }
};