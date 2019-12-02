(function() {
  function Box(parentElement)
   {
    this.x = 10;
    this.y = 10;
    this.dx=5;
    this.dy=5;
    this.width = 20;
    this.height = 20;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;

    this.init = function(i) {
      var box = document.createElement("div");
      box.style.height = this.height + "px";
      box.style.width = this.width + "px";
      box.setAttribute('id', i);
      box.classList.add("box");
      this.parentElement.appendChild(box);
      this.element = box;
      this.element.onclick = this.boxClicked.bind(this);
      this.draw();

      return this;
    };

    this.setPostion = function(x, y) {
      this.x = x;
      this.y = y;
    };

    this.boxClicked = function() {
      console.log("boxClicked", this.width);
    };

    this.draw = function() {
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";
    };

    this.move = function() {
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    };

    this.checkCollision = function(boxes, i)
    {
      if (this.x < 0 || this.x + this.width > 500) {
        this.dx = -this.dx;
      }
      if (this.y < 0 || this.y + this.height > 500) {
        this.dy = -this.dy;
      }


      var boxLength = boxes.length;

      console.log('boxlength', boxLength);




      for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].x === this.x && boxes[i].y === this.y) continue;
        if (
          boxes[i].x < this.x + this.width &&
          boxes[i].x + boxes[i].width > this.x &&
          boxes[i].y < this.y + this.height &&
          boxes[i].y + boxes[i].height > this.y
        ) {
         this.dx=-this.dx;
         this.dy=-this.dy;
          
        }
      }



     



        


    };
  }

  function getRandomArbitrary(min, max) 
  {
    return Math.random() * (max - min) + min;
  }

  function Game(parentElement, boxCount) {
    this.boxes = [];
    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 50;

    this.startGame = function() {
      for (var i = 0; i < this.boxCount; i++) {
        var box = new Box(parentElement).init(i);

        //  //avoid overlapping
        //  if(i!=0)
        //  {
        //      for(let j=0;j<boxes.length;j++)
        //      {
        //          if((x,y,boxes[j].x-boxes[j].y-width)<0)
        //          {
        //              const x=Math.random()*width;
        //              const y=Math.random()*height;
        //          }
        //          j=-1;
        //      }
        //  }

        box.setPostion(
          getRandomArbitrary(0, MAX_WIDTH - box.width),
          getRandomArbitrary(0, MAX_HEIGHT - box.height)
        );
        box.draw();
        this.boxes.push(box);
      }

      setInterval(this.moveBoxes.bind(this), 100);
    };

    this.moveBoxes = function() {
      for (var i = 0; i < this.boxCount; i++) {
        this.boxes[i].move();
        this.boxes[i].checkCollision(this.boxes, i);
      }
    };
  }

  



  var parentElement = document.getElementById("app");

  var game=new Game(parentElement);
  game.startGame();
  console.log(game);
var ants = parentElement.getElementsByTagName('div');
for(var j=0;j<ants.length;j++){
  ants[j].addEventListener('click', function(e){
    e.preventDefault();
    this.remove(e.target.getAttribute('id'));
    
    game.boxes.splice(j,1);
  })
}

 


})(); 