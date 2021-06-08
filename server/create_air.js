const {nanoid}=require("nanoid")
const {db}=require("./db")
const capacity_set=[80,100,120,180,200,300,400]
const price_set=[500,600,800,1000,1300,1500,1800,2000]
let id_set=[]
function getRandom(length){
    return Math.round(Math.random()*length)
}
function randomDate(start,end,startHour,endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}
function randomEndDate(start,end,startHour,endHour,gap) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + gap+Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}
for(let i=1;i<=30;i++){
    id_set.push(i.toString())
}
let num_set=[]
for(let i=0;i<10;i++){
    num_set.push(i.toString())
}
let arr=[]
for(let t=0;t<100;t++){
    let flight_id="CA"+num_set[getRandom(9)]+num_set[getRandom(9)]+num_set[getRandom(9)]+num_set[getRandom(9)]
    s_loc_id=id_set[getRandom(29)]
    new_id_set=id_set.filter(item=>{
        return item!==s_loc_id
    })
    e_loc_id=new_id_set[getRandom(28)]
    start_date=new Date('2021-6-1')
    end_date=new Date('2021-6-30')
    s_time=randomDate(start_date,end_date,0,23)
    s_date=new Date(`${s_time.getFullYear()}-${s_time.getMonth()+1}-${s_time.getDate()}`)
    e_date=new Date(`${s_time.getFullYear()}-${s_time.getMonth()+1}-${s_time.getDate()+1}`)
    console.log(e_date)
    e_time=randomEndDate(s_date,e_date,s_time.getHours(),s_time.getHours()+2,1)
    capacity=capacity_set[getRandom(capacity_set.length-1)]
    price=price_set[getRandom(7)]
    console.log([nanoid(10),flight_id,capacity,s_time,e_time,s_loc_id,e_loc_id,price]) 
    arr.push([nanoid(10),flight_id,capacity,s_time,e_time,s_loc_id,e_loc_id,price])   
}
let sql='insert into airline_info (id,flight_id,capacity,s_time,e_time,s_loc_id,e_loc_id,price) values ?'
db(sql, [arr]).catch(err => {
    console.log("创建 AIRLINE_INFO ERR")
})
