// src/components/SwiperImg/Swiper.tsx
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../SwiperImg/styles.css'

import axios from 'axios'
import { useEffect, useState } from 'react'

interface ImageData {
  id: string
  imageName: string
}

interface MySwiperImgProps {
  user: { id: string }
  idUser: string
}

export default function MySwiperImg({ user, idUser }: MySwiperImgProps) {
  const Api = 'http://37.27.29.18:8001/api/to-dos'
  const ImgApi = 'http://37.27.29.18:8001/images'

  const [img, setImg] = useState<ImageData[]>([])

  async function deleteImg(id: string) {
    try {
      await axios.delete(`${Api}/images/${id}`)
      getData()
    } catch (error) {
      console.error(error)
    }
  }

  async function getData() {
    try {
      const { data } = await axios.get(`${Api}/${idUser}`)
      setImg(data.data.images)
      console.log(data.data.images)
      console.log(user.id)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [user])

  return (
    <Swiper
      spaceBetween={30}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {img?.map((image, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col justify-between">
            <img
              src={`${ImgApi}/${image.imageName}`}
              alt="Task"
              className="bg-white rounded shadow"
            />
            <button
              className="bg-red-500 px-[30px] py-[10px] rounded cursor-pointer absolute top-0 left-0"
              onClick={() => deleteImg(image.id)}
            >
              DELETE IMG
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
