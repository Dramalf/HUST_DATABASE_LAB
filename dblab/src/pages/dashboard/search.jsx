import React from 'react'

import FlightInfoPicker from '../../component/flightPicker'
import Header from '../../component/header'
function Search() {
    return (
        <div className="bg-purple-100 h-screen">
            <Header />
            <FlightInfoPicker />
        </div>
    )
}

export default Search
