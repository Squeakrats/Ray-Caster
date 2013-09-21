var Vector2D = {}
Vector2D.add = function( vec1 , vec2 ){
 	return({x:vec1.x+vec2.x,y:vec1.y+vec2.y })
}
Vector2D.subtract = function( vec1 , vec2 ){
	return({x:vec1.x-vec2.x,y:vec1.y-vec2.y })
}
Vector2D.dotProduct = function( vec1 , vec2 ){
	return(vec1.x*vec2.x + vec1.y*vec2.y)
}
Vector2D.length = function( vec1 ){
	return(Math.sqrt(vec1.x*vec1.x + vec1.y*vec1.y))
}
Vector2D.normal = function( vec1  ){
	return({x:-vec1.y,y:vec1.x})
}
Vector2D.scale = function( vec1 , scale ){
	return({x:vec1.x*scale,y:vec1.y*scale})
}

var Ray2D = {}
Ray2D.Ray = function(origin,direction){
	this.origin = origin
	this.direction = direction
	this.time = null
}

var Plane2D = {}
Plane2D.Plane = function(origin,plane,edgelength,normal,A,B){
	this.origin = origin
	this.plane = plane
	this.normal = normal
	this.edgelength =edgelength
	this.A = A
	this.B = B
}

var Caster2D = {}
Caster2D.generaterays = function(origin){
	//generate all angles
	var allverts = []
	for(var i=0;i<World2D.World.length;i++){ 
		for(var v=0;v<World2D.World[i].vertices.length;v++){
			allverts.push(World2D.World[i].vertices[v])
		}
	}

	//generate all rays
	var allrays = []
	for(var i=0;i<allverts.length;i++){
		allrays[i] = Vector2D.subtract(allverts[i],origin)
		allrays[i] = Vector2D.scale(allrays[i],1/Vector2D.length(allrays[i])) 
		allrays[i] = {
			angle:Math.atan(allrays[i].y/allrays[i].x) , 
			ray:allrays[i]
		}
		if(origin.x<allverts[i].x){
			allrays[i].angle+=Math.PI
		}
	}
	//console.log(allrays)
	allrays.sort(function(a,b){return (a.angle-b.angle)})
	//convert to actual rays
	for(var i=0;i<allrays.length;i++){
		allrays[i] = new Ray2D.Ray(origin,allrays[i].ray)
	}
	return(allrays)
}
Caster2D.cast = function(ray,plane){
	return(Vector2D.dotProduct(plane.normal,Vector2D.subtract(plane.origin,ray.origin))/Vector2D.dotProduct(ray.direction,plane.normal))
}
Caster2D.raycollide = function(ray){
	var Times = []
	for(var i=0;i<World2D.World.length;i++){
		for(var p=0;p<World2D.World[i].planes.length;p++){
			Times.push({
				plane:World2D.World[i].planes[p],
				time:Caster2D.cast(ray,World2D.World[i].planes[p])
			})
		}
	}
	
	Times.sort(function(a,b){return(a.time-b.time)})
	for(var i=0;i<Times.length;i++){
		if(Times[i].time>=0){
			var Q = Vector2D.add(ray.origin,Vector2D.scale(ray.direction,Times[i].time))
			if(World2D.onplanesoft(Q,Times[i].plane)==true){
				return(Times[i].time)
				break
			}
		}
	}
}

var World2D = {}
World2D.World = []
World2D.Shape = function(position,vertices){
	for(var v=0;v<vertices.length;v++){
		vertices[v].x+=position.x
		vertices[v].y+=position.y
	}
	this.vertices = vertices
	this.planes = []
	for(var i=0;i<vertices.length;i++){
		var A = vertices[i]
		var B = vertices[(vertices.length-1 == i)? 0:i+1]
		var origin = A
		var plane = Vector2D.subtract(B,A)
		var edgelength = Vector2D.length(plane)
			plane = Vector2D.scale(plane,1/edgelength)
		var normal = Vector2D.normal(plane)
		this.planes[i] = new Plane2D.Plane(origin,plane,edgelength,normal,A,B)
	}
}
World2D.makeUVs = function(Q,plane,edgelength,A,B){
	return({
		U:Vector2D.dotProduct(Vector2D.subtract(B,Q),plane)/edgelength,
		V:Vector2D.dotProduct(Vector2D.subtract(Q,A),plane)/edgelength
	})
}
World2D.onplaneharsh = function(Q,plane){
	var UVs = World2D.makeUVs(Q,plane.plane,plane.edgelength,plane.A,plane.B)
	if(UVs.U>=0 && UVs.V>=0){
		return true
	}else{
		return false
	}
}
World2D.onplanesoft = function(Q,plane){
	var UVs = World2D.makeUVs(Q,plane.plane,plane.edgelength,plane.A,plane.B)
	if(UVs.U>0 && UVs.V>0){
		return true
	}else{
		return false
	}
}


