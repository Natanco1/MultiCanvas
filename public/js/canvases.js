var positionX;
var positionY;
var width;
var height;
var name;

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
        HTMLDisplay.innerHTML = 'name:' + objectElement.id + '<br>x:' +objectElement.top+ '<br>y:' + objectElement.left+ '<br>width:' +objectElement.width+ '<br>height:' +objectElement.height
        document.getElementById("display").appendChild(HTMLDisplay)
        document.getElementById("display").appendChild(lineBreak)
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
/*     console.log('-----------')
    console.log(`${name}`)
    console.log(`position X: ${positionX}`)
    console.log(`position Y: ${positionY}`) */
    
}

function resized(obj){
    name = obj.target.id
    width = obj.target.scaleX*obj.target.width
    height = obj.target.scaleY*obj.target.height
   /*  console.log('-----------')
    console.log(`${name}`)
    console.log(`width: ${width}`)
    console.log(`height: ${height}`) */
}


canvas.add(cyan);
canvas.add(blue);





canvas.renderAll();