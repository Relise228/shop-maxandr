import { useState } from "react"
import Layout from "@components/Layout"
import ProductItem from "@components/reusable/ProductItem"
import { Swiper, SwiperSlide } from "swiper/react"
import { Parallax, Autoplay } from "swiper"
import Image from "next/image"
import db from "@utils/db"
import Product from "../models/Product"

const slides = [
  {
    title: "New",
    subTitle: "Neque porro quisquam est qui dolorem ipsum ",
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100"
  },
  {
    title: "New",
    subTitle: "Neque porro quisquam est qui dolorem ipsum",
    image:
      "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=100"
  }
]

export default function Home({ products = [] }) {
  const [parallaxSwiper, setParallaxSwiper] = useState(null)
  const parallaxAmount = parallaxSwiper ? parallaxSwiper.width * 0.95 : 0

  const params = {
    modules: [Parallax, Autoplay],
    autoplay: {
      delay: 2000
    },
    loop: true,
    speed: 2000,
    parallax: true,
    centeredSlides: true,
    spaceBetween: 0
  }

  return (
    <Layout>
      <Swiper
        {...params}
        className="h-screen w-full relative"
        onSwiper={swiper => {
          setParallaxSwiper(swiper)
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide className="!w-full h-screen flex overflow-hidden items-center justify-center" key={`slide-${index}`}>
            <div
              className="h-full w-full absolute top-0 bottom-0 left-0 right-0 m-auto flex justify-center items-center"
              data-swiper-parallax={parallaxAmount}
            >
              <div className="relative h-full w-full">
                <Image src={slide.image} alt={slide.title} fill style={{ objectFit: "cover" }} />
              </div>
              <div className="h-full container absolute top-0 left-0 right-0 m-auto">
                <h2 className="mt-[30vh] font-semibold text-5xl text-white" data-swiper-parallax="-500">
                  {slide.title}
                </h2>
                <h4 className="mt-10 font-medium text-2xl text-white" data-swiper-parallax="-700">
                  {slide.subTitle}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="text-center pb-10">
            <h2 className="pb-2 text-4xl text-[#0B254B] font-medium">Clothes</h2>
            <h4 className="text-lg font-medium text-[#5E6E89]">Choose your best style</h4>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map(product => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <div className="py-32 bg-[#F7F8FA] h-[800px]">
        <div className="container mx-auto ">Promote-block</div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  await db.connect()
  const products = await Product.find().populate("category").populate("brand").populate("season").skip(0).limit(8).lean()
  await db.disconnect()
  return {
    props: {
      products: products ? db.convertDocToObj(products) : null
    }
  }
}
