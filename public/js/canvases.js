var positionX;
var positionY;
var width;
var height;
var name;
let fabricSocket = io()

const canvas = new fabric.Canvas('mog', {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
});

var objects = canvas._objects

const show = document.getElementById("showInfoButton");
show.addEventListener('click',()=>{
    objects.forEach((objectElement)=>{
        const HTMLDisplay = document.createElement("div")
        HTMLDisplay.setAttribute("class","HTMLDisplay")
        const lineBreak = document.createElement("br")
        HTMLDisplay.innerHTML = `<div id="name"> name: ${objectElement.id}</div> <br> <div id="x">x: ${objectElement.top}</div> <br> <div id="y">y: ${objectElement.left}</div> <br> <div id="width">width: ${objectElement.width}</div> <br> <div id="height">height: ${objectElement.height}</div>`
        document.getElementById("display").appendChild(HTMLDisplay)
        document.getElementById("display").appendChild(lineBreak)
    })
    show.remove()
})

const up = document.getElementById("uploadButton");
up.addEventListener('click',()=>{
    fabricSocket.emit("canvasInfo",{
        posX: positionX,
        posY: positionY,
        canvasWidth: width,
        canvasHeight: height,
    })
})

const cyan = new fabric.Rect({
    id: 'cyan',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    fill: 'cyan'
});

const blue = new fabric.Rect({
    id: 'blue',
    left: 150,
    top: 150,
    width: 100,
    height: 100,
    fill: 'blue'
});


canvas.on({
    'object:moving': moved,
    'object:scaling': resized,
});
  
function moved(obj){
    name = obj.target.id
    positionX = obj.target.left
    positionY = obj.target.top
    
}

function resized(obj){
    name = obj.target.id
    width = obj.target.scaleX*obj.target.width
    height = obj.target.scaleY*obj.target.height
}


canvas.add(cyan);
canvas.add(blue);

canvas.renderAll();