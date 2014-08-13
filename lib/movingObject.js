(function () {
  // If window.Zoo does not exist yet, set it to a new blank object.
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (attributes) {
    this.pos = attributes.pos;
    this.vel = attributes.vel;
    this.radius = attributes.radius;
    this.color = attributes.color;
    this.game = attributes.game;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
     ctx.beginPath();

     ctx.arc(
       this.pos[0],
       this.pos[1],
       this.radius,
       0,
       2 * Math.PI,
       false
     );

     ctx.fill();
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (this instanceof Asteroids.Bullet) {
      return;
    }
    else {
      this.game.wrap(this.pos);
    }

  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dist = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2)
    + Math.pow((this.pos[1] - otherObject.pos[1]), 2));

    if (dist < (this.radius + otherObject.radius)) {
      return true;
    }
    else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    if ( otherObject instanceof Asteroids.Ship ) {
      otherObject.relocate();
      return;
    };

    // if (this instanceof Asteroids.Asteroid && otherObject instanceof Asteroids.Asteroid) {
//       var x1 = this.vel[0];
//       var y1 = this.vel[1];
//       this.vel[0] += otherObject.vel[0];
//       this.vel[1] += otherObject.vel[1];
//       otherObject.vel[0] += x1;
//       otherObject.vel[1] += y1;
//     }

    if (this instanceof Asteroids.Bullet) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

})();
