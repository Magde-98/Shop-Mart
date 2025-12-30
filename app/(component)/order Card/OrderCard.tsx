"use client";

import { Order } from "@/app/interface/order.interface";
import { useState } from "react";

type OrderCardProps = {
    order: Order;
    index: number;
};


export function OrderCard({ order, index }: OrderCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h2 className="text-xl font-semibold">
                    Order #{index + 1}
                </h2>

                <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                </span>

            </div>


            <div className="flex flex-wrap gap-6 text-sm mb-4">
                <span>
                    Payment:{" "}
                    <b className="capitalize text-gray-800">
                        {order.paymentMethodType}
                    </b>
                </span>

                <span
                    className={`font-semibold ${order.isPaid ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {order.isPaid ? "Paid" : "Not Paid"}
                </span>

                <span
                    className={`font-semibold ${order.isDelivered ? "text-green-600" : "text-orange-500"
                        }`}
                >
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                </span>

                <span>
                    Total:{" "}
                    <b className="text-green-700">
                        {order.totalOrderPrice} EGP
                    </b>
                </span>
            </div>


            {order.shippingAddress && (
                <div className="mb-6">
                    <h3 className="font-semibold mb-1">
                        Shipping Address
                    </h3>

                    <p className="text-sm text-gray-600">
                        {order.shippingAddress.details},{" "}
                        {order.shippingAddress.city}
                    </p>

                    <p className="text-sm text-gray-600">
                        Phone: {order.shippingAddress.phone}
                    </p>
                </div>
            )}


            <button
                onClick={() => setOpen(!open)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-md
                         text-sm font-medium transition"
            >
                {open ? "Hide Order Items" : "View Order Items"}
            </button>


            {open && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {order.cartItems.map(item => (
                        <div
                            key={item._id}
                            className="flex gap-4 border rounded-lg p-3"
                        >
                            <img
                                src={item.product.imageCover}
                                alt={item.product.title}
                                className="w-24 h-24 object-contain bg-gray-100 rounded"
                            />

                            <div>
                                <h3 className="font-semibold">
                                    {item.product.title}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    Quantity: {item.count}
                                </p>

                                <p className="text-sm font-semibold text-green-700">
                                    {item.price} EGP
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 flex justify-end items-center gap-1 text-xs text-gray-400">
                <i className="fa-regular fa-clock"></i>
                <span>
                    Last updated on{" "}
                    {new Date(order.updatedAt || order.createdAt).toDateString()}
                </span>
            </div>

        </div>
    );
}
