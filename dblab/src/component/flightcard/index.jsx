import React from 'react'
import { withRouter } from 'react-router-dom'
import { clock } from '../../logo/index.js'
const FlightCard = (props) => {

    return (
        <div className="my-2 mx-3 p-4 pb-0  h-18 rounded-md bg-gray-100 border-gray-200 border shadow-sm sm:w-96" onClick={props.onClick}>

            <div className="inline-block w-3/4 h-12 m-2 mt-0 mr-0">
                <div className="time flex flex-row justify-baseline items-center text-gray-700 ">
                    <span className="takeofftime font-semibold text-sm  mx-2" >
                        {props.s_time}
                        <p className="text-indigo-700 font-normal mt-1">{props.s_city}</p>
                    </span>
                    <span className="flex flex-col justify-center items-center
                    text-xs
                    text-gray-600">
                        <span className="w-24  border-blue-600  border-b-2 font-light  text-center">
                            <img src={clock} className=" inline-block  w-4 h-4 mb-1 mr-1" alt="" />
                            {props.r_time}
                        </span>
                        <span className=" mt-1 text-sm">
                            {props.f_no}
                        </span>
                    </span>
                    <span className="arrivetime font-bold text-sm text-gray-700 mx-2">
                        {props.e_time}
                        <p className="text-indigo-700 font-normal mt-1">{props.e_city}</p>
                    </span>
                </div>
            </div>
            <div className="inline-block float-right text-xl font-semibold text-red-500 m-auto">
                <p><span className="text-xs ">¥</span>{props.price}</p></div>
        </div>
    )
}

export default withRouter(FlightCard)
