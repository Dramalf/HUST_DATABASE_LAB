const {nanoid}=require("nanoid")
const {db}=require("./db")
const fullname_first=["赵","钱","孙","李","周","吴","郑","王","冯","陈","褚","卫","蒋","沈","韩","杨","朱","秦","尤",
"许","何","吕","施","张","孔","曹","严","华","金","魏","陶","姜","戚","谢","邹","喻","柏","水",
"窦","章","云","苏","潘","葛","奚","范","彭","郎","鲁","韦","昌","马","苗","凤","花","方","俞",
"任","袁","柳","酆","鲍","史","唐","费","廉","岑","薛","雷","贺","倪","汤","滕","殷","罗","毕",
"郝","邬","安","常","乐","于","时","傅","皮","卞","齐","康","伍","余","元","卜","顾","孟","平",
"黄","和","穆","萧","尹","姚","邵","湛","汪","祁","毛","禹","狄","米","贝","明","臧","计","伏",
"成","戴","谈","宋","茅","庞","熊","纪","舒","屈","项","祝","董","梁","杜","阮","蓝","闵","席",
"季","麻","强","贾","路","娄","危","江","童","颜","郭","梅","盛","林","刁","钟","徐","邱","骆",
"高","夏","蔡","田","樊","胡","凌","霍","虞","万","支","柯","昝","管","卢","莫","经","房","裘",
"缪","干","解","应","宗","丁","宣","贲","邓","郁","单","杭","洪","包","诸","左","石","崔","吉",
"钮","龚","程","嵇","邢","滑","裴","陆","荣","翁","荀","羊","于","惠","甄","曲","家","封","芮",
"羿","储","靳","汲","邴","糜","松","井","段","富","巫","乌","焦","巴","弓","牧","隗","山","谷",
"车","侯","宓","蓬","全","郗","班","仰","秋","仲","伊","宫","宁","仇","栾","暴","甘","钭","厉",
"戎","祖","武","符","刘","景","詹","束","龙","叶","幸","司","韶","郜","黎","蓟","溥","印","宿",
"白","怀","蒲","邰","从","鄂","索","咸","籍","赖","卓","蔺","屠","蒙","池","乔","阴","郁","胥",
"能","苍","双","闻","莘","党","翟","谭","贡","劳","逄","姬","申","扶","堵","冉","宰","郦","雍",
"却","璩","桑","桂","濮","牛","寿","通","边","扈","燕","冀","浦","尚","农","温","别","庄","晏",
"柴","瞿","阎","充","慕","连","茹","习","宦","艾","鱼","容","向","古","易","慎","戈","廖","庾",
"终","暨","居","衡","步","都","耿","满","弘","匡","国","文","寇","广","禄","阙","东","欧","殳",
"沃","利","蔚","越","夔","隆","师","巩","厍","聂","晁","勾","敖","融","冷","訾","辛","阚","那",
"简","饶","空","曾","毋","沙","乜","养","鞠","须","丰","巢","关","蒯","相","查","后","荆","红",
"游","郏","竺","权","逯","盖","益","桓","公","仉","督","岳","帅","缑","亢","况","郈","有","琴",
"归","海","晋","楚","闫","法","汝","鄢","涂","钦","商","牟","佘","佴","伯","赏","墨","哈","谯",
"篁","年","爱","阳","佟","言","福","南","火","铁","迟","漆","官","冼","真","展","繁","檀","祭",
"密","敬","揭","舜","楼","疏","冒","浑","挚","胶","随","高","皋","原","种","练","弥","仓","眭",
"蹇","覃","阿","门","恽","来","綦","召","仪","风","介","巨","木","京","狐","郇","虎","枚","抗",
"达","杞","苌","折","麦","庆","过","竹","端","鲜","皇","亓","老","是","秘","畅","邝","还","宾",
"闾","辜","纵","侴"]
const fullname_second_men_str="秀、娟、英、华、慧、巧、美、娜、静、淑、惠、珠、翠、雅、芝、玉、萍、红、娥、玲、芬、芳、燕、彩、春、菊、兰、凤、洁、梅、琳、素、云、莲、真、环、雪、荣、爱、妹、霞、香、月、莺、媛、艳、瑞、凡、佳、嘉、琼、勤、珍、贞、莉、桂、娣、叶、璧、璐、娅、琦、晶、妍、茜、秋、珊、莎、锦、黛、青、倩、婷、姣、婉、娴、瑾、颖、露、瑶、怡、婵、雁、蓓、纨、仪、荷、丹、蓉、眉、君、琴、蕊、薇、菁、梦、岚、苑、筠、柔、竹、霭、凝、晓、欢、霄、枫、芸、菲、寒、欣、滢、、伊、亚、宜、可、姬、舒、影、荔、枝、思、丽、秀、飘、育、、馥、琦、晶、妍、茜、秋、珊、莎、锦、黛、青、倩、婷、宁、、蓓、纨、苑、婕、馨、瑗、琰、韵、融、园、艺、咏、卿、聪、、澜、纯、毓、悦、昭、冰、爽、琬、茗、羽、希、"
const fullname_second_men=fullname_second_men_str.split('、')
const first_length=fullname_first.length-1
const second_length=fullname_second_men.length-1
const province_set=[11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65]
let city_set=[]
for(let i=1;i<10;i++){
     city_set.push('0'+i.toString())
}
let month_set=[]
for(let i=1;i<=12;i++){
     month_set.push(i.toString().length==1?('0'+i.toString()):i.toString())
}
let year_set=[]
for(let i=1950;i<2005;i++){
     year_set.push(i.toString())
}
let day_set=[]
for(let i=1;i<=28;i++){
     day_set.push(i.toString().length==1?('0'+i.toString()):i.toString())
}
let police_set=[]
for(let i=1;i<20;i++){
    police_set.push(i.toString().length==1?('0'+i.toString()):i.toString())
}
let odd_set=['2','4','6','8','0']
let char_set=['1','2','3','4','5','6','7','8','9','X']
let second_num_set=['3','5',"7"]
let other_num_set=[]
for(let i=0;i<10;i++){
    other_num_set.push(i.toString())
}
const province_length=province_set.length-1
function getRandom(length){
    return Math.round(Math.random()*length)
}
let arr=[]
for (let t=0;t<300;t++){
    let two_letter_name=fullname_first[getRandom(first_length)]+fullname_second_men[getRandom(second_length)]
    let three_letter_name=fullname_first[getRandom(first_length)]+fullname_second_men[getRandom(second_length)]+fullname_second_men[getRandom(second_length)]
    let name_set=[two_letter_name,three_letter_name]
    let fullname=name_set[getRandom(1)]
    let province=province_set[getRandom(province_length)]
    let city=city_set[getRandom(8)]
    let city2=city_set[getRandom(8)]
    let year=year_set[getRandom(54)]
    let month=month_set[getRandom(11)]
    let day=day_set[getRandom(27)]
    let police_no=police_set[getRandom(18)]
    let odd=odd_set[getRandom(4)]
    let char=char_set[getRandom(9)]
    let idno=province+city+city2+year+month+day+police_no+odd+char
    let telephone='1'+second_num_set[getRandom(2)]
    for (let j=1;j<10;j++){
        telephone+=other_num_set[getRandom(9)]
    }
    let new_set=[nanoid(10).replace(/'/g,'"'),fullname.replace(/'/g,'"'),telephone.replace(/'/g,'"'),idno.replace(/'/g,'"')]
    console.log(new_set)
    arr.push(new_set)    
}
console.log(arr)
var sql=`insert into person (id,fullname,telephone,idno) values ?`
db(sql,[arr]).catch(err=>{console.log("创建PERSON ERR")})
