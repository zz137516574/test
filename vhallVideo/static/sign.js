console.log(666);

export default function sign(){
        var timestamp = Date.parse(new Date());
        var secret_key = "12ba730215da33922dad3e8d8f279759";
        var params = {"roomid":"167205018","account":"lixiaoxiao","email":"2991356504@qq.com","username":"v23426451","app_key":'8e620fe4bf48b7287ef235cb64240de4',"signedat":timestamp}
        var newPrams = objKeySort(params);
        var newParamas = newPrams;
        var newArray= [];
        for(var item in newParamas) {
                newParamas[item] = item+newParamas[item];
                newArray.push(newParamas[item]);
        }
        var newData = newArray.join('');
        var newsData = secret_key+newData+secret_key;
        function objKeySort(arys) {
                //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
                var newkey = Object.keys(arys).sort();
                //console.log('newkey='+newkey);
                var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
                for(var i = 0; i < newkey.length; i++) {
                        //遍历newkey数组
                        newObj[newkey[i]] = arys[newkey[i]];
                        //向新创建的对象中按照排好的顺序依次增加键值对
                }
                return newObj; //返回排好序的新对象
        }
        return  createHash(newsData);
}
