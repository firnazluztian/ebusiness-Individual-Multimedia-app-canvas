var dots = [
  [7,7],
  [57,30],
  [107,20],
  [157,30],
  [207,7],
  [187,57],
  [207,87],
  [187,117],
  [157,137],
  [207,127],
  [257,107],
  [307,87],
  [357,87],
  [407,107],
  [457,137],
  [500,120],
  [520,100],
  [530,80],
  [540,60],
  [570,50],
  [600,60],
  [605,70],
  [600,80],
  [570,90],
  [550,110],
  [540,140],
  [520,160],
  [500,200],
  [500,250],
  [500,300],
  [500,350],
  [480,360],
  [460,350],
  [460,300],
  [460,250],
  [440,250],
  [440,300],
  [440,350],
  [420,360],
  [400,350],
  [400,300],
  [400,250],
  [370,270],
  [340,280],
  [310,280],
  [280,270],
  [250,250],
  [250,300],
  [250,350],
  [230,360],
  [210,350],
  [210,300],
  [210,250],
  [190,250],
  [190,300],
  [190,350],
  [170,360],
  [150,350],
  [150,300],
  [150,250],
  [130,220],
  [120,180],
  [107,150],
  [57,137],
  [27,117],
  [7,87],
  [27,57],
  [7,7]
  ];

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = 100, y = 50, i = 0;
var strokeWidth = 7;
var strokeAnimationDelay = 100; //milisecond
var radius = 7;
var velocity = 4;
var randomNumY = 0, randomNumX = 0;
var clickedIsTrue = false, clearScreenisClicked = false;
var random = [1,-1,0];
var gradient = ctx.createLinearGradient(50,200,200,0);
gradient.addColorStop("0", "red");
gradient.addColorStop("0.5" ,"blue");
gradient.addColorStop("1", "yellow");

function main() {
  setTimeout('drawDots()',500);
  setTimeout('drawLinesAnimation()',1000);
  generateRandNum();
}

function animate() {
  clearScreen();
  drawDots();
  drawLines();
  if (clickedIsTrue == true) {
    x = x + (velocity*randomNumX);
    y = y + (velocity*randomNumY);
  } else {
    x = x;
    y = y;
  }
  if ((x + 600) > canvas.width || x < 0 
    || (y + 650) > canvas.width || y < 0) {
    velocity *=-1;
  }
  if (clearScreenisClicked == true) {
    cancelAnimationFrame(animate);
    clearScreenisClicked = false;
  } else {
    requestAnimationFrame(animate);
  }
}

function drawDots() {
	ctx.beginPath();
  for (var i in dots) {
    ctx.arc(dots[i][0]+x, dots[i][1]+y, radius, 0, 2 * Math.PI);
    ctx.moveTo(x,y);
  }
  ctx.fillStyle = "#00897b";
  ctx.fill();
}

function drawLines() {
  ctx.beginPath();
  for (let i in dots) { 
    ctx.lineTo(dots[i][0]+x,dots[i][1]+y);
  }
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = gradient;
  ctx.stroke();
}

function generateRandNum() {
  randomNumY = random[Math.floor(Math.random() * random.length)];
  randomNumX = random[Math.floor(Math.random() * random.length)];
}

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

$("#btnBeginAnimation").click(function(){
  if (clickedIsTrue == true) {
    $('#btnBeginAnimation').html('Begin Animation').toggleClass('btn-outline-danger btn-outline-success').effect("bounce");
    clickedIsTrue = false;
    clearScreenisClicked = true;
  } 
  else {
    $('#btnBeginAnimation').html('Stop Animation').toggleClass('btn-outline-success btn-outline-danger').effect("bounce");
    clickedIsTrue = true;
    clearScreenisClicked = false;
    generateRandNum();
    while (randomNumY == 0 && randomNumX == 0) {
      generateRandNum();
    }
    animate();
  }
});

$("#btnClearScreen").click(function(){
  $('#btnClearScreen').effect("bounce");
  clearScreenisClicked = true;
  clearScreen();
});

function drawLinesAnimation() {
  ctx.beginPath();
  ctx.lineTo(dots[i][0]+x,dots[i][1]+y);
  ctx.lineTo(dots[i+1][0]+x,dots[i+1][1]+y);
  ctx.lineWidth = strokeWidth;
  ctx.strokeStyle = gradient;
  ctx.stroke();
  i = i+1;
  if (i <= dots.length) {
    setTimeout('drawLinesAnimation()',strokeAnimationDelay);
  }
}

var fullscreen = false;
$("#fullscBtn").click(function(){
  if (fullscreen == false) {
    $("#canvas-container").removeClass("container");
    fullscreen = true;
  } else {
    $("#canvas-container").addClass("container");
    fullscreen = false;
  } 
});

$("#countDots").text("Dots count: " + dots.length);

main();