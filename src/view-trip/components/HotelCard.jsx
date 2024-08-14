import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PHOTO_REF_URL =
  'https://places.googleapis.com/vl/{NAME}/media?maxHeighttPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
const HotelCard = ({ hotel }) => {
  const [photoURL, setPhotoURL] = useState('')

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    }
    const result = await GetPlaceDetails(data)
    console.log(result.data.places[0].photos[3].name)
    const photoUrl = PHOTO_REF_URL.replace(
      '{NAME}',
      result.data.places[0].photos[3].name,
    )
    setPhotoURL(photoUrl)
  }
  useEffect(() => {
    if (hotel) {
      GetPlacePhoto()
    }
  }, [hotel])

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} , ${hotel?.hotelAddress}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoURL ? photoURL : '/placeholder.jpeg'}
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium ">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500 ">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
