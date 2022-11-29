let socket = io()


const hName = document.getElementById("name")
let hX = document.getElementById("x")
const hY = document.getElementById("y")
const hWidth = document.getElementById("width")
const hHeight = document.getElementById("height") 
const brain = document.getElementById("brain")
const skeleton = document.getElementById("skeleton")
const face = document.getElementById("face")
const alert = document.getElementById("alert")
const choice = document.getElementById("choice")
let index = 0;


brain.addEventListener("click",(button)=>{
   skeleton.disabled = true
   face.disabled = true
   index = 1
   brain.addEventListener('click',()=>{
        skeleton.disabled = false
        face.disabled = false
        index = 0
   })
})
skeleton.addEventListener("click",(button)=>{
    brain.disabled = true
    face.disabled = true
    index = 2
    skeleton.addEventListener('click',()=>{
        brain.disabled = false
        face.disabled = false
        index = 0
    })
})
face.addEventListener("click",(button)=>{
    skeleton.disabled = true
    brain.disabled = true
    index = 3
    face.addEventListener('click',()=>{
        skeleton.disabled = false
        brain.disabled = false
        index = 0
    })
})



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
})

const upLoad = document.getElementById("uploadButton");
upLoad.addEventListener('click',()=>{
    if(index == 0) {
        choice.style.outline = '1px solid red'
        choice.style.padding = '5px'
        alert.innerHTML = "select a model please"
        setTimeout(()=>{
            choice.style.outline = '0px'
            alert.innerHTML = ''
        },5000)
    }else {
        const info = canvas.getActiveObject()
        let k = 0;
        socket.emit('canvasInfo',{
            uChoice: index,
            xTot: info.left,
            yTot: info.top,
            wTot: info.width,
            hTot: info.height,
            objects: group._objects
        })
        info._objects.forEach((el)=>{
            window.open(`http://localhost:4000?${k}`,'_blank')
            k++
        })
        
    } 
})

canvas.on({
    'object:moving': change,
    'object:scaling': change,
    'mouse:over': change,
    'mouse:dblclick': receiveInput,
    'mouse:dblclick': receiveInput,
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

function receiveInput(obj){
    const wIn = document.getElementById('inputW')
    const hIn = document.getElementById('inputH') 
    wIn.style.display = 'block'
    hIn.style.display = 'block'
    wIn.addEventListener('keypress',(key)=>{
        if(key.key == 'Enter'){
            console.log(obj.target)
            console.log(wIn.value)
            obj.target.scaleX = wIn.value/obj.target.width
            
        }
    })
    hIn.addEventListener('keypress',(key)=>{
        if(key.key == 'Enter'){
            console.log(obj.target)
            console.log(hIn.value)
            obj.target.scaleY = hIn.value/obj.target.height
            
        }
    })

}

canvas.renderAll();