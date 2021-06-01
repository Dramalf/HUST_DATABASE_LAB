export function passenger_info_integrity(plist) {
    console.log("check", plist)
    if (plist.length === 0)
        return false
    for (let i = 0; i < plist.length; i++){
        let pinfo = plist[i]
        let { pname, pcontact, pid } = pinfo
        if ((!pname) || (!pcontact || pcontact.length !== 11) || (!pid || pid.length !== 18)) {
            console.log("no!")
            return false
        }    
    }
    return true
}