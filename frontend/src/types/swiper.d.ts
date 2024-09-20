// swiper.d.ts
declare module 'swiper/react' {
    import { Swiper as SwiperClass } from 'swiper';
    import React from 'react';
  
    interface SwiperProps {
      [x: string]: any;
    }
  
    const Swiper: React.FunctionComponent<SwiperProps & { ref?: React.Ref<SwiperClass> }>;
  
    interface SwiperSlideProps {
      [x: string]: any;
    }
  
    const SwiperSlide: React.FunctionComponent<SwiperSlideProps>;
  
    export { Swiper, SwiperSlide };
  }
  
  declare module 'swiper/modules' {
    import { Navigation as SwiperNavigation, Pagination as SwiperPagination } from 'swiper';
    export const Navigation: typeof SwiperNavigation;
    export const Pagination: typeof SwiperPagination;
  }