let socket = io()

const canvas = new fabric.Canvas('mog', {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
});
const group = new fabric.Group(canvas._objects)

const newObject = document.getElementById("addButton");
newObject.addEventListener('click', ()=>{
    var r = Math.floor(Math.random()*250)+5
    var g = Math.floor(Math.random()*250)+5
    var b = Math.floor(Math.random()*250)+5
    const rectangle = new fabric.Rect({
        id: '',
        hasRotatingPoint: false,
        left: 10,
        top: 10,
        width: Math.floor(Math.random()*300)+10,
        height: Math.floor(Math.random()*300)+10,
        fill: `rgba(${r},${g},${b},1)`
    })
    if(rectangle.id === ''){
        rectangle.id = canvas._objects.length+1
    }
    canvas.add(rectangle)
    /* console.log(rectangle.id) */
})

const upLoad = document.getElementById("uploadButton");
upLoad.addEventListener('click',()=>{
    
    const info = canvas.getActiveObject()
    group._objects.forEach((elementos)=>{
        console.log(elementos.angle)
    })

    socket.emit('canvasInfo',{
        xTot: info.left,
        yTot: info.top,
        wTot: info.width,
        hTot: info.height,
        objects: group._objects
    })
    location.assign('http://localhost:4000') 
})

const hName = document.getElementById("name")
const hX = document.getElementById("x")
const hY = document.getElementById("y")
const hWidth = document.getElementById("width")
const hHeight = document.getElementById("height") 
//const hAngle = document.getElementById("angle") 

canvas.on({
    'object:moving': change,
    'object:scaling': change,
    'mouse:over': change
});
  
function change(obj){
    if(obj.target === null){
        void(0)
    } else {
        hName.innerHTML = `name: ${obj.target.id}`
        hX.innerHTML = `x: ${obj.target.left.toFixed(3)}`
        hY.innerHTML = `y: ${obj.target.top.toFixed(3)}`
        hWidth.innerHTML = `width: ${(obj.target.scaleX*obj.target.width).toFixed(3)}`
        hHeight.innerHTML = `height: ${(obj.target.scaleY*obj.target.height).toFixed(3)}`
        //hAngle.innerHTML = `angle: ${(obj.target.angle).toFixed(3)}`
    }
    
}


canvas.renderAll();