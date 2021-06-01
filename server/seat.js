const  get_seat_no = function () {
    let SCLM = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    let arr=[]
    for (let i = 0; i < 120; i++) {
        let s_no = i
        let t = parseInt(s_no / 10)
        let row = t >= 10 ? t : '0' + t
        let column = SCLM[s_no % 10]
        arr[i]= row + column
    }

    return arr
}
exports.seatform=get_seat_no()