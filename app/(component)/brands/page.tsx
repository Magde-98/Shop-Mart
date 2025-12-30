import { GetAllBrands } from "@/app/api/getAllBrands.api";
import { IBrand } from "@/app/interface/brand.interface";
import Link from "next/link";

export default async function Brands() {
  const { data } = await GetAllBrands();

  return (
    <div className="my-5">
      <div className="container w-[90%] mx-auto my-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.map((brand: IBrand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="bg-white shadow-md hover:shadow-xl
                         transition-shadow duration-300
                         rounded-xl overflow-hidden group p-4
                         flex flex-col items-center"
            >
              <div className="w-full h-32 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-full object-contain
                             group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
