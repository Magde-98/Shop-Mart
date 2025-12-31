"use client";

import { useContext, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cartItemContext from "@/app/context/cartContext";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  const context = useContext(cartItemContext);
  if (!context) throw new Error("Cart Context Not Found");
  const { dataDetails } = context;

  if (status === "loading") return null;

  const navLinkClass = (path: string) =>
    `px-3 py-1.5 rounded-md transition
     ${pathname === path
      ? "bg-gray-200 text-green-600 font-semibold"
      : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">


        <Link href="/" className="flex items-center gap-3">
          <i className="fa-solid fa-cart-shopping text-green-600 text-3xl"></i>
          <span className="text-3xl font-semibold">
            Fresh<span className="text-green-600">Cart</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-2 text-lg font-medium">
          <li><Link href="/" className={navLinkClass("/")}>Home</Link></li>
          <li><Link href="/product" className={navLinkClass("/product")}>Products</Link></li>
          <li><Link href="/categories" className={navLinkClass("/categories")}>Categories</Link></li>
          <li><Link href="/brands" className={navLinkClass("/brands")}>Brands</Link></li>
        </ul>


        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <>
              <Link href="/cart" className="relative">
                <i className="fa-solid fa-cart-shopping text-2xl text-green-600"></i>
                {dataDetails > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5
                    flex items-center justify-center text-xs font-bold
                    text-white bg-red-600 rounded-full px-1.5
                    border-2 border-white">
                    {dataDetails}
                  </span>
                )}
              </Link>

              <span className="font-medium text-gray-700">
                Hi, {session.user?.name}
              </span>

              <button
                onClick={logOut}
                className="hover:text-red-600 transition"
              >
                LogOut
              </button>
            </>
          ) : (
            <ul className="flex items-center gap-4 text-lg">
              <li><Link href="/login" className={navLinkClass("/login")}>Login</Link></li>
              <li><Link href="/signup" className={navLinkClass("/signup")}>SignUp</Link></li>
            </ul>
          )}
        </div>


        <div className="md:hidden flex items-center gap-4">
          <Link href="/cart" className="relative">
            <i className="fa-solid fa-cart-shopping text-2xl text-green-600"></i>
            {dataDetails > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5
                flex items-center justify-center text-xs font-bold
                text-white bg-red-600 rounded-full px-1.5
                border-2 border-white">
                {dataDetails}
              </span>
            )}
          </Link>

          <button onClick={() => setIsOpen(!isOpen)}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>


      <div
        className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-300
        ${isOpen ? "max-h-[500px] py-4" : "max-h-0"}`}
      >
        <ul className="flex flex-col gap-2 px-4">
          <li><Link href="/" className={navLinkClass("/")}>Home</Link></li>
          <li><Link href="/product" className={navLinkClass("/product")}>Products</Link></li>
          <li><Link href="/categories" className={navLinkClass("/categories")}>Categories</Link></li>
          <li><Link href="/brands" className={navLinkClass("/brands")}>Brands</Link></li>

          {session && (
            <>
              <hr className="my-2" />
              <li className="px-3 py-2 text-gray-700 font-medium">
                Hi, {session.user?.name}
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  LogOut
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
