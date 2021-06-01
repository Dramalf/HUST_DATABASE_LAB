import {SET_FLIGHTLIST} from '../constant'
const initState = [{}]
export default function FL(preState=initState,action) {
    const { type, data } = action;
    switch (type) {
        case SET_FLIGHTLIST:
            return [...data]
        default:
            return preState
    }
}