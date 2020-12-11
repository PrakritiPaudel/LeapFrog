function Pipe(width, height, parentClass) {
  var that = this;

  this.width = width;
  this.height = height;

  this.pipe;
  this.pipes = [];

  this.pipeSpeed = 3;
  this.pipeGap = 130;
  this.pipeInitialLeft = 300;
  this.pipeLeft1 = this.pipeInitialLeft;
  this.pipeLeft2 = this.pipeInitialLeft + 180;

  this.randomNum = function (min, max) {
    var randNum = Math.round(Math.random() * (max - min) + min);

    return randNum;
  }

  this.pipeTop1 = this.randomNum(200, 450);
  this.pipeTop2 = this.randomNum(200, 450);
  this.pipeFlipTop1 = (this.pipeTop1 - this.pipeGap) - this.height;
  this.pipeFlipTop2 = (this.pipeTop2 - this.pipeGap) - this.height;

  this.init = function () {
    for (var flip = 0; flip < 4; flip++) {
      that.pipe = document.createElement('div');
      that.pipe.style.position = 'absolute';
      that.pipe.style.backgroundImage = 'url("./images/pipe.png")';
      that.pipe.style.backgroundSize = 'cover';
      that.pipe.style.backgroundRepeat = 'no-repeat';
      that.pipe.style.zIndex = 80;
      that.pipe.style.width = that.width + 'px';
      that.pipe.style.height = that.height + 'px';
      that.pipe.style.left = that.pipeInitialLeft + 'px';
      that.pipe.style.top = that.pipeTop1 + 'px';

      switch (flip) {

        case 0:
          that.pipe.style.transform = 'Scale(-1)';
          that.pipe.style.top = that.pipeFlipTop1 + 'px';
          break;

        case 1:
          that.pipe.style.top = that.pipeTop1 + 'px';
          break;

        case 2:
          that.pipe.style.transform = 'Scale(-1)';
          that.pipe.style.top = that.pipeFlipTop2 + 'px';
          that.pipe.style.left = that.pipeLeft2 + 'px';
          break;

        case 3:
          that.pipe.style.top = that.pipeTop2 + 'px';
          that.pipe.style.left = that.pipeLeft2 + 'px';
          break;

      }

      that.pipes[flip] = that.pipe;
    }

    return that.pipes;
  }

  this.movePipe = function () {
    that.pipeLeft1 -= that.pipeSpeed;
    that.pipeLeft2 -= that.pipeSpeed;
  }

  this.drawPipe = function () {
    for (var i = 0; i < 4; i++) {
      that.pipes[i].style.left = that.pipeLeft1 + 'px';

      if (i >= 2) {
        that.pipes[i].style.left = that.pipeLeft2 + 'px';
      }
    }
  }

  this.resetPipe = function () {
    if (that.pipeLeft1 <= -60) {
      that.pipeLeft1 = that.pipeInitialLeft;
      that.pipeTop1 = that.randomNum(200, 450);
      that.pipeFlipTop1 = (that.pipeTop1 - that.pipeGap) - that.height;

      for (var i = 0; i < 2; i++) {
        that.pipes[i].style.top = that.pipeTop1 + 'px';

        if (i == 0) {
          that.pipes[i].style.top = that.pipeFlipTop1 + 'px';
        }
      }
    }

    if (that.pipeLeft2 <= -60) {
      that.pipeLeft2 = that.pipeInitialLeft;
      that.pipeTop2 = that.randomNum(200, 450);
      that.pipeFlipTop2 = (that.pipeTop2 - that.pipeGap) - that.height;

      for (var i = 2; i < 4; i++) {
        that.pipes[i].style.top = that.pipeTop2 + 'px';

        if (i == 2) {
          that.pipes[i].style.top = that.pipeFlipTop2 + 'px';
        }
      }
    }
  }

  this.checkCollision = function () {
    for (var i = 0; i < 4; i++) {

      switch (i) {

        case 0:
          if ((Math.abs(that.pipeLeft1 - parentClass.birdClass.left) <= parentClass.birdClass.width) &&
            (parentClass.birdClass.top) <= ((that.pipeFlipTop1 + that.height))
          ) {
            console.log((Math.abs((that.pipeFlipTop1 + that.height) - parentClass.birdClass.top)));
            clearInterval(parentClass.gameLoop);
            parentClass.birdClass.removeKeyEvent();
          }
          break;

        case 1:
          if ((Math.abs(that.pipeLeft1 - parentClass.birdClass.left) <= parentClass.birdClass.width) &&
            (that.pipeTop1 <= (parentClass.birdClass.top + parentClass.birdClass.height))
          ) {
            console.log('collision');
            clearInterval(parentClass.gameLoop);
            parentClass.birdClass.removeKeyEvent();
          }
          break;

        case 2:
          if ((Math.abs(that.pipeLeft2 - parentClass.birdClass.left) <= parentClass.birdClass.width) &&
            (parentClass.birdClass.top) <= ((that.pipeFlipTop2 + that.height))
          ) {
            // console.log((Math.abs((that.pipeFlipTop + that.height) - parentClass.birdClass.top)));
            clearInterval(parentClass.gameLoop);
            parentClass.birdClass.removeKeyEvent();
          }
          break;

        case 3:
          if ((Math.abs(that.pipeLeft2 - parentClass.birdClass.left) <= parentClass.birdClass.width) &&
            (that.pipeTop2 <= (parentClass.birdClass.top + parentClass.birdClass.height))
          ) {
            console.log('collision');
            clearInterval(parentClass.gameLoop);
            parentClass.birdClass.removeKeyEvent();
          }
          break;

      }


    }
  }

  this.runPipe = function () {
    this.movePipe();
    this.drawPipe();
    this.resetPipe();
    this.checkCollision();
    // this.setPipeTop();
  }




}