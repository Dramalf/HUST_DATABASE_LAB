import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setpinfo } from '../../redux/actions/passengers'
function PassengerInfoCard(props) {
    const [passenger, setpassenger] = useState({})
    const updatePassenger = (e) => {
        let timer
        return function (e) {
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
                const { value } = e.target
                const infotype = e.target.attributes.role.nodeValue
                setpassenger(p => {
                    let np = { ...p }
                    np[infotype] = value
                    return np
                })
            }, 1000);
        }

    }
    useEffect(() => {
        console.log("**", passenger)
        props.setpinfo({ pnum: props.pnum, value: passenger })
        return () => {

        };
    }, [passenger]);
    return (
        <div className="mt-2 py-3 px-8 bg-blue-200 rounded-lg flex flex-col justify-start" onChange={updatePassenger()}>
            <input role="pname" type="text"
                placeholder="姓名"
                className="mb-2 p-1 rounded-sm text-sm" />
            <input role="pid" type="text"
                placeholder="身份证" className=" mb-2 p-1 rounded-sm text-sm" />
            <input role="pcontact" type="text"
                placeholder="手机号"
                className="p-1 rounded-sm text-sm" />
        </div>
    )
}

export default connect(
    state => ({ passenger: state.passengers }),
    {
        setpinfo
    }
)(PassengerInfoCard)
