const { nanoid } = require("nanoid")
const { db } = require('./db')
const location_name_set = "北京、上海、上海、广州、深圳、烟台、济南、青岛、大连、天津 、郑州、哈尔滨、沈阳、厦门、西安、长春、福州、南京、重庆、乌鲁木齐、海口、南昌、桂林、昆明、宁波、珠海、长沙、成都、杭州、台湾".split('、')
let arr=[]
for(let i=0;i<location_name_set.length;i++){
    arr.push([(i+1).toString(),location_name_set[i]])
}
console.log(location_name_set)
const sql = `insert into location (id,location_name) values ?`
db(sql, [arr]).catch(err => {
    console.log("创建LOCATION ERR")
})
