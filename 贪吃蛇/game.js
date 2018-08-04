 //自调用函数----游戏对象



//  byId("two").onclick=function(){
//     return sudu=200;
// }
// byId("three").onclick=function(){
//     return sudu=800;
// }

 (function (){
    var that=null;
    //游戏的构造函数
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;//地图
        that=this;
    }
    Game.prototype.init=function(){
        //初始化游戏
        
        //1.食物初始化
        this.food.init(this.map); 
        //小蛇初始化
        this.snake.init(this.map);
        //小蛇移动初始化
        // setInterval(function(){
        //     that.snake.move(that.food,that.map);
        //     that.snake.init(that.map);
        // },150)
        //调用自动移动
        this.runSnake(this.food,this.map);
        //调用控制方向的函数
        this.bindKey();
    }
    
    //添加原型方法---设置小蛇可以自动的跑起来
    Game.prototype.runSnake=function(food,map){

        var timed=setInterval(function(){
            //此时this是window
            //移动小蛇
            this.snake.move(food,map);
            //初始化小蛇
            this.snake.init(map);
            //横坐标的最大值
            var maxX=map.offsetWidth/this.snake.width;
            //纵坐标的最大值
            var maxY=map.offsetHeight/this.snake.height;
            //小蛇的头的纵坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            if( headX < 0 || headX >= maxX ) {
                clearInterval(timed);
                alert("撞墙了，Game--OVER")
            }
            if( headY < 0 ||headY >= maxY ) {
                clearInterval(timed);
                alert("撞墙了，Game--OVER")
            }
        }.bind(that),50)
    }
    
    //添加原型方法---按键改变小蛇方向
    Game.prototype.bindKey=function(){
        document.addEventListener("keydown",function(e) {
            switch(e.keyCode){
                case 37:this.snake.direction="left";
                break;
                case 38:this.snake.direction="top";
                break;
                case 39:this.snake.direction="right";
                break;
                case 40:this.snake.direction="bottom";
                break;
            }
        }.bind(that),false);
    };
    
    window.Game=Game;
}());
    
    
    var game=new Game(byId("map"));
    game.init()