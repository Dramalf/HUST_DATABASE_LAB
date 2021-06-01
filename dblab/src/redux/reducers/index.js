import {combineReducers } from 'redux'
import flightlist from './flightlist'
import passengers from './passengers'
import unpayed from './unpayed'
import payed from './payed'
import userticket from './userticket'
export default combineReducers({
    flightlist,
    passengers,
    unpayed,
    payed,
    userticket
})

 