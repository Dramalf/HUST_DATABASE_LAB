import { SET_PASSENGER,EMPTY_PASSENGER } from '../constant'
const initState=[{},{},{}]
export default function pinfo(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_PASSENGER: {
            let newState = [...preState]
            newState[Number(data.pnum)]= data.value;
            return newState;
        }
        case EMPTY_PASSENGER: {
            return [{},{},{}]
        }
        default:
            return preState
    }
}