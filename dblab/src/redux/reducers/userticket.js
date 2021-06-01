import {USER_TICKET} from '../constant'
const initState = []
export default function userticket(preState=initState,action) {
    const { type, data } = action;
    switch (type) {
        case USER_TICKET:
            return [...data]
        default:
            return preState
    }
}