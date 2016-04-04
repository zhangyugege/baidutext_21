/**
 * Created by Administrator on 2016/4/4.
 */

var data1=["html5"];
var data2=["唱歌"];
function $(id){
    return document.getElementById(id);
}
//输入tag是的键盘抬起事件
$('input-tag').onkeyup= function (e) {
    var e=e||window.event;
    var value=$('input-tag').value;
    if (/[,，;；、\s\n]+/.test(value) || e.keyCode ===13) {
        var d=getInputTag(value);
        $('input-tag').value="";
        addTag(d);
        renderTag();

    }
}
//添加hobby点击事件
$('hobby-btn').onclick=function(){
    var d=gethobby();
    for(var i=0;i< d.length;i++){
        data2.push(d[i]);
    }
    //去重
    data2=deleteRepeat(data2);
    //trim
    data2=trim(data2);
    console.log(data2);
    render(data2,'hobby-box');
}
//为每一个tag添加监听事件
function moveToDelete(){
    var con=$('tag-box');
    for(var i=0;i<con.childNodes.length;i++){
        con.childNodes[i].addEventListener('mouseover',function(e){
            var e=e||window.event;
            var ele= e.target;
            //console.log(ele);
            ele.style.background='blue';
            ele.innerHTML="删除"+ele.innerHTML;
        });
        con.childNodes[i].addEventListener('mouseout',function(e){
            var e=e||window.event;
            var ele= e.target;
            ele.style.background='#d45d5c';
            var s=ele.innerHTML.toString();
            //取子串
            ele.innerHTML= s.slice(2);
        });
        con.childNodes[i].addEventListener('click',function(e){
            var e=e||window.event;
            var ele= e.target;
            var index=parseInt(ele.getAttribute('data-index'));
            //删除
            data1.splice(index,1);
            renderTag();
        });

    }
}
//去掉数组每个元素的开始和结尾空格
function trim(data){
    for(var i=0;i<data.length;i++){
        var regex1 = /^\s*/;
        var regex2 = /\s*$/;
        data[i].replace(regex1, "");
        data[i].replace(regex2, "");
    }
    return data;
}
//当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
function addTag(d){
    console.log(data1);
    for(var i=0;i< d.length;i++){
        data1.push(d[i]);
    }
    //tag去重
    data1=deleteRepeat(data1);
    //tag trim
    data1=trim(data1);

}
//获取用户输入的tag
function getInputTag(value){
    var d=value.trim().split(/\s|,|;|\u3001|\003B/g);
    d= d.filter(function(item){
        return item!=='';
    });
    return d;
}
//删除数组重复元素
function deleteRepeat(data){
    var s=[];
    for(var i=0;i<data.length;i++){
        if(data.indexOf(data[i])===i){
            s.push(data[i]);
        }
    }
    return s;

}
//获取用户输入的hobby
function gethobby(){
    var res=$('input-hobby').value.trim();
    var d=res.split(/\s|,|;|\u3001|\003B/g);
    d=d.filter(function(item){
        return item!=='';
    });
    //console.log(d);
    return d;
}
//渲染tag
function renderTag(){
    render(data1,'tag-box');
    moveToDelete();
}
//渲染
function render(data,id){
    var res="";
    var i=data.length-10>0?data.length-10:0;
    for(;i<data.length;i++){
        res+="<div class='box-ele' data-index='"+ i.toString()+"'>"+data[i]+"</div>"
    }
    $(id).innerHTML=res;
}
render(data2,'hobby-box');
renderTag();
