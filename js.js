var c= document.getElementById('mycanvas')
var ctx = c.getContext('2d')
ctx.translate(0, 700)
ctx.scale(1, -1)
var mouse = {x:0,y:0}
var Globalrays = []
var Globalrays2 = []
var Globalrays3 = []
//define world boundries
World2D.World.push(new World2D.Shape({x:0,y:0},
	[{x:100,y:c.height-100},{x:c.width-100,y:c.height-100},{x:c.width-100,y:100},{x:100,y:100}]
	))

World2D.World.push(new World2D.Shape({x:500,y:350},
	[{x:-50,y:50},{x:50,y:50},{x:50,y:-50},{x:-50,y:-50}]
	))

World2D.World.push(new World2D.Shape({x:200,y:300},
	[{x:-50,y:50},{x:80,y:50},{x:50,y:-50},{x:-50,y:-50}]
	))

World2D.World.push(new World2D.Shape({x:600,y:500},
	[{x:-100,y:50},{x:50,y:50},{x:50,y:-50},{x:-50,y:-100}]
	))

World2D.World.push(new World2D.Shape({x:800,y:200},
	[{x:-50,y:50},{x:50,y:50},{x:50,y:-50},{x:-50,y:-50}]
	))

World2D.World.push(new World2D.Shape({x:600,y:200},
	[{x:-50,y:-50},{x:0,y:50},{x:50,y:-50}]
	))


function rendermain(){
	wipescreen()
	rendershapes()
	//renderrays()
	fillrays()
	fillrays2()
	fillrays3()
}
function wipescreen(){
	ctx.fillStyle="rgb(255,255,255)"
	ctx.fillRect(0,0,c.width,c.height)
}
function rendershapes(){
	for(var i=0;i<World2D.World.length;i++){
		for(var p=0;p<World2D.World[i].planes.length;p++){
			var plane = World2D.World[i].planes[p]
				ctx.strokeStyle="rgb(0,0,0)"
				ctx.beginPath()
				ctx.moveTo(plane.A.x,plane.A.y)
				ctx.lineTo(plane.B.x,plane.B.y)
				ctx.closePath()
				ctx.stroke()
		}
	}
}
function renderrays(){
	for(var i=0;i<Globalrays.length;i++){
		ctx.strokeStyle="rgb(255,0,0)"
				ctx.beginPath()
				ctx.moveTo(Globalrays[i].origin.x,Globalrays[i].origin.y)
				ctx.lineTo(Globalrays[i].origin.x+Globalrays[i].direction.x*Globalrays[i].time,Globalrays[i].origin.y+Globalrays[i].direction.y*Globalrays[i].time)
				ctx.closePath()
				ctx.stroke()
	}
	Globalrays  = [ ]
}
function fillrays(){
	ctx.fillStyle = "rgb(0,0,0)"
	ctx.fillRect(0,0,c.width,c.height)
	for(var i=0;i<Globalrays.length;i++){
		var A = i
		var B = (Globalrays.length-1 == i)? 0:i+1
		ctx.fillStyle="rgba(162,255,0,.2)"
		ctx.beginPath()
		ctx.moveTo(Globalrays[A].origin.x,Globalrays[A].origin.y)
		ctx.lineTo(Globalrays[A].origin.x+Globalrays[A].direction.x*Globalrays[A].time,Globalrays[A].origin.y+Globalrays[A].direction.y*Globalrays[A].time)
		ctx.lineTo(Globalrays[B].origin.x+Globalrays[B].direction.x*Globalrays[B].time,Globalrays[B].origin.y+Globalrays[B].direction.y*Globalrays[B].time)
		ctx.lineTo(Globalrays[A].origin.x,Globalrays[A].origin.y)
		ctx.closePath()
		ctx.fill()
	}
		
	Globalrays  = [ ]
}
function fillrays2(){
	for(var i=0;i<Globalrays2.length;i++){
		var A = i
		var B = (Globalrays2.length-1 == i)? 0:i+1
		ctx.fillStyle="rgba(180,50,0,.2)"
		ctx.beginPath()
		ctx.moveTo(Globalrays2[A].origin.x,Globalrays2[A].origin.y)
		ctx.lineTo(Globalrays2[A].origin.x+Globalrays2[A].direction.x*Globalrays2[A].time,Globalrays2[A].origin.y+Globalrays2[A].direction.y*Globalrays2[A].time)
		ctx.lineTo(Globalrays2[B].origin.x+Globalrays2[B].direction.x*Globalrays2[B].time,Globalrays2[B].origin.y+Globalrays2[B].direction.y*Globalrays2[B].time)
		ctx.lineTo(Globalrays2[A].origin.x,Globalrays2[A].origin.y)
		ctx.closePath()
		ctx.fill()
	}
		
	Globalrays2  = [ ]
}
function fillrays3(){
	for(var i=0;i<Globalrays3.length;i++){
		var A = i
		var B = (Globalrays3.length-1 == i)? 0:i+1
		ctx.fillStyle="rgba(50,20,200,.2)"
		ctx.beginPath()
		ctx.moveTo(Globalrays3[A].origin.x,Globalrays3[A].origin.y)
		ctx.lineTo(Globalrays3[A].origin.x+Globalrays3[A].direction.x*Globalrays3[A].time,Globalrays3[A].origin.y+Globalrays3[A].direction.y*Globalrays3[A].time)
		ctx.lineTo(Globalrays3[B].origin.x+Globalrays3[B].direction.x*Globalrays3[B].time,Globalrays3[B].origin.y+Globalrays3[B].direction.y*Globalrays3[B].time)
		ctx.lineTo(Globalrays3[A].origin.x,Globalrays3[A].origin.y)
		ctx.closePath()
		ctx.fill()
	}
		
	Globalrays3  = [ ]
}
setInterval(loop,17)
//loop()
function loop(){
///*
for(var i=0;i<Math.PI*2;i+=Math.PI*2/500){
var tempray = new Ray2D.Ray(mouse,{x:Math.cos(i),y:Math.sin(i)})
tempray.time= Caster2D.raycollide(tempray)
Globalrays.push(tempray) 
}
for(var i=0;i<Math.PI*2;i+=Math.PI*2/500){
var tempray = new Ray2D.Ray({x:200,y:200},{x:Math.cos(i),y:Math.sin(i)})
tempray.time= Caster2D.raycollide(tempray)
Globalrays2.push(tempray) 
}
for(var i=0;i<Math.PI*2;i+=Math.PI*2/500){
var tempray = new Ray2D.Ray({x:800,y:400},{x:Math.cos(i),y:Math.sin(i)})
tempray.time= Caster2D.raycollide(tempray)
Globalrays3.push(tempray) 
}
//*/


/*
var temprays = Caster2D.generaterays(mouse)
for(var i=0;i<temprays.length;i++){
	var tempray = temprays[i]
	tempray.time = Caster2D.raycollide(tempray)
	Globalrays2.push(tempray)
}
*/




rendermain()
}
window.addEventListener("mousemove",mousemove,true)

function mousemove(e){
	mouse.x = e.pageX
	mouse.y = -e.pageY + 700
}

//var haray = new Ray2D.Ray({x:200,y:0},{x:-1,y:0})
//var haplane = new Plane2D.Plane({x:100,y:100})
//var plane = World2D.World[0].planes[3]