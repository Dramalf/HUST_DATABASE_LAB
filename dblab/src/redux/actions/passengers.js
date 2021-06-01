import { SET_PASSENGER,EMPTY_PASSENGER} from '../constant'
export const setpinfo = pinfo => (
    {type: SET_PASSENGER, data: pinfo}
)
export const emptypinfo = pinfo => (
    {type: EMPTY_PASSENGER, data: pinfo}
)