import {UNPAYED_TICKET} from '../constant'
const initState = []
export default function unpayed(preState=initState,action) {
    const { type, data } = action;
    switch (type) {
        case UNPAYED_TICKET:
            return [...data]
        default:
            return preState
    }
}