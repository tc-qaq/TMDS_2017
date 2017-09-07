function histogram(){
	var width = 1256;
	var height = 2456;
	var padding = {top: 30, bottom: 30, right: 30, left: 30};
	
	var svg_His = d3.select("#histogram")
					.append("svg")
					.attr("id", "draw_histogram")
					.attr("width", width)
					.attr("height", height);
						
	var step = 30;
	var rect_width = (width - padding.right - padding.left - step * 5)/5;
	console.log(rect_width);
	var rect_height = 150;
	var padding2 = {top: 10, bottom: 10, right: 10, left: 10};
		
	var w = padding.left;
	var h = padding.top;
		
	for(var i = 1; i < hisData.length; i++){
		if(i % 5 == 0){
			w = padding.left;
			h += rect_height + step;
		}
			
		var xTicks = hisData[i].map;
		var xScale = d3.scale.ordinal()
					   .domain(xTicks)
					   .rangeRoundBands([0, rect_width], 0.1);
					   
		var xAxis = d3.svg.axis()
		              .scale(xScale)
					  .orient("bottom")
					  .tickFormat(d3.format(".0f"));
						  
		svg_His.append("g")
		       .attr("class", "axis")
			   .attr("transform", "translate(" + (w + padding2.left) + "," + (h + rect_height - padding2.bottom) + ")")
			   .call(xAxis);
			   
		var yScale = d3.scale.linear()
		               .domain([d3.min(hisData[i], function(d){return d.y;}),
					            d3.max(hisData[i], function(d){return d.y;})])
					   .range([5, rect_height]);
			
		var gRect = svg_His.append("g")
		                   .attr("transform", "translate(" + (w + padding2.left) + "," + (h - padding2.top) + ")");
					   
		for(var j = 0; j < hisData[i].length; j++){
			gRect.append("rect")
  			     .attr("x", xScale(hisData[i][j].x))
				 .attr("y", rect_height - yScale(hisData[i][j].y))
				 .attr("width", xScale.rangeBand())
				 .attr("height", yScale(hisData[i][j].y));
		}
			
		yScale.range([rect_height, 5])
			
		var yAxis = d3.svg.axis()
		              .scale(yScale)
					  .orient("left");
			
		svg_His.append("g")
		       .attr("class", "axis")
			   .attr("transform", "translate(" + (w + padding2.left) + "," + (h - padding2.top) + ")")
			   .call(yAxis);
			
		w += rect_width + step;
	}
	
}
// draw provinces movenment
function drawProvincesMovement() {
    d3.select("#draw_movement1").remove();
    d3.select("#draw_movement2").remove();
    var width = 600;
    var height = 240;
    var max = 0;
    var min = Number.POSITIVE_INFINITY;
    for (var i = 0; i < prvMove.length; i++) {
        if (prvMove[i].dis1 > max) max = prvMove[i].dis1;
        if (prvMove[i].dis2 > max) max = prvMove[i].dis2;
        if (prvMove[i].dis1 < min) min = prvMove[i].dis1;
        if (prvMove[i].dis2 < min) min = prvMove[i].dis2;
    }

    var svg_Move1 = d3.select("#movement1").append("svg").attr("id", "draw_movement1").attr("width", width).attr("height", height);
    var svg_Move2 = d3.select("#movement2").append("svg").attr("id", "draw_movement2").attr("width", width).attr("height", height);
    var padding = { top: 10, right: 50, bottom: 30, left: 50 };

    var xScale = d3.scale.ordinal().domain(d3.range(prvMove.length)).rangeRoundBands([0, width - padding.right - padding.left], 0.2);
    var yScale = d3.scale.linear().domain([min, max]).range([0, height - padding.top - padding.bottom]);
    var tip1 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function (d) { return "<strong>" + d.name + ":</strong> <span style='color:red'>" + d.dis1 + "</span>"; });
    var tip2 = d3.tip().attr('class', 'tip').offset([-10, 0]).html(function (d) { return "<strong>" + d.name + ":</strong> <span style='color:red'>" + d.dis2 + "</span>"; });
    svg_Move1.call(tip1);
    svg_Move2.call(tip2);

    var rect1 = svg_Move1.selectAll("rect").data(prvMove).enter().append("rect")
						.attr("fill", function (d) { return "yellow"; })
						.attr("x", function (d, i) { return padding.left + xScale(i); })
						.attr("y", function (d, i) { return height - padding.bottom - yScale(d.dis1); })
						.attr("width", xScale.rangeBand())
						.attr("height", function (d) { return yScale(d.dis1)+10; })
						.on('mouseover', tip1.show)
						.on('mouseout', tip1.hide);
    var rect2 = svg_Move2.selectAll("rect").data(prvMove).enter().append("rect")
						.attr("fill", function (d) { return "yellow"; })
						.attr("x", function (d, i) { return padding.left + xScale(i); })
						.attr("y", function (d, i) { return height - padding.bottom - yScale(d.dis2); })
						.attr("width", xScale.rangeBand())
						.attr("height", function (d) { return yScale(d.dis2)+10; })
						.on('mouseover', tip2.show)
						.on('mouseout', tip2.hide);
    var text1 = svg_Move1.selectAll("text").data(prvMove).enter().append("text")
						.attr("fill", "black")
						.attr("font-size", "14px")
						.attr("text-anchor", "left")
						.text(function (d, i) { return i+1; })
						.attr("transform", function (d, i) {
						    var result = "translate(" + (padding.left + xScale(i)) + "," + (height - 10) + ")";
						    return result;
						});
    var text2 = svg_Move2.selectAll("text").data(prvMove).enter().append("text")
						.attr("fill", "black")
						.attr("font-size", "14px")
						.attr("text-anchor", "left")
                        .attr("style","width:20px")
						.text(function (d, i) { return i + 1; })
						.attr("transform", function (d, i) {
						    var result = "translate(" + (padding.left + xScale(i)) + "," + (height - 10) + ")";
						    return result;
						});
    var line1 = svg_Move1.selectAll("line").data(prvMove).enter().append("line")
						.attr("x1", function (d, i) {
						    return padding.left + xScale(i) + xScale.rangeBand() / 2;
						})
						.attr("y1", height - padding.bottom)
						.attr("x2", function (d, i) {
						    return padding.left + xScale(i) + xScale.rangeBand() / 2;
						})
						.attr("y2", height - padding.bottom + 10)
						.attr("stroke", "black")
						.attr("stroke-width", 1);
    var line2 = svg_Move2.selectAll("line").data(prvMove).enter().append("line")
                       .attr("x1", function (d, i) { return padding.left + xScale(i) + xScale.rangeBand() / 2; })
                       .attr("y1", height - padding.bottom)
                       .attr("x2", function (d, i) { return padding.left + xScale(i) + xScale.rangeBand() / 2; })
                       .attr("y2", height - padding.bottom + 10)
                       .attr("stroke", "black")
                       .attr("stroke-width", 1);

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    yScale.range([height - padding.top - padding.bottom, 0]);

    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    svg_Move1.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left + "," + padding.top + ")").call(yAxis);
    svg_Move2.append("g").attr("class", "axis").attr("transform", "translate(" + padding.left + "," + padding.top + ")").call(yAxis);
    svg_Move1.append("text").text("变换后").attr("x", 100).attr("y", 20);  
		
    svg_Move2.append("text").text("变换前").attr("x", 100).attr("y", 20);	
}

