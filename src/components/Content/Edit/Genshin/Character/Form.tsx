import TextField from "@/components/Input/TextField";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import Loading from "@/components/general/Loading";
import { fetcherWithParams } from "@/lib/Data";
import { Route } from "next";
import useSWR from "swr";

// <<<<< Swiperjs Library >>>>>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import SwiperSlideData from "@/components/Content/Write/Genshin/Components/SwiperSlideData";
import ImageInput from "@/components/general/ImageInput";


interface FormProps {
  data:GenshinImpact.Character
}
export default function Form({ data }: FormProps) {

  return <form action="" className="my-4">
    <h3 className="font-bold text-white text-xl font-poppins text-center underline">Edit {data.name} data</h3>
    <TextField variant="default-variant-1" defaultValue={data.name} label="Character Name" forId="charName" name="name" />

    <TextField variant="default-variant-1" defaultValue={data.lang + " (Can't edit this data)"} label="Language" forId="lang" name="lang" disabled />

    <div className="grid grid-cols-2 gap-4 my-4">
        <div className="p-4 border-2 border-white rounded-xl">
          <h4 className="font-bold text-white font-merriweather text-center underline">
            Cover Image
          </h4>
          <div className=" text-white font-poppins">
            <p className="font-bold underline mb-2">Aturan :</p>
            <ul className="px-2">
              <li className="list-disc text-sm">
                Pastikan nama file memiliki format &ldquo;Nama Karakter -
                Cover.png&rdquo;
              </li>
              <li className="list-disc text-sm">
                Contoh: &ldquo;Kamisato Ayaka - Cover.png&rdquo;
              </li>
              <li className="list-disc text-sm">
                Hanya format png dan webp saja yang diizinkan
              </li>
            </ul>
          </div>
          <ImageInput template="Character" id="image-cover" dataImage={data.image.cover} imageName={`${data.name} - Cover.png`}/>
        </div>

        <div className="p-4 border-2 border-white rounded-xl">
          <h4 className="font-bold text-white font-merriweather text-center underline">
            Portrait Image
          </h4>
          <div className=" text-white font-poppins">
            <p className="font-bold underline mb-2">Aturan :</p>
            <ul className="px-2">
              <li className="list-disc text-sm">
                Pastikan nama file memiliki format &ldquo;Nama Karakter -
                Portrait.png&rdquo;
              </li>
              <li className="list-disc text-sm">
                Contoh: &ldquo;Kamisato Ayaka - Portrait.png&rdquo;
              </li>
              <li className="list-disc text-sm">
                Hanya format png dan webp saja yang diizinkan
              </li>
            </ul>
          </div>
          <ImageInput template="Character" id="image-portrait" />
        </div>
      </div>

    <Textarea className={TextareaStyle.variant_1} defaultValue={data.description} label="Character Description" name="description" forId="char-description" />

    <TextField variant="default-variant-1" defaultValue={data.ascendStatus} label="Character Ascend Status" forId="character-ascend-status" name="ascendStatus"/>

    <div className="border-2 border-white rounded-lg p-4 my-4">
        <h1 className="text-white font-semibold font-poppins text-center">
          Material Ascend
        </h1>

        <div className="my-2">
            <Swiper
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Edit"
                  passData={data}
                  keyValue="ascend1"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Edit"
                  passData={data}
                  keyValue="ascend2"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Edit"
                  passData={data}
                  keyValue="ascend3"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Edit"
                  passData={data}
                  keyValue="ascend4"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Edit"
                  passData={data}
                  keyValue="ascend5"
                />
              </SwiperSlide>

              <SwiperSlide>
                <SwiperSlideData
                  category="Character"
                  template="Edit"
                  passData={data}
                  keyValue="ascend6"
                />
              </SwiperSlide>
            </Swiper>
        </div>
      </div>


  </form>;
}
