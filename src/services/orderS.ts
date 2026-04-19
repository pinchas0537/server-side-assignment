import { ISItem } from "../interfaces/Item.js";
import { IOrder } from "../interfaces/Order.js";
import { Item } from "../models/Item.js";
import { OrderModel } from "../models/Order.js";
import { calculateOrderProfoit, validateStock } from "../utils/orderHelpers.js";

export async function processNewOrder(orderData: IOrder): Promise<IOrder> {
    try {
        const itemIds = orderData.items.map((item) => item.itemId);
        const dbItems: ISItem[] = await Item.find({ _id: { $in: itemIds } }).lean();
        validateStock(dbItems, orderData.items);
        const totalProfit = calculateOrderProfoit(dbItems, orderData.items);
        const finalOrder = new OrderModel({
            ...orderData,
            shopProfit: totalProfit,
        });
        const savedOrder = await finalOrder.save();
        for (const orderItem of orderData.items) {
            await Item.findByIdAndUpdate(orderItem.itemId, { $inc: { stock: -orderItem.quantity } });
        }
        return savedOrder;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Order processing failed:", errorMessage);
        throw new Error(errorMessage);
    }
}

export async function getAllOrders(): Promise<IOrder[]> {
    try {
        const orders = await OrderModel.find().select("-__v").lean();
        return orders;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Failed to retrieve orders:", errorMessage);
        throw new Error(errorMessage);
    }
}

export async function getOrderById(orderId: string): Promise<IOrder | null> {
    try {
        const order = await OrderModel.findById(orderId).select("-__v").lean();
        if (!order) {
            return null;
        }
        return order;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(`Failed to retrieve order with ID ${orderId}:`, errorMessage);
        throw new Error(errorMessage);
    }
}

export async function updateOrderInDB(orderId: string, orderData: IOrder): Promise<IOrder | null> {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, orderData, {
            new: true,
            runValidators: true,
        }).lean();
        return updatedOrder;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(`Failed to update order with ID ${orderId}:`, errorMessage);
        throw new Error(errorMessage);
    }
}

export async function deleteOrderById(orderId: string): Promise<IOrder | null> {
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(orderId).lean();
        return deletedOrder;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(`Failed to delete order with ID ${orderId}:`, errorMessage);
        throw new Error(errorMessage);
    }
}
