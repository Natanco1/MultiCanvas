const canvas = new fabric.Canvas('mog', {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
});

const red = new fabric.Rect({
    id: 'cyan',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    fill: 'cyan'
});

const green = new fabric.Rect({
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

}

function resized(obj){
    var width = obj.target.scaleX*obj.target.width
    var height = obj.target.scaleY*obj.target.height
    console.log(width)
    console.log(height)

}

canvas.add(red);
canvas.add(green);




canvas.renderAll();

