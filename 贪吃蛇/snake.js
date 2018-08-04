//自调用函数-----小蛇
(function (){
    var elements=[];
    //小蛇的构造函数
    function Snake(width,height,direction){
        //小蛇的每个部分的宽
        this.width=width||20;
        this.height=height||20;
        //小蛇的身体
        this.body=[
            {x:3,y:2,color:"red"},//头
            {x:2,y:2,color:"orange"},//身体
            {x:1,y:2,color:"orange"},//身体
        ];

        //方向
        this.direction=direction || "right";
    }
    //为原型添加方法----小蛇的初始化方法
    Snake.prototype.init=function(map){
        //先删除 小蛇
        remove();
        for(var i=0;i<this.body.length;i++){
            var obj=this.body[i];
            //创建DIV
            var div=document.createElement("div");
            //把div加入到map地图中
            map.appendChild(div);
            //小蛇样式
            div.style.position="absolute";
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            div.style.left=obj.x*this.width+"px";
            div.style.top=obj.y*this.height+"px";
            div.style.backgroundColor=obj.color;
            //方向

            //把div加入到elements数组中
            elements.push(div);
        }
    }
    
    //为原型添加方法---小蛇动起来
    Snake.prototype.move=function(food,map){
        //改变小蛇的身体坐标位置
        var i=this.body.length-1;
        for(;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        //判断方向--改变小蛇头部的坐标位置
        switch(this.direction){
            case "right":
            this.body[0].x+=1;
            break;
            case "left":
            this.body[0].x-=1;
            break;
            case "top":
            this.body[0].y-=1;
            break;
            case "bottom":
            this.body[0].y+=1;
            break;
        }
        
        //判断小蛇有没有迟到食物
        //小蛇头额坐标与食物的坐标一致
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        //食物的横纵坐标
        var foodX=food.x;
        var foodY=food.y;
        if(headX==foodX&&headY==foodY){
            //获取小蛇的最后的身体
            var last=this.body[this.body.length-1];
            //把最后的蛇尾复制一个重新加入身体
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //把食物删除
            food.init(byId("map"))
        }
    }
        
    //添加一个私有的函数---删除蛇
    function remove(){
        //获取数组
        var i=elements.length-1;
        for(;i>=0;i--){
            //先从当前的子元素中该子元素的父级元素，然后再删除这个元素
            var ele=elements[i];
            ele.parentNode.removeChild(ele)
            elements.splice(i,1);
        }

    }
    
    //把snake暴露给window,外部可以访问
    window.Snake=Snake;
}());