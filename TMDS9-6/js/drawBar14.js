var svg_bar;
var svg_bar2;
var svg_bar3;
var svg1 = d3.select("#statistic_rect").append("svg").attr("width", 30).attr("height", 50);
var rect = svg1.append("rect").attr("x", 0).attr("y", 2).attr("width", 18).attr("height", 18).style("fill", "red");
var rect = svg1.append("rect").attr("x", 0).attr("y", 27).attr("width", 18).attr("height", 18).style("fill", "blue");



function drawBar() {
    d3.select("#draw_bar").remove();    
	var max = 0;
	var min = Number.POSITIVE_INFINITY;
	var data = new Array();
	for(var i = 0; i < array.length; i++){
		data[i] = {};
		data[i].cy = array[i].cy;
		data[i].cy_guiyi = array[i].cy_guiyi;
		if(array[i].cy_new == undefined) data[i].cy_new = 0;
		else data[i].cy_new = array[i].cy_new;
		if(array[i].cy_new2 == undefined) data[i].cy_new2 = 0;
		else data[i].cy_new2 = array[i].cy_new2;
		data[i].year = i + 1952;
		if(data[i].cy > max) max = data[i].cy_guiyi;
		if(data[i].cy < min) min = data[i].cy_guiyi;
	}
	var width = 700, height = 200;
	svg_bar = d3.select("#Bar").append("svg").attr("id", "draw_bar").attr("width", width).attr("height", height);
	var padding = {top: 20, right: 20, bottom: 30, left: 20};
	
	var text1952 = svg_bar.append("text").attr("x",20).attr("y",185).attr("dx",10).attr("dy",10).text("1952");
	var text2013 = svg_bar.append("text").attr("x", 640).attr("y", 185).attr("dx", 10).attr("dy", 10).text("2013");

	var xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangeRoundBands([0, width - padding.right - padding.left], 0.2);
	var yScale = d3.scale.linear().domain([0, 1]).range([0, height - padding.top - padding.bottom]);
	var tip1 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.cy_new + "</span>";});
	var tip2 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.cy_guiyi+"</span>";});
	svg_bar.call(tip1);	svg_bar.call(tip2);
	if(showType == "-1"){
		if(isCurrent != "-1"){
			var rect = svg_bar.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.cy_new+d.cy_guiyi);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.cy_new);}).style("opacity",0.1).on('mouseover', tip1.show).on('mouseout', tip1.hide);
		}
		var rect1 = svg_bar.selectAll("rect1").data(data).enter().append("rect").attr("fill",function(d){return "red";}).attr("x",function(d,i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.cy_guiyi);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.cy_guiyi);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide)
							.on('click', function(d,i){
								var t = d.year-1952;
								var th = document.getElementById("hcluster_thresh").value;
								if(drawType == "0"){
									if(isDynamic == "0")drawMovementHcluster(th*10,t);
									else				drawMovementHclusterDynamic(th*10,t);
								}else{
									if(isDynamic == "0")drawMovementHcluster1(th*10,t);
									else				drawMovementHcluster1Dynamic(th*10,t);
								}
							});
	}
	else if(showType == "0"){
		if(isCurrent != "-1"){
			var rect = svg_bar.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.cy_new+d.cy_guiyi);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.cy_guiyi);}).style("opacity",0.1).on('mouseover', tip2.show).on('mouseout', tip2.hide);
		}
		var rect1 = svg_bar.selectAll("rect1").data(data).enter().append("rect").attr("fill",function(d){return "blue";}).attr("x",function(d,i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.cy_new);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.cy_new);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide)
							.on('click', function(d,i){
								var t = d.year-1952;
								var th = document.getElementById("hcluster_thresh").value;
								if(drawType == "0"){
									if(isDynamic == "0")drawMovementHcluster(th*10,t);
									else				drawMovementHclusterDynamic(th*10,t);
								}else{
									if(isDynamic == "0")drawMovementHcluster1(th*10,t);
									else				drawMovementHcluster1Dynamic(th*10,t);
								}
							});
	}
	else{
		if(isCurrent != "-1"){
			var rect = svg_bar.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.cy_new+d.cy_guiyi);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.cy_new);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide);
		}
		var rect1 = svg_bar.selectAll("rect1").data(data).enter().append("rect").attr("fill",function(d){return "red";}).attr("x",function(d,i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.cy_guiyi);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.cy_guiyi);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide)
							.on('click', function(d,i){
								var t = d.year-1952;
								var th = document.getElementById("hcluster_thresh").value;
								if(drawType == "0"){
									if(isDynamic == "0")drawMovementHcluster(th*10,t);
									else				drawMovementHclusterDynamic(th*10,t);
								}else{
									if(isDynamic == "0")drawMovementHcluster1(th*10,t);
									else				drawMovementHcluster1Dynamic(th*10,t);
								}
							});
	}
	//var line = svg_bar.selectAll("line").data(data).enter().append("line").attr("x1", function(d, i){	return padding.left + xScale(i) + xScale.rangeBand()/2;}).attr("y1", height - padding.bottom).attr("x2", function(d, i){return padding.left + xScale(i) + xScale.rangeBand()/2;	}).attr("y2", height - padding.bottom + 10).attr("stroke", "black").attr("stroke-width", 1);
   
	xScale = d3.scale.linear().domain([1952, 2013]).range([padding.left*2, width  - padding.right - padding.left]);
	var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(0);
					  
	yScale.range([height - padding.top - padding.bottom, 0]);					  
	var yAxis = d3.svg.axis().scale(yScale).orient("left");	

	svg_bar.append("g").attr("class", "axis").attr("transform", "translate(0,170)").call(xAxis);
	svg_bar.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left * 2 + "," + padding.top + ")").call(yAxis);
	
}


