import { db } from '@/service/FirebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import InforSection from '../components/InforSection'
import Hotels from '../components/Hotels'
import PlacesToVisit from '../components/PlacesToVisit'
import Footer from '../components/Footer'

const ViewTrip = () => {
  const { tripId } = useParams()
  const [trip, setTrip] = useState([])

  const GetTripdata = async () => {
    const docRef = doc(db, 'AiTrips', tripId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setTrip(docSnap.data())
      console.log('DOc ', docSnap.data())
    } else {
      console.log('no such document exists')
      toast('No trip Found')
    }
  }
  useEffect(() => {
    if (tripId) {
      GetTripdata()
    }
  }, [tripId])

  return (
    <div className="p-10 md:px-20 lg:px-44  cl:px-56 ">
      {/* information section */}
      <InforSection trip={trip} />
      {/* Recomended hotels */}
      <Hotels trip={trip} />
      {/* daily plan */}

      <PlacesToVisit trip={trip} />

      {/* footer */}
      <Footer />
    </div>
  )
}

export default ViewTrip
