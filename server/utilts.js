const { seatform }=require('./seat')
exports.get_seat_no = function (c_count, seat_reserved) {
    let seat_no = []
    for (let i = 0; seat_no.length!==c_count; i++){
        let s_no = seatform[i]
        if (-1 === seat_reserved.indexOf(s_no)) {
            seat_no.push(s_no)
        }
            
    }
    return seat_no
}