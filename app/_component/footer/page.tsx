"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t mt-20 w-full">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="fa-solid fa-cart-shopping text-green-600 text-3xl"></i>
                        <span className="text-2xl font-semibold">
                            Fresh<span className="text-green-600">Cart</span>
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6">
                        Your one-stop destination for fresh groceries and daily essentials.
                    </p>

                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li>Cairo, Egypt</li>
                        <li>(+20) 01093333333</li>
                        <li>support@freshcart.com</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Shop</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/product">Products</Link></li>
                        <li><Link href="/categories">Categories</Link></li>
                        <li><Link href="/brands">Brands</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Customer Service</h3>
                    <ul className="space-y-3 text-sm">
                        <li>Contact Us</li>
                        <li>Help Center</li>
                        <li>Track Order</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Policies</h3>
                    <ul className="space-y-3 text-sm">
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Refund Policy</li>
                    </ul>
                </div>
            </div>

            <div className="border-t bg-white">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
