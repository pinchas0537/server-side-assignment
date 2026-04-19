import { Item } from "../models/Item.js";
import { IItemBase } from "../validations/item.validation.js";
import { ISItem } from "../interfaces/Item.js";

export async function createNewItem(itemData: IItemBase): Promise<ISItem> {
    try {
        const newItem = new Item(itemData as unknown as ISItem);
        return await newItem.save();
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(`Failed to create new item: ${errorMessage}`);
    }
}

export const getAllItems = async (): Promise<ISItem[]> => {
    try {
        return await Item.find().populate("supplierId");
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(`Failed to fetch items: ${errorMessage}`);
    }
};

export const getItemById = async (itemId: string): Promise<ISItem | null> => {
    try {
        return await Item.findById(itemId).populate("supplierId");
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(`Failed to fetch item: ${errorMessage}`);
    }
};