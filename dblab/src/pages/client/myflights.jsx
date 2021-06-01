import React, { useState, useEffect } from 'react'
import { Modal, Toast } from 'antd-mobile'
import { goback } from '../../logo/index'
import FlightCard from '../../component/flightcard'
import { connect } from 'react-redux'
import { unpayed_ticket } from '../../redux/actions/unpayed'
import { user_ticket } from '../../redux/actions/userticket'
import { payed_ticket } from '../../redux/actions/payed'
import { dateDiff } from "../../utility/dateFormat"
import axios from 'axios'

function Myflights(props) {
    const [showList, setlist] = useState(0)
    const [unpayed, setunpayed] = useState(props.unpayed)
    const [payed, setpayed] = useState(props.payed)
    const [userticket, setuserticket] = useState(props.userticket)
    useEffect(() => {
        setunpayed(props.unpayed)

    }, [props.unpayed]);
    useEffect(() => {
        setpayed(props.payed)

    }, [props.payed]);
    useEffect(() => {
        setuserticket(props.userticket)
    }, [props.userticket]);
    const movTicket = (t, op) => {

        let title = op === 0 ? "退订" : "支付"
        let msg = `确认${title} ${t.stime.slice(0, 10)} ${t.s_city}——${t.e_city} 的机票吗？`

        Modal.alert(title, msg, [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确认', onPress: async () => {
                    cancelOrder(t)
                    op === 1 && payOrder(t)
                    let opt = { op, tid: t.tid }
                    await axios.post('http://localhost:5000/opticket', opt).then(msg => {
                        console.log(msg)
                    })
                    return new Promise(resolve => {
                        Toast.info("处理中", 1)
                        setTimeout(resolve, 1000);
                    })

                }

            },
        ]);

    }
    const cancelOrder = (t) => {
        let unpayed_t = props.unpayed.filter(v => { return v.tid !== t.tid })
        let user_t = props.userticket.filter(v => { return v.sid !== t.sid })
        props.user_ticket(user_t)
        props.unpayed_ticket(unpayed_t)
    }
    const payOrder = (t) => {
        let payed_t = [t, ...props.payed]
        props.payed_ticket(payed_t)
    }
    return (
        <div className="bg-purple-100 h-screen" >
            <div className="h-16 font-semibold text-gray-600 bg-gradient-to-b from-indigo-300 to-purple-100 flex flex-row justify-center items-center">
                <img src={goback} className="inline-block h-4 w-4 absolute left-4" onClick={() => { window.history.back() }} alt="" />我的订单
            </div>
            <div className=" flex flex-row justify-center items-center " >
                {['待支付', '已支付', '本人订单'].map((text, index) => {
                    return (
                        <div onClick={() => {
                            console.log(props)
                            setlist(index)
                        }} key={text} className={showList === index ? "bg-blue-300 w-full" : "bg-gray-100 w-full"}>
                            <div className="py-1  border  border-gray-300 text-center text-xs font-semibold">
                                {text}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={showList === 0 ? " block" : "hidden"}>
                <div className="flex flex-column justify-center items-center flex-wrap">
                    {unpayed && unpayed.map(t => {
                        let r_time = dateDiff(t.stime, t.etime)
                        return (<div key={t.tid} className="m-1 pt-1 pb-4  rounded-md bg-opacity-80 z-0 bg-gradient-to-b from-yellow-50 to-blue-200 inline-block p-2">
                            <FlightCard  {...t} r_time={r_time} />

                            <div className=" flex flex-row items-center justify-around space-x-4">
                                <span>乘客：{t.fullname}</span>
                                <span>
                                    座位：{t.seat_no}
                                </span>
                                <button className="rounded-full px-2 py-1 bg-red-600 text-gray-100 -mb-1"
                                    onClick={() => {
                                        movTicket(t, 0)
                                    }}
                                >
                                    退订
                                </button>
                                <button className="rounded-full px-2 py-1 bg-green-600 text-gray-100 -mb-1 mr-1"
                                    onClick={() => {
                                        movTicket(t, 1)
                                    }}
                                >
                                    支付
                                </button>
                            </div>
                        </div>

                        )
                    })}
                </div>
            </div>
            <div className={showList === 1 ? " block" : "hidden"}>
                <div className="flex flex-column justify-center items-center flex-wrap">
                    {payed && payed.map(t => {
                        let r_time = dateDiff(t.stime, t.etime)
                        return (<div key={t.sid} className="m-1 pt-1 pb-4  rounded-md bg-opacity-80 z-0 bg-gradient-to-b from-yellow-50 to-blue-200 inline-block p-2">
                            <FlightCard  {...t} r_time={r_time} />

                            <div className=" flex flex-row items-center justify-around space-x-4">
                                <span>乘客：{t.fullname}</span>
                                <span>
                                    座位：{t.seat_no}
                                </span>

                            </div>
                        </div>

                        )
                    })}
                </div>

            </div >
            <div className={showList === 2 ? " block" : "hidden"}>
                <div className="flex flex-column justify-center items-center flex-wrap">
                    {userticket && userticket.map(t => {
                        let r_time = dateDiff(t.stime, t.etime)
                        return (<div key={t.sid} className="m-1 pt-1 pb-4  rounded-md bg-opacity-80 z-0 bg-gradient-to-b from-yellow-50 to-blue-200 inline-block p-2">
                            <FlightCard  {...t} r_time={r_time} />

                            <div className=" flex flex-row items-center justify-around space-x-4">
                                <span>乘客：{t.fullname}</span>
                                <span>
                                    座位：{t.seat_no}
                                </span>

                            </div>
                        </div>

                        )
                    })}
                </div>

            </div >
        </div>
    )
}

export default connect(
    state => ({
        unpayed: state.unpayed,
        payed: state.payed,
        userticket: state.userticket
    }),
    {
        unpayed_ticket,
        payed_ticket,
        user_ticket
    }
)(Myflights)
