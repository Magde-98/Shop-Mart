"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t mt-20">
            <div className="container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="fa-solid fa-cart-shopping text-green-600 text-3xl"></i>
                        <span className="text-2xl font-semibold">
                            Fresh<span className="text-green-600">Cart</span>
                        </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                        Your one-stop destination for fresh groceries and daily essentials.
                        Quality products with fast delivery and trusted service.
                    </p>

                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li className="flex items-center gap-2">
                            <i className="fa-solid fa-location-dot text-green-600"></i>
                            Cairo, Egypt
                        </li>
                        <li className="flex items-center gap-2">
                            <i className="fa-solid fa-phone text-green-600"></i>
                            (+20) 01093333333
                        </li>
                        <li className="flex items-center gap-2">
                            <i className="fa-solid fa-envelope text-green-600"></i>
                            support@freshcart.com
                        </li>
                    </ul>
                </div>


                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Shop</h3>
                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li><Link href="/product" className="hover:text-green-600">Products</Link></li>
                        <li><Link href="/categories" className="hover:text-green-600">Categories</Link></li>
                        <li><Link href="/brands" className="hover:text-green-600">Brands</Link></li>
                        <li><Link href="/" className="hover:text-green-600">Offers</Link></li>
                    </ul>
                </div>


                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Customer Service</h3>
                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li><Link href="/" className="hover:text-green-600">Contact Us</Link></li>
                        <li><Link href="/" className="hover:text-green-600">Help Center</Link></li>
                        <li><Link href="/" className="hover:text-green-600">Track Order</Link></li>
                        <li><Link href="/" className="hover:text-green-600">Returns</Link></li>
                    </ul>
                </div>


                <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Policies</h3>
                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li><Link href="/" className="hover:text-green-600">Privacy Policy</Link></li>
                        <li><Link href="/" className="hover:text-green-600">Terms of Service</Link></li>
                        <li><Link href="/" className="hover:text-green-600">Shipping Policy</Link></li>
                        <li><Link href="/" className="hover:text-green-600">Refund Policy</Link></li>
                    </ul>
                </div>
            </div>


            <div className="border-t bg-white">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>

                    <div className="flex gap-4 text-lg">
                        <i className="fa-brands fa-facebook hover:text-green-600 cursor-pointer"></i>
                        <i className="fa-brands fa-instagram hover:text-green-600 cursor-pointer"></i>
                        <i className="fa-brands fa-twitter hover:text-green-600 cursor-pointer"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}