function drawBar2(prov){
    d3.select("#draw_bar").remove();
	var max = 0;
	var min = Number.POSITIVE_INFINITY;
	var data = new Array();
	var width = 700, height = 200;
	if(isCurrent == "0"){
		for(var i = 0; i < array.length; i++){
			data[i] = {};
			for(var j=0;j< array[i].newdatapoint.length;j++)
				if(array[i].newdatapoint[j].name == prov){
					data[i].dis = array[i].newdatapoint[j].dis;
					break;
				}
			for(var j=0;j< array[i].length;j++)
				if(array[i][j].name == prov){
					if(i == 0){
						data[i].oriDis = 0;
						break;
					}else{
						var j1=0;
						for(j1=0;j1< array[i-1].length;j1++)
							if(array[i-1][j1].name == prov)
								break;
						if(j1 == array[i-1].length)
							data[i].oriDis = 0;
						else{
							var d = (array[i][j].x - array[i-1][j1].x)*(array[i][j].x - array[i-1][j1].x)+
								(array[i][j].y - array[i-1][j1].y)*(array[i][j].y - array[i-1][j1].y);
							data[i].oriDis = Math.sqrt(d);
						}
					}
					
				}
			data[i].year = i + 1952;
			if(data[i].dis > max) max = data[i].dis;
			if(data[i].dis < min) min = data[i].dis;
			if(data[i].oriDis > max) max = data[i].oriDis;
			if(data[i].oriDis < min) min = data[i].oriDis;
		}
		svg_bar2 = d3.select("#Bar").append("svg").attr("id", "draw_bar").attr("width", width).attr("height", height);
		var padding = {top: 20, right: 20, bottom: 30, left: 20};

		var text1952 = svg_bar2.append("text").attr("x", 20).attr("y", 185).attr("dx", 10).attr("dy", 10).text("1952");
		var text2013 = svg_bar2.append("text").attr("x", 640).attr("y", 185).attr("dx", 10).attr("dy", 10).text("2013");

		var xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangeRoundBands([0, width - padding.right - padding.left],0.2);
		var yScale = d3.scale.linear().domain([0, 2.5]).range([0, height - padding.top - padding.bottom]);
		var tip1 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.dis + "</span>";});
		var tip2 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.oriDis + "</span>";});
		svg_bar2.call(tip1);svg_bar2.call(tip2);
		if(showType == "-1"){
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.1).on('mouseover', tip1.show).on('mouseout', tip1.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide);
		}
		else if(showType == "0"){
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.1).on('mouseover', tip2.show).on('mouseout', tip2.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide);
		}
		else{
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide);
		}
		//var line = svg_bar2.selectAll("line").data(data).enter().append("line").attr("x1", function(d, i){	return padding.left + xScale(i) + xScale.rangeBand()/2;}).attr("y1", height - padding.bottom).attr("x2", function(d, i){return padding.left + xScale(i) + xScale.rangeBand()/2;	}).attr("y2", height - padding.bottom + 10).attr("stroke", "black").attr("stroke-width", 1);
		
		xScale = d3.scale.linear().domain([1952, 2013]).range([padding.left * 2, width - padding.right - padding.left]);
		var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(0);

		yScale.range([height - padding.top - padding.bottom, 0]);
		var yAxis = d3.svg.axis().scale(yScale).orient("left");

		svg_bar2.append("g").attr("class", "axis").attr("transform", "translate(0,170)").call(xAxis);
		svg_bar2.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left * 2 + "," + padding.top + ")").call(yAxis);

	}else if(isCurrent == "1"){
		for(var i = 0; i < array.length; i++){
			data[i] = {};
			for(var j=0;j< array[i].currentPoint.length;j++){
				if(array[i].currentPoint[j].name == prov){
					data[i].dis = array[i].currentPoint[j].dis;
				}
			}
			for(var j=0;j< array[i].length;j++)
				if(array[i][j].name == prov){
					if(i == 0){
						data[i].oriDis = 0;
						break;
					}else{
						var j1=0;
						for(j1=0;j1< array[i-1].length;j1++)
							if(array[i-1][j1].name == prov)
								break;
						if(j1 == array[i-1].length)
							data[i].oriDis = 0;
						else{
							var d = (array[i][j].x - array[i-1][j1].x)*(array[i][j].x - array[i-1][j1].x)+
								(array[i][j].y - array[i-1][j1].y)*(array[i][j].y - array[i-1][j1].y);
							data[i].oriDis = Math.sqrt(d);
						}
					}
					
				}
			data[i].year = i + 1952;
			if(data[i].dis > max) max = data[i].dis;
			if(data[i].dis < min) min = data[i].dis;
			if(data[i].oriDis > max) max = data[i].oriDis;
			if(data[i].oriDis < min) min = data[i].oriDis;
		}
		svg_bar2 = d3.select("#Bar").append("svg").attr("id", "draw_bar").attr("width", width).attr("height", height);
		var padding = {top: 20, right: 20, bottom: 30, left: 20};
			
		var xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangeRoundBands([0, width - padding.right - padding.left],0.2);
		var yScale = d3.scale.linear().domain([0, 2]).range([0, height - padding.top - padding.bottom]);
		var tip1 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {	return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.dis + "</span>";});
		var tip2 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.oriDis + "</span>";});
		svg_bar2.call(tip1);svg_bar2.call(tip2);
		if(showType == "-1"){
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.1).on('mouseover', tip1.show).on('mouseout', tip1.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide);
		}
		else if(showType == "0"){
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.1).on('mouseover', tip2.show).on('mouseout', tip2.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide);
		}
		else{
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide);
		}
		//var line = svg_bar2.selectAll("line").data(data).enter().append("line").attr("x1", function(d, i){	return padding.left + xScale(i) + xScale.rangeBand()/2;}).attr("y1", height - padding.bottom).attr("x2", function(d, i){return padding.left + xScale(i) + xScale.rangeBand()/2;	}).attr("y2", height - padding.bottom + 10).attr("stroke", "black").attr("stroke-width", 1);
		
		xScale = d3.scale.linear().domain([1952, 2013]).range([padding.left * 2, width - padding.right - padding.left]);
		var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(0);

		yScale.range([height - padding.top - padding.bottom, 0]);
		var yAxis = d3.svg.axis().scale(yScale).orient("left");

		svg_bar2.append("g").attr("class", "axis").attr("transform", "translate(0,170)").call(xAxis);
		svg_bar2.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left * 2 + "," + padding.top + ")").call(yAxis);

	}else{
		for(var i = 0; i < array.length; i++){
			data[i] = {};			
			for(var j=0;j< array[i].length;j++)
				if(array[i][j].name == prov){
					if(i == 0){
						data[i].oriDis = 0;	break;
					}else{
						var j1=0;
						for(j1=0;j1< array[i-1].length;j1++)
							if(array[i-1][j1].name == prov)
								break;
						if(j1 == array[i-1].length)
							data[i].oriDis = 0;
						else{
							var d = (array[i][j].x - array[i-1][j1].x)*(array[i][j].x - array[i-1][j1].x)+
								(array[i][j].y - array[i-1][j1].y)*(array[i][j].y - array[i-1][j1].y);
							data[i].oriDis = Math.sqrt(d);
						}
					}
				}
			data[i].year = i + 1952;
		}
		svg_bar2 = d3.select("#Bar").append("svg").attr("id", "draw_bar").attr("width", width).attr("height", height);
		var padding = {top: 20, right: 20, bottom: 30, left: 20};
			
		var xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangeRoundBands([0, width - padding.right - padding.left],0.2);
		var yScale = d3.scale.linear().domain([0, 2]).range([0, height - padding.top - padding.bottom]);
		var tip1 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {	return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.oriDis + "</span>";});
		var tip2 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.oriDis + "</span>";});
		svg_bar2.call(tip1);svg_bar2.call(tip2);
		if(showType == "-1"){
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.1).on('mouseover', tip1.show).on('mouseout', tip1.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide);
		}
		else if(showType == "0"){
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.1).on('mouseover', tip2.show).on('mouseout', tip2.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide);
		}
		else{
			if(isCurrent != "-1"){
				var rect = svg_bar2.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "blue";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide);
			}
			var rect1 = svg_bar2.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide);
		}
		//var line = svg_bar2.selectAll("line").data(data).enter().append("line").attr("x1", function(d, i){	return padding.left + xScale(i) + xScale.rangeBand()/2;}).attr("y1", height - padding.bottom).attr("x2", function(d, i){return padding.left + xScale(i) + xScale.rangeBand()/2;	}).attr("y2", height - padding.bottom + 10).attr("stroke", "black").attr("stroke-width", 1);
		
		xScale = d3.scale.linear().domain([1952, 2013]).range([padding.left * 2, width - padding.right - padding.left]);
		var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(0);

		yScale.range([height - padding.top - padding.bottom, 0]);
		var yAxis = d3.svg.axis().scale(yScale).orient("left");

		svg_bar2.append("g").attr("class", "axis").attr("transform", "translate(0,170)").call(xAxis);
		svg_bar2.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left * 2 + "," + padding.top + ")").call(yAxis);

	}
}

