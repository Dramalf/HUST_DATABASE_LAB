import {PAYED_TICKET} from '../constant'
const initState = []
export default function payed(preState=initState,action) {
    const { type, data } = action;
    switch (type) {
        case PAYED_TICKET:
            return [...data]||[]
        default:
            return preState
    }
}