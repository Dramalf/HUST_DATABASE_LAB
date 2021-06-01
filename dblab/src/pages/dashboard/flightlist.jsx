import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setFlightlist } from '../../redux/actions/flightlist'
import { dateDiff } from "../../utility/dateFormat"
import FlightCard from '../../component/flightcard'
import { goback } from '../../logo/index'
function Flightlist(props) {
    const [searchResult, setsearchResult] = useState([]);
    const [s_city] = useState(localStorage.getItem("s_city"));
    const [e_city] = useState(localStorage.getItem("e_city"));
    const [flightdate] = useState(localStorage.getItem("f_date"));
    useEffect(() => {
        setsearchResult(props.flightlist)
    }, [props.flightlist]);
    return (
        <div className="bg-purple-100 h-screen" >
            <div className="h-16 font-semibold text-gray-600 bg-gradient-to-b from-indigo-300 to-purple-100 flex flex-row justify-center items-center">
                <img src={goback} className="inline-block h-4 w-4 absolute left-4" onClick={() => { window.history.back() }} alt="" />
                {s_city}-{e_city} {flightdate}
            </div>
            <div className="flightlist flex flex-col justify-center items-center" >

                {
                    searchResult.length === 0 ? (<h3 className="mt-6 text-gray-700">没有符合条件的航班</h3>) : searchResult.map(flight => {
                        if (!flight)
                            return
                        else {
                            console.log(flight)
                            let id = flight.id
                            let f_no = flight.flight_id
                            let s_time = flight["stime"].split(" ")[1].slice(0, -3)
                            let e_time = flight["etime"].split(" ")[1].slice(0, -3)
                            let price = flight.price
                            let r_time = dateDiff(flight.stime, flight.etime)
                            let f_info = {
                                id, f_no, s_time, e_time, price, r_time, s_city, e_city
                            }
                            console.log(f_info)
                            return (<FlightCard key={flight.id}  {...f_info} onClick={() => {
                                props.history.push({ pathname: '/view/client/order', state: f_info })
                            }} />)
                        }

                    }
                    )
                }
            </div>
        </div>
    )
}

export default connect(
    state => ({ flightlist: state.flightlist })
)(Flightlist)
