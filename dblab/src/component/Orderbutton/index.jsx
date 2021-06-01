import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { emptypinfo } from '../../redux/actions/passengers'
import { passenger_info_integrity } from '../../utility/validate'
import axios from 'axios'
const Orderbutton = (props) => {
    const [open, setOpen] = useState(false);
    const [rsv_fail, setrsv_fail] = useState()
    const [T, setT] = useState(3)
    const cancelButtonRef = useRef();

    function closeModal() {
        setOpen(false);
    }

    function openModal() {
        let passengers = props.passengers.filter(v => {
            return JSON.stringify(v) !== "{}"
        })
        if (!passenger_info_integrity(passengers)) {
            console.log("信息不全")
            return
        }


        let payer_id = localStorage.getItem("token")
        let reservation = { flight_id: props.flight_id, passengers, payer_id: payer_id }
        console.log(reservation)
        axios.post('http://localhost:5000/reserve', reservation)
            .then(res => res.data.msg).then(res => {
                if (0 === res) {
                    setrsv_fail(true)
                }
                else if (1 === res) {
                    setrsv_fail(false)
                }
            }).then(() => {
                props.emptypinfo()
                setOpen(true);
                let t = 2
                let timer = setInterval(() => {
                    setT(t)
                    t--
                    if (t < 0) {
                        props.history.push("/view/search")
                        clearInterval(timer)
                    }
                }, 1000);

            }).catch(err => {
                console.log(err)
            })

    }

    return (
        <>
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="px-4 py-2 text-md font-medium ml-4 rounded-full text-red-100 bg-red-600 bg-opacity-90 hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    预定
        </button>
            </div>
            <Transition show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    static
                    open={open}
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    预定{rsv_fail ? '失败' : '成功'}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {rsv_fail ? "该航班剩余机票无法满足所有预定" : `预定成功，${T}秒后跳转页面`}
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        已知晓
                  </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
export default connect(
    state => ({ passengers: state.passengers }),
    {
        emptypinfo
    }
)(withRouter(Orderbutton))