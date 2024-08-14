import React from 'react'
import { Link } from 'react-router-dom'

import PlaceCard from './PlaceCard'

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((plan, i) => (
          <div className="mt-5" key={i}>
            <h2 className="font-medium text-lg">Day {plan.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {plan?.dayPlan?.map((place, index) => (
                <div key={i} className="">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.time}
                  </h2>
                  <PlaceCard place={place} key={index} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
