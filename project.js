let canvas=document.getElementById("mycanvas");
let ctx=canvas.getContext("2d");
let time=document.getElementById("time");
let totalFruit=document.getElementById("totalFruit");
//bird
let x=350, y=400;
let bird= new Image();
//drop
let a, b=0;
let raindrop= new Image();
let drops= new Array();
//others
let timerId="";
let t=60;
let running=false;
let count=0;
let dis1, dis2;
let background= new Image();
let fruit=0;
let level;
//fruit
let h, v=0;
let fruits= new Array();
let peach= new Image();
function setUp(){
  peach.src="peach.png";
  raindrop.src="drop.png";
  bird.src="pinkbird.png";
  background.src="darksky.png";
  ctx.drawImage(background,0,0);

  addEventListener("keydown", function(event){
    if(event.keyCode == 38){
      y-=10;
      if(y<0){
        y=0;
      }
    }else if(event.keyCode == 40){
      y+=10;
      if(y>470){
        y=470;
      }
    }else if(event.keyCode == 37){
      x-=10;
      if(x<0){
        x=0;
      }
    }else{
      x+=10;
      if(x>750){
        x=750;
      }
    }
  });
}

function pinkBird(x,y){
    ctx.beginPath();
    ctx.arc(x+35,y+40,25,0,2*Math.PI);
    ctx.strokeStyle="grey";
    ctx.stroke();
    ctx.closePath();
    ctx.drawImage(bird,0,0,315,331,x,y,70,70);
}
function drawFruit(h,v){
  ctx.beginPath();
  ctx.arc(h+10,v+15,9,0,2*Math.PI);
  ctx.strokeStyle="red";
  ctx.stroke();
  ctx.closePath();
  ctx.drawImage(peach,0,0,1300,1300,h,v,28,28);
}
function tinyFruit(h,v){
  this.h=(Math.round(Math.random()*500))*10;
  this.v=v;
  this.move= function(){
    this.v+=5;
    drawFruit(this.h,this.v);
  };
  this.gone= function(){
    this.v=700;
  };
    drawFruit(this.h,this.v);
}
function drawDrop(a,b){
  ctx.beginPath();
  ctx.arc(a+5,b+10,3.75,0,2*Math.PI);
  ctx.strokeStyle="grey";
  ctx.stroke();
  ctx.closePath();
  ctx.drawImage(raindrop,0,0,1042,1042,a,b,35,50);
}
function tinyDrop(a,b){
  this.a=(Math.round(Math.random()*800))*2;
  this.b=b;
  this.move= function(){
    this.b+=5;
    drawDrop(this.a,this.b);
  };
  this.gone= function(){
    this.b=700;
  };
    drawDrop(this.a,this.b);
}
function distanceDrop(a,b,xbird,ybird){
  let ax=Math.pow((a-xbird),2);
  let by=Math.pow((b-ybird),2);
  dis1= Math.sqrt(ax + by);
}
function distanceFruit(h,v,xbird,ybird){
  let hx=Math.pow((h-xbird),2);
  let vy=Math.pow((v-ybird),2);
  dis2= Math.sqrt(hx + vy);
}
function result(string){
  ctx.font = "40px Georgia";
  ctx.fillStyle = "#055A11";
  ctx.fillText(string,0,200);
}
function start(){
  level=document.getElementById("levels").value;
  if(!running){
    running=true;
    timerId= setInterval(function(){
          count+=1;
            if(t>0){
              if(count==10){
                t-=1;
                count=0;
              }
            time.innerHTML=t;
            totalFruit.innerHTML=fruit;
            fruits.push(new tinyFruit(h,v));
            drops.push(new tinyDrop(a,b));

            ctx.clearRect(0,0,800,500);
            ctx.drawImage(background,0,0);
            pinkBird(x,y);

            for(let i=0;i<drops.length;i++){
              drops[i].move();
              fruits[i].move();
              distanceFruit(fruits[i].h+10,fruits[i].v+15,x+35,y+40);
              distanceDrop(drops[i].a+5,drops[i].b+10,x+35,y+40);

              if(level == "Easy"){
                if(dis1 <30){
                  t-=3;
                  drops[i].gone();
                }
                if(dis2 <29){
                  fruit+=1;
                  fruits[i].gone();
                  if(fruit == 15){
                    totalFruit.innerHTML=fruit;
                    clearInterval(timerId);
                    result("Yay, you got enough peaches");
                  }
                }
              }else if(level == "Hard"){
                if(dis1 <30){
                  clearInterval(timerId);
                }
                if(dis2 <29){
                  fruit+=1;
                  fruits[i].gone();
                  if(fruit == 20){
                    totalFruit.innerHTML=fruit;
                    clearInterval(timerId);
                    result("Yay, you got enough peaches");
                  }
                }
              }
            }
        }else if(fruit < 15 || fruit <20){
          time.innerHTML=0;
          clearInterval(timerId);
          result("Time's up. You didn't get enough peaches");
        }
    },100);
  }
}

function restart(){
  x=350;
  y=400;
  t=60;
  fruit=0;
  totalFruit.innerHTML=fruit;
  time.innerHTML=t;
  ctx.clearRect(0,0,800,500);
  ctx.drawImage(background,0,0);
  pinkBird(x,y);
  clearInterval(timerId);
  for (let j=drops.length;j>=0;j--){
    drops.pop();
    fruits.pop();
  }
  running=false;
}
