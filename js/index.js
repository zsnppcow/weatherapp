// 获取所有的城市
let citys,weatherobj;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
        citys = obj.data;
        console.log(citys);
        for(let i in citys){
        	let section = document.createElement('section');
        	let citys_title = document.createElement('h1');
        	citys_title.className = "citys_title";
        	citys_title.innerHTML = i;
        	section.appendChild(citys_title);
        	for(let j in citys[i]){
        		let citys_list = document.createElement('ul');
        		citys_list.className = "citys_list";
        		let li = document.createElement('li');
        		li.innerHTML = j;
        		citys_list.appendChild(li);
        		section.appendChild(citys_list);
        	}
        	$(".citys_box").append(section);
        	
        }
	}
})

$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
	// console.log(remote_ip_info);
    //getFullWeather(remote_ip_info.city);
    getFullWeather("太原");
});

// 获取当前城市所有的天气信息
function getFullWeather(nowcity){
	$(".now_city").html(nowcity);
	// 获取当前城市的天气信息
	$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
	dataType:"jsonp",
	success:function(obj){
        weatherobj = obj.data;
        console.log(weatherobj);
        // 当前的空气质量
        $(".now_air_quality").html(weatherobj.weather.quality_level);
        // 当前的温度
        $(".now_temp_temp").html(weatherobj.weather.current_temperature);
        // 当前天气情况
        $(".now_weather").html(weatherobj.weather.current_condition);
        // 当前的风向
        $(".now_wind").html(weatherobj.weather.wind_direction);
        // 当前的风力
        $(".now_wind_level").html(weatherobj.weather.wind_level+"级");

        // 近期两天的天气情况
        // 今天的温度
        $(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
        $(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
        // 今天的天气情况
        $(".today_weather").html(weatherobj.weather.dat_condition);
        // 今天的天气情况图片
        $(".today_img").attr("src","img/"+weatherobj.weather.dat_weather_icon_id+".png");
        // 明天的温度
        $(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
        $(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature); 
        // 明天的天气情况
        $(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
        // 明天的天气情况图片
        $(".tomorrow_img").attr("src","img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");


        // 未来24小时的天气情况
        let hours_array = weatherobj.weather.hourly_forecast;
        for(let i = 0;i < hours_array.length;i++ ){
        	// 创建元素并添加到页面中
        	let hours_list = document.createElement('li');
            let hours_time = document.createElement('span');
            hours_time.className = 'hours_time';

            let hours_img = document.createElement('img');
            hours_img.className = 'hours_img';

            let hours_temp = document.createElement('span');
            hours_temp.className = 'hours_temp';

            hours_list.appendChild(hours_time);
            hours_list.appendChild(hours_img);
            hours_list.appendChild(hours_temp);

            $('.hours_content').append(hours_list);

            // 当下的时间
            hours_time.innerHTML = hours_array[i].hour+":00";
            // 当下的图片
            hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
            // 当下的温度
            hours_temp.innerHTML = hours_array[i].temperature+"°";    
        }
        

        // 未来15天天气情况
        let recent_array = weatherobj.weather.forecast_list;
        for(let i = 0;i < recent_array.length;i++ ){
        	// 创建元素并添加到页面中
        	let recent_list = document.createElement('li');
            let weeks_date = document.createElement('span');
            weeks_date.className = 'weeks_date';

            let weeks_weather = document.createElement('span');
            weeks_weather.className = 'weeks_weather';

            let weeks_img = document.createElement('img');
            weeks_img.className = 'weeks_img';

            let weeks_temp_max = document.createElement('span');
            weeks_temp_max.className = 'weeks_temp_max';

            let weeks_temp_min = document.createElement('span');
            weeks_temp_min.className = 'weeks_temp_min';

            let weeks_wind = document.createElement('span');
            weeks_wind.className = 'weeks_wind';

            let weeks_wind_level = document.createElement('span');
            weeks_wind_level.className = 'weeks_wind_level';

            recent_list.appendChild(weeks_date);
            recent_list.appendChild(weeks_weather);
            recent_list.appendChild(weeks_img);
            recent_list.appendChild(weeks_temp_max);
            recent_list.appendChild(weeks_temp_min);
            recent_list.appendChild(weeks_wind);
            recent_list.appendChild(weeks_wind_level);

            $('.weeks_content').append(recent_list);

            weeks_date.innerHTML = recent_array[i].date.substring(5,7)+"/"+recent_array[i].date.substring(8);
            weeks_weather.innerHTML = recent_array[i].condition;
            weeks_img.setAttribute('src',"img/"+recent_array[i].weather_icon_id+".png");
            weeks_temp_max.innerHTML = recent_array[i].high_temperature+"°";
            weeks_temp_min.innerHTML = recent_array[i].low_temperature+"°";
            weeks_wind.innerHTML = recent_array[i].wind_direction;
            weeks_wind_level.innerHTML = recent_array[i].wind_level+"级";  
        }
	}
})
}

$(function(){
	$(".now_city").on("click",function(){
		$(".citys").css("display","block");
	})

	//$(".citys_list li").on("click",function(){
        //let son = this.innerHTML;
		//getFullWeather(son);
		//$(".citys").css("display","none");
	//})
	
	//事件委派，动态创建的元素获取不到
	$("body").delegate('.citys_list li','click',function(){
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})

	$("body").delegate('.citys_title','click',function(){
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})
    $(".search").on("focus",function(){
		$(".comfirm").html('确认');
    })
 		
    
    $(".comfirm").on("click",function(){
        if(this.innerText == "取消"){
    		$(".citys").css("display","none");
    	}else if(this.innerText == "确认"){
    		let text = $(".search").val();
    		for(let i in citys){
    			if(text == i){
    				getFullWeather(text);
    				$(".citys").css("display","none");
    				return;
    			}else{
    				for(let j in citys[i]){
    					if(text == j){
    					getFullWeather(text);
    					$(".citys").css("display","none");
    					return;
    				}
    			}
    		}
    	}
    		alert("输入地区有误");
    		$(".search").val("");
    		$("comfirm").html('取消');
    	}
    })
})
//window.onload = function(){

//}