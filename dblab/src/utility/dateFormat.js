export function transformationTime(date) {
			    
			    var y = date.getFullYear();
			    var m = date.getMonth() + 1;
			    m = m < 10 ? ('0' + m) : m;
			    var d = date.getDate();
			    d = d < 10 ? ('0' + d) : d;
			    var h = date.getHours();
			    h = h < 10 ? ('0' + h) : h;
			    var minute = date.getMinutes();
			    var second = date.getSeconds();
			    minute = minute < 10 ? ('0' + minute) : minute;
			    second = second < 10 ? ('0' + second) : second;
			    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
   
export function dateDiff(s,e) {
	var st = new Date(s); 
	var et = new Date(e); 
	var difftime = (et - st)/1000; //计算时间差,并把毫秒转换成秒
	
	var days = parseInt(difftime/86400); // 天  24*60*60*1000 
   	var hours = parseInt(difftime/3600)-24*days;    // 小时 60*60 总小时数-过去的小时数=现在的小时数 
   	var minutes = parseInt(difftime%3600/60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
return days!==0?`${days}d`:''+hours+'h'+minutes+'m'
	
}