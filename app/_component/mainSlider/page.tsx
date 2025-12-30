"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function MainSlider() {
    return (
        <div className="flex flex-col md:flex-row">

            <div className="w-full md:w-3/4">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{ delay: 2000 }}
                >
                    <SwiperSlide>
                        <Image
                            src="/images/grocery-banner-2.jpeg"
                            width={1400}
                            height={400}
                            alt="slide1"
                            className="w-full object-cover h-[220px] md:h-[400px]"
                            priority
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Image
                            src="/images/slider-2.jpeg"
                            width={1400}
                            height={400}
                            alt="slide2"
                            className="w-full object-cover h-[220px] md:h-[400px]"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Image
                            src="/images/grocery-banner.png"
                            width={1400}
                            height={400}
                            alt="slide3"
                            className="w-full object-cover h-[220px] md:h-[400px]"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>


            <div className="w-full md:w-1/4 flex md:block">
                <Image
                    src="/images/slider-image-2.jpeg"
                    width={300}
                    height={200}
                    alt="banner1"
                    className="w-1/2 md:w-full h-40 md:h-[200px] object-cover"
                />

                <Image
                    src="/images/slider-image-3.jpeg"
                    width={300}
                    height={200}
                    alt="banner2"
                    className="w-1/2 md:w-full h-40 md:h-[200px] object-cover"
                />
            </div>

        </div>
    );
}
