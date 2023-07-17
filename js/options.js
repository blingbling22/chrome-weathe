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


/*
{"status":"1",
"info":"OK",
"infocode":"10000",
"count":"1",
"geocodes":[
    {"formatted_address":"上海市",
    "country":"中国",
    "province":"上海市",
    "citycode":"021",
    "city":"上海市",
    "district":[],
    "township":[],
    "neighborhood":{"name":[],"type":[]},
    "building":{"name":[],"type":[]},
    "adcode":"310000",
    "street":[],
    "number":[],
    "location":"121.473701,31.230416",
    "level":"省"}
    ]
}
*/
function save_callback(result){//将收到的数据保存到localStorage中
    result = JSON.parse(result);
    geocodes = result['geocodes'][0];
    localStorage.city_name = geocodes['province']+geocodes['city'];
    localStorage.city_code = geocodes['adcode'];
    
    console.log("city_code:"+geocodes['adcode']);
}
function city_to_code(city){//把城市名称转换成城市编码
    return_type = 'JSON'
    const key = '99bdcb5595e9abe7c80c0503cb3ae700'
    url  = 'https://restapi.amap.com/v3/geocode/geo?address='+city+'&output='+return_type+'&key='+key
    httpRequest(url, save_callback);

}


var city = localStorage.city_name || '北京';
document.getElementById('city').innerHTML = city;//初始值
document.getElementById('save').onclick = function(){
    sub_value = document.getElementById('city').value;
    city_to_code(sub_value);
    alert('保存成功。');
}


//httpRequest(url, save_city_code)

