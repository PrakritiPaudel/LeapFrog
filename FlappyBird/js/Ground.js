function Ground(width, height, parentClass) {
  var that = this;

  this.width = width;
  this.height = height;

  this.ground;
  this.groundInitialLeft = 0;
  this.groundLeft = this.groundInitialLeft;
  this.groundTop = 550;


  this.init = function () {
    that.ground = document.createElement('div');
    that.ground.style.position = 'absolute';
    that.ground.style.backgroundImage = 'url(./images/ground.jpg)';
    that.ground.style.backgroundRepeat = 'repeat-x';
    that.ground.style.width = that.width + 'px';
    that.ground.style.height = that.height + 'px';
    that.ground.style.zIndex = 90;
    that.ground.style.backgroundSize = 'contain';
    that.ground.style.left = that.groundLeft + 'px';
    that.ground.style.top = that.groundTop + 'px';

    // that.move();

    return that.ground;
  }

  this.runGround = function () {
    // that.moveIntervalId = setInterval(function () {
    that.groundLeft -= 3;
    that.drawGround();
    that.resetGround();
    that.checkCollision();
    // }, 100);
  }

  this.drawGround = function () {
    that.ground.style.left = that.groundLeft + 'px';
  }

  this.resetGround = function () {
    if (that.groundLeft <= -230) {
      that.groundLeft = that.groundInitialLeft;
    }
  }

  this.checkCollision = function () {
    if ((Math.abs(that.groundTop - parentClass.birdClass.top)) <= parentClass.birdClass.height) {
      clearInterval(parentClass.gameLoop);
      parentClass.birdClass.removeKeyEvent();
      console.log('ground');
    }

  }
}