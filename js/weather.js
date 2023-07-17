function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }else{
            console.log(xhr.responseText);
        }
    }
    xhr.send();
}

/**
 * Displays the weather information in a table format.
 *
 * @param {string} result - The weather data in JSON format.
 * @return {void} This function does not return a value.
 */
/* {"status":"1",
"count":"1",
"info":"OK",
"infocode":"10000",
"lives":[{"province":"安徽","city":"怀宁县","adcode":"340822","weather":"小雨","temperature":"25","winddirection":"东北","windpower":"≤3","humidity":"96","reporttime":"2023-07-17 11:01:36","temperature_float":"25.0","humidity_float":"96.0"}]} */
function showWeather(result){
    //输出result的类型
    console.log('result的类型:' +typeof(result));
    result = JSON.parse(result);
    console.log('转换result的类型:' +typeof(result));
    //result = {"status":"1","count":"1","info":"OK","infocode":"10000","lives":[{"province":"安徽","city":"怀宁县","adcode":"340822","weather":"小雨","temperature":"25","winddirection":"东北","windpower":"≤3","humidity":"96","reporttime":"2023-07-17 11:01:36","temperature_float":"25.0","humidity_float":"96.0"}]}
    var table = '<table><tr><th>城市</th><th>日期</th><th>天气</th><th>温度</th><th>湿度</th></tr>';
    //把result的key=lives的value拿出来 赋给lives
    var lives = result['lives'];
    //输出lives的类型
    console.log('lives的类型:' +typeof(lives));
    //读取lives的元素到table中
    var i = 0;
    table += '<tr>';
    table += '<td>'+lives[i].city+'</td>';
    table += '<td>'+lives[i].reporttime+'</td>';
    table += '<td>'+lives[i].weather+'</td>';
    table += '<td>'+lives[i].temperature+'</td>';
    table += '<td>'+lives[i].humidity+'</td>';
    table += '</tr>';
      
    table += '</table>';
    document.getElementById('weather').innerHTML = table;
}


//示例 https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=<用户key>
//示例 https://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=99bdcb5595e9abe7c80c0503cb3ae700
const key = '99bdcb5595e9abe7c80c0503cb3ae700'
var city_code = localStorage.city_code || '110000';
url = 'http://restapi.amap.com/v3/weather/weatherInfo?city='+city_code+'&key='+key
//url = 'http://restapi.amap.com/v3/weather/weatherInfo?city=110101&key=99bdcb5595e9abe7c80c0503cb3ae700'
httpRequest(url, showWeather);