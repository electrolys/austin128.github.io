var socket = io();

var keysdown = {
  up: false,
  down: false,
  left: false,
  right: false
}
var mee = {
    x  : 0.0,
    y  : 0.0,
    xv : 0.0,
    yv : 0.0
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // <-
      keysdown.left = true;
      break;
    case 32: // space
      keysdown.up = true;
      break;
    case 39: // ->
      keysdown.right = true;
      break;
    case 83: // S
      keysdown.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 37: // A
            keysdown.left = false;
            break;
      case 32: // W
            keysdown.up = false;
            break;
      case 39: // D
            keysdown.right = false;
            break;
      case 83: // S
            keysdown.down = false;
            break;
    }
});

socket.emit('n');

//var lastUpdateTime = (new Date()).getTime();
setInterval(function() {
    //var currentTime = (new Date()).getTime();
    //var dt = currentTime - lastUpdateTime;

    if (keysdown.up)
    {
        mee.yv -= 0.1;
    }
    if (keysdown.down)
    {
        mee.yv += 0.1;
    }
    if (keysdown.right)
    {
        mee.xv += 0.1;
    }
    if (keysdown.left)
    {
        mee.xv -= 0.1;
    }
    mee.x += mee.xv;
    mee.y += mee.yv;
    mee.xv*=0.93;
    mee.yv*=0.93;

    //if (math.abs(mee.xv) < 0.05)
    //{    
    //    mee.xv = 0.0;
    //}
    //if (math.abs(mee.yv) < 0.05)
    //{    
    //    mee.yv = 0.0;
    //}
    //lastUpdateTime = currentTime;
    socket.emit('u', mee);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('s', function(players) {
    console.log(players);
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'red';
    for (var id in players) {
        var player = players[id];
        context.beginPath();
        context.arc((player.x-mee.x)+canvas.width/2, (player.y-mee.y)+canvas.height/2, 10, 0, 2 * Math.PI);
        context.fill();
    }
});
