window.addEventListener('resize', resize, false);

var speeds = [];
var numValues = 10;
var radius = 200;
let hueShift = 0;

function Point(x, y){
  this.x = x;
  this.y = y;
}

function setup(){
  createCanvas();
  colorMode(HSB, 360, 100, 100, 100);
  ellipseMode(CENTER);
  for (var i = 0; i < numValues; i++){
    speeds.push(random()*6 + 4);
  }
  
  speeds.push(speeds[0]);
  
  resize();
}

function draw(){
  hueShift = map(sin(frameCount * 0.01), -1, 1, 0, 50);

  background(0);
  noFill();
  stroke(100);
  strokeWeight(2);
  translate(width/2, height/2);
  // ellipse(0, 0, radius*2);
  
  var points = [];
  
  for (var i = 0; i < numValues; i++){
    var angle = (i/numValues)*PI*2;
    
    var x = cos(angle)*radius;
    var y = sin(angle)*radius;
    points.push(new Point(x, y));
    
    var x2, y2;
    
    // var x = cos(angle)*radius/2;
    // var y = sin(angle)*radius/2;
    // var x2 = cos(angle)*radius*1.5;
    // var y2 = sin(angle)*radius*1.5;
    // line(x, y, x2, y2);
    
    var offset = sin(frameCount/(speeds[i]*10))*radius/2;
    var offset2 = sin(frameCount/(speeds[i+1]*10))*radius/2;
    // offset = (offset+1)/2;
    // offset2 = (offset2+1)/2;
    
    var angle2 = ((i+1)/numValues)*PI*2;
    
    if (i%2 == 0){
      x = cos(angle)*(radius + offset);
      y = sin(angle)*(radius + offset);
      x2 = cos(angle2)*(radius + offset2);
      y2 = sin(angle2)*(radius + offset2);
      points.push(new Point(x, y));
      points.push(new Point(x2, y2));
    } else {
      x = cos(angle)*(radius - offset);
      y = sin(angle)*(radius - offset);
      x2 = cos(angle2)*(radius - offset2);
      y2 = sin(angle2)*(radius - offset2);
      points.push(new Point(x, y));
      points.push(new Point(x2, y2));
    }
    
    x = cos(angle)*(radius + offset);
    y = sin(angle)*(radius + offset);
    x2 = cos(angle)*(radius - offset);
    y2 = sin(angle)*(radius - offset);
    
    // push();
    // fill(0, 100, 100);
    // noStroke();
    // ellipse(x, y, 10);
    // fill(120, 100, 100);
    // ellipse(x2, y2, 10);
    // pop();
  }
  
  var angle = PI*2;
    
  var x = cos(angle)*radius;
  var y = sin(angle)*radius;
  points.push(new Point(x, y));
  
  noStroke();
  
  for (var j = 19; j >= 0; j--){
    push();
    
    var currentHue = (330 + hueShift) % 360;
    if (j%2 == 1) fill(currentHue, 100, j*4 + 20);
    else fill(currentHue, 100, 15);
    scale(j/20);
    
    rotate(((20 - j)/20)*((frameCount)/100));
    beginShape();

    vertex(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i+= 3){
      var p1 = points[i];
      var p2 = points[i+1];
      var p3 = points[i+2];
      bezierVertex(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
    }

    endShape();
    pop();
  }
}

function resize(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  radius = min(width, height)/2.2;
}

function wrapLetters() {
  var poem = document.getElementById("poem");
  var lines = poem.innerHTML.split(/<br\s*\/?>/i);
  var newHtml = '';

  lines.forEach(function(line) {
    var lineHtml = '';
    for (var i = 0; i < line.length; i++) {
      if (line[i] === ' ') {
        lineHtml += ' ';
      } else {
        lineHtml += '<span>' + line[i] + '</span>';
      }
    }
    newHtml += lineHtml + '<br>';
  });

  poem.innerHTML = newHtml;
}


function changeText() {
  var spans = document.querySelectorAll("#poem span");
  for (let i = 0; i < spans.length; i++) {
    setTimeout(function() {
      spans[i].classList.add("burn-effect");
    }, i * 10);
  }

  setTimeout(function() {
    document.getElementById("poem").innerHTML = `
    ◊</br>
    <p>Theseus, my love.
    </br>Oceans inside of us
    <br/>each ventricle a harbor, each atrium a sky
    <br/>scars like stars on your heart a fireball of brilliant memory
    <br/>and you'll understand it was spelt wrong on purpose
    <br/>so the letters could be rearranged to our liking
    <br/>it's our game after all, we play it
    <br/>and I'll run next to you, until my legs fall off, until I run out of breath
    <br/>even if I have to carry you or replace each and every plank agian
    <br/>beacuse the boat didn't matter - the journey did
    <br/>◊
    <br/>
    <br/>When I first wrote that poem I never tought I'd see you agian
    <br/>It was impossible I thought
    <br/>Impossible things are often worth doing`;
  }, spans.length * 10);
}

wrapLetters();
