var startGame=function()
{


let cvs= document.getElementById('flappyBird');
let ctx= cvs.getContext('2d');
let start = document.getElementById('start-btn');

start.style.display="none";

var bird=new Image();
bird.src='bird.png';
var bg=new Image();
bg.src='img/bg.png';
var fg=new Image();
fg.src="img/fg.png";
var pipeNorth=new Image();
pipeNorth.src="img/pipeNorth.png";
var pipeSouth=new Image();
pipeSouth.src="img/pipeSouth.png";
var restartimg=new Image();
restartimg.src="img/restart.png";
var birdState="running";


var gap=350;
var bX=10;
var bY=150;
var constant =pipeNorth.height+gap;
var gravity=1.5;
var pipe=[];
var score=0;
var status;

    pipe[0]={
        x:cvs.width,
        y:-10
    }

document.addEventListener("keydown",moveUp);

    function moveUp()
    {
        bY-=30;
    }


bird.onload=function()
{
    draw();
}


var storescore=0;

function draw(){
    
    //ctx.clearRect(0,0,cvs.height,cvs.width);
    ctx.drawImage(bg,0,0);
    if( birdState=="running"){

    for(var i=0;i<pipe.length;i++)
    {

        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        console.log("constant>>",constant);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        console.log("pipe north>>",pipe[i].y+pipeNorth.height);
        console.log("pipe south>>",pipe[i].y+constant);
        ctx.drawImage(fg,0,cvs.height-fg.height);
        ctx.drawImage(bird,bX,bY);
        pipe[i].x--;
        if(pipe[i].x==125){
            pipe.push({
                x: cvs.width,
                y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            })
        }
        if(pipe[i].x==5){
            score++;
        }
        if(bX+bird.width>=pipe[i].x && bX <= pipe[i].x+pipeNorth.width &&(bY<= pipe[i].y+pipeNorth.height||bY+bird.height>=pipe[i].y+constant||bY+bird.height>=cvs.height-fg.height)){
            storescore = score;
            score=0; 
            
            birdState="dead";
           }
        
    }
    bY+=gravity;
    ctx.fillStyle="#000";
    ctx.font="20px Verdana";
    ctx.fillText("Score:"+score,100,20);
    
}
else{
    ctx.fillText("Game over",100,20);
    ctx.fillText("Score:"+storescore,100,80);

    document.onclick=function()
    {
        location.reload();
    }
}

    


    requestAnimationFrame(draw);
   
    
}



    



    
}
