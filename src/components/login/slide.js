import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export  const Slider = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
     // onSlideChange={() => console.log('slide change')}
    >
      
        <SwiperSlide><img src="https://cdn.dribbble.com/users/4201527/screenshots/13956909/idea-board-login.jpg" alt=""/></SwiperSlide>
        <SwiperSlide><img src="https://static.vecteezy.com/system/resources/previews/000/964/116/non_2x/flat-design-login-screen-template-vector.jpg" alt=""/></SwiperSlide>
        <SwiperSlide><img src="https://downloadpsd.cc/wp-content/uploads/User-Login-Register-Screen-Free-PSD.jpg" alt=""/></SwiperSlide>
        <SwiperSlide><img src="https://cdn.dribbble.com/users/1890009/screenshots/8945409/media/9f5a99bf5a7a74cd90a1adb899cb3f4b.png" alt=""/></SwiperSlide>
      
    </Swiper>
  )
}

