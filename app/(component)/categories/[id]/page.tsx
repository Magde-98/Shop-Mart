"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Iproduct } from "@/app/interface/product.interface";
import AddBtn from "@/app/_component/addBtn/page";
import { GetProductsByCategory } from "@/app/api/getProductsByCategory.api";
import Loading from "../loading";

export default function CategoryDetails() {
    const { id } = useParams<{ id: string }>();

    const [products, setProducts] = useState<Iproduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const res = await GetProductsByCategory(id);
                setProducts(res.data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (id) getData();
    }, [id]);

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 my-10">
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">
                Category Products
            </h2>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">
                    No products found in this category
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden group"
                        >
                            <Link href={`/product/${product._id}`}>
                                <div className="overflow-hidden">
                                    <img
                                        src={product.imageCover}
                                        alt={product.title}
                                        className="w-full h-auto max-h-64 object-contain bg-gray-100"
                                    />
                                </div>

                                <div className="p-4">
                                    <h4 className="text-green-700 text-sm font-medium">
                                        {product.category.name}
                                    </h4>

                                    <h3 className="text-xl font-semibold text-gray-800 truncate">
                                        {product.title}
                                    </h3>

                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-lg font-bold text-green-700">
                                            {product.price} EGP
                                        </span>

                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <i className="fa-solid fa-star"></i>
                                            <span className="text-gray-700">
                                                {product.ratingsAverage}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <AddBtn
                                id={product._id}
                                className="py-3 bg-green-600 text-white font-medium hover:bg-green-700"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

