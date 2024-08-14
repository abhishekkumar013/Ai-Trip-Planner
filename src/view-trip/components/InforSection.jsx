import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'

const PHOTO_REF_URL =
  'https://places.googleapis.com/vl/{NAME}/media?maxHeighttPx=1000&maxWidthPx=1000&key=' +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
const InforSection = ({ trip }) => {
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
    <div>
      <img
        src={photoURL ? photoURL : '/placeholder.jpeg'}
        className="h-[340px] w-full object-cover rounded-xl "
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          {/* <h2>{trip?.userSelection?.location.label}</h2> */}

          <h2 className="font-bold text-2xl">{trip?.tripData?.location}</h2>
          <div className="  hidden sm:flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              💰 {trip?.userSelection?.budget} budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              🥂 No of Traveler: {trip?.userSelection?.traveler} Day
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  )
}

export default InforSection
