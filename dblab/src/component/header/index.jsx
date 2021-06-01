import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { avator, unfold } from '../../logo/index'
import { clearToken, getToken } from '../../utility/auth'
import axios from 'axios'
import { connect } from 'react-redux'
import { unpayed_ticket } from '../../redux/actions/unpayed'
import { payed_ticket } from '../../redux/actions/payed'
import { user_ticket } from '../../redux/actions/userticket'
function Header(props) {
    const [isOpen, setisOpen] = useState(false)
    const handleLogout = () => {
        clearToken();
        props.history.push("/login")
    }
    const handleMyflights = () => {
        let c_id = getToken()
        axios.get("http://localhost:5000/myorder", {
            params: { c_id }
        }).then(res => {
            console.log(res.data.payed)
            props.unpayed_ticket(res.data.unpayed)
            props.payed_ticket(res.data.payed)
            props.user_ticket(res.data.userticket)
        }).then(() => {
            console.log(props.payed)
            props.history.push('/view/client/myflights')
        })

    }
    return (
        <div className=" relative p-2 bg-gradient-to-b from-indigo-300 to-purple-100 border-b-2">
            <div className="inline-block h-8 w-8 rounded-full sm:ml-1/4 ">
                <img src={avator} className="w-full h-full overflow-hidden " alt="#" />
            </div>
            <div className="h-8 w-8 float-right sm:hidden" onClick={() => { setisOpen(!isOpen) }}>
                <img src={unfold} className="w-full h-full overflow-hidden " alt="#" />
            </div>
            <div className={`absolute z-50 right-0 top-12 rounded-xl py-2 bg-white font-medium text-pink-600 text-center shadow-lg  ${isOpen ? 'block' : 'hidden'} transition delay-150 duration-300 ease-in-out sm:float-right sm:inline-flex sm:font-bold  sm:text-gray-900 sm:shadow-none sm:top-0 sm:bg-transparent sm:mr-1/4`}>
                <div onClick={handleLogout} className="block px-4 py-2  border-b-2 border-indigo-100 sm:border-none ">退出</div>
                <div onClick={handleMyflights} className="block px-4 py-2 animate-none sm:hover:animate-pulse ">我的订单</div>
            </div>

        </div>
    )

}

export default connect(
    state => ({}),
    {
        unpayed_ticket,
        payed_ticket,
        user_ticket
    }
)(withRouter(Header))
