"use client";

import { useContext, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { getLoggedUserCart } from "@/app/api/cartAction/getLoggedUserCart.api";
import { updateProduct } from "@/app/api/cartAction/updateCart.api";
import { removeSpacificItem } from "@/app/api/cartAction/removeProduct.api";
import { clearAllCart } from "@/app/api/cartAction/clearAllProduct.api";
import { Product } from "@/app/interface/cart.interface";
import cartItemContext from "@/app/context/cartContext";

function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
}

export default function Cart() {
  const context = useContext(cartItemContext);
  if (!context) throw new Error("Cart Context Not Exist");
  const { setDetails } = context;

  const [cartId, setCartId] = useState("");
  const [cartList, setList] = useState<Product[]>([]);
  const [totalPrice, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [isRemoving, startRemoveTransition] = useTransition();
  const [isClearing, startClearTransition] = useTransition();
  const [isUpdating, startUpdateTransition] = useTransition();

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function getCartData() {
    setIsLoading(true);
    try {
      const res = await getLoggedUserCart();
      setCartId(res.cartId);
      setDetails(res.numOfCartItems);
      setList(res.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCartData();
  }, []);

  
  useEffect(() => {
    const total = cartList.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    setPrice(total);
  }, [cartList]);

  function updateProductCart(id: string, countNumber: number) {
    if (countNumber < 1) return;

    setUpdatingId(id);

    startUpdateTransition(async () => {
      const response = await updateProduct(id, countNumber);

      if (response.status === "success") {
        setList((prev) =>
          prev.map((item) =>
            item.product._id === id
              ? { ...item, count: countNumber }
              : item
          )
        );
      }

      setUpdatingId(null);
    });
  }

  function removeProduct(id: string) {
    setRemovingId(id);

    startRemoveTransition(async () => {
      const response = await removeSpacificItem(id);

      if (response.status === "success") {
        setList((prev) => prev.filter((item) => item.product._id !== id));
        setDetails((prev: number) => Math.max(prev - 1, 0));
      }

      setRemovingId(null);
    });
  }

  function clearAllProduct() {
    startClearTransition(async () => {
      const response = await clearAllCart();

      if (response.status === "success") {
        setList([]);
        setDetails(0);
      }
    });
  }

  if (isLoading) return <Loading />;

  return (
    <>
      {cartList.length > 0 ? (
        <div className="container w-[90%] mx-auto my-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
        
            <div className="md:w-3/4 w-full">
              <div className="overflow-x-auto bg-white shadow-md rounded-lg border">
                <table className="w-full min-w-[600px] text-sm">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cartList.map((p) => {
                      const isThisUpdating =
                        isUpdating && updatingId === p.product._id;

                      return (
                        <tr
                          key={p.product._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <img
                              src={p.product.imageCover}
                              alt={p.product.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                          </td>

                          <td className="px-4 py-3 font-medium">
                            {p.product.title}
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateProductCart(
                                    p.product._id,
                                    p.count - 1
                                  )
                                }
                                disabled={isThisUpdating}
                                className="px-2 py-1 bg-gray-200 rounded"
                              >
                                -
                              </button>

                              <div className="w-12 h-8 flex items-center justify-center border rounded-md">
                                {isThisUpdating ? (
                                  <i className="fa-solid fa-spinner animate-spin text-sm"></i>
                                ) : (
                                  <span>{p.count}</span>
                                )}
                              </div>

                              <button
                                onClick={() =>
                                  updateProductCart(
                                    p.product._id,
                                    p.count + 1
                                  )
                                }
                                disabled={isThisUpdating}
                                className="px-2 py-1 bg-gray-200 rounded"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td className="px-4 py-3 font-semibold">
                            {(p.price * p.count).toFixed(2)} EGP
                          </td>

                          <td className="px-4 py-3">
                            <button
                              onClick={() => removeProduct(p.product._id)}
                              disabled={
                                isRemoving &&
                                removingId === p.product._id
                              }
                              className="text-red-500 w-20 h-7 flex justify-center items-center"
                            >
                              {isRemoving &&
                              removingId === p.product._id ? (
                                <i className="fa-solid fa-spinner animate-spin"></i>
                              ) : (
                                "Remove"
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

              
                <div className="p-4 border-t flex justify-end">
                  <button
                    onClick={clearAllProduct}
                    disabled={isClearing}
                    className={`flex items-center gap-2 px-6 py-2 text-white rounded-md ${
                      isClearing
                        ? "bg-red-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {isClearing ? (
                      <>
                        <i className="fa-solid fa-spinner animate-spin"></i>
                        Clearing...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-trash-can"></i>
                        Clear Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

        
            <div className="md:w-1/4 w-full sticky top-24">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Cart Summary</h2>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">
                    {totalPrice.toFixed(2)} EGP
                  </span>
                </div>

                <Link
                  href={`/checkout/${cartId}`}
                  className="bg-green-600 text-white text-center py-2 rounded"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/product"
                  className="bg-gray-700 text-white text-center py-2 rounded"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
  
        <div className="flex flex-col items-center gap-4 my-24">
          <i className="fa-solid fa-cart-shopping text-6xl text-gray-300"></i>
          <h1 className="text-gray-500 font-semibold">
            Your cart is empty
          </h1>
          <Link
            href="/product"
            className="px-6 py-2 bg-green-600 text-white rounded"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
}
