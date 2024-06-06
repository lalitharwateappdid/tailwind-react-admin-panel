import React, { useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import axios from 'axios';



const ECommerce: React.FC = () => {
  const [book, setBook] = useState("")
  const [media, setMedia] = useState("")
  const [slider, setSlider] = useState("")
  const [quote, setQuote] = useState("")
  const [categories, setCategories] = useState("")
  const [subCategories, setSubCategories] = useState("")
  const [eBook, setEbook] = useState("")

  const getCount = async () => {
    const response = await axios.get(`${apiLink}dashboard/get`)
    const count = response.data.data

    setBook(count.book)
    setMedia(count.media)
    setQuote(count.quote)
    setSubCategories(count.subCategory)
    setSlider(count.media)
    setEbook(count.ebook)
    setCategories(count.subCategory)
  }

  useEffect(() => {
    getCount()
  }, [])
  return (
    <DefaultLayout>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Sliders" total={slider} rate="" >
          <span className="material-symbols-outlined">
            inventory_2
          </span>
        </CardDataStats>
        <CardDataStats title="Total Youtube Media" total={media} rate="" >
          <span className="material-symbols-outlined">
            play_circle
          </span>
        </CardDataStats>
        <CardDataStats title="Total Books" total={book} rate="" >
          <span className="material-symbols-outlined">
            import_contacts
          </span>
        </CardDataStats>
        <CardDataStats title="Total Quotes" total={quote} rate="" >
          <span className="material-symbols-outlined">
            format_quote
          </span>
        </CardDataStats>
        <CardDataStats title="Total E-Books" total={eBook} rate="" >
          <span className="material-symbols-outlined">
            play_lesson
          </span>
        </CardDataStats>
        <CardDataStats title="Total Categories" total={categories} rate="" >
          <span className="material-symbols-outlined">
            category
          </span>
        </CardDataStats>
        <CardDataStats title="Total SubCategories" total={subCategories} rate="" >
        <span className="material-symbols-outlined">
            category
          </span>
        </CardDataStats>


      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> */}
    </DefaultLayout>
  );
};

export default ECommerce;
