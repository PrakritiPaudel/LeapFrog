class Game{

  constructor(canvas){
    this.canvas=canvas;
    this.ctx=this.canvas.getContext("2d");
    this.backImage1=new Image();
    this.backImage1.src="img/road.png";
    this.backImage2=new Image();
    this.backImage2.src="img/road.png";
    this.back_y=0;
    this.backgrounds=[this.backImage1,this.backImage2];
    this.player=new Car(true);
    this.cars=[];
    this.map_speed=4;
    this.speed_flag=false;
    this.max_y=0;
    this.score=0;
    this.score_timer=100;
    this.animator=undefined;
    this.game_over=false;
    this.CANVAS_HEIGHT=600;
    this.CANVAS_WIDTH=600;
  }

  initializeCars(){
    var flag=0;
;    var y=-500;

    for(var i=0;i<5;i++){
      this.cars.push(new Car(false,y));
      y-=250;
    }
  }

  clearFrame(){
    this.ctx.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);
  }

  renderPlayer(){

    // this.ctx.fillStyle=this.player.color;
    // this.ctx.fillRect(this.player.x,this.player.y,this.player.width,this.player.height);
  }

  renderCars(){
    this.cars.forEach(function(car,index){
      car.render(this.ctx);
    }.bind(this));
  }

  checkCollision(){
    this.cars.forEach(function(car,index){
      if((car.x+car.width>=this.player.x) && (car.x<=this.player.x+this.player.width) && (car.y+car.height>=this.player.y) && (car.y<=this.player.y+this.player.height)){
        this.game_over=true;
      }
    }.bind(this))
  }


  handleKeys(event){
    if(event.type=='keydown'){
      switch(event.keyCode){
        case 37:
          this.player.changeLane(-1);
          break;
        case 39:
          this.player.changeLane(1);
          break;
      }
    }
  }

  renderBackground(){
    this.ctx.drawImage(this.backgrounds[0],0,this.back_y);
    this.back_y+=this.map_speed;
    this.ctx.drawImage(this.backgrounds[1],0,-600+this.back_y);
    if(this.back_y==600){
      this.back_y=0;
    }
  }

  renderScore(){
    this.ctx.font="20px Arial";
    this.ctx.fillText("Score  : " + this.score,250,30 );
  }

  maintainScore(){
    this.score_timer--;
    if(this.score_timer<=0){
      this.score_timer=100;
      this.score+=50;
      if(this.speed_flag){
        this.speed_flag=false;
      }
    }
    if(this.score%600==0 && this.score!=0 && !this.speed_flag){
      this.increaseSpeed();
      this.speed_flag=true;
    }
  }

  increaseSpeed(){
    this.cars.forEach(function(car,index){
      car.speed+=2;
    })
    this.map_speed+=1;
  }


  renderGameOver(){
    this.ctx.fillStyle=("40px Arial");
    this.ctx.fillText("Game Over",250,250 );
  }

  run(){

    this.clearFrame();

    this.cars.forEach(function(car,index){
      car.y+=car.speed;
      if(car.y>this.CANVAS_HEIGHT){
        var y=[];
        for(var i=0;i<this.cars.length;i++){
          y.push(this.cars[i].y);
        }
        y=Math.min.apply(Math,y);
        car.y=y-250;
        car.lane=randomNumber(0,3);
        car.x=70+car.lane*200;
      }
    }.bind(this));


    this.renderBackground();
    this.renderScore();
    this.renderCars();
    this.player.render(this.ctx,this.player.x,this.player.y);
    // this.renderPlayer();
    this.checkCollision();
    this.maintainScore();

    if(this.game_over){
      this.renderGameOver();
      this.stop_game();
    }else{
      this.animator=window.requestAnimationFrame(this.run.bind(this));
    }

  }


  stop_game(){
    window.cancelAnimationFrame(this.animator);
  }

}

var canvas=document.getElementById("canvas");
var game= new Game(canvas);
game.initializeCars();
game.run();

window.addEventListener('keydown',function(event){
  game.handleKeys(event);
})
