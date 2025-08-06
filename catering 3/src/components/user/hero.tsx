import * as React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import {motion} from "framer-motion";
import type {Hero} from "../../utils/ResponseTypes.ts";


type HeroResponse = {
    data: Hero;
}

export const Hero: React.FC<HeroResponse> = ({ data }) => {
  function shuffle(array: string[]): string[] {
    const arr = [...array];
    let currentIndex = arr.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr;
  }

  function parseImages(raw: string){
      const fixed = raw
          .slice(1, -1)
          .split(',')
          .map(item => `"${item.trim()}"`)
          .join(',');

      return  JSON.parse(`[${fixed}]`);
  }

  const slides =
      parseImages(data.images).length > 1 ? (
      Array.from({ length: 5 }).flatMap((_, idx) =>
        shuffle(parseImages(data.images)).map((item) => (
          <SwiperSlide key={`slide-${idx}-${item}`} className="h-[100vh]">
            <div className="w-full h-[100vh] overflow-hidden">
              {item.endsWith(".mp4") ? (
                <video
                  src={`/static/${item}`}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                    src={`/static/${item}`}
                    className="w-full h-full object-cover scale-100 transition-transform duration-2000 hover:scale-105"
                    alt={`slide-${idx}-${item}`}
                />
              )}
            </div>
          </SwiperSlide>
        ))
      )
    ) : (
      <div className="w-full h-[100vh] overflow-hidden">
        <video
          src={`/static/${parseImages(data.images[0])}`}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    );

  return (
    <section className="relative h-screen min-h-[100vh] overflow-hidden font-sans">
      {/* Media */}
      <div className="absolute inset-0 z-0 bg-transparent">
        {parseImages(data.images).length > 1 ? (
          <Swiper
            modules={[Autoplay]}
            className="w-full h-[100vh]"
            spaceBetween={0}
            loop
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            slidesPerView={1}
            allowTouchMove={false}
            speed={1000}
            effect="fade"
          >
            {slides}
          </Swiper>
        ) : (
          slides
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 bg-black/30 backdrop-blur-sm py-4">
          <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] leading-tight font-display"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
          >
              <span className="text-yellow-600 flame-text">Xəzər </span>
              <span className="text-black">İaşə</span>
          </motion.h1>

          <motion.p
              className="text-base sm:text-lg md:text-2xl lg:text-3xl mt-4 font-medium text-white/90 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-w-3xl"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
              {data.subtext}
          </motion.p>

      </div>

      {/* Bottom Text */}
      <motion.div
        className="absolute bottom-8 w-full z-10 flex justify-center px-6 sm:text-sm"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      >
        <p className="max-w-3xl text-xs md:text-sm leading-relaxed text-center text-gray-300 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
            {data.details}
        </p>
      </motion.div>
    </section>
  )
};
