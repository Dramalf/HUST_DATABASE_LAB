const express = require('express');
const app = express()
const { nanoid } = require('nanoid')
var bodyParser = require('body-parser')
const { db } = require('./db');
const {get_seat_no} =require('./utilts')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header ('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  console.log(nanoid(10))

app.get('/myorder', (req, res) => {
    let {c_id}=req.query
    console.log("查询用户订单", c_id)
    let t1=db("select ticket_order.id as tid,seat_id as sid,fullname, flight_id,DATE_FORMAT(s_time,'%H:%i') as s_time,DATE_FORMAT(e_time,'%H:%i') as e_time,LA.location_name s_city ,LB.location_name e_city, seat_no,price,DATE_FORMAT(s_time,'%Y-%m-%d %H:%i:%S') as stime,DATE_FORMAT(e_time,'%Y-%m-%d %H:%i:%S') as etime from person,ticket_order,location LA,location LB,airline_info,seat where ticket_order.payer_id=? and person.id=seat.p_id and seat.id=ticket_order.seat_id and airline_info.id=seat.a_id and s_loc_id=LA.id and e_loc_id=LB.id and status=0", [c_id]).then(dbres => {
        console.log("该用户未支付机票", dbres)
        return dbres
    }).catch(err => {
        console.log("/myorder查询1出错")
    })
    let t2=db("select ticket_order.id as tid,seat_id as sid,fullname, flight_id,DATE_FORMAT(s_time,'%H:%i') as s_time,DATE_FORMAT(e_time,'%H:%i') as e_time,LA.location_name s_city ,LB.location_name e_city, seat_no,price,DATE_FORMAT(s_time,'%Y-%m-%d %H:%i:%S') as stime,DATE_FORMAT(e_time,'%Y-%m-%d %H:%i:%S') as etime from person,ticket_order,location LA,location LB,airline_info,seat where ticket_order.payer_id=? and person.id=seat.p_id and seat.id=ticket_order.seat_id and airline_info.id=seat.a_id and s_loc_id=LA.id and e_loc_id=LB.id and status=1", [c_id]).then(dbres => {
        console.log("该用户已经支付机票", dbres)
        return dbres
    }).catch(err => {
        console.log("/myorder查询2出错")
    })
    let t3=db("select seat.id as sid,fullname,flight_id,DATE_FORMAT(s_time,'%H:%i') as s_time,DATE_FORMAT(e_time,'%H:%i') as e_time,LA.location_name s_city ,LB.location_name e_city, seat_no ,price,DATE_FORMAT(s_time,'%Y-%m-%d %H:%i:%S') as stime,DATE_FORMAT(e_time,'%Y-%m-%d %H:%i:%S') as etime from person, airline_info,location LA,location LB,seat where person.id=seat.p_id and seat.p_id=? and airline_info.id=seat.a_id and s_loc_id=LA.id and e_loc_id=LB.id", [c_id]).then(dbres => {
        console.log("本人机票", dbres)
        return dbres
    }).catch(err => {
        console.log("/myorder查询3出错")
    })
    Promise.all([t1, t2, t3]).then(t => {
        
        res.json({unpayed:t[0],payed:t[1],userticket:t[2]})
    })
})

app.get('/searchFlight', (req, res) => {
    console.log('查询航班')
    const s_city = req.query.fromcity;
    const e_city = req.query.tocity;
    const s_time = req.query.s_date;
    let s_date = s_time.split(" ", 1)[0]
    let sql = 'select * from location where location_name =?'
    let sqlParam 
    Promise.all([
        db(sql,s_city).then(dbres=>dbres[0]),
        db(sql,e_city).then(dbres=>dbres[0])
    ]).then(async result => {
        console.log("出发与到达城市", result)
        let s_loc_id = result[0].id
        let e_loc_id = result[1].id
        sql = "select id,flight_id,capacity,DATE_FORMAT(s_time,'%Y-%m-%d %H:%i:%S') as stime,DATE_FORMAT(e_time,'%Y-%m-%d %H:%i:%S') as etime, price from airline_info where s_loc_id=? and e_loc_id=? and DATE_FORMAT(s_time,'%Y-%m-%d')=?"
        sqlParam = [s_loc_id, e_loc_id,s_date]
        return await db(sql,sqlParam)
    }).then((dbres) => {
        console.log("检索到航班", dbres)
        res.json(dbres)
    })  
        .catch(error => {
            console.log(error)
            res.json({fail:true})
    }) 
}) 
// 预定机票
app.post('/reserve', async(req, res) => {
    console.log(req.body)
    let { flight_id, passengers, payer_id } = req.body
    let pid = passengers.map(v => {
        return v.pid
    })
    let persons = passengers.map(v => {
        return [nanoid(10),v.pid,v.pname,v.pcontact]
    })
    let clients=await db("insert ignore into person values ?", [persons])
        .catch(err => {
        console.log("err in insert person at '\\reserve'")
        })
        .then(async () => {
          return await  db("select * from person where idno in (?)", [pid])
        })
    let flight_capacity =await db("select capacity from airline_info where id=?", [flight_id]).then(result=>result[0].capacity)
    let seat_reserved = await db("select seat_no  from seat where a_id=?", [flight_id]).then(dbres => {
        return dbres.map(v=>v.seat_no)
    })
    if (clients.length > flight_capacity - seat_reserved.lenght) {
        res.json({ msg: 0 })
    } else {
        let seat_no = get_seat_no(clients.length, seat_reserved)
        let seats = []
        let tickets = []
        let seat_id
        for (let i = 0; i < clients.length; i++){
            seat_id = nanoid(10)
            tickets[i] =[nanoid(10), seat_id,payer_id,0]
            seats[i]=[seat_id,flight_id,clients[i].id,seat_no[i]]
        }
        
        db("insert into seat values ?", [seats])
            .then(dbres => {
                db("insert into ticket_order values ?",[tickets])
                console.log(dbres)
                res.json({msg:1})
        }).catch(err => {
            console.log("\/reserve insert seat 作出现一点点问题")
        }) 
    } 
        
})
app.post('/opticket', async (req, res) => {
    const { op, tid } = req.body
    if (op === 0) {
        db('delete from ticket_order where id=?',[tid]).catch(err => {
            console.log("退订出现问题")
        })
    }
    else {
        db('update ticket_order set status=1 where id=?',[tid]).catch(err => {
            console.log("支付出现问题")
        })
    }
    res.json()
})


app.post('/login', (req, res) => {

    const { fullname, idno,telephone } = req.body
    if ('admin' === fullname) {
        res.json({ ret_code: 0, ret_msg: '管理员上线',u_id:'admin999', nextUrl:'/admin' });
    } else {
        let sql = "select * from person where fullname=? and idno=? and telephone=?  "
        let sqlParam = [fullname,idno, telephone]
        db(sql, sqlParam).then(dbres => dbres[0])
            .then(dbres => {
            console.log(dbres)
            if (!dbres) {
                sql = "insert into person set ?"
                sqlParam = {id : nanoid(10),idno,fullname,telephone }
                console.log(sqlParam)
                db(sql, sqlParam).then(() => {
                    res.json({
                        ret_code: 1, ret_msg: '新注册用户',
                        u_id:dbres.id,
                        nextUrl: '/view'
                    });
                }).catch(err => {
                    console.log("数据库操作出现一点点问题")
                })
            } else {
                res.json({ ret_code: 1, ret_msg: '登陆成功',u_id:dbres.id, nextUrl:'/view' });
            }
        }).catch(err => {
            console.log("数据库操作 \/login 出现一点点问题")
        })
    }
})

app.listen(5000,(err)=>{
	if(!err) console.log('服务器启动');
})