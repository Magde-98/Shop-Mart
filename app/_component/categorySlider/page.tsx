"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Category } from "@/app/interface/product.interface";
import Image from "next/image";
import Link from "next/link";


export default function CategorySlider({ category }: { category: Category[] }) {
  return (
    <div className="my-8">
      <h2 className="text-3xl font-semibold py-5 text-gray-800 ps-5">Popular Categories</h2>

      <Swiper
        spaceBetween={15}
        slidesPerView={2}
        autoplay={{ delay: 2000 }}
        modules={[Autoplay]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {category.map((cat: Category) => (
          <SwiperSlide key={cat._id}>
            <Link href={`/categories/${cat._id}`}>
              <div className="flex flex-col items-center p-3 hover:scale-105 transition-all duration-300 cursor-pointer">
                <img
                  src={cat.image}
                  className="h-40 w-40 object-cover rounded-full shadow-md"
                  alt={cat.name}
                />
                <h4 className="mt-3 text-lg font-semibold text-center">{cat.name}</h4>
              </div>
            </Link>
          </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}
