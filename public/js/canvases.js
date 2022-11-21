let socket = io()

const canvas = new fabric.Canvas('mog', {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
});


const newObject = document.getElementById("addButton");
newObject.addEventListener('click', ()=>{
    var r = Math.floor(Math.random()*250)+5
    var g = Math.floor(Math.random()*250)+5
    var b = Math.floor(Math.random()*250)+5
    const rectangle = new fabric.Rect({
        id: '',
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
    console.log(rectangle.id)
})


const upLoad = document.getElementById("uploadButton");
upLoad.addEventListener('click',()=>{
    /* const group = new fabric.Group(canvas._objects) */
    const info = canvas.getActiveObject()
    socket.emit('canvasInfo',{
        x: info.left,
        y: info.top,
        w: info.width,
        h: info.height
    })   
    location.assign('http://localhost:4000')
})

const hName = document.getElementById("name")
const hX = document.getElementById("x")
const hY = document.getElementById("y")
const hWidth = document.getElementById("width")
const hHeight = document.getElementById("height") 

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
    }
    
}


canvas.renderAll();