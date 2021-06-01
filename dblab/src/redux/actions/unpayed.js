import { UNPAYED_TICKET} from '../constant'

export const unpayed_ticket = t => (
    {type: UNPAYED_TICKET, data: t}
)