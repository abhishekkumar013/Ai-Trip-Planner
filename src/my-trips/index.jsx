import { db } from '@/service/FirebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TripCard from './components/TripCard'

const MyTrips = () => {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      navigate('/')
      return
    }
    setTrips([])
    const q = query(
      collection(db, 'AiTrips'),
      where('userEmail', '==', user?.email),
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setTrips((preVal) => [...preVal, doc.data()])
      // console.log(doc.id, '=>', doc.data())
    })
  }

  useEffect(() => {
    GetUserTrips()
  }, [])

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {trips.length > 0
          ? trips.map((trip) => <TripCard trip={trip} key={trip.id} />)
          : [1, 2, 3, 4, 5, 6].map((item, i) => (
              <div
                key={i}
                className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
    </div>
  )
}

export default MyTrips
