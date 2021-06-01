import { SET_FLIGHTLIST } from '../constant'
import store from '../store'
import axios from 'axios'
export const setFlightlist = flightlist => (
   {type: SET_FLIGHTLIST, data: flightlist}
)
export const searchAsync = (data) => {
   return () => {
      axios.get('http://localhost:5000/searchFlight',
      {
          params: data
         }
      )
      .then(res=>res.data)
         .then(data => {
            if (data.fail === true) {
               store.dispatch(setFlightlist([]))
         }
         else store.dispatch(setFlightlist(data))
      })
   }
}