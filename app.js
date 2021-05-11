//js파일은 밑으로 읽어드린다.
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //contxet는 canvas안에 픽셀을 다룬다. -> Image를 만든다.

const colors = document.getElementsByClassName("jsColor"); //HTML collection 이라는 형태

const range = document.getElementById("jsRange");

const mode = document.getElementById("jsMode");

const saveBtn = document.getElementById("jsSave");

//픽셀작업을 함으로 크기를 지정해줘야함(canvas의 픽셀 사이즈 지정)
//css에서 지정해주는건 즉 보이는 것이 전부이다.
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const INITIAL_COLOR = "#2c2c2c";
ctx.fillStyle="white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE); //canvas의 defualt backgroundColor지정 안하면 투명
ctx.strokeStyle = ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
  ctx.strokeStyle=ctx.fillStyle=color;
}

function handleRangeChange(event){
  //console.log(event.target.value); //step은 움직일때 얼만나 움직이는지를 나타넴 
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event){
  if(filling){
    filling = false;
    mode.innerText="fill";
  }
  else{
    filling = true;
    mode.innerText="paint";
  }
  
}

function handleCanvasClick(event){
  if(filling){
      ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(event){
  //step.1 canvas데이터를 image로
  const image = canvas.toDataURL("image/jpeg"); //Default = PNG - 화질좀더 낫다.
  const link = document.createElement("a"); //html객체
  link.href = image;
  link.download = "PaintJS[EXPORT]"; //a태그 랑 같음 href - image 나 download - 이름 사용가능함. 
  link.click(); //강제 클릭
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//console.log(Array.from(colors)); //object로 부터 array를 만듬
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


if(range){
   range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}