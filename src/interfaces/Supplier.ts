import { Types } from "mongoose";

export interface ISupplierItem {
    _id: Types.ObjectId;
    itemName: string;
    price: number;
}

export interface ISupplier {
    name: string;
    items: ISupplierItem[];
}
