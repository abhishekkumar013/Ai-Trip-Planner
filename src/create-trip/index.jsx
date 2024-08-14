/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from '@/constants/option'
import { chatSession } from '@/service/AIModel'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { doc, setDoc } from 'firebase/firestore'

import { FcGoogle } from 'react-icons/fc'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { db } from '@/service/FirebaseConfig'
import { useNavigate } from 'react-router-dom'

const CreateTrip = () => {
  const [place, setPlace] = useState()

  const [formData, setFormData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user')
    if (!user) {
      setOpenDialog(true)
      return
    }
    if (formData?.noOfDays > 5) {
      toast('No of days not more then 5')
      return
    }
    if (!formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast('Please fill all details')
      return
    }
    setLoading(true)
    //formData?.location?.label
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', 'delhi')
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result?.response?.text())
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    await setDoc(doc(db, 'AiTrips', docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    })
    setLoading(false)
    navigate(`/view-trip/${docId}`)
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp.access_token),
    onError: (error) => console.log(error),
  })
  const GetUserProfile = async (token) => {
    const resp = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'Application/json',
        },
      },
    )
    localStorage.setItem('user', JSON.stringify(resp.data))
    setOpenDialog(false)
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v)
                handleInputChange('location', v)
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={'Ex.3'}
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((e) => (
              <div
                key={e.id}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget === e.title && 'shadow-lg border-black'
                }`}
                onClick={() => handleInputChange('budget', e.title)}
              >
                <h2 className="text-4xl">{e.icon}</h2>
                <h2 className="font-bold text-lg">{e.title}</h2>
                <h2 className="text-sm text-gray-500">{e.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((e) => (
              <div
                onClick={() => handleInputChange('traveler', e.people)}
                key={e.id}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.traveler === e.people && 'shadow-lg border-black'
                }`}
              >
                <h2 className="text-4xl">{e.icon}</h2>
                <h2 className="font-bold text-lg">{e.title}</h2>
                <h2 className="text-sm text-gray-500">{e.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin " />
          ) : (
            'Generate Trip'
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the app with Google authentication securly.</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" /> Sign In WIth Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip
