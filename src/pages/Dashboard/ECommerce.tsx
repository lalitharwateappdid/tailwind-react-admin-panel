import React, { useEffect } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
import { apiLink } from '../../api_link';
import axios from 'axios';
import { Link } from 'react-router-dom';
// sad


const ECommerce: React.FC = () => {
  const [book, setBook] = useState("")
  const [media, setMedia] = useState("")
  const [slider, setSlider] = useState("")
  const [quote, setQuote] = useState("")
  const [categories, setCategories] = useState("")
  const [subCategories, setSubCategories] = useState("")
  const [eBook, setEbook] = useState("")
  const [event, setEvent] = useState("")
  const [literature, setLiterature] = useState("")
  const [appUser,setAppUser] = useState("")
  const [masterImage,setMasterImage] = useState("")

  const getCount = async () => {
    const response = await axios.get(`${apiLink}dashboard/get`)
    const count = response.data.data
    console.log(count);

    setBook(count.book)
    setMedia(count.media)
    setQuote(count.quote)
    setSubCategories(count.subCategory)
    setSlider(count.homeContent)
    setEbook(count.ebook)
    setCategories(count.subCategory)
    setEvent(count.event)
    setLiterature(count.literature)
    setAppUser(count.app_user)
    setMasterImage(count.master_image)
  }

  useEffect(() => {
    getCount()
  }, [])
  return (
    <DefaultLayout>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <Link to="/">
          <CardDataStats title="Total App Users" total={appUser} rate="" >
            <span className="material-symbols-outlined">
              group
            </span>
          </CardDataStats>
        </Link>
        <Link to="/home-content">
          <CardDataStats title="Total Sliders" total={slider} rate="" >
            <span className="material-symbols-outlined">
              inventory_2
            </span>
          </CardDataStats>
        </Link>

        <Link to="/media">
          <CardDataStats title="Total Youtube Media" total={media} rate="" >
            <span className="material-symbols-outlined">
              play_circle
            </span>
          </CardDataStats>
        </Link>

       

        <Link to="quotes">
          <CardDataStats title="Total Quotes" total={quote} rate="" >
            <span className="material-symbols-outlined">
              format_quote
            </span>
          </CardDataStats>
        </Link>

        <Link to="ebook">
          <CardDataStats title="Total E-Books" total={eBook} rate="" >
            <span className="material-symbols-outlined">
              play_lesson
            </span>
          </CardDataStats>
        </Link>

        <Link to="/category">
          <CardDataStats title="Total Categories" total={categories} rate="" >
            <span className="material-symbols-outlined">
              category
            </span>
          </CardDataStats>
        </Link>

        {/* <Link to="/sub-category">
          <CardDataStats title="Total SubCategories" total={subCategories} rate="" >
            <span className="material-symbols-outlined">
              category
            </span>
          </CardDataStats>
        </Link> */}

        <Link to="/events">
          <CardDataStats title="Total Events" total={event} rate="" >
            <span className="material-symbols-outlined">
              event
            </span>
          </CardDataStats>
        </Link>

        <Link to="/literature">
          <CardDataStats title="Total Literature" total={literature} rate="" >
            <span className="material-symbols-outlined">
              draw
            </span>
          </CardDataStats>
        </Link>

        <Link to="/literature">
          <CardDataStats title="Total Master Images" total={masterImage} rate="" >
            <span className="material-symbols-outlined">
              image
            </span>
          </CardDataStats>
        </Link>


      </div>

    </DefaultLayout>
  );
};

export default ECommerce;
