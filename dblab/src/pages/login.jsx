import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { setToken } from '../utility/auth'
import { name, contact } from '../logo/index.js'
function Login(props) {
    const handleSubmit = () => {
        let inputs = [...document.getElementsByTagName('input')].slice(0, 3)
        let info = inputs.map(input => {
            return input.value
        })

        let user = {
            fullname: info[0],
            idno: info[1],
            telephone: info[2]
        }
        if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(user.telephone)) || "" === user.fullname || user.idno.length !== 18) {
            Toast.info("信息不完整或格式不正确", 0.7)
        }
        else {
            axios.post(`http://localhost:5000/login`, {
                ...user
            }).then(

                res => {
                    setToken(res.data.u_id)
                    props.history.push(res.data.nextUrl)
                }
            ).catch(err => {
                console.log(err)
            })
        }
    }
    return (
        <div className=" w-screen h-screen pt-1/5 text-blue-800 bg-indigo-100 sm:pt-1/10  ">
            <div className="relative">
                <div className='flex flex-row justify-center items-center bg-gradient-to-b from-indigo-100 to-indigo-200 '>
                    <div className=" font-bold text-6xl text-center mb-2">山杉航空</div>
                </div>
                <div className="relative  w-full h-28 pt-3 text-center text-gray-500 text-3xl -z-50  bg-indigo-200 shadow-sm" style={{ borderRadius: '0 0 50% 50%', textShadow: '0 0 8px #747acc' }}>竭诚服务，平安出行</div>
            </div>
            <div className="relative px-4 sm:p-10 py-3 font-semibold  rounded-3xl flex items-center flex-col justify-center z-10 sm:pb-10">
                <div className="my-1   sm:inline-block sm:pr-5 relative">
                    <p className=" text-sm">
                        <i className="text-indigo-600 mx-1">
                            <img src={name} className="icon inline-block h-5 w-5 fill-current" alt="" />
                        </i>
                            姓名
                            </p>
                    <input type="text" name="name" className=" m-1 p-2 border-b-2 outline-none rounded-md shadow-sm" />
                </div>
                <div className="my-1   sm:inline-block sm:pr-5 relative">
                    <p className=" text-sm">
                        <i className="text-indigo-600 mx-1">
                            <img src={name} className="icon inline-block h-5 w-5 fill-current" alt="" />
                        </i>
                            身份证号码
                            </p>
                    <input type="text" name="name" className=" m-1 p-2 border-b-2 outline-none rounded-md shadow-sm" />
                </div>
                <div className="my-1   sm:inline-block sm:pr-5 relative">
                    <p className=" text-sm">
                        <i className="text-indigo-600 mx-1">
                            <img src={contact} className="icon inline-block h-4 w-4 mb-1 fill-current" alt="" />
                        </i>
                            手机号码
                            </p>
                    <input type="text" name="contact" className=" m-1 p-2 border-b-2 outline-none rounded-md shadow-sm" />

                </div>
                <div className="text-center mt-2 sm:mt-6 ">
                    <input type="submit" value="登录" className="px-10 py-2 bg-indigo-500 font-medium text-gray-100 rounded-full" onClick={handleSubmit} />
                </div>
            </div>

        </div >



    )
}

export default withRouter(Login)
