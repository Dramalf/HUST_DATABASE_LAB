import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Calendar, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { takeoff, arrive, col_exchange, row_exchange, calendar } from '../../logo/index'
import { setFlightlist, searchAsync } from '../../redux/actions/flightlist'
import { transformationTime } from "../../utility/dateFormat"
import axios from 'axios'
const now = new Date();
const Date2CN = {
    Jan: '1',
    Feb: '2',
    Mar: '3',
    Apr: '4',
    May: '5',
    Jun: '6',
    Jul: '7',
    Aug: '8',
    Sep: '9',
    Oct: '10',
    Nov: '11',
    Dec: '12',
    Mon: '周一',
    Tue: '周二',
    Wed: '周三',
    Thu: '周四',
    Fri: '周五',
    Sat: '周六',
    Sun: '周日',

}
function FlightInfoPicker(props) {
    const [show, setshow] = useState(false);
    const [flightdate, setflightdate] = useState('');
    const [formatDate, setformatDate] = useState('')
    const onCancel = () => {
        console.log("cancel chose")
        setshow(false)
    }
    const onConfirm = (date) => {
        let s_date = transformationTime(date)
        setformatDate(s_date)
        date = date.toString().split(' ', 4)
        let chosedDate = `${date[3]}年 ${Date2CN[date[1]]}月${date[2]}日 ${Date2CN[date[0]]}`
        setflightdate(chosedDate)
        setshow(false)
    }
    const handleSearch = () => {
        let inputs = [...document.getElementsByTagName('input')].slice(0, 3)
        let searchInfo = inputs.map(input => {
            return input.value
        })
        if (searchInfo[0] | searchInfo[1] | searchInfo[2] === '') {
            Toast.info("请输入完整检索信息", 1)
        }
        else {
            let searchFlight = {
                fromcity: searchInfo[0],
                tocity: searchInfo[1],
                s_date: formatDate
            }
            localStorage.setItem("s_city", searchInfo[0]);
            localStorage.setItem("e_city", searchInfo[1]);
            localStorage.setItem("f_date", flightdate);
            console.log(searchFlight)
            axios.get('http://localhost:5000/searchFlight', {
                params: searchFlight
            }).then(res => res.data)
                .then(data => {
                    if (data.fail === true) {
                        props.setFlightlist([])
                    } else props.setFlightlist(data)
                })
                .then(() => {
                    props.history.push('/view/list')
                }).catch(err => {
                    console.log(err)
                })
        }

    }



    return (
        <div className="min-h-screen bg-purple-100 py-6 flex flex-col justify-start sm:py-12 mt-10">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-indigo-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl overflow-hidden"></div>
                <div id='searchinfo' className="relative px-4 shadow-lg sm:rounded-3xl sm:p-20 py-3 border bg-gray-50 rounded-3xl flex items-center flex-col justify-center z-10 sm:pb-10">
                    <div >
                        <div className="my-2 sm:inline-block sm:pr-5 relative">
                            <p className="text-sm">
                                <i className="text-indigo-600">
                                    <img src={takeoff} className="icon inline-block h-5 w-5 fill-current" alt="" />
                                </i>
                            出发城市
                            </p>
                            <input type="text" name="fromcity" className=" bg-gray-50 py-1 border-b-2 outline-none" />
                            <i className="text-blue-400 absolute right-0 -bottom-2 sm:bottom-6 hover:animate-spin-once">
                                <img src={col_exchange} className="icon h-5 w-5 fill-current block   sm:hidden" alt="" />
                                <img src={row_exchange} className="icon h-6 w-6 fill-current hidden sm:block" alt="" />
                            </i>
                        </div>
                        <div className="my-2 sm:inline-block sm:ml-2">
                            <p className="text-sm">
                                <i className="text-indigo-400">
                                    <img src={arrive} className="icon inline-block h-5 w-5 fill-current" alt="" />
                                </i>
                                 到达城市
                            </p>
                            <input type="text" name="tocity" className="py-1 border-b-2 outline-none" />
                        </div>
                        <div className="my-2">
                            <p className="text-sm">
                                <i className="text-indigo-400">
                                    <img src={calendar} className="icon inline-block h-5 w-5 fill-current" alt="" />
                                </i>
                                    出发日期
                            </p>
                            <input type="text" name="flightdate" value={flightdate} onClick={() => { setshow(true); console.log(show) }} className=" py-1 border-b-2 outline-none" />
                        </div>
                        <div className="text-center sm:mt-6">
                            <input type="submit" value="提交" className="px-10 py-1 bg-red-500 font-medium text-gray-100 rounded-full" onClick={handleSearch} />
                            <Calendar
                                visible={show}
                                type='one'
                                onCancel={onCancel}
                                onConfirm={onConfirm}
                                defaultDate={now}
                                minDate={new Date(+now)}
                                maxDate={new Date(+now + 31536000000)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default connect(
    state => ({ flightlist: state.flightlist }),
    {
        searchAsync,
        setFlightlist
    }
)(withRouter(FlightInfoPicker))
