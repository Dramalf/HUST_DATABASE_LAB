const express = require('express');
const app = express()

app.post('/view/search',(request,response)=>{
    console.log(request)
})
app.listen(5000, (err) => {
	if(!err) console.log('服务器1启动成功了');
})