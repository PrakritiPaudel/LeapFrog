function GameContainer(width, height, parentContainer, key_code) {
  var that = this;
  this.width = width;
  this.height = height;

  this.groundClass;
  this.pipeClass;
  this.pipeSet;

  this.birdClass;

  this.container;

  this.init = function () {
    that.container = document.createElement('div');
    that.container.style.width = that.width + 'px';
    that.container.style.height = that.height + 'px';
    that.container.style.position = 'relative';
    that.container.style.backgroundImage = 'url(./images/bg.png)';
    that.container.style.backgroundSize = '100% 100%';
    that.container.style.backgroundRepeat = 'no-repeat';
    that.container.style.margin = '0 auto';
    that.container.style.overflow = 'hidden';

    // that.initGround();

    this.initGround = function () {
      var width = 600;
      var height = 50;
      that.groundClass = new Ground(width, height, that);
      that.container.appendChild(that.groundClass.init());
    }

    this.initPipe = function () {
      var width = 60;
      var height = 380;

      that.pipeClass = new Pipe(width, height, that);

      that.pipeSet = that.pipeClass.init();

      for (var i = 0; i < 4; i++) {
        that.container.appendChild(that.pipeSet[i]);
      }

    }

    this.initBird = function () {
      that.birdClass = new Bird(40, 40, that, key_code);
      // this.pipeGapping = this.birdClass.birdMoveOffset + this.spaceForBirdToPass;
      that.container.appendChild(that.birdClass.init());
    }

    this.gameLoop = setInterval(function () {
        that.groundClass.runGround();
        that.birdClass.runBird();
        that.pipeClass.runPipe();

      }, 80);
    


    this.initGround();
    this.initPipe();
    this.initBird();

    // this.gameLoop();

    return that.container;
  }

}