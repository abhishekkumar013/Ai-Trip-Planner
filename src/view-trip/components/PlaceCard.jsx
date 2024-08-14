import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PHOTO_REF_URL =
  'https://places.googleapis.com/vl/{NAME}/media?maxHeighttPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
const PlaceCard = ({ place }) => {
  const [photoURL, setPhotoURL] = useState('')

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
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
    if (place) {
      GetPlacePhoto()
    }
  }, [place])
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={photoURL ? photoURL : '/placeholder.jpeg'}
          // src="/placeholder.jpeg"
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div className="">
          <h2 className="font-bold text-lg">{place?.placeName}</h2>
          <p className="text-sm text-gray-400">{place?.placeDetails}</p>
          <p className="mt-2"></p>
          <h2 className="mt-2">🕙 {place?.bestTimeToVisit} </h2>
          <h2 className="mt-2">🎟️ {place?.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCard
