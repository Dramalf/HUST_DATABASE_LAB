import { PAYED_TICKET} from '../constant'

export const payed_ticket = t => (
    {type: PAYED_TICKET, data: t}
)