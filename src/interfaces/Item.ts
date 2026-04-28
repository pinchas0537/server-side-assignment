import { Types } from "mongoose";

export interface ISItem {
    _id?: Types.ObjectId;
    name: string;
    consumerPrice: number;
    stock: number;
    category: string;
    supplierId: Types.ObjectId;
}