function drawBar3(oclass){
	d3.select("#draw_bar").remove();
	var max = 0;
	var min = Number.POSITIVE_INFINITY;
	var data = new Array();
	var width = 700, height = 200;
	for(var i = 0; i < array.length; i++){
		data[i] = {};	data[i].oriDis = 0;
		for(var j=0;j< array[i].length;j++){
			for(var k=0;k<oclass.length;k++){
				if(array[i][j].name == oclass[k]){
					data[i].oriDis += array[i][j].dis;
					break;
				}
			}
		}
		data[i].year = i + 1952;
	}
	
	for(var i = 0; i < array.length; i++){
		data[i].dis = 0;
		for(var j=0;j< array[i].newdatapoint.length;j++){
			for(var k=0;k<oclass.length;k++){
				if(array[i].newdatapoint[j].name == oclass[k]){
					data[i].dis += array[i].newdatapoint[j].dis;
					break;
				}
			}
		}
	}
	var threshold = $("#hcluster_thresh").val()*10;
	for(var i=0;i<array.length;i++){
		data[i].matchlen = 0;
		var c1 = array[i].hcdata[threshold];
		for(var k=0;k<c1.length;k++){
			var matchlen = 0;
			for(var j1=0;j1<oclass.length;j1++){
				for(var j2=0;j2<c1[k].length;j2++)
					if(oclass[j1] == c1[k][j2].name){
						matchlen++;
						break;
					}
			}
			if(matchlen > data[i].matchlen)
				data[i].matchlen = matchlen;
		}
		data[i].matchlen = 1.0*data[i].matchlen/oclass.length;
	}
	var pblue = d3.rgb(20,20,255);
	var pgreen = d3.rgb(20,255,20);
	var color = d3.interpolate(pblue,pgreen);
	var linear = d3.scale.linear().domain([0, 1]).range([0, 1]);
	
	svg_bar3 = d3.select("#Bar").append("svg").attr("id", "draw_bar").attr("width", width).attr("height", height);
	var padding = {top: 20, right: 20, bottom: 30, left: 20};

	var text1952 = svg_bar3.append("text").attr("x", 20).attr("y", 185).attr("dx", 10).attr("dy", 10).text("1952");
	var text2013 = svg_bar3.append("text").attr("x", 640).attr("y", 185).attr("dx", 10).attr("dy", 10).text("2013");

	var xScale = d3.scale.ordinal().domain(d3.range(data.length)).rangeRoundBands([0, width - padding.right - padding.left], 0.2);
	var yScale = d3.scale.linear().domain([0, 8]).range([0, height - padding.top - padding.bottom]);
	var tip1 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.dis + "</span>";});
	var tip2 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function(d) {return "<strong>" + d.year + ":</strong> <span style='color:red'>" + d.oriDis + "</span>";});
	svg_bar3.call(tip1);svg_bar3.call(tip2);
	if(showType == "-1"){
		if(isCurrent != "-1"){
			var rect = svg_bar3.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return color(linear(d.matchlen));}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.1).on('mouseover', tip1.show).on('mouseout', tip1.hide);
		}
		var rect1 = svg_bar3.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide);
	}
	else if(showType == "0"){
		if(isCurrent != "-1"){
			var rect = svg_bar3.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.1).on('mouseover', tip2.show).on('mouseout', tip2.hide);
		}
		var rect1 = svg_bar3.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return color(linear(d.matchlen));}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.9).on('mouseover', tip1.show).on('mouseout', tip1.hide);
	}
	else{
		if(isCurrent != "-1"){
			var rect = svg_bar3.selectAll("rect").data(data).enter().append("rect").attr("fill", function(d){return color(linear(d.matchlen));}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.dis+d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.dis);}).style("opacity",0.7).on('mouseover', tip1.show).on('mouseout', tip1.hide);
		}
		var rect1 = svg_bar3.selectAll("rect1").data(data).enter().append("rect").attr("fill", function(d){return "red";}).attr("x", function(d, i){return padding.left + xScale(i);}).attr("y", function(d, i){return height - padding.bottom - yScale(d.oriDis);}).attr("width", xScale.rangeBand()).attr("height", function(d){return yScale(d.oriDis);}).style("opacity",0.7).on('mouseover', tip2.show).on('mouseout', tip2.hide);
	}
	
	//var line = svg_bar3.selectAll("line").data(data).enter().append("line").attr("x1", function(d, i){	return padding.left + xScale(i) + xScale.rangeBand()/2;}).attr("y1", height - padding.bottom).attr("x2", function(d, i){return padding.left + xScale(i) + xScale.rangeBand()/2;	}).attr("y2", height - padding.bottom + 10).attr("stroke", "black").attr("stroke-width", 1);
	
	xScale = d3.scale.linear().domain([1952, 2013]).range([padding.left * 2, width - padding.right - padding.left]);
	var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(0);

	yScale.range([height - padding.top - padding.bottom, 0]);
	var yAxis = d3.svg.axis().scale(yScale).orient("left");

	svg_bar3.append("g").attr("class", "axis").attr("transform", "translate(0,170)").call(xAxis);
	svg_bar3.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left * 2 + "," + padding.top + ")").call(yAxis);
}
