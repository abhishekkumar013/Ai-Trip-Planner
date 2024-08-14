import { GetPlaceDetails } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PHOTO_REF_URL =
  'https://places.googleapis.com/vl/{NAME}/media?maxHeighttPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
const TripCard = ({ trip }) => {
  const [photoURL, setPhotoURL] = useState('')

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location,
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
    if (trip) {
      GetPlacePhoto()
    }
  }, [trip])
  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className="hover:scale-105 transition-all ">
        <img
          src={photoURL ? photoURL : '/placeholder.jpeg'}
          className="object-cover w-full rounded-xl h-[220px]"
          alt={trip.name}
        />
        <div>
          <h2 className="font-bold text-lg">{trip.tripData.location}</h2>
          <h2 className="text-sm text-gray-500">
            {trip.userSelection.noOfDays} Days trip with{' '}
            <span className="font-medium text-black">
              {trip.tripData.budget}
            </span>{' '}
            Budget
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default TripCard
