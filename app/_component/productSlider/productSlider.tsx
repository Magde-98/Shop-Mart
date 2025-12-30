"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type Props = {
  images: string[];
  altContent: string;
};

export default function ProductSlider({ images, altContent }: Props) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-gray-100">
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[350px] relative">
                <Image
                  src={img}
                  alt={altContent}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </div>

            </CarouselItem>
          ))}
        </CarouselContent>


      </Carousel>
    </div>
  );
}
