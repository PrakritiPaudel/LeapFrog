class Car{
  constructor(player,y){
    this.player=false;
    this.player=player || false
    this.height=85;
    this.width=40;
    if(this.player){
      this.lane=1;
      this.y=450;
      this.sprite=new Image();
      this.sprite.src="img/player.png";
      this.color="blue";
    }else{
      this.lane=randomNumber(0,3);
      this.y=y;
      this.color="red";
      this.sprite=new Image();
      if(randomNumber(0,10)<7){
        this.sprite.src="img/enemy.png";
      }else{
        this.sprite.src="img/enemy2.png";
      }
    }
    this.x=70+this.lane*200;
    this.speed=7;
  }

  changeLane(laneShift){
    this.lane+=laneShift;
    if(this.lane<0){
      this.lane=2;
    }else if(this.lane>2){
      this.lane=0;
    }
    this.x=70+this.lane*200;
  }

  render(ctx){
    ctx.drawImage(this.sprite,this.x,this.y);
  }

}
