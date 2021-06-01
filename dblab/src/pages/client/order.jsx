import React, { useState } from 'react'
import FlightCard from '../../component/flightcard'
import Orderbutton from '../../component/Orderbutton'
import PassengerInfoCard from '../../component/PassengerInfoCard'
import { goback } from '../../logo/index'
function Order(props) {
    const [passengers, setpassengers] = useState([{},]);
    const addPassenger = () => {
        if (passengers.length < 3)

            setpassengers([...passengers, {}])
    }
    const [flight_id] = useState(props.location.state.id)
    return (
        <div >
            <div className="bg-purple-100 h-screen">
                <div className="h-16 font-semibold text-gray-600 bg-gradient-to-b from-indigo-300 to-purple-100 flex flex-row justify-center items-center">
                    <img src={goback} className="inline-block h-4 w-4 absolute left-4" onClick={() => { window.history.back() }} alt="" />
                航班预定
             </div>
                <div role="infoCard" className="flex flex-col justify-center items-center">
                    <FlightCard {...(props.location.state)} />
                    <div role="infoText" className="mt-2 text-gray-800 text-xl p-2 border-gray-300 border-t  rounded-sm">
                        <span>
                            {`${localStorage.getItem("s_city")}——${localStorage.getItem("e_city")} ${localStorage.getItem("f_date")}`}
                        </span>
                        <span className=" block mt-4 sm:inline-block sm:mt-0 ">
                            < Orderbutton flight_id={flight_id} />
                        </span>
                    </div>
                    <div >
                        <button className="p-2 bg-gray-300 rounded-full focus:outline-none hover:bg-gray-200 hover:text-red-900" onClick={addPassenger}>
                            +新增乘客
                        </button>
                        <div id="passengerinfo" className=" ">
                            {passengers.map((passenger, index) => {
                                return <PassengerInfoCard key={index} pnum={index} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
