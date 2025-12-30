import AddBtn from "@/app/_component/addBtn/page";
import { GetAllProducts } from "@/app/api/allProduct.Api";
import { Iproduct } from "@/app/interface/product.interface";
import Link from "next/link";

export default async function Products() {
  const { data } = await GetAllProducts();

  return (
    <div className="my-5 w-[90%] mx-auto">

      <h2 className="text-3xl font-semibold py-5 text-gray-800 ps-5">
        Popular Products
      </h2>

      <div className="container w-[90%] mx-auto my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((product: Iproduct) => (
            <div
              key={product._id}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden group"
            >
              <Link href={`/product/${product._id}`}>
                <div className="overflow-hidden">
                  <img
                    src={product.imageCover}
                    className="w-full h-auto max-h-64 object-contain bg-gray-100"
                    alt={product.title}
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
      </div>
    </div>
  );
}


