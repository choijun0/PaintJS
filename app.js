const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //contxet는 canvas안에 픽셀을 다룬다.

const colors = document.getElementsByClassName("jsColor"); //HTML collection 이라는 형태

//픽셀작업을 함으로 크기를 지정해줘야함(canvas의 픽셀 사이즈 지정)
//css에서 지정해주는건 즉 보이는 것이 전부이다.
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function onMouseMove(event){
  //clientX,Y 는 전체어대한 좌표 offsetX, Y 는 로컬좌표 
  const x = event.offsetX;
  const y = event.offsetY;
  //console.log(x, y);
  if(!painting){
    //페인팅을 하는중이 아니라면 직선을 만들기위한 시작점을 인지하기시작함.
    ctx.beginPath(); //path is a line.
    ctx.moveTo(x,y);
  }
  else{
    ctx.lineTo(x,y); //path의 마지막 지점부터 x,y좌표 까지의 직선을 만든다.
    ctx.stroke(); //획을 긋다.
  }
}

function stopPainting(){
  painting = false;
  console.log(painting);
}
function startPainting(){
  painting = true;
}

function handleColorClick(event){
  //console.log(event.target.style);
  //event.target을 통해 해당 element의 css style을 가져온다.
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle=color;
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

//console.log(Array.from(colors)); //object로 부터 array를 만듬
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));