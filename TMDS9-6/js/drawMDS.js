	var svg_MDS;
	var svg_Pack;
	var rotate_center;
	var rotate_cenclusternum;
	var rotate_cradius;
	var rotate_packdata;
	var rotate_xScale;
	var rotate_yScale;	

	var clusColor1 =
                     ["#1b7837", "#9970ab", "#762a8c", "#5aae61",
                      "#8c510a", "#bf812d", "#c51b7d", "#de77ae" ,
                      "#e6f598"];
                     //["#e66101", "#5e3c99", "#a6611a", "#018571",
	                 //"#008837", "#d01c8b", "#ca0020", "#0571b0" , 
	                 //"#202020"];
	var clusColor2 =["#fdb863", "#b2abd2", "#dfc27d", "#80cdc1",
	                 "#a8d8b7", "#f1b6da", "#f4a582", "#92c5de",
	                 "#bababa"];
	var svgt = d3.select("#hcluster_control").append("svg").attr("id", "draw_MDS11").attr("width", 480).attr("height", 40).attr("transform", "translate(130,0)");
	var at = d3.rgb("#197DB8");
	var bt = d3.rgb("#E37685");//#fbaf5a
	var ct = d3.rgb("#CA1029"); //#f16c4d
	var defs = svgt.append("defs");
	var linearGradient = defs.append("linearGradient").attr("id", "linearColor").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
	var stop1 = linearGradient.append("stop").attr("offset", "0%").style("stop-color", ct.toString());
	var stop2 = linearGradient.append("stop").attr("offset", "50%").style("stop-color", bt.toString());
	var stop3 = linearGradient.append("stop").attr("offset", "100%").style("stop-color", at.toString());
	var colorRect = svgt.append("rect").attr("x", 0).attr("y", 15).attr("width", 480).attr("height", 15)
                        .style("fill", "url(#" + linearGradient.attr("id") + ")");

	function drawMDS(){
		d3.select("#draw_MDS").remove();		
		var year2 = year - 1952;
		var data2 = array[year2];
		var width = 500, height = 500, padding = {top: 65, bottom: 65, right: 65, left: 65}, radius1 = 5, radius2 = 7;
		svg_MDS = d3.select("#MDS").append("svg").attr("id", "draw_MDS").attr("width", width).attr("height", height);
				
		var rect = svg_MDS.append("rect").attr("x", padding.left).attr("y", padding.top).attr("width", width - padding.right - padding.left).attr("height", height - padding.top - padding.bottom).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1);
		var defs = svg_MDS.append("defs");
		var arrowMarker = defs.append("marker").attr("id","arrow").attr("markerUnits","strokeWidth").attr("markerWidth","12").attr("markerHeight","12").attr("viewBox","0 0 12 12").attr("refX","6").attr("refY","6").attr("orient","auto");
		var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
		arrowMarker.append("path").attr("d",arrow_path).attr("fill","#000");
		var rotate_yScale2;
					
		if(year == 1952){
			var rectwidth = data2.rectwidth;
			rotate_xScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, width - padding.right - padding.left]);
			rotate_yScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, height - padding.top - padding.bottom]);
			rotate_yScale2 = d3.scale.linear().domain([-rectwidth, rectwidth]).range([height - padding.top - padding.bottom, 0]);
		}else{			
			var max = 0;			
			for(var i = 0; i < data2.newdatapoint.length; i++){
				if(Math.abs(data2.newdatapoint[i].x) > max) max = Math.abs(data2.newdatapoint[i].x);
				if(Math.abs(data2.newdatapoint[i].y) > max) max = Math.abs(data2.newdatapoint[i].y);
			}
			var width_rect = [max, data2.rectwidth, array[year2 - 1].rectwidth];
			var rectwidth = d3.max(width_rect);
			rotate_xScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, width - padding.right - padding.left]);
			rotate_yScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, height - padding.top - padding.bottom]);
			rotate_yScale2 = d3.scale.linear().domain([-rectwidth, rectwidth]).range([height - padding.top - padding.bottom, 0]);
		}					
		var threshold = yuzhi * 10;
		rotate_packdata = array[year2].hcdata[threshold];
		rotate_center = Centroids(rotate_packdata, rotate_xScale, rotate_yScale);
		rotate_cradius = cenRadius(rotate_packdata, rotate_center, rotate_xScale, rotate_yScale);
	
		if(year == 1952){
			var points2 = svg_MDS.selectAll("#points2")
				.data(data2).enter().append("circle")
				.attr("id", "rotate_MDS")
				.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
				.attr("cx", function(d){ return rotate_xScale(d.x); })
				.attr("cy", function(d){ return rotate_yScale(d.y); })
				.attr("r", radius1).attr("fill", function(d){return d.color;})
				
		}else{		
			var data = array[year2 - 1];			
			var points = svg_MDS.selectAll("#points").data(data).enter().append("circle").attr("id", "rotate_MDS").attr("transform", "translate(" + padding.left + "," + padding.top + ")").attr("cx", function(d){ return rotate_xScale(d.x); }).attr("cy", function(d){ return rotate_yScale(d.y); }).attr("r", radius1).attr("fill", function(d){return d.color;})
			for(var i = 0; i < data.length; i++){
				for(var j = 0; j < data2.length; j++){
					if(data[i].name == data2[j].name){
						svg_MDS.append("line").attr("transform", "translate(" + padding.left + "," + padding.top + ")").attr("x1", rotate_xScale(data2[j].x)).attr("y1", rotate_yScale(data2[j].y)).attr("x2", rotate_xScale(data[i].x)).attr("y2", rotate_yScale(data[i].y)).attr("stroke", "black").attr("stroke-width", 1).attr("fill", "#ccc").attr("marker-end", "url(#arrow)");
						break;
					}
				}
			}							   
			var points2 = svg_MDS.selectAll("circle2").data(data2).enter().append("circle").attr("transform", "translate(" + padding.left + "," + padding.top + ")").attr("cx", function(d){ return rotate_xScale(d.x); }).attr("cy", function(d){ return rotate_yScale(d.y); }).attr("r", radius2).attr("fill", function(d){return d.color;})
	}	
		var xAxis = d3.svg.axis().scale(rotate_xScale).orient("bottom");
		svg_MDS.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")").call(xAxis);
	    var yAxis = d3.svg.axis().scale(rotate_yScale2).orient("left");
		svg_MDS.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left + "," + padding.top + ")").call(yAxis);
	}
	function drawMDS2(year, yuzhi){
		
		d3.select("#draw_MDS").remove();		
		var year2 = year - 1952, data2 = array[year2];
		var width = 500, height = 500, padding = {top: 65, bottom: 65, right: 65, left: 65};
		var radius1 = 5, radius2 = 7;
		
		svg_MDS = d3.select("#MDS").append("svg").attr("id", "draw_MDS").attr("width", width).attr("height", height);
				
		var rect = svg_MDS.append("rect").attr("x", padding.left).attr("y", padding.top).attr("width", width - padding.right - padding.left).attr("height", height - padding.top - padding.bottom).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1);
		var defs = svg_MDS.append("defs");
 		var arrowMarker = defs.append("marker").attr("id","arrow").attr("markerUnits","strokeWidth").attr("markerWidth","12").attr("markerHeight","12").attr("viewBox","0 0 12 12").attr("refX","6").attr("refY","6").attr("orient","auto");
		 
		var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";								
		arrowMarker.append("path").attr("d",arrow_path).attr("fill","#000");
		var rotate_yScale2;
					
		if(year == 1952){
			var rectwidth = data2.rectwidth;			
			rotate_xScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, width - padding.right - padding.left]);
			rotate_yScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, height - padding.top - padding.bottom]);
			rotate_yScale2 = d3.scale.linear().domain([-rectwidth, rectwidth]).range([height - padding.top - padding.bottom, 0]);
		}else{
			var max = 0;
			for(var i = 0; i < data2.newdatapoint.length; i++){
				if(Math.abs(data2.newdatapoint[i].x) > max) max = Math.abs(data2.newdatapoint[i].x);
				if(Math.abs(data2.newdatapoint[i].y) > max) max = Math.abs(data2.newdatapoint[i].y);
			}var width_rect = [max, data2.rectwidth, array[year2 - 1].rectwidth];
			var rectwidth = d3.max(width_rect);
			rotate_xScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, width - padding.right - padding.left]);
			rotate_yScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, height - padding.top - padding.bottom]);
			rotate_yScale2 = d3.scale.linear().domain([-rectwidth, rectwidth]).range([height - padding.top - padding.bottom, 0]);
		}
					
		var threshold = yuzhi * 10;
		
		rotate_packdata = array[year2].hcdata[threshold];
		rotate_center = Centroids(rotate_packdata, rotate_xScale, rotate_yScale);
		rotate_cradius = cenRadius(rotate_packdata, rotate_center, rotate_xScale, rotate_yScale);
		if(year == 1952){
			var points2 = svg_MDS.selectAll("#points2")
							   .data(data2)
							   .enter()
							   .append("circle")
							   .attr("id", "rotate_MDS")
							   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
							   .attr("cx", function(d){ return rotate_xScale(d.x); })
							   .attr("cy", function(d){ return rotate_yScale(d.y); })
							   .attr("r", 2)
							   .attr("fill", "#515151");
			
		}else{var data = array[year2 - 1];
			for(var i = 0; i < rotate_datapoint.length; i++){
				var x1, x2, y1, y2;
				for(var j = 0; j < rotate_datapoint[i].length; j++){
					x2 = rotate_xScale(rotate_datapoint[i][j].x);
					y2 = rotate_yScale(rotate_datapoint[i][j].y);
					for(var k = 0; k < data.length; k++){
						if(data[k].name == rotate_datapoint[i][j].name){
							x1 = rotate_xScale(data[k].x);
							y1 = rotate_yScale(data[k].y);								
							dataColor2(x1, y1, x2, y2);
							break;
						}
					}					
					svg_MDS.append("circle")
                           .attr("cx", x2)
						   .attr("cy", y2)
						   .attr("r", 2)
						   .attr("fill", "#515151")
						   .attr("transform", "translate(" + padding.left + "," + padding.top + ")");
				}
			}
		}				
		var xAxis = d3.svg.axis()
		             .scale(rotate_xScale)
					 .orient("bottom");
		svg_MDS.append("g")
		       .attr("class", "axis")
			   .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
			   .call(xAxis);
		var yAxis = d3.svg.axis()
		             .scale(rotate_yScale2)
					 .orient("left");
					 
		svg_MDS.append("g")
		       .attr("class", "axis")
			   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
			   .call(yAxis);
	}
	function rotateMDS(rotateangle, rotate_packdata, rotate_cenclusternum, rotate_center, rotate_cradius, rotate_xScale, rotate_yScale){
		d3.selectAll("#rotate_MDS").remove();
		var padding = {top: 65, bottom: 65, right: 65, left: 65};
		var radius1 = 5;
		var radius2 = 7;
		
		for(var i = 0; i < rotate_packdata.length; i++){
			if(i == rotate_cenclusternum) {
				
				if(year != 1952){
					var data = array[year - 1953];
					for(var j = 0; j < data.length; j++){
						for(var k = 0; k < rotate_packdata[i].length; k++){
							if(rotate_packdata[i][k].name == data[j].name){
								svg_MDS.append("circle")
									   .attr("id", "rotate_MDS")
									   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
									   .attr("cx", rotate_xScale(data[j].x))
									   .attr("cy", rotate_yScale(data[j].y))
									   .attr("r", radius1)
									   .attr("fill", data[j].color);
							}
						}
					}
				}
				
				svg_MDS.append("circle")
					   .attr("id", "rotate_MDS")
					   .attr("cx", rotate_center[i][0] - rotate_xScale(0))
					   .attr("cy", rotate_center[i][1] - rotate_yScale(0))
					   .attr("r", rotate_cradius[i] + 2*radius2)
					   .attr("fill", "yellow")
					   .attr("fill-opacity",.25)
					   .attr("transform", "translate(" + (padding.left + rotate_xScale(0)) + "," + (padding.top + rotate_yScale(0)) + ")rotate(" + rotateangle + ")");
				
				svg_MDS.append("circle")
					   .attr("id", "rotate_MDS")
					   .attr("cx", rotate_center[i][0] - rotate_xScale(0))
					   .attr("cy", rotate_center[i][1] - rotate_yScale(0))
					   .attr("r", 2)
					   .attr("transform", "translate(" + (padding.left + rotate_xScale(0)) + "," + (padding.top + rotate_yScale(0)) + ")rotate(" + rotateangle + ")");
					   
				for(var j = 0; j < rotate_packdata[i].length; j++){
					for(var k = 0; k < array[year - 1952].newdatapoint.length; k++){
						if(array[year - 1952].newdatapoint[k].name == rotate_packdata[i][j].name){
							svg_MDS.append("line")
								   .attr("id", "rotate_MDS")
								   .attr("transform", "translate(" + (padding.left + rotate_xScale(0)) + "," + (padding.top + rotate_yScale(0)) + ")rotate(" + rotateangle + ")")
								   .attr("x1", rotate_xScale(array[year - 1952].newdatapoint[k].x) - rotate_xScale(0))
									.attr("y1", rotate_yScale(array[year - 1952].newdatapoint[k].y) - rotate_yScale(0))
									.attr("x2", rotate_center[i][0] - rotate_xScale(0))
									.attr("y2", rotate_center[i][1] - rotate_yScale(0))
									.attr("stroke", "black")
									.attr("stroke-width", 1);
									
									
							svg_MDS.append("line")
								   .attr("id", "rotate_MDS")
								   .attr("transform", "translate(" + (padding.left + rotate_xScale(0)) + "," + (padding.top + rotate_yScale(0)) + ")rotate(" + rotateangle + ")")
								   .attr("x1", rotate_xScale(array[year - 1952].newdatapoint[k].x) - rotate_xScale(0))
									.attr("y1", rotate_yScale(array[year - 1952].newdatapoint[k].y) - rotate_yScale(0))
									.attr("x2", rotate_center[i][0] - rotate_xScale(0))
									.attr("y2", rotate_center[i][1] - rotate_yScale(0))
									.attr("stroke", "black")
									.attr("stroke-width", 1);
									
							svg_MDS.append("circle")
								   .attr("id", "rotate_MDS")
								   .attr("transform", "translate(" + (padding.left + rotate_xScale(0)) + "," + (padding.top + rotate_yScale(0)) + ")rotate(" + rotateangle + ")")
								   .attr("cx", rotate_xScale(array[year - 1952].newdatapoint[k].x) - rotate_xScale(0))
								   .attr("cy", rotate_yScale(array[year - 1952].newdatapoint[k].y) - rotate_yScale(0))
								   .attr("r", radius2)
								   .attr("fill", rotate_packdata[i][j].color);
						}
					}
					
					
				}
			}
			else{
				svg_MDS.append("circle")
					   .attr("id", "rotate_MDS")
					   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
					   .attr("cx", rotate_center[i][0])
					   .attr("cy", rotate_center[i][1])
					   .attr("r", rotate_cradius[i] + 2*radius2)
					   .attr("fill", "steelblue")
					   .attr("fill-opacity",.15)
					   
				svg_MDS.append("circle")
					   .attr("id", "rotate_MDS")
					   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
					   .attr("cx", rotate_center[i][0])
					   .attr("cy", rotate_center[i][1])
					   .attr("r", 2)
					   .attr("fill", "black")
					   .attr("fill-opacity",.15);
					   
				
				for(var j = 0; j < rotate_packdata[i].length; j++){
					for(var k = 0; k < array[year - 1952].newdatapoint.length; k++){
						if(array[year - 1952].newdatapoint[k].name == rotate_packdata[i][j].name){
							svg_MDS.append("line")
								   .attr("id", "rotate_MDS")
								   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
								   .attr("x1", rotate_xScale(array[year - 1952].newdatapoint[k].x))
									.attr("y1", rotate_yScale(array[year - 1952].newdatapoint[k].y))
									.attr("x2", rotate_center[i][0])
									.attr("y2", rotate_center[i][1])
									.attr("stroke", "black")
									.attr("stroke-width", 1);
									
							svg_MDS.append("circle")
								   .attr("id", "rotate_MDS")
								   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
								   .attr("cx", rotate_xScale(array[year - 1952].newdatapoint[k].x))
								   .attr("cy", rotate_yScale(array[year - 1952].newdatapoint[k].y))
								   .attr("r", radius2)
								   .attr("fill", rotate_packdata[i][j].color);
						}
					}
					
				}
				
			}
		}
	}
	//计算质心
	function Centroids(data, xScale, yScale){
		var centroids = new Array();
		for(var i = 0; i < data.length; i++){
			var sumX = 0;
			var sumY = 0;
			var len = 0;
			for( var j = 0; j < data[i].length; j++){
				for(var k = 0; k < array[i].newdatapoint.length; k++){
					if(array[i].newdatapoint[k].name == data[i][j].name){
						sumX += xScale(array[i].newdatapoint[k].x);
						sumY += yScale(array[i].newdatapoint[k].y);
						len++;
						break;
					}
				}
					
			}
			sumX = sumX/len;
			sumY = sumY/len;
			centroids[i] = [sumX, sumY];
		}
		return centroids;
	}
	//计算半径
	function cenRadius(data, centroids, xScale, yScale){
					   
		var r = new Array();
		for( var i = 0; i < centroids.length; i++ ){
			r[i] = 0;
			for(var j = 0; j < data[i].length; j++){
				for(var k = 0; k < array[i].newdatapoint.length; k++){
					if(array[i].newdatapoint[k].name == data[i][j].name){
						var dis = distance(xScale(array[i].newdatapoint[k].x), centroids[i][0], yScale(array[i].newdatapoint[k].y), centroids[i][1]);
						if(dis > r[i]) r[i] = dis;
					}
				}
				
			}
		}
		return r;
	}
	function distance(x1, x2, y1, y2){
		return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
	}
	function dataColor2(x1, y1, x2, y2){
		
		var padding = {top: 65, bottom: 65, right: 65, left: 65};
		
		var a = d3.rgb(204, 204, 204);
		var b = d3.rgb(81, 81, 81);
		
		var computeColor = d3.interpolate(a, b);
		
		var defs2 = svg_MDS.append("defs");
		
		var linearGradient = defs2.append("linearGradient")
		                         .attr("id", "linearColor")
								 .attr("x1", "0%")
								 .attr("y1", "0%")
								 .attr("x2", "100%")
								 .attr("y2", "0%");
								 
		var stop1 = linearGradient.append("stop")
		                          .attr("offset", "0%")
								  .style("stop-color", a.toString());
								  
		var stop2 = linearGradient.append("stop")
		                          .attr("offset", "100%")
								  .style("stop-color", b.toString());
				
		svg_MDS.append("line")
		   .attr("x1", x1)
		   .attr("y1", y1)
		   .attr("x2", x2)
		   .attr("y2", y2)
		   .attr("stroke-width", 2)
		   .attr("stroke", "url(#" + linearGradient.attr("id") + ")")
		   .attr("transform", "translate(" + padding.left + "," + padding.top + ")");
	}
	function drawMDS3(){		
		d3.select("#draw_MDS").remove();		
		var year2 = year - 1952;
		var data2 = array[year2];
		var width = 500, height = 500, padding = {top: 65, bottom: 65, right: 65, left: 65}, radius1 = 5, radius2 = 7;
		svg_MDS = d3.select("#MDS").append("svg").attr("id", "draw_MDS").attr("width", width).attr("height", height);
		var rect = svg_MDS.append("rect").attr("x", padding.left).attr("y", padding.top).attr("width", width - padding.right - padding.left).attr("height", height - padding.top - padding.bottom).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1);
						  
		var defs = svg_MDS.append("defs");
		var arrowMarker = defs.append("marker").attr("id","arrow").attr("markerUnits","strokeWidth").attr("markerWidth","12").attr("markerHeight","12").attr("viewBox","0 0 12 12").attr("refX","6").attr("refY","6").attr("orient","auto");
		var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";								
		arrowMarker.append("path").attr("d",arrow_path).attr("fill","#000");
		
		var rotate_yScale2;
					
		if(year == 1952){
			var rectwidth = data2.rectwidth;			
			rotate_xScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, width - padding.right - padding.left]);
			rotate_yScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, height - padding.top - padding.bottom]);
			rotate_yScale2 = d3.scale.linear().domain([-rectwidth, rectwidth]).range([height - padding.top - padding.bottom, 0]);
		}else{			
			var max = 0;			
			for(var i = 0; i < data2.newdatapoint.length; i++){
				if(Math.abs(data2.newdatapoint[i].x) * 1.5 > max) max = Math.abs(data2.newdatapoint[i].x)*1.5;
				if(Math.abs(data2.newdatapoint[i].y) * 1.5 > max) max = Math.abs(data2.newdatapoint[i].y)*1.5;
			}			
			var width_rect = [max, data2.rectwidth, array[year2 - 1].rectwidth];
			var rectwidth = d3.max(width_rect);			
			rotate_xScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, width - padding.right - padding.left]);						   
			rotate_yScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([0, height - padding.top - padding.bottom]);						   
			rotate_yScale2 =d3.scale.linear().domain([-rectwidth, rectwidth]).range([height - padding.top - padding.bottom, 0]);
		}

		var threshold = yuzhi * 10;		
		rotate_packdata = array[year2].hcdata[threshold];
				
		rotate_center = Centroids(rotate_packdata, rotate_xScale, rotate_yScale);
		rotate_cradius = cenRadius(rotate_packdata, rotate_center, rotate_xScale, rotate_yScale);
	
		if(year == 1952){	
			var points2 = svg_MDS.selectAll("#points2").data(data2).enter().append("circle").attr("id", "rotate_MDS").attr("transform", "translate(" + padding.left + "," + padding.top + ")").attr("cx", function(d){ return rotate_xScale(d.x); }).attr("cy", function(d){ return rotate_yScale(d.y); }).attr("r", radius1).attr("fill", function(d){return d.color;})
		}else{
			var data2 = data2.newdatapoint;
			var data = array[year2 - 1].newdatapoint;
			var points = svg_MDS.selectAll("#points")
							   .data(data)
							   .enter()
							   .append("circle")
							   .attr("id", "rotate_MDS")
							   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
							   .attr("cx", function(d){ return rotate_xScale(d.x); })
							   .attr("cy", function(d){ return rotate_yScale(d.y); })
							   .attr("r", radius1)
							   .attr("fill", function(d){return d.color;})
							   .style("opacity",0.8);
			for(var i = 0; i < data.length; i++){
				for(var j = 0; j < data2.length; j++){
					if(data[i].name == data2[j].name){
						svg_MDS.append("line")
							   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
							   .attr("x1", rotate_xScale(data2[j].x))
							   .attr("y1", rotate_yScale(data2[j].y))
							   .attr("x2", rotate_xScale(data[i].x))
							   .attr("y2", rotate_yScale(data[i].y))
							   .attr("stroke", "black")
							   .attr("stroke-width", 1)
							   .attr("fill", "#ccc")
							   .attr("marker-end", "url(#arrow)");
						break;							   
					}
				}
			}
							   
			var points2 = svg_MDS.selectAll("circle2")
							   .data(data2)
							   .enter()
							   .append("circle")
							   .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
							   .attr("cx", function(d){ return rotate_xScale(d.x); })
							   .attr("cy", function(d){ return rotate_yScale(d.y); })
							   .attr("r", radius2)
							   .attr("fill", function(d){return d.color;})
							   .style("opacity",0.9);
		   
		}		
		var xAxis = d3.svg.axis().scale(rotate_xScale).orient("bottom");
		svg_MDS.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")").call(xAxis);
	    var yAxis = d3.svg.axis().scale(rotate_yScale2).orient("left");
		svg_MDS.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left + "," + padding.top + ")").call(yAxis);
	}
	//Calculate circumcircle center and radius of triangle 
	function CircleForTriangle(points){
		var circumcircle ={};
		var cx = (points[0].x+points[1].x+points[2].x)/3;
		var cy = (points[0].y+points[1].y+points[2].y)/3;
		var r = 0;
		for(var i=0;i<points.length;i++){
			var tempx = points[i].x, tempy = points[i].y;
			var dis = Math.sqrt((cx-tempx)*(cx-tempx) +　(cy-tempy)*(cy-tempy));
			r = r>dis?r:dis; 
		}
		circumcircle.x = cx;
		circumcircle.y = cy;
		circumcircle.r = r;
		return circumcircle;
	}
	
	//Calculate circumcircle center and radius of Quadruple
	function CircleForQuad(points){
		var circumcircle ={};
		var maxX = -30000, maxY = -30000, minX = 30000, minY = 30000;
		var convexP = new Array();
		convexP[0]=0;convexP[1]=0;convexP[2]=0;convexP[3]=0; 
		for(var i=0;i<points.length;i++){
			if(maxX < points[i].x) {maxX　=　points[i].x;convexP[0] = i;}
			if(maxY < points[i].y) {maxY　=　points[i].y;convexP[1] = i;}
			if(minX > points[i].x) {minX　=　points[i].x;convexP[2] = i;}
			if(minY > points[i].y) {minY　=　points[i].y;convexP[3] = i;}
		}
		// Is contains three points
		var threeP = new Array();
		if(convexP[0] == convexP[1] || convexP[0] == convexP[2] || convexP[0] == convexP[3] ||
		   convexP[1] == convexP[2] || convexP[1] == convexP[3] || convexP[2] == convexP[3]){
			for(var i=0,j=0;i<4;i++){
				if(i == 0){
					threeP[j] = {};
					threeP[j].x = points[convexP[0]].x;
					threeP[j].y = points[convexP[0]].y;
					j++;
				}else if(i == 1 && convexP[1] != convexP[0]){
					threeP[j] = {};
					threeP[j].x = points[convexP[1]].x;
					threeP[j].y = points[convexP[1]].y;
					j++;
				}else if(i == 2 && convexP[2] != convexP[1] && convexP[2] != convexP[0]){
					threeP[j] = {};
					threeP[j].x = points[convexP[2]].x;
					threeP[j].y = points[convexP[2]].y;
					j++;
				}else if(i == 3 && convexP[3] != convexP[2] && convexP[3] != convexP[1] && convexP[3] != convexP[0]){
					threeP[j] = {};
					threeP[j].x = points[convexP[3]].x;
					threeP[j].y = points[convexP[3]].y;
					j++;
				}
			}
			if(threeP.length == 3)
				circumcircle = CircleForTriangle(threeP);
			else{
				circumcircle.x = (threeP[0].x + threeP[1].x)/2;
				circumcircle.y = (threeP[0].y + threeP[1].y)/2;
				circumcircle.r = Math.sqrt((threeP[0].x - threeP[1].x)*(threeP[0].x - threeP[1].x) + (threeP[0].y - threeP[1].y)*(threeP[0].y - threeP[1].y))/2;
			}
		}else{			
			var x1 = points[convexP[0]].x,y1 = points[convexP[0]].y,x2 = points[convexP[1]].x,y2 = points[convexP[1]].y,x3 = points[convexP[2]].x,y3 = points[convexP[2]].y,x4 = points[convexP[3]].x,y4 = points[convexP[3]].y;
			var l1 = Math.sqrt((x1-x3)*(x1-x3) + (y1-y3)*(y1-y3));
			var l2 = Math.sqrt((x2-x4)*(x2-x4) + (y2-y4)*(y2-y4));
			var cx,cy,r;
			if(l1 >l2){
				cx = (x1+x3)/2;cy = (y1+y3)/2;
				var dis1 = Math.sqrt((cx-x2)*(cx-x2) +　(cy-y2)*(cy-y2));				
				for(var i=0;i<points.length;i++){
					var tempx = points[i].x, tempy = points[i].y;
					var dis = Math.sqrt((cx-tempx)*(cx-tempx) +　(cy-tempy)*(cy-tempy));
					dis1 = dis1>dis?dis1:dis;
				}
				r = dis1;
			}else{
				cx = (x2+x4)/2;cy = (y2+y4)/2;
				var dis1 = Math.sqrt((cx-x1)*(cx-x1) +　(cy-y1)*(cy-y1));
				for(var i=0;i<points.length;i++){
					var tempx = points[i].x, tempy = points[i].y;
					var dis = Math.sqrt((cx-tempx)*(cx-tempx) +　(cy-tempy)*(cy-tempy));
					dis1 = dis1>dis?dis1:dis;
				}
				r = dis1;
			}
			circumcircle.x=cx; circumcircle.y=cy; circumcircle.r =r;
		}
		return circumcircle;
	}
	//easy to compute for simple
	function trickCircle(points){
		var circumcircle = {};
		var cx = 0,cy = 0;
		for(var i=0; i<points.length;i++){
			cx += points[i].x/points.length;
			cy += points[i].y/points.length;
		}
		var r = 0;
		for(var i=0;i<points.length;i++){
			var tempx = points[i].x, tempy = points[i].y;
			var dis = Math.sqrt((cx-tempx)*(cx-tempx) +　(cy-tempy)*(cy-tempy));
			r = r>dis?r:dis; 
		}
		circumcircle.x = cx;
		circumcircle.y = cy;
		circumcircle.r = r;
		return circumcircle;
	}
	//compare the differents from adjacent years
	function findDifferents(c1,c2){
		var str="";
		if(c1.length > c2.length)
			str +="cluster from"+c2.length+"classes add to"+c1.length+"classes.";
		else if(c1.length < c2.length)
			str +="cluster from"+c2.length+"classes sub to"+c1.length+"classes.";
		else
			str +="cluster number still to：" + c1.length + "classes.";
		var changeStatus = new Array();
		for(var i=0;i<c1.length;i++)
			changeStatus[i] = 0;
		for(var i=0;i<c1.length;i++){
			for(var j=0;j<c2.length;j++){				
				if(c1[i].length != c2[j].length)
					continue;
				var matchLen = 0;
				for(var ci=0;ci<c1[i].length;ci++)
					for(var cj=0;cj<c2[j].length;cj++)
						if(c1[i][ci].name == c2[j][cj].name)
							matchLen ++;
				if(matchLen == c1[i].length){
					changeStatus[i] = 1;
					break;
				}
			}
		}
		for(var i=0;i<c1.length;i++){
			if(changeStatus[i] == 1){
				str +="Unchangeing classes have：[";
				break;
			}
		}
		for(var i=0;i<c1.length;i++){
			if(changeStatus[i] == 1){
				str += i +","
			}
		}
		for(var i=0;i<c1.length;i++){
			if(changeStatus[i] == 1){
				str +="].";
				break;
			}
		}
		for(var i=0;i<c1.length;i++){
			if(changeStatus[i] == 0){
				str +="Change class datapoints have:";
				break;
			}
		}
		for(var i=0;i<c1.length;i++){
			if(changeStatus[i] == 1)
				continue;
			var matchLen = 0;
			for(var j=0;j<c2.length;j++){
				for(var ci=0;ci<c1[i].length;ci++)
					for(var cj=0;cj<c2[j].length;cj++)
						if(c1[i][ci].name == c2[j][cj].name){
							matchLen ++;
							break;
						}
				if(matchLen > 0){
					var jump = new Array();
					if(c1[i].length >= c2[j].length){
						for(var l=0;l<c1[i].length;l++)
							jump[l] = 0;
						for(var ci=0;ci<c1[i].length;ci++)
							for(var cj=0;cj<c2[j].length;cj++)
								if(c1[i][ci].name == c2[j][cj].name){
									jump[ci] = 1;
									break;
								}			
						for(var l=0;l<c1[i].length;l++){
							if(jump[l] == 0){
								str += ch2en(c1[i][l].name);
							}
						}
						str += "new add in["+i+"]class";
					}
					if(c1[i].length < c2[j].length){
						for(var l=0;l<c2[j].length;l++)
							jump[l] = 0;
						for(var cj=0;cj<c2[j].length;cj++)
							for(var ci=0;ci<c1[i].length;ci++)
								if(c1[i][ci].name == c2[j][cj].name){
									jump[cj] = 1;
									break;
								}			
						for(var l=0;l<c2[j].length;l++){
							if(jump[l] == 0){
								str += ch2en(c2[j][l].name);
							}
						}
						str += "out of["+j+"]class";
					}					
					break;
				}
 			}
		}
		return str;
	}
	
	// draw movement cluster
	function drawMovementHcluster1(thresh,hyear){
		d3.select("#draw_hcluster1").remove();
		var year2 = hyear;		var data2,newC;
		if(isCurrent == "0") 	  data2 = array[year2].newdatapoint;
		else  if(isCurrent == "1")data2 = array[year2].currentPoint;
		else					  data2 = array[year2];
		newC = HclusterYear(data2)[thresh];
		var width = 650, height = 650;var padding = {top: 25, bottom: 25, right: 25, left: 25};
		var radius1;
		if(sizeType=="0")     radius1 = 3;
		else if(sizeType=="1")radius1 = 5;
		else				  radius1 = 10;
		var newhcluC = new Array();	var str = "";
		if (hcluster_year-1 >=0){
			if(isCurrent == 0) 	tempC = HclusterYear(array[year2-1].newdatapoint)[thresh];
			else    			tempC = HclusterYear(array[year2-1].currentPoint)[thresh];
			str = findDifferents(newC,tempC);
		}
	    var newstep = newC.length<10?Math.floor(9/newC.length):1;
	    for(var i=0;i<newC.length;i++){
	    	var col = clusColor1[(i*newstep)%9];
	    	switch(newC[i].length){
	    	case 1:{newhcluC[i] = {};newhcluC[i].x = newC[i][0].x;newhcluC[i].y = newC[i][0].y;newhcluC[i].r = 5;newhcluC[i].color = col;	break;}
	    	case 2:{newhcluC[i] = {};newhcluC[i].x = (newC[i][0].x + newC[i][1].x)/2;newhcluC[i].y = (newC[i][0].y + newC[i][1].y)/2;newhcluC[i].r = 10 + Math.sqrt((newC[i][0].x - newC[i][1].x)*(newC[i][0].x - newC[i][1].x) + (newC[i][0].y - newC[i][1].y)*(newC[i][0].y - newC[i][1].y));newhcluC[i].color = col;break;}
	    	case 3:{var C = CircleForTriangle(newC[i]);newhcluC[i] = {};newhcluC[i].x = C.x;newhcluC[i].y = C.y;newhcluC[i].r = 15 + C.r;newhcluC[i].color = col;break;}
	    	default:{var C = trickCircle(newC[i]);newhcluC[i] = {};newhcluC[i].x = C.x;newhcluC[i].y = C.y;newhcluC[i].r = 15 + C.r;newhcluC[i].color = col;break;}
	    	}
	    	newhcluC[i].provs = new Array();
	    	for(var j = 0;j < newC[i].length; j++)	newhcluC[i].provs[j] = newC[i][j].name;
	    }
	    for(var i=0;i<data2.length;i++){
		    for(var j=0;j<newhcluC.length;j++){
				for(var k=0;k<newhcluC[j].provs.length;k++){
					if(data2[i].name == newhcluC[j].provs[k])
						data2[i].color = newhcluC[j].color;
				}
			}
	    }
	    
	    var svg_Hcluster1 = d3.select("#hcluster1").append("svg").attr("id", "draw_hcluster1").attr("width", width).attr("height", height);
	    //var rect1 = svg_Hcluster1.append("rect").attr("x", padding.left).attr("y", padding.top).attr("width", width - padding.right - padding.left).attr("height", height - padding.top - padding.bottom).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1);
	    var rotate_yScale2;
		var max = 0;
		for(var i=0;i<data2.length;i++){
			if(Math.abs(data2[i].x) * 1.5 > max) max = Math.abs(data2[i].x)*1.5;
			if(Math.abs(data2[i].y) * 1.5 > max) max = Math.abs(data2[i].y)*1.5;
		}
		var width_rect = [max, data2.rectwidth];
		var rectwidth = d3.max(width_rect);				
		rotate_xScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([-200-padding.left, width+80]);						   
		rotate_yScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([-380, height+250]);						   
		
		if(hyear == 1952)		
			var points2 = svg_Hcluster1.selectAll("#points2").data(data2).enter().append("circle").attr("id", "rotate_MDS").attr("transform", "translate(" + padding.left + "," + padding.top + ")").attr("cx", function(d){ return rotate_xScale(d.x); }).attr("cy", function(d){ return rotate_yScale(d.y); }).attr("r", radius1).attr("fill", function(d){return d.color;})
			.on("mouseover", function (d, i) {
			    if (isdrawBar == "2") {
			        d3.selectAll("#statistic_class").text("Single item" + ch2en(d.name));
			        drawBar2(d.name);
			    }
			})
		else{
			var cluster_c = svg_Hcluster1.selectAll("clusterC")
				.data(newhcluC).enter().append("circle")
				.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
				.attr("cx", function(d){ return rotate_xScale(d.x); })
				.attr("cy", function(d){ return rotate_yScale(d.y); })
				.attr("r",  function(d){ return rotate_yScale(d.r)/40;})
				.attr("fill", function(d){return d.color;})
				.style("opacity",0.0)
				.on("mouseover", function (d, i) {
				    if (isdrawBar == "1") {
				        var str = "";
				        for (var j = 0; j < d.provs.length - 1; j++)
				            str += ch2en(d.provs[j]) + ",";
				        str += ch2en(d.provs[d.provs.length - 1]);
				        drawBar3(d.provs);
				    }
				});
			var points = svg_Hcluster1.selectAll("#points").data(data2).enter().append("circle").attr("id", "rotate_MDS").attr("transform", "translate(" + padding.left + "," + padding.top + ")").attr("cx", function(d){ return rotate_xScale(d.x); }).attr("cy", function(d){ return rotate_yScale(d.y); }).attr("r", radius1).attr("fill", function(d){return d.color;})
			.style("opacity",0.8)
			.on("mouseover", function (d, i) {
			    if (isdrawBar == "2") {
			        d3.selectAll("#statistic_class").text("Single item" + ch2en(d.name));
			        drawBar2(d.name);
			    }
			});
		}	
		/*var dataset = [-100,-50,0,50,100];
		var axis_scale = d3.scale.linear().domain([-100,100]).range([0, width - padding.right - padding.left]);						   
		var axis_scale1= d3.scale.linear().domain([-100,100]).range([height - padding.top - padding.bottom, 0]);
		var xAxis = d3.svg.axis().scale(axis_scale).orient("bottom");
		svg_Hcluster1.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")").call(xAxis);
		var yAxis = d3.svg.axis().scale(axis_scale1).orient("left");
	    svg_Hcluster1.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left + "," + padding.top + ")").call(yAxis);
	    appendMultiText(svg_Hcluster1,str,30,470,550,20,"arial");*/
		
	}
	
	//dynamic animation for points
	function drawMovementHcluster1Dynamic(thresh,hyear){		
		d3.select("#draw_hcluster1").remove();
		var width = 650, height = 650;var padding = {top: 25, bottom: 25, right: 25, left: 25};
		var radius1;
		if(sizeType=="0")     radius1 = 3;
		else if(sizeType=="1")radius1 = 5;
		else				  radius1 = 10;
		var year2 = hyear;		var data1,data2,newC,tempC;
		var newhcluC = new Array();	var str = "";
		if(isCurrent == "0") 	  data2 = array[year2].newdatapoint;
		else  if(isCurrent == "1")data2 = array[year2].currentPoint;
		else					  data2 = array[year2];
		newC = HclusterYear(data2)[thresh];
		if(year2 >=1){
			if(isCurrent == "0"){
				temp = array[year2-1].newdatapoint;	tempC = HclusterYear(temp)[thresh];
			}else if(isCurrent == "1"){
				temp = array[year2-1].currentPoint;	tempC = HclusterYear(temp)[thresh];
			}else{
				temp = array[year2-1];				tempC = HclusterYear(temp)[thresh];
			}
			str = findDifferents(newC,tempC);	
		}
		for(var i=0;i<data2.length;i++){
			data2[i].x1 = data2[i].x;
			data2[i].y1 = data2[i].x;
			for(var j=0;j<temp.length;j++){
				if(data2[i].name == temp[j].name){
					data2[i].x1 = temp[j].x;
					data2[i].y1 = temp[j].y;
					break;
				}
			}
			var dis = (data2[i].x1 - data2[i].x) * (data2[i].x1 - data2[i].x) +
					  (data2[i].y1 - data2[i].y) * (data2[i].y1 - data2[i].y);
			data2[i].dis = Math.sqrt(dis);
			for(var j=0;j<newC.length;j++){
				for(var k=0;k<newC[j].length;k++){
					if(data2[i].name == newC[j][k].name)
						data2[i].r = j;
				}
			}
		}

	    var newstep = newC.length<10?Math.floor(10/newC.length):1;
	    for(var i=0;i<newC.length;i++){
	    	var col = clusColor1[(i*newstep)%9];
	    	switch(newC[i].length){
	    	case 1:{newhcluC[i] = {};newhcluC[i].x = newC[i][0].x;newhcluC[i].y = newC[i][0].y;newhcluC[i].r = 5;newhcluC[i].color = col;	break;}
	    	case 2:{newhcluC[i] = {};newhcluC[i].x = (newC[i][0].x + newC[i][1].x)/2;newhcluC[i].y = (newC[i][0].y + newC[i][1].y)/2;newhcluC[i].r = 10 + Math.sqrt((newC[i][0].x - newC[i][1].x)*(newC[i][0].x - newC[i][1].x) + (newC[i][0].y - newC[i][1].y)*(newC[i][0].y - newC[i][1].y));newhcluC[i].color = col;break;}
	    	case 3:{var C = CircleForTriangle(newC[i]);newhcluC[i] = {};newhcluC[i].x = C.x;newhcluC[i].y = C.y;newhcluC[i].r = 15 + C.r;newhcluC[i].color = col;break;}
	    	default:{var C = trickCircle(newC[i]);newhcluC[i] = {};newhcluC[i].x = C.x;newhcluC[i].y = C.y;newhcluC[i].r = 15 + C.r;newhcluC[i].color = col;break;}
	    	}
	    	newhcluC[i].provs = new Array();
	    	for(var j = 0;j < newC[i].length; j++)	newhcluC[i].provs[j] = newC[i][j].name;
	    }
	    for(var i=0;i<data2.length;i++){
		    for(var j=0;j<newhcluC.length;j++){
				for(var k=0;k<newhcluC[j].provs.length;k++){
					if(data2[i].name == newhcluC[j].provs[k])
						data2[i].color = newhcluC[j].color;
				}
			}
	    }
	    
	    var svg_Hcluster1 = d3.select("#hcluster1").append("svg").attr("id", "draw_hcluster1").attr("width", width).attr("height", height);
	    //var rect1 = svg_Hcluster1.append("rect").attr("x", padding.left).attr("y", padding.top).attr("width", width - padding.right - padding.left).attr("height", height - padding.top - padding.bottom).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1);
	    var rotate_yScale2;	
		var max = 0;
		for(var i=0;i<data2.length;i++){
			if(Math.abs(data2[i].x) * 1.5 > max) max = Math.abs(data2[i].x)*1.5;
			if(Math.abs(data2[i].y) * 1.5 > max) max = Math.abs(data2[i].y)*1.5;
		}
		var width_rect = [max, data2.rectwidth];
		var rectwidth = d3.max(width_rect);				
		rotate_xScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([-200-padding.left, width+80]);						   
		rotate_yScale = d3.scale.linear().domain([-rectwidth, rectwidth]).range([-380, height+250]);						   
		
		if(hyear == 1952)		
			var points2 = svg_Hcluster1.selectAll("#points2").data(data2).enter().append("circle").attr("id", "rotate_MDS").attr("transform", "translate(" + padding.left + "," + padding.top + ")").attr("cx", function(d){ return rotate_xScale(d.x); }).attr("cy", function(d){ return rotate_yScale(d.y); }).attr("r", radius1).attr("fill", function(d){return d.color;})
			.on("mouseover", function (d, i) {
			    if (isdrawBar == "2") {
			        d3.selectAll("#statistic_class").text("Statistic single item:" + ch2en(d.name));
			        drawBar2(d.name);
			    }
			})
		else{			
			var cluster_c = svg_Hcluster1.selectAll("clusterC").data(newhcluC).enter().append("circle").attr("transform", "translate(" + padding.left + "," + padding.top + ")").attr("cx", function(d){ return rotate_xScale(d.x); }).attr("cy", function(d){ return rotate_yScale(d.y); }).attr("r",  function(d){ return rotate_yScale(d.r)/40;}).attr("fill", function(d){return d.color;}).style("opacity",0.0)
				.on("mouseover", function (d, i) {
				    if (isdrawBar == "1") {
				        var str = ""; for (var j = 0; j < d.provs.length - 1; j++) str += ch2en(d.provs[j]) + ","; str += ch2en(d.provs[d.provs.length - 1]);
				        drawBar3(d.provs);
				    }
				});
			var points = svg_Hcluster1.selectAll("#points").data(data2).enter()
			              .append("circle").attr("id", "rotate_MDS")
			              .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
			              .attr("cx", function(d){ return rotate_xScale(d.x1); })
			              .attr("cy", function(d){ return rotate_yScale(d.y1); })
			              .attr("r", radius1)
			              .attr("fill", function(d){return d.color;})
			              .style("opacity",0.8)			              
			              .on("mouseover", function (d, i) {
			                  if (isdrawBar == "2") {
			                      d3.selectAll("#statistic_class").text("Single item" + ch2en(d.name));
			                      drawBar2(d.name);
			                  }
			              })
			              .transition()
			              .duration(function(d){ return 1200*d.dis;})
			              .ease("linear")
			              .delay(function(d){ return 1200*d.r;})
			              .attr("cx", function(d){ return rotate_xScale(d.x); })
			              .attr("cy", function(d){ return rotate_yScale(d.y); })
			              .attr("fill", function(d){return d.color;});
			              
		}	
	
	}	
	
	//initial polygon based index 'k'
	function iniPolygon(k){
		if(sizeType == "0"){
			var p = {};	var pl = 2, pt = 0, hl = 3.3, h = 3.5*1.71;
			var a = Math.floor(k/192)*6*h;var j = k%192;
			switch(j){
			case 0: p.x = pl+3*hl;p.y = pt+1*h+a; break;
			case 1: p.x = pl+0*hl;p.y = pt+2*h+a; break;
			
			case 2: case 3: case 4: case 5: case 6: case 7:
			case 8: case 9: case 10:case 11:case 12:case 13:
			case 14:case 15:case 16:case 17:case 18:case 19:
			case 20:case 21:case 22:case 23:case 24:case 25:
			case 26:case 27:case 28:case 29:case 30:case 31:
			case 32:case 33:case 34:case 35:case 36:case 37:
			case 38:case 39:case 40:case 41:case 42:case 43:
			case 44:case 45:case 46:case 47:case 48:case 49:
			case 50:case 51:case 52:case 53:case 54:case 55:
			case 56:case 57:case 58:case 59:case 60:case 61:
			case 62:case 63:case 64:case 65:case 66:case 67:
			case 68:case 69:case 70:case 71:case 72:case 73:
			case 74:case 75:case 76:case 77:case 78:case 79:
			case 80:case 81:case 82:case 83:case 84:case 85:
			case 86:case 87:case 88:case 89:case 90:case 91:
			case 92:case 93:case 94:
				if(j%3 == 2)		{p.x = pl+(2*j-1)*hl; p.y = pt+3*h+a;}
				else if(j%3 == 0)	{p.x = pl+(2 * j)*hl; p.y = pt+2*h+a;}
				else				{p.x = pl+(2*j+1)*hl; p.y = pt+1*h+a;}
				break;
				
			case 95:p.x =pl+189*hl;p.y = pt+3*h+a; break;		
			case 96:p.x =pl+189*hl;p.y = pt+5*h+a; break;
			case 97:p.x =pl+186*hl;p.y = pt+4*h+a; break;
			
			
			case  98:case  99:case 100:case 101:case 102:case 103:
			case 104:case 105:case 106:case 107:case 108:case 109:
			case 110:case 111:case 112:case 113:case 114:case 115:
			case 116:case 117:case 118:case 119:case 120:case 121:
			case 122:case 123:case 124:case 125:case 126:case 127:
			case 128:case 129:case 130:case 131:case 132:case 133:
			case 134:case 135:case 136:case 137:case 138:case 139:
			case 140:case 141:case 142:case 143:case 144:case 145:
			case 146:case 147:case 148:case 149:case 150:case 151:
			case 152:case 153:case 154:case 155:case 156:case 157:
			case 158:case 159:case 160:case 161:case 162:case 163:
			case 164:case 165:case 166:case 167:case 168:case 169:
			case 170:case 171:case 172:case 173:case 174:case 175:
			case 176:case 177:case 178:case 179:case 180:case 181:
			case 182:case 183:case 184:case 185:case 186:case 187:
			case 188:case 189:case 190:
				if(j%3 == 2)	 {p.x = pl+(2*(191-j)  )*hl; p.y = pt+6*h+a;}
				else if(j%3 == 0){p.x = pl+(2*(191-j)-1)*hl; p.y = pt+5*h+a;}
				else			 {p.x = pl+(2*(191-j)-2)*hl; p.y = pt+4*h+a;}
				break;
			case 191:p.x = pl+0*hl;p.y = pt+6*h+a; break;
			}
		}
		
		else if(sizeType == "1"){
			var p = {};	var pl = 0, pt = 0, hl = 5.3, h = 5.85*1.685;
			var a = Math.floor(k/120)*6*h;var j = k%120;
			switch(j){
			case 0: p.x = pl+3*hl;p.y = pt+1*h+a; break;
			case 1: p.x = pl+0*hl;p.y = pt+2*h+a; break;
			
			case 2: case 3: case 4: case 5: case 6: case 7:
			case 8: case 9: case 10:case 11:case 12:case 13:
			case 14:case 15:case 16:case 17:case 18:case 19:
			case 20:case 21:case 22:case 23:case 24:case 25:
			case 26:case 27:case 28:case 29:case 30:case 31:
			case 32:case 33:case 34:case 35:case 36:case 37:
			case 38:case 39:case 40:case 41:case 42:case 43:
			case 44:case 45:case 46:case 47:case 48:case 49:
			case 50:case 51:case 52:case 53:case 54:case 55:
				if(j%3 == 2)		{p.x = pl+(2*j-1)*hl; p.y = pt+3*h+a;}
				else if(j%3 == 0)	{p.x = pl+(2 * j)*hl; p.y = pt+2*h+a;}
				else				{p.x = pl+(2*j+1)*hl; p.y = pt+1*h+a;}
				break;
				
			case 56:p.x =pl+111*hl;p.y = pt+3*h+a; break;		
			case 67:p.x =pl+111*hl;p.y = pt+5*h+a; break;
			case 58:p.x =pl+108*hl;p.y = pt+4*h+a; break;

			case 59:case 60:case 61:case 62:case 63:case 64:
			case 65:case 66:case 67:case 68:case 69:case 70:
			case 71:case 72:case 73:case 74:case 75:case 76:
			case 77:case 78:case 79:case 80:case 81:case 82:
			case 83:case 84:case 85:case 86:case 87:case 88:
			case 89:case 90:case 91:case 92:case 93:case 94:
			case 95:case 96:case 97:case 98:case 99:case 100:
			case 101:case 102:case 103:case 104:case 105:case 106:
			case 107:case 108:case 109:case 110:case 111:case 112:
				if(j%3 == 2)	 {p.x = pl+(2*(113-j)  )*hl; p.y = pt+6*h+a;}
				else if(j%3 == 0){p.x = pl+(2*(113-j)-1)*hl; p.y = pt+5*h+a;}
				else			 {p.x = pl+(2*(113-j)-2)*hl; p.y = pt+4*h+a;}
				break;
			case 113:p.x = pl+0*hl;p.y = pt+6*h+a; break;
			}
		}
		else{
			var p = {};	var pl = 0, pt = 0, hl = 10, h = 10.2*1.73;
			var a = Math.floor(k/60)*6*h;var j = k%60;
			switch(j){
			case 0: p.x = pl+3*hl;p.y = pt+1*h+a; break;
			case 1: p.x = pl+0*hl;p.y = pt+2*h+a; break;
			
			case 2: case 3: case 4: case 5: case 6: case 7:
			case 8: case 9: case 10:case 11:case 12:case 13:
			case 14:case 15:case 16:case 17:case 18:case 19:
			case 20:case 21:case 22:case 23:case 24:case 25:
			case 26:case 27:case 28:
				if(j%3 == 2)		{p.x = pl+(2*j-1)*hl; p.y = pt+3*h+a;}
				else if(j%3 == 0)	{p.x = pl+(2 * j)*hl; p.y = pt+2*h+a;}
				else				{p.x = pl+(2*j+1)*hl; p.y = pt+1*h+a;}
				break;
				
			case 29:p.x =pl+57*hl;p.y = pt+3*h+a; break;	
			case 30:p.x =pl+57*hl;p.y = pt+5*h+a; break;
			case 31:p.x =pl+54*hl;p.y = pt+4*h+a; break;

			case 32:case 33:case 34:case 35:case 36:case 37:
			case 38:case 39:case 40:case 41:case 42:case 43:
			case 44:case 45:case 46:case 47:case 48:case 49:
			case 50:case 51:case 52:case 53:case 54:case 55:
			case 56:case 57:case 58:
				if(j%3 == 2)	 {p.x = pl+(2*(59-j)  )*hl; p.y = pt+6*h+a;}
				else if(j%3 == 0){p.x = pl+(2*(59-j)-1)*hl; p.y = pt+5*h+a;}
				else			 {p.x = pl+(2*(59-j)-2)*hl; p.y = pt+4*h+a;}
				break;
			case 59:p.x = pl+0*hl;p.y = pt+6*h+a; break;
			}
		}
		
		
		return p;
	}
	// computer first point of polygons
	function clusterPolygon(oclass,hcXy){		
		var polygons = new Array();
		if(sizeType == "0"){
			for(var k=0;k<3167;k++){
	    		polygons[k] = {};
	    		var point = iniPolygon(k);   		polygons[k].x = point.x;    		polygons[k].y = point.y;
	    		polygons[k].color = "#fff";    		polygons[k].color1= "#fff";   		polygons[k].name = "";
	    	}
		}
		else if(sizeType == "1"){
			for(var k=0;k<1200;k++){
	    		polygons[k] = {};
	    		var point = iniPolygon(k);    		polygons[k].x = point.x;    		polygons[k].y = point.y;
	    		polygons[k].color = "#fff";    		polygons[k].color1= "#fff";   		polygons[k].name = "";
	    	}
		}
		else{
			for(var k=0;k<330;k++){
	    		polygons[k] = {};
	    		var point = iniPolygon(k);   		polygons[k].x = point.x;    		polygons[k].y = point.y;
	    		polygons[k].color = "#fff";    		polygons[k].color1= "#fff";   		polygons[k].name = "";
	    	}
		}
		var step = oclass.length>=10?1:Math.floor(9/oclass.length);		var pl = 10, pt = 20, hl, h;
		if(sizeType == "0")       {hl = 3.3; h = 3.5*1.73;}
		else if(sizeType == "1"){hl = 5.3; h = 5.85*1.73;	}
		else { hl = 10; h = 10.2 * 1.73; }

		if (isAssemble == "0") {
		    for(var i=0;i<oclass.length;i++){
				for(var j=0;j<oclass[i].length;j++){
					var x = 2*hl + (oclass[i][j].x+1)/2 *500;		var y = 2*h  + (oclass[i][j].y+1)/2 *500;
					var point = [x, y]; var n = oclass[i][j].name; var c = clusColor1[(i * step) % 9];
				    //fbaf5a-f16c4d
					var comColor1 = d3.interpolate("#197DB8", "#E37685"), comColor2 = d3.interpolate("#E37685", "#CA1029");
					var c1 = oclass[i].sumDis <=0.5?comColor1(2*oclass[i].sumDis):comColor2(2*(oclass[i].sumDis-0.5));
					var p = new Array();  	for(var k=0;k<oclass[i].length;k++)		p[k] = oclass[i][k].name;					
					var len = polygons.length;
					var endFlag = 0;
					for (var k = 0; k < len; k++) {
					    var px1 = polygons[k].x, px2 = polygons[k].x + 4 * hl;	var py1 = polygons[k].y - h, py2 = polygons[k].y + h;
					    if (endFlag == 1)
					        break;
					    if (point[0] > px1 && point[0] < px2 && point[1] > py1 && point[1] < py2) {
					        for(;k<len;k++){
					            if (polygons[k].name == "") {
					                polygons[k].name = n;
					                polygons[k].color = c;
					                polygons[k].color1 = c1;
					                polygons[k].provs = p;
					                endFlag = 1;
					                break;
					            }
					        }
					    }
					    else;
					}

				}
			}	
		}
		else{
			for(var i=0;i<oclass.length;i++){
				var x = pl + 10+ hcXy[i].x * 620;
				var y = pt + 10+ hcXy[i].y * 600;
				var point = [x, y];
			    //fbaf5a-f16c4d
				var comColor1 = d3.interpolate("#197DB8","#E37685");
				var comColor2 = d3.interpolate("#E37685", "#CA1029");
				var c1 = oclass[i].sumDis <=0.5?comColor1(2*oclass[i].sumDis):comColor2(2*(oclass[i].sumDis-0.5));
				var c = clusColor1[(i*step)%9];
				var index = 0;
				for(var k=0;k<polygons.length;k++){
					var points = new Array();
					for(var m=0;m<6;m++){
						points[m] = new Array();
						switch(m){
						case 0:points[m][0]=polygons[k].x     ;points[m][1]=polygons[k].y;  break;
						case 1:points[m][0]=polygons[k].x+hl  ;points[m][1]=polygons[k].y+h;break;
						case 2:points[m][0]=polygons[k].x+3*hl;points[m][1]=polygons[k].y+h;break;
						case 3:points[m][0]=polygons[k].x+4*hl;points[m][1]=polygons[k].y;  break;
						case 4:points[m][0]=polygons[k].x+3*hl;points[m][1]=polygons[k].y-h;break;
						case 5:points[m][0]=polygons[k].x+hl  ;points[m][1]=polygons[k].y-h;break;
					}
					}
					var hull = d3.polygonHull(points);
					if(d3.polygonContains(hull,point)){
						while(true){
							if(polygons[k].name == ""){
								index = k+2;
								break;
							}else{
								k++;
							}
						}
					}
				}
				//var len = oclass[i].length;
				if((index + oclass[i].length) > polygons.length)
					index -= oclass[i].length;
				for(var j=0;j<oclass[i].length;j++){
					var n = oclass[i][j].name;
					var p = new Array();
					for(var k=0;k<oclass[i].length;k++){
						p[k] = oclass[i][k].name;
					}
					var xi = pl + 10+ (oclass[i][j].x+1)/2 *450;
					var yi = pt + 10+ (oclass[i][j].y+1)/2 *450;
					var orient = 0;
					var index_t = index+j;
					if(y == yi){ if(xi > x)orient = 0;else orient = 2; }
					if(x == xi){ if(yi > y)orient = 4;else orient = 1; }
					else{
						var k = (yi-y)/(xi-x);
						if(yi < y){
							if(k<0 && k>=-1.73)	     orient = 0;
							else if(k>1.73||k<-1.73) orient = 1;
							else			         orient = 2;
						}else{
							if(k<0 && k<=1.73)		 orient = 3;
							else if(k>1.73||k<-1.73) orient = 4;
							else 	           		 orient = 5;
						}
					}				
					
					if(sizeType == "0"){
						var a = index / 192;
						var b = index % 192;
						switch(orient){
						case 0:
							if(b < 94){
								if(b == 0){
									if(a == 0) index_t = index+3;
									else       index_t = index-4;
								}
								else if(b == 1) index_t = index-1;
								else if(b%3 != 1) index_t = index +1;
								else{
									if(a == 0)	index_t = index +2;
									else	index_t = (a-1)*192 + 98 + (30-(b-2)/3)*3;
								}
							}
							else{
								if(b == 94){
									if(a == 0) index_t = index-1; 
									else	index_t = (a-1)*192+ 96;
								}
								if(b < 97) index_t = index-1;
								else if(b == 97) index_t = index -2;
								else if(b%3 != 1)index_t = index -2;
								else index_t = a*192 + 2 + (30-(b-98)/3)*3;
							}
							break;
						case 1:
							if(b < 94){
								if(b == 0){
									if(a == 0) index_t=index+1;
									else 	   index_t=index-3;
								}							
								else if(b == 1){
									if(a == 0) index_t=index-1;
									else 	   index_t=index-2;
								}
								else if(b%3 == 1){
									if(a == 0) index_t=index+2;
									else	index_t =(a-1)*192 +99+ (30-(b-2)/3)*3;
								}
								else if(b%3 == 2){
									if(b == 2) index_t = index-2;
									else       index_t = index-1;
								}
								else{
									index_t =(a-1)*192 + 98 + (30-(b-2)/3)*3;
								}
							}
							else{
								if(b == 94) index_t = index+1;
								if(b < 97)  index_t = index-1;
								else if(b == 97) index_t = index -4;
								else if(b%3 == 2)index_t = index -1;
								else if(b%3 == 0)index_t = (a-1)*192+2+(30-(b-98)/3)*3;
								else{
									index_t = (a-1)*192+3+(30-(b-98)/3)*3;
								}
							}
							break;
						case 2:
							if(b < 94){
								if(b == 0){
									if(a == 0) index_t=index+1;
									else 	   index_t=index-1;
								}							
								else if(b == 1){
									index_t=index-1;
								}
								else if(b%3 == 1){
									if(a == 0) index_t=index-1;
									else	index_t =(a-1)*192 +98+ (30-(b-2)/3)*3;
								}
								else if(b%3 == 2){
									index_t = index-2;
								}
								else{
									index_t = index-3;
								}
							}
							else{
								if(b == 94){
									if(a == 0) index_t = index-1;
									else	   index_t = (a-1)*192+96;
								}
								else if(b == 95) index_t = index-2;
								else if(b == 96) index_t = index+1;
								else if(b == 97) index_t = index-5;
								else if(b%3 == 2)index_t = index+1;
								else if(b%3 == 0)index_t = index+1;
								else index_t = (a-1)*192+2+(30-(b-98)/3)*3;
							}
							break;
						case 3:
							if(b < 94){
								if(b == 0) index_t=index+1;
								else if(b == 1)	index_t=a*192-2;
								else if(b%3 == 1)index_t=index-1;
								else if(b%3 == 2){
									index_t = a*192 + 100 + (30-b/3)*3;
								}
								else	index_t = index-1;
							}
							else{
								if(b == 94) index_t = index-1;
									
								else if(b == 95) index_t = index+2;
								else if(b == 96) index_t = index+2;
								else if(b == 97) index_t = index+2;
								else if(b%3 == 2)
									index_t = (a+1)*192 + 4+(30-b/3)*3;
								else if(b%3 == 0)index_t = index-2;
								else index_t = (a-1)*192+2+(30-(b-98)/3)*3;
							}
							break;
						case 4:
							if(b < 94){
								if(b == 0) index_t=index+2;
								else if(b == 1)	index_t=a*192-2;
								else if(b%3 == 1)index_t=index+1;
								else if(b%3 == 2){
									index_t = a*192 + 99 + (29-b/3)*3;
								}
								else index_t = a*192 + 100 + (29-b/3)*3;
							}
							else{
								if(b == 94) index_t = index+1;
									
								else if(b == 95) index_t = index+2;
								else if(b == 96) index_t = (a+1)*192+94;
								else if(b == 97) index_t = index-4;
								else if(b == 98) index_t = (a+1)*192+93;
								else if(b%3 == 1)index_t = index_t = index+1;
								else if(b%3 == 0)
									index_t =  (a+1)*192+4+(30-(b-98)/3)*3;
								else index_t = (a+1)*192+3+(30-(b-98)/3)*3;
							}
							break;
						case 5:
							if(b < 94){
								if(b == 0) index_t=index+3;
								else if(b == 1)	index_t=index+1;
								else if(b%3 == 1)index_t=index+2;
								else if(b%3 == 2){
									index_t = a*192 + 99 + (30-b/3)*3;
								}
								else index_t = index+2;
							}
							else{
								if(b == 94) index_t = index+1;
									
								else if(b == 95) index_t = index+1;
								else if(b == 96) index_t = (a+1)*192+94;
								else if(b == 97) index_t = index-1;
								else if(b == 98) index_t = (a+1)*192+94;
								else if(b%3 == 1)index_t = index-1;
								else if(b%3 == 0)index_t = index-1;
								else index_t = (a+1)*192+4+(30-(b-98)/3)*3;
							}
							break;
						}
					}
					else if(sizeType == "1"){
						var a = index / 120;
						var b = index % 120;
					}
					else{
						var a = index / 60;
						var b = index % 60;
					}
					while(true){
						if(polygons[index+j].name == ""){
							polygons[index+j].name = n;
							polygons[index+j].color = c;
							polygons[index+j].color1 = c1;
							polygons[index+j].provs = p;
							break;
						}
						else{
							index++;
							if(index+j >= polygons.length)
								break;
						}
					}
				}
			}
		}
		return polygons;
	}
	
	// sort from small to big
	function ascent(property) {		
	    return function(a,b){
	        var value1 = a[property];
	        var value2 = b[property];
	        return value1 - value2;
	    }
	}
	
	// compare with fore year  
	function classDiveces(newC,oldC){
		var signName = new Array();
		
		for(var i1=0;i1<newC.length;i1++){
			var tempC = newC[i1];
			var len=0;
			for(var l=0;l<i1-1;l++)
				len += newC[l].length;
			var max=0,index=0;
			for(var i2=0;i2<oldC.length;i2++){
				var match=0;
				for(var j1=0;j1<tempC.length;j1++)
					for(var j2=0;j2<oldC[i2].length;j2++)
						if(tempC[j1].name == oldC[i2][j2].name)
							match++;
				if(max < match){ max = match;index = i2;}
			}
			if(max < tempC.length){
				for(var j1=0,k=0;j1<tempC.length;j1++){
					var j2;
					for(j2=0;j2<oldC[index].length;j2++)
						if(tempC[j1].name == oldC[index][j2].name)	break;
					if(j2>=oldC[index].length)
						signName[k++] = tempC[j1].name;
				}
			}
		}
		return signName;
	}
	
	// new polygons to draw mds 2017-4-22 14:14:21 
	function drawMovementHcluster(thresh,hyear){		
		d3.select("#draw_hcluster1").remove();			
		var width = 610, height = 600;var padding = {top: 15, bottom: 25, right: 25, left: 25};
		var year2 = hyear;
		var data2,newC,temp,tempC, newhcluC = new Array(),oldhcluC = new Array(), inOrOut = new Array();
		var str = "";
		var change = new Array(); var maxDis = 0;var polyOlds;
		if(isCurrent == "0") 	  data2 = array[year2].newdatapoint;
		else  if(isCurrent == "1")data2 = array[year2].currentPoint;
		else					  data2 = array[year2];
		
		newC = HclusterYear(data2)[thresh];
		if(year2 >=1){
			if(isCurrent == "0"){
				temp = array[year2-1].newdatapoint;	tempC = HclusterYear(temp)[thresh];
			}else if(isCurrent == "1"){
				temp = array[year2-1].currentPoint;	tempC = HclusterYear(temp)[thresh];
			}else{
				temp = array[year2-1];				tempC = HclusterYear(temp)[thresh];
			}			
			for(var i=0;i<data2.length;i++){
				for(var j=0;j<newC.length;j++)
					for(var k=0;k<newC[j].length;k++)
						if(data2[i].name == newC[j][k].name)
							data2[i].r = j+1;
			}
			// statistic of the stability of clusters
			for(var i=0;i<newC.length;i++){
				newC[i].sumDis = 0;
				var preC = new Array();
				for(var j=0;j<newC[i].length;j++){
					preC[j] = -1;
					for(var i1=0;i1<tempC.length;i1++)
						for(var j1=0;j1<tempC[i1].length;j1++)
							if(newC[i][j].name == tempC[i1][j1].name)
								preC[j] = i1;
				}
				for(var j=0;j<tempC.length;j++){
					var count = 0;
					for(var j1=0;j1<newC[i].length;j1++)
						if(preC[j1] == j)count ++;
					var p = count/newC[i].length;
					if(p!=0)
						newC[i].sumDis -= p * Math.log(p);
				}
			}
			str = findDifferents(newC,tempC);
			//inOrOut = classDiveces(newC,tempC);
		}
		
	    for(var i=0;i<newC.length;i++){
	    	var x=0,y=0;
	    	for(var j=0;j<newC[i].length;j++){
	    		x += (newC[i][j].x+1)/(2*newC[i].length);
	    		y += (newC[i][j].y+1)/(2*newC[i].length);
	    	}
    		newhcluC[i] = {};newhcluC[i].x = x;	newhcluC[i].y = y;
    	}
	    
	    if(year2 >=1){
		    maxX=0,maxY=0,minX=2,minY=2;
		    for(var i=0;i<tempC.length;i++){
		    	var x=0,y=0;
		    	for(var j=0;j<tempC[i].length;j++){
		    		x += (tempC[i][j].x+1)/(2*tempC[i].length);
		    		y += (tempC[i][j].y+1)/(2*tempC[i].length);
		    	}
		    	oldhcluC[i] = {};oldhcluC[i].x = x;	oldhcluC[i].y = y;
		    }    
		    polyOlds = clusterPolygon(tempC,oldhcluC);
	    }
	    var polygons = clusterPolygon(newC,newhcluC);
	    var testLen = polygons.length;
	    for (var i = 0; i < testLen; i++)
	        for(var j=0;j<i;j++)
	            if (polygons[i].name != "" && (polygons[i].name == polygons[j].name))
	                console.log(polygons[i].name);
	    var maxD = 0;
	    if (year2 >= 1) {
	        var data2len = data2.length;	        
	        for (var i = 0; i < data2len; i++) {
	            change[i] = {};
	            change[i].n = data2[i].name;
	            change[i].clu = 0;
	            var tempClen = tempC.length;
	            for (var j = 0; j < tempClen; j++) {
	                var cluLen = tempC[j].length;
	                for (var k = 0; k < cluLen; k++) {
	                    if (data2[i].name == tempC[j][k].name)
	                        change[i].clu = j;
	                }
	            }
	        }	    
	    }
	    var svg_Hcluster1 = d3.select("#hcluster1").append("svg").attr("id", "draw_hcluster1").attr("width", width).attr("height", height);
	    var linear = d3.scale.linear().domain([0,45]).range([0,1]); 
	    //定义缩放函数 
	    //var zoom = d3.behavior.zoom().scaleExtent([.1,10]).on("zoom",zoomed)  
	    var g = svg_Hcluster1.append("g");//.call(zoom);
	    //function zoomed() {  
	    //    g.attr("transform",   
	    //        "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");  
	    //}
	    var hl,h;
	    if(sizeType == "0")         {hl = 3.3; h = 3.5*1.73;}
		else if(sizeType == "1")  {hl = 5.3; h = 5.85*1.73;}
		else                               {hl =10; h =10.2*1.73;}
	    //var rect1 = g.append("rect").attr("x", 10).attr("y", 30).attr("width", 91*hl).attr("height", 49*h).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1);
	    var path = new Array();
	    var len = polygons.length;
	    for (var i = 0; i < len; i++) {
			var x = polygons[i].x, y = polygons[i].y, n = polygons[i].name, c = polygons[i].color, c1=polygons[i].color1, provs = polygons[i].provs;
			path[i] = {};
			path[i].p = "";			
			for(var j=0;j<7;j++){
				switch(j){
				case 0:path[i].p += "M"+x+","+y+" ";break;
				case 1:path[i].p += "L"+(x+hl)+","+(y+h)+" ";break;
				case 2:path[i].p += "L"+(x+3*hl)+","+(y+h)+" ";break;
				case 3:path[i].p += "L"+(x+4*hl)+","+y+" ";break;
				case 4:path[i].p += "L"+(x+3*hl)+","+(y-h)+" ";break;
				case 5:path[i].p += "L"+(x+hl)+","+(y-h)+" ";break;
				case 6:path[i].p += "L"+x+","+y+" ";break;
				}
			}			
			path[i].n=n; path[i].c=c;path[i].c1=c1; path[i].provs=provs;
			for(var j=0;j<data2.length;j++){
				if(n == data2[j].name) path[i].r = data2[j].r;
			}
		}
		var triangle = new Array();
		var len = change.length;
		for(var i=0;i<len;i++){
			triangle[i] = {};
			triangle[i].p = "";
			var polyLen = polygons.length;
			for(var j=0;j<polyLen;j++){
			    if (change[i].n == polygons[j].name) {
			        triangle[i].c = polygons[j].color;
					var x=polygons[j].x+2*hl,y=polygons[j].y;		
					switch(change[i].clu){
					case 0:
					    triangle[i].p = "M" + (x - hl) + "," + (y - h) + " " + "L" + (x - hl) + "," + (y + h) + " ";
					    triangle[i].p += "M" + x + "," + (y - h) + " " + "L" + x + "," + (y + h) + " ";
					    triangle[i].p += "M" + (x + hl) + "," + (y - h) + " " + "L" + (x + hl) + "," + (y + h) + " ";
					    break;
					case 1:
					    triangle[i].p = "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x + 1.5 * hl) + "," + (y - 0.5 * h) + " ";
					    triangle[i].p += "M" + (x - 2 *hl) + "," + y + " " + "L" + (x + 2 * hl) + "," + y + " ";
					    triangle[i].p += "M" + (x - 1.5 * hl) + "," + (y + 0.5* h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5* h) + " ";
					    break;
					case 2:
					    triangle[i].p = "M" + (x + hl) + "," + (y - h) + " " + "L" + (x - 2 * hl) + "," + y + " ";
					    triangle[i].p += "M" + (x+ 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x - 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					    triangle[i].p += "M" + (x + 2 * hl) + "," + y + " " + "L" + (x - hl) + "," + (y + h) + " ";
					    break;
					case 3:
					    triangle[i].p = "M" + (x - hl) + "," + (y - h) + " " + "L" + (x + 2 * hl) + "," + y + " ";
					    triangle[i].p += "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					    triangle[i].p += "M" + (x - 2 * hl) + "," + y + " " + "L" + (x + hl) + "," + (y + h) + " ";
					    break;
					case 4:
					    triangle[i].p = "M" + x + "," + (y - h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					    triangle[i].p += "M" + (x - hl) + "," + (y - h) + " " + "L" + (x + hl) + "," + (y + h) + " ";
					    triangle[i].p += "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + x + "," + (y + h) + " ";
					    break;
					case 5:
					    triangle[i].p = "M" + x + "," + (y - h) + " " + "L" + (x - 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					    triangle[i].p += "M" + (x + hl) + "," + (y - h) + " " + "L" + (x - hl) + "," + (y + h) + " ";
					    triangle[i].p += "M" + (x + 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + x + "," + (y + h) + " ";
					    break;
					}
					if (sizeType == "0") triangle[i].f = 1;
					else if (sizeType == "1") triangle[i].f = 2;
					else triangle[i].f = 3;
				}
			}
		}
		var polygon1 = g.selectAll("pathC").data(path).enter()
						        .append("path").attr("d", function (d) { return d.p; })
						        .attr("fill",function(d){ return d.c;})
						        .attr("stroke", "#ccc")
						        .attr("stroke-width", 2)
						        .on("mouseover",function(d,i){
						       	 if(d.n == "") ;
						       	 else {
						       	     if (isdrawBar == "2") {
						       	         d3.selectAll("#statistic_class").text("Single item" + ch2en(d.n));
						       	         drawBar2(d.n);
						       	     }
						       	 }
						       	 var str="";
									 for(var j=0;j<d.provs.length-1;j++)
										str += ch2en(d.provs[j])+",";
									 str += ch2en(d.provs[d.provs.length-1]);
									 if(str == "");
									 else{
									     if(isdrawBar == "1")
										    drawBar3(d.provs);
									}
						        });
        
		var pathD = new Array();
		len = path.length;
		for (var i = 0, j = 0; i < len; i++) {
		    if (path[i].n != "") 
		        pathD[j++] = path[i];
		}

		if(year2>=1){
		    var polygon = g.selectAll("pathC").data(pathD).enter()
			             .append("path").attr("d",function(d){return d.p;})
			             .attr("fill",function(d){return d.c1;})
			             .attr("stroke", function (d) { return d.c; })
			             .attr("stroke-width",2)
				         .on("mouseover",function(d,i){
				             if(d.n == "") ;
				             else {   if (isdrawBar == "2")    drawBar2(d.n); }
				             var str="";   for(var j=0;j<d.provs.length-1;j++)     str += ch2en(d.provs[j])+",";
				             str += ch2en(d.provs[d.provs.length-1]);
				             if(str == "");   else{  if(isdrawBar == "1")   drawBar3(d.provs);  }
				         });
		    
		    var tris = g.selectAll("triangles").data(triangle).enter().append("path")
                            .attr("d", function (d) { return d.p; })
                            //.attr("fill", function (d) { return d.c; })
                            .attr("stroke", function (d) { return d.c; })
                            .attr("stroke-width", function (d) { return d.f });
	    
		}
	}
	//Compute the intersection of two lines 2017-5-16 16:39:22
	function segmentsInter(a,b,c,d){
		// denominator = 0  so don't intersect 
		var denominator = (b.y-a.y)*(d.x-c.x) - (a.x-b.x)*(c.y-d.y);
		if (denominator==0)  return false;
		//computer (x,y)
		var x = ( (b.x-a.x)*(d.x-c.x)*(c.y-a.y) + (b.y-a.y)*(d.x-c.x)*a.x   
                - (d.y-c.y)*(b.x-a.x)*c.x) / denominator;
		var y =-( (b.y-a.y)*(d.y-c.y)*(c.x-a.x) + (b.x-a.x)*(d.y-c.y)*a.y   
                - (d.x-c.x)*(b.y-a.y)*c.y) / denominator; 
		// intersection in the lines   
		if ((x-a.x)*(x-b.x)<=0 && (y-a.y)*(y-b.y)<=0 && 
	        (x-c.x)*(x-d.x)<=0 && (y-c.y)*(y-d.y)<=0 ){    
	        return {x:x,y:y}  
	    }
	    // else don't intersect
	    return false  
	}	
	// combine increase for cluster movement sort	2017-5-17 10:09:39
	function swap(arr,i,j){
		var temp = arr[i];arr[i] = arr[j];arr[j] = temp;
	}
	function perm(arr, start, end, res){
		if(start >= end){
			res[res.length] = new Array();
			for(var i=0;i<arr.length;i++) res[res.length-1][i] = arr[i];
		}else{
			for(var i=start;i<end;i++){
				swap(arr,start,i);
				perm(arr,start+1,end,res);
				swap(arr,start,i);
			}
		}
	}
	//sort of group movement for avoid overlap 2017-5-17 10:09:47
	function movementSort(path,polyOlds,polygons){
		var movesign = new Array();
		var countR =0;
		for(var i=0;i<path.length;i++){if(countR<path[i].r) countR=path[i].r;}
		var points = new Array();
		for(var i=1;i<=countR;i++){
			points[i-1] = new Array(); var k = 0;
			for(var j=0;j<path.length;j++){
				if(path[j].r == i){
					var n = path[j].n;
					for(var k1=0;k1<polyOlds.length;k1++){
						if(polyOlds[k1].name == n){
							points[i-1][k] = new Array();
							points[i-1][k][0] = polyOlds[k1].x;points[i-1][k][1] = polyOlds[k1].y;
							k++;break;
						}
					}
					for(var k1=0;k1<polygons.length;k1++){
						if(polygons[k1].name == n){
							points[i-1][k] = new Array();
							points[i-1][k][0] = polygons[k1].x;points[i-1][k][1] = polygons[k1].y;
							k++;break;
						}
					}
				}
			}
		}
		var d = new Array();for(var i=0;i<countR;i++)d[i] = i;var res = new Array(); 
		perm(d,0,countR,res);
		var min = Number.POSITIVE_INFINITY;
		for(var i=0;i<res.length;i++){
			var count=0;
			for(var j1=0;j1<res[i].length-1;j1++){
				for(var j2=j1+1;j2<res[i].length-1;j2++){
					var a={x:0,y:0},b={x:0,y:10},c={x:10,y:0},d={x:10,y:10};
					for(k1=0;k1<points[res[i][j1]].length;k1+=2){
						if(k1+2 > points[res[i][j1]].length)
							break;
						var a={x:points[res[i][j1]][k1][0],  y:points[res[i][j1]][k1][1]};
						var b={x:points[res[i][j1]][k1+1][0],y:points[res[i][j1]][k1+1][1]};
						for(k2=0;k2<points[res[i][j2]].length;k2+=2){
							if(k2+2 > points[res[i][j2]].length)
								break;
							var c={x:points[res[i][j2]][k2][0],  y:points[res[i][j2]][k2][1]};
							var d={x:points[res[i][j2]][k2+1][0],y:points[res[i][j2]][k2+1][1]};
							var section = segmentsInter(a,b,c,d);
							if(section != false){
								var dis1 = (section.x-b.x)*(section.x-b.x) + (section.y-b.y)*(section.y-b.y);
								var dis2 = (section.x-c.x)*(section.x-c.x) + (section.y-c.y)*(section.y-c.y);
								if(dis1 <10 || dis2<10)
									count++;
							}
						}
					}
				}
			}
			if(min > count){
				min = count;
				for(var j=0;j<countR;j++){
					movesign[j] = res[i][j];
				}
			}
			if(min == 0)
				break;
		}
		
		return movesign;
	}
	
	
	function drawMovementHclusterDynamic(thresh,hyear){
		d3.select("#draw_hcluster1").remove();
		var year2 = hyear;
		var data2,newC,temp;
		var change = new Array(); var maxDis = 0;
		if(isCurrent == "0") 	  data2 = array[year2].newdatapoint;
		else  if(isCurrent == "1")data2 = array[year2].currentPoint;
		else					  data2 = array[year2];
		
		newC = HclusterYear(data2)[thresh];		
		var width = 610, height = 600;var padding = {top: 25, bottom: 25, right: 25, left: 25};	
		var newhcluC = new Array(), oldhcluC = new Array();
		//var inOrOut = new Array();
		var polyOlds;
		var str = "";
		if(year2 >=1){
			if(isCurrent == "0"){
				temp = array[year2-1].newdatapoint;	tempC = HclusterYear(temp)[thresh];
			}else if(isCurrent == "1"){
				temp = array[year2-1].currentPoint;	tempC = HclusterYear(temp)[thresh];
			}else{
				temp = array[year2-1];				tempC = HclusterYear(temp)[thresh];
			}
			for(var i=0;i<newC.length;i++){
				newC[i].sumDis = 0;
				var preC = new Array();
				for(var j=0;j<newC[i].length;j++){
					preC[j] = -1;
					for(var i1=0;i1<tempC.length;i1++)
						for(var j1=0;j1<tempC[i1].length;j1++)
							if(newC[i][j].name == tempC[i1][j1].name)
								preC[j] = i1;
				}
				for(var j=0;j<tempC.length;j++){
					var count = 0;
					for(var j1=0;j1<newC[i].length;j1++)
						if(preC[j1] == j)count ++;
					var p = count/newC[i].length;
					if(p!=0)
						newC[i].sumDis -= p * Math.log(p);
				}
			}			
			str = findDifferents(newC,tempC);
			//inOrOut = classDiveces(newC,tempC);
		}
	    for(var i=0;i<newC.length;i++){
	    	var x=0,y=0;
	    	for(var j=0;j<newC[i].length;j++){
	    		x += (newC[i][j].x+1)/(2*newC[i].length);
	    		y += (newC[i][j].y+1)/(2*newC[i].length);
	    	}
    		newhcluC[i] = {};newhcluC[i].x = x;	newhcluC[i].y = y;    		
	    }
	    	
	    if(year2 >=1){
		    for(var i=0;i<tempC.length;i++){
		    	var x=0,y=0;
		    	for(var j=0;j<tempC[i].length;j++){
		    		x += (tempC[i][j].x+1)/(2*tempC[i].length);
		    		y += (tempC[i][j].y+1)/(2*tempC[i].length);
		    	}
		    	oldhcluC[i] = {};oldhcluC[i].x = x;	oldhcluC[i].y = y;	    		
		    }		    	    
		    polyOlds = clusterPolygon(tempC,oldhcluC);
	    }
	    var polygons = clusterPolygon(newC,newhcluC);
	    if(year2 >=1){
	        var data2len = data2.length;
	        for (var i = 0; i < data2len; i++) {
	            change[i] = {};
	            change[i].n = data2[i].name;
	            change[i].clu = 0;
	            var tempClen = tempC.length;
	            for (var j = 0; j < tempClen; j++) {
	                var cluLen = tempC[j].length;
	                for (var k = 0; k < cluLen; k++) {
	                    if (data2[i].name == tempC[j][k].name)
	                        change[i].clu = j;
	                }
	            }
	            for (var j = 0; j < newC.length; j++) {
	                for (var k = 0; k < newC[j].length; k++) {
	                    if (data2[i].name == newC[j][k].name)
	                        data2[i].r = j + 1;
	                }
	            }
	        }
	    }
	    
	    var svg_Hcluster1 = d3.select("#hcluster1").append("svg").attr("id", "draw_hcluster1").attr("width", width).attr("height", height);
	    
	    //定义缩放函数//var zoom = d3.behavior.zoom().scaleExtent([1,10]).on("zoom",zoomed)  
	    var g = svg_Hcluster1.append("g");//.call(zoom);
	    //function zoomed() {  
	    //    g.attr("transform",   
	    //        "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");  
	    //}
	    var hl,h;
	    if(sizeType == "0")         {hl = 3.3; h = 3.5*1.73;}
		else if(sizeType == "1")  {hl = 5.3; h = 5.85*1.73;}
		else                               {hl =10; h =10.2*1.73;	}
	    //var rect1 = g.append("rect").attr("x", 10).attr("y", 30).attr("width", 91*hl).attr("height", 49*h).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1);
	    var path = new Array();
		for(var i=0;i<polygons.length;i++){
			var x = polygons[i].x, y = polygons[i].y, n = polygons[i].name, c = polygons[i].color,c1=polygons[i].color1, provs = polygons[i].provs;
			path[i] = {};
			path[i].p = "";
			for(var j=0;j<7;j++){
				switch(j){
				case 0:path[i].p += "M"+x+","+y+" ";break;
				case 1:path[i].p += "L"+(x+hl)+","+(y+h)+" ";break;
				case 2:path[i].p += "L"+(x+3*hl)+","+(y+h)+" ";break;
				case 3:path[i].p += "L"+(x+4*hl)+","+y+" ";break;
				case 4:path[i].p += "L"+(x+3*hl)+","+(y-h)+" ";break;
				case 5:path[i].p += "L"+(x+hl)+","+(y-h)+" ";break;
				case 6:path[i].p += "L"+x+","+y+" ";break;
				}
			}
			path[i].q = "";
			for(var j=0;j<7;j++){
				switch(j){
				case 0:path[i].q += "M"+x+","+y+" ";break;
				case 1:path[i].q += "L"+(x+hl)+","+(y+h)+" ";break;
				case 2:path[i].q += "L"+(x+3*hl)+","+(y+h)+" ";break;
				case 3:path[i].q += "L"+(x+4*hl)+","+y+" ";break;
				case 4:path[i].q += "L"+(x+3*hl)+","+(y-h)+" ";break;
				case 5:path[i].q += "L"+(x+hl)+","+(y-h)+" ";break;
				case 6:path[i].q += "L"+x+","+y+" ";break;
				}
			}
			if(year2 >=1){
				if(n != ""){
					for(var k=0;k<polyOlds.length;k++){
						if(n == polyOlds[k].name){
						    path[i].q = "";
						    path[i].c0 = polyOlds[k].color;
							x = polyOlds[k].x, y = polyOlds[k].y;
							for(var j=0;j<7;j++){
								switch(j){
								case 0:path[i].q += "M"+x+","+y+" ";break;
								case 1:path[i].q += "L"+(x+hl)+","+(y+h)+" ";break;
								case 2:path[i].q += "L"+(x+3*hl)+","+(y+h)+" ";break;
								case 3:path[i].q += "L"+(x+4*hl)+","+y+" ";break;
								case 4:path[i].q += "L"+(x+3*hl)+","+(y-h)+" ";break;
								case 5:path[i].q += "L"+(x+hl)+","+(y-h)+" ";break;
								case 6:path[i].q += "L"+x+","+y+" ";break;
								}
							}
							break;
						}
					}
				}
			}
			path[i].n=n; path[i].c=c;path[i].c1=c1; path[i].provs=provs;path[i].r = 0;
			//for(var j=0;j<inOrOut.length;j++)
			//	if(n == inOrOut[j]){path[i].c1 = "#D02090";break;}
			for(var j=0;j<data2.length;j++)
				if(n == data2[j].name){path[i].r = data2[j].r;break};
		}
		var movesign = movementSort(path,polyOlds,polygons);

		for (var i = 0; i < movesign.length; i++) {
			for(var j=0;j<path.length;j++){
				if(path[j].r == movesign[i][0])
					path[j].r = movesign[i][1];
				if(path[j].r == movesign[i][1])
					path[j].r = movesign[i][0];
			}
		}
		var triangle = new Array();
		for(var i=0;i<change.length;i++){
			triangle[i] = {};
			triangle[i].p = "";
			for(var j=0;j<polygons.length;j++){
			    if (change[i].n == polygons[j].name) {			      
					var x=polygons[j].x+2*hl,y=polygons[j].y;					
					switch(change[i].clu){
					    case 0:
					        triangle[i].p = "M" + (x - hl) + "," + (y - h) + " " + "L" + (x - hl) + "," + (y + h) + " ";
					        triangle[i].p += "M" + x + "," + (y - h) + " " + "L" + x + "," + (y + h) + " ";
					        triangle[i].p += "M" + (x + hl) + "," + (y - h) + " " + "L" + (x + hl) + "," + (y + h) + " ";
					        break;
					    case 1:
					        triangle[i].p = "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x + 1.5 * hl) + "," + (y - 0.5 * h) + " ";
					        triangle[i].p += "M" + (x - 2 * hl) + "," + y + " " + "L" + (x + 2 * hl) + "," + y + " ";
					        triangle[i].p += "M" + (x - 1.5 * hl) + "," + (y + 0.5 * h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					        break;
					    case 2:
					        triangle[i].p = "M" + (x + hl) + "," + (y - h) + " " + "L" + (x - 2 * hl) + "," + y + " ";
					        triangle[i].p += "M" + (x + 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x - 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					        triangle[i].p += "M" + (x + 2 * hl) + "," + y + " " + "L" + (x - hl) + "," + (y + h) + " ";
					        break;
					    case 3:
					        triangle[i].p = "M" + (x - hl) + "," + (y - h) + " " + "L" + (x + 2 * hl) + "," + y + " ";
					        triangle[i].p += "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					        triangle[i].p += "M" + (x - 2 * hl) + "," + y + " " + "L" + (x + hl) + "," + (y + h) + " ";
					        break;
					    case 4:
					        triangle[i].p = "M" + x + "," + (y - h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					        triangle[i].p += "M" + (x - hl) + "," + (y - h) + " " + "L" + (x + hl) + "," + (y + h) + " ";
					        triangle[i].p += "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + x + "," + (y + h) + " ";
					        break;
					    case 5:
					        triangle[i].p = "M" + x + "," + (y - h) + " " + "L" + (x - 1.5 * hl) + "," + (y + 0.5 * h) + " ";
					        triangle[i].p += "M" + (x + hl) + "," + (y - h) + " " + "L" + (x - hl) + "," + (y + h) + " ";
					        triangle[i].p += "M" + (x + 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + x + "," + (y + h) + " ";
					        break;
					}
					triangle[i].c = polygons[j].color;
					if (sizeType == "0") triangle[i].f = 1;
					else if (sizeType == "1") triangle[i].f = 2;
					else triangle[i].f = 3;
					triangle[i].r = path[j].r;
				}
			}
			triangle[i].q = "";
			for (var j = 0; j < polyOlds.length; j++) {
			    if (change[i].n == polyOlds[j].name) {
			        triangle[i].c0 = polyOlds[j].color;
			        var x = polyOlds[j].x + 2 * hl, y = polyOlds[j].y;
			        switch (change[i].clu) {
			            case 0:
			                triangle[i].q = "M" + (x - hl) + "," + (y - h) + " " + "L" + (x - hl) + "," + (y + h) + " ";
			                triangle[i].q += "M" + x + "," + (y - h) + " " + "L" + x + "," + (y + h) + " ";
			                triangle[i].q += "M" + (x + hl) + "," + (y - h) + " " + "L" + (x + hl) + "," + (y + h) + " ";
			                break;
			            case 1:
			                triangle[i].q = "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x + 1.5 * hl) + "," + (y - 0.5 * h) + " ";
			                triangle[i].q += "M" + (x - 2 * hl) + "," + y + " " + "L" + (x + 2 * hl) + "," + y + " ";
			                triangle[i].q += "M" + (x - 1.5 * hl) + "," + (y + 0.5 * h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5 * h) + " ";
			                break;
			            case 2:
			                triangle[i].q = "M" + (x + hl) + "," + (y - h) + " " + "L" + (x - 2 * hl) + "," + y + " ";
			                triangle[i].q += "M" + (x + 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x - 1.5 * hl) + "," + (y + 0.5 * h) + " ";
			                triangle[i].q += "M" + (x + 2 * hl) + "," + y + " " + "L" + (x - hl) + "," + (y + h) + " ";
			                break;
			            case 3:
			                triangle[i].q = "M" + (x - hl) + "," + (y - h) + " " + "L" + (x + 2 * hl) + "," + y + " ";
			                triangle[i].q += "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5 * h) + " ";
			                triangle[i].q += "M" + (x - 2 * hl) + "," + y + " " + "L" + (x + hl) + "," + (y + h) + " ";
			                break;
			            case 4:
			                triangle[i].q = "M" + x + "," + (y - h) + " " + "L" + (x + 1.5 * hl) + "," + (y + 0.5 * h) + " ";
			                triangle[i].q += "M" + (x - hl) + "," + (y - h) + " " + "L" + (x + hl) + "," + (y + h) + " ";
			                triangle[i].q += "M" + (x - 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + x + "," + (y + h) + " ";
			                break;
			            case 5:
			                triangle[i].q = "M" + x + "," + (y - h) + " " + "L" + (x - 1.5 * hl) + "," + (y + 0.5 * h) + " ";
			                triangle[i].q += "M" + (x + hl) + "," + (y - h) + " " + "L" + (x - hl) + "," + (y + h) + " ";
			                triangle[i].q += "M" + (x + 1.5 * hl) + "," + (y - 0.5 * h) + " " + "L" + x + "," + (y + h) + " ";
			                break;
			        }
			    }
			}
		}
		var blackgroud = g.selectAll("pathC").data(path).enter()
				        .append("path").attr("d",function(d){return d.q;})
				        .attr("fill","#fff")
				        .attr("stroke","#ccc")
				        .attr("stroke-width", 1);
		var pathD = new Array();
		len = path.length;
		for (var i = 0, j = 0; i < len; i++) {
		    if (typeof (path[i].provs) != "undefined")
		        pathD[j++] = path[i];
		}

		if(year2 ==0){
			var polygon = g.selectAll("pathC").data(pathD).enter()
				        .append("path").attr("d",function(d){return d.p;})
				        .attr("fill",function(d){if(d.n !="")return "#4682B4";else return "#fff";})
				        .attr("stroke","#ccc")
				        .attr("stroke-width", 2)
				        .on("mouseover",function(d,i){
				       	    if(d.n == "") ;
				       	    else { if (isdrawBar == "2") drawBar2(d.n);}
				       	    var str=""; for(var j=0;j<d.provs.length-1;j++)	str += ch2en(d.provs[j])+",";	 str += ch2en(d.provs[d.provs.length-1]);
							if(str == "");
							else{     if(isdrawBar == "1")      drawBar3(d.provs);	}
				        });
		}else{
		    var polygon = g.selectAll("pathC").data(pathD).enter()
			             .append("path").attr("d",function(d){return d.q;})
			             .attr("fill",function (d) { return d.c1; })
			             .attr("stroke", function (d) { return d.c; })
			             .attr("stroke-width",2)
				         .on("mouseover",function(d,i){
				             if(d.n == "") ;
				             else { if (isdrawBar == "2")    drawBar2(d.n);	 }
				             var str=""; for(var j=0;j<d.provs.length-1;j++)    str += ch2en(d.provs[j])+",";
				             if(d.provs.length >=1)	 str += ch2en(d.provs[d.provs.length-1]);
				             if(str == "");
				             else{         if(isdrawBar == "1")  drawBar3(d.provs);   }
				         })
				         .transition()
			             .duration(500)
			             .ease("linear")
			             .delay(function(d){ return 800*d.r;})
			             .attr("d", function (d){return d.p;});
			             //.attr("fill",function (d) { return d.c1; });
			
		    var tris = g.selectAll("triangles").data(triangle).enter().append("path")
                            .attr("d", function (d) { return d.q; })
                            .attr("stroke", function (d) { return d.c0; })
                            .attr("stroke-width", function (d) { return d.f; })
                            .transition().duration(500).ease("linear")
                            .delay(function (d) { return 800 * d.r; })
                            .attr("d", function (d) { return d.p; })
                            .attr("stroke", function (d) { return d.c; });
		}
	}	
	
	function drawMovementHclusterAnimation(thresh){
		d3.select("#draw_hcluster1").remove();
		
		var data2 = new Array,newC = new Array;
		var change = new Array(); var maxDis = 0;
		if(isCurrent == "0")
			for(var i=0;i<array.length;i++)
				data2[i] = array[i].newdatapoint;
		else  if(isCurrent == "1")
			for(var i=0;i<array.length;i++)
				data2[i] = array[i].currentPoint;
		else
			for(var i=0;i<array.length;i++)
				data2[i] = array[i];
		for(var i=0;i<array.length;i++)
			newC[i] = HclusterYear(data2[i])[thresh];		
		var width = 610, height = 600;var padding = {top: 25, bottom: 25, right: 25, left: 25};	
		var newhcluC = new Array();
		var inOrOut = new Array();
		var polys = new Array();
		for(var k=0; k<array.length;k++){
			if(k == 0)
				continue;
			for(var i=0;i<newC[k].length;i++){
				newC[k][i].sumDis = 0;
				var preC = new Array();
				for(var j=0;j<newC[k][i].length;j++){
					preC[j] = -1;
					for(var i1=0;i1<newC[k-1].length;i1++)
						for(var j1=0;j1<newC[k-1][i1].length;j1++)
							if(newC[k][i][j].name == newC[k-1][i1][j1].name)
								preC[j] = i1;
				}
				for(var j=0;j<newC[k-1].length;j++){
					var count = 0;
					for(var j1=0;j1<newC[k][i].length;j1++)
						if(preC[j1] == j)count ++;
					var p = count/newC[i].length;
					if(p!=0)
						newC[k][i].sumDis -= p * Math.log(p);
				}
			}
			
			inOrOut[i] = classDiveces(newC[k],newC[k-1]);
		}
		
		for(var k=0;k<array.length;k++){
			newhcluC[k] = new Array();
			for(var i=0;i<newC[k].length;i++){
		    	var x=0,y=0;
		    	for(var j=0;j<newC[k][i].length;j++){
		    		x += newC[k][i][j].x/newC[k][i].length;
		    		y += newC[k][i][j].y/newC[k][i].length;
		    	}
	    		newhcluC[k][i] = {};newhcluC[k][i].x = x;	newhcluC[k][i].y = y;
		    }
			polys[k] = clusterPolygon(newC[k],newhcluC[k]);
		}
	    for(var k=1;k<array.length-1;i++){
	    	var maxD = 0;
	    	change[k] = new Array();
	    	for(var i=0;i<data2[k].length;i++){
	    		change[k][i]   = {};
	    		change[k][i].n = data2[k][i].name;
	    		change[k][i].dis=0;
	    		for(var j=0;j<polys[k].length;j++){
	    			if(data2[k][i].name == polys[k][j].name){
	    				for(var j1=0;j1<polys[k-1].length;j1++){
							if(data2[i].name == polys[k-1][j1].name){
								change[k][i].ori = [polys[k][j].x,polys[k-1][j1].x, polys[k][j].y,polys[k-1][j1].y];
								var dis = (polys[k][j].x-polys[k-1][j1].x)*(polys[k][j].x-polys[k-1][j1].x)
								        + (polys[k][j].y-polys[k-1][j1].y)*(polys[k][j].y-polys[k-1][j1].y);
								change[k][i].dis = Math.sqrt(dis);
								if(polys[k][j].y == polys[k-1][j1].y){
									if(polys[k][j].x > polys[k-1][j1].x)change[k][i].orient = 2;
									else								change[k][i].orient = 0;
								}
								if(polys[k][j].x == polys[k-1][j1].x){
									if(polys[k][j].y > polys[k-1][j1].y)change[k][i].orient = 1;
									else								change[k][i].orient = 4;
								}
								else{
									var k = (polys[k][j].y-polys[k-1][j1].y)/(polys[k][j].x-polys[k-1][j1].x);
									change[k][i].orient = 0;
									if(polys[k][j].y >= polys[k-1][j1].y){
										if(k<0 && k>=-1.73)	     change[k][i].orient = 0;
										else if(k>1.73||k<-1.73) change[k][i].orient = 1;
										else			         change[k][i].orient = 2;
									}else{
										if(k<0 && k<=1.73)		 change[k][i].orient = 3;
										else if(k>1.73||k<-1.73) change[k][i].orient = 4;
										else 	           		 change[k][i].orient = 5;
									}
								}
								if(maxD < change[k][i].dis) maxD = change[k][i].dis;
								break;
							}
						}
	    			}
	    		}
	    		for(var j=0;j<newC[k].length;j++){
					for(var j1=0;j1<newC[k][j].length;j1++){
						if(data2[k][i].name == newC[k][j][j1].name)
							data2[k][i].r = j+1;
					}
				}	    		
	    	}
	    	for(var i=0;i<change[k].length;i++)
	    		change[k][i].dis = change[k][i].dis/maxD;
	    }
	    
	    var svg_Hcluster1 = d3.select("#hcluster1").append("svg").attr("id", "draw_hcluster1").attr("width", width).attr("height", height);
	    var g = svg_Hcluster1.append("g");
	    var hl,h;
	    if(sizeType == "0")		{hl = 3.3; h = 3.5*1.73;}
		else if(sizeType == "1"){hl = 5.3; h = 5.85*1.73;}
		else					{hl = 10; h =10.2*1.73;}
	    var path = new Array();
	    var triangle = new Array();
	    for(var k=0;k<array.length;k++){
	    	path[k] = new Array();
	    	for(var i=0;i<polys[k].length;i++){
				var x = polys[k][i].x, y = polys[k][i].y, n = polys[k][i].name,	c = polys[k][i].color,c1=polys[k][i].color1, provs = polys[k][i].provs;
				path[k][i] = {};
				path[k][i].p = "";
				for(var j=0;j<7;j++){
					switch(j){
					case 0:path[k][i].p += "M"+x+","+y+" ";break;
					case 1:path[k][i].p += "L"+(x+hl)+","+(y+h)+" ";break;
					case 2:path[k][i].p += "L"+(x+3*hl)+","+(y+h)+" ";break;
					case 3:path[k][i].p += "L"+(x+4*hl)+","+y+" ";break;
					case 4:path[k][i].p += "L"+(x+3*hl)+","+(y-h)+" ";break;
					case 5:path[k][i].p += "L"+(x+hl)+","+(y-h)+" ";break;
					case 6:path[k][i].p += "L"+x+","+y+" ";break;
					}
				}
				path[k][i].q = "";							
				for(var j=0;j<7;j++){
					switch(j){
					case 0:path[k][i].q += "M"+x+","+y+" ";break;
					case 1:path[k][i].q += "L"+(x+hl)+","+(y+h)+" ";break;
					case 2:path[k][i].q += "L"+(x+3*hl)+","+(y+h)+" ";break;
					case 3:path[k][i].q += "L"+(x+4*hl)+","+y+" ";break;
					case 4:path[k][i].q += "L"+(x+3*hl)+","+(y-h)+" ";break;
					case 5:path[k][i].q += "L"+(x+hl)+","+(y-h)+" ";break;
					case 6:path[k][i].q += "L"+x+","+y+" ";break;
					}
				}
				if(k >= 1){
					if(n != ""){
						for(var i1=0;i1<polys[k-1].length;i1++){
							if(n == polys[k-1][i1].name){
								path[k][i].q = "";
								x = polys[k-1][i1].x, y = polys[k][i1].y;
								for(var j=0;j<7;j++){
									switch(j){
									case 0:path[i].q += "M"+x+","+y+" ";break;
									case 1:path[i].q += "L"+(x+hl)+","+(y+h)+" ";break;
									case 2:path[i].q += "L"+(x+3*hl)+","+(y+h)+" ";break;
									case 3:path[i].q += "L"+(x+4*hl)+","+y+" ";break;
									case 4:path[i].q += "L"+(x+3*hl)+","+(y-h)+" ";break;
									case 5:path[i].q += "L"+(x+hl)+","+(y-h)+" ";break;
									case 6:path[i].q += "L"+x+","+y+" ";break;
									}
								}
								break;
							}
						}
					}
				}
				path[k][i].n=n; path[k][i].c=c;path[k][i].c1=c1; path[k][i].provs=provs;path[k][i].r = 0;
				for(var j=0;j<inOrOut[k].length;j++)
					if(n == inOrOut[k][j]){path[i].c1 = "#D02090";break;}
				for(var j=0;j<data2[k].length;j++)
					if(n == data2[k][j].name){path[k][i].r = data2[k][j].r;break};
	    	}	    	
	    	triangle[k] = new Array;
	    	for(var i=0;i<change[k].length;i++){
				triangle[k][i] = {};
				triangle[k][i].p = "";
				for(var j=0;j<polys[k].length;j++){
					if(change[k][i].n == polys[k][j].name){
						var f = hl * (change[k][i].dis == 0?0:change[k][i].dis);
						var x=polys[k][j].x+2*hl,y=polys[k][j].y;					
						switch(change[k][i].orient){
						case 0:
							triangle[k][i].p = "M"+x+","+y+" " + "L"+(x+1.5*hl)+","+(y-0.5*h)+" ";break;  
						case 1:
							triangle[k][i].p = "M"+x+","+y+" " + "L"+(x)+","+(y-h)+" ";break;
						case 2:
							triangle[k][i].p = "M"+x+","+y+" " + "L"+(x-1.5*hl)+","+(y-0.5*h)+" ";break; 
						case 3:
							triangle[k][i].p = "M"+x+","+y+" " + "L"+(x-1.5*hl)+","+(y+0.5*h)+" ";break;
						case 4:
							triangle[k][i].p = "M"+x+","+y+" " + "L"+(x)+","+(y+h)+" ";break;
						case 5:
							triangle[k][i].p = "M"+x+","+y+" " + "L"+(x+1.5*hl)+","+(y+0.5*h)+" ";break;
						}
						triangle[k][i].c = polys[k][j].color;
						triangle[k][i].f = f;
					}
				}
			}
	    }
		var polygon = g.selectAll("pathC").data(path[0]).enter()
		             .append("path").attr("d",function(d){return d.q;})
		             .attr("fill",function(d){return d.c1;})
		             .attr("stroke",function (d) { return d.c; })
		             .attr("stroke-width",1)
			         .on("mouseover",function(d,i){
			        	 if(d.n == "") ;
			        	 else{
			        		 d3.selectAll("#statistic_class").text("Single item:"+ch2en(d.n));
			        		 drawBar2(d.n);
			        	 }
			        	 var str="";
						 for(var j=0;j<d.provs.length-1;j++)
							str += ch2en(d.provs[j])+",";
						 if(d.provs.length >=1)	 str += ch2en(d.provs[d.provs.length-1]);
						 if(str == "");
						 else{
							 //d3.selectAll("#statistic_pro").text("Single class:"+str);
							 drawBar3(d.provs);
						}
			         })
			         .transition()
		             .duration(500)
		             .ease("linear")
		             .delay(function(d){ return 600*d.r;})
		             .attr("d", function (d){return d.p;})
		             .attr("fill",function(d){return d.c1;});
			
			var tris = g.selectAll("triangles").data(triangle).enter()
	        			.append("path").attr("d", function(d){return d.p;})
	        			.attr("fill",function(d){return d.c;})
	        			.attr("stroke","black")
	        			.attr("stroke-width",function(d){return d.f;});
	}
	
	// multiple line show Text	
	function appendMultiText(container, str, posX, posY, width, fontsize, fontfamily){
        if( arguments.length < 6) fontsize = 14;
        if( arguments.length < 7) fontfamily = "simsun, arial";
        //获取分割后的字符串
        var strs = splitByLine(str,width,fontsize);
        var mulText = container.append("text").attr("x",posX).attr("y",posY).style("font-size",fontsize).style("font-family",fontfamily);
        mulText.selectAll("tspan").data(strs).enter().append("tspan").attr("x",mulText.attr("x")).attr("dy","1em").text(function(d){return d;});
        return mulText;
	}
	
	// split string
    function splitByLine(str,max,fontsize){
        var curLen = 0;
        var result = [];
        var start = 0, end = 0;
        for(var i=0;i<str.length;i++){
            var code = str.charCodeAt(i);
            var pixelLen = code > 255 ? fontsize : fontsize/2;
            curLen += pixelLen;
            if(curLen > max){
                end = i;
                result.push(str.substring(start,end));
                start = i;
                curLen = pixelLen;
            }
            if( i === str.length - 1 ){
                end = i;
                result.push(str.substring(start,end+1));
            }
        }
        return result;
     }
    // chinese provs to english 2017-4-18 10:58:16
    function ch2en(name){
    	if(name == "甘肃省")		    return "GS";
    	else if(name == "青海省")		return "QH";
    	else if(name == "广西壮族自治区")return "GX";
    	else if(name == "贵州省")		return "GZ";
    	else if(name == "重庆市")		return "CHQ";
    	else if(name == "北京市")		return "BJ";
    	else if(name == "福建省") 	return "FJ";
    	else if(name == "安徽省") 	return "AH";
    	else if(name == "广东省") 	return "GD";
    	else if(name == "西藏自治区") 	return "XZ";
    	else if(name == "新疆维吾尔自治区")return "XJ";
    	else if(name == "海南省") 	return "HAN";
    	else if(name == "宁夏回族自治区")return "NX";
    	else if(name == "陕西省") 	return "SXX";
    	else if(name == "山西省") 	return "SX";
    	else if(name == "湖北省") 	return "HUB";
    	else if(name == "湖南省") 	return "HUN";
    	else if(name == "四川省") 	return "SC";
    	else if(name == "云南省") 	return "YN";
    	else if(name == "河北省") 	return "HEB";
    	else if(name == "河南省") 	return "HEN";
    	else if(name == "辽宁省") 	return "LN";
    	else if(name == "山东省") 	return "SD";
    	else if(name == "天津市") 	return "TJ";
    	else if(name == "江西省") 	return "JX";
    	else if(name == "江苏省") 	return "JS";
    	else if(name == "上海市") 	return "SH";
    	else if(name == "浙江省") 	return "ZJ";
    	else if(name == "吉林省") 	return "JL";
    	else if(name == "内蒙古自治区") return "NMG";
    	else if(name == "黑龙江省") 	return "HLJ";
    	else return name;
    }