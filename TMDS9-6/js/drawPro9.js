		
		var provinces;
		
		var width1 = 400;
		var height1 = 400;
		
		var svg_provinces = d3.select("#provinces")
					.append("svg")
					.attr("width", width1)
					.attr("height", height1);
				
		var projection = d3.geo.mercator()
						   .center([107, 31])
						   .scale(300)
						   .translate([width1/2 + 30, height1/2 + 20]);
									   
		var path = d3.geo.path()
					 .projection(projection);
					 
		var china = svg_provinces.append("g")
					   .attr("class","gRoot");
		
		var defs = svg_provinces.append("defs");
		
		var lines = [[170, 325], [420, 325], [420,360], [170, 360], [170, 325]];
			
		var linePath = d3.svg.line();
	   
		d3.json("china.geojson", function(error, root){
			
			if(error)
				return console.log(error);
			
			provinces = china.selectAll("path")
							 .data(root.features)
							 .enter()
							 .append("path")
							 .attr("stroke", "white")
							 .attr("stroke-width", 1)
							 .attr("fill", "#ccc")
							 .attr("d", path);
			drawColor(year);
		});
		
		
				
		var minText = svg_provinces.append("text")
						 .attr("class","valueText")
						 .attr("x", 30)
						 .attr("y", 325)
						 .attr("dy", "-0.3em");

		var maxText = svg_provinces.append("text")
						 .attr("class","valueText")
						 .attr("x", 120)
						 .attr("y", 325)
						 .attr("dy", "-0.3em");	
			
		var linear1 = d3.scale.linear()
					   .domain([0, 0.25])
					   .range([0,1]);
		var linear2 = d3.scale.linear()
					   .domain([0.25, 0.5])
					   .range([0,1]);
					   
		var linear3 = d3.scale.linear()
					   .domain([0.5, 0.75])
					   .range([0,1]);
					   
		var linear4 = d3.scale.linear()
					   .domain([0.75, 1])
					   .range([0,1]);
					   
		var a = d3.rgb(255, 0, 0);
		var b = d3.rgb(255, 255, 0);
		var c = d3.rgb(0, 255, 0);
		var e = d3.rgb(0, 255, 255);
		var f = d3.rgb(0, 0, 255);
		
		var computeColor1 = d3.interpolate(a, b);
		var computeColor2 = d3.interpolate(b, c);
		var computeColor3 = d3.interpolate(c, e);
		var computeColor4 = d3.interpolate(e, f);
		
		var linearGradient1 = defs.append("linearGradient")
									.attr("id","linearColor1")
									.attr("x1","0%")
									.attr("y1","0%")
									.attr("x2","100%")
									.attr("y2","0%");

		var stop11 = linearGradient1.append("stop")
						.attr("offset","0%")
						.style("stop-color",a.toString());

		var stop12 = linearGradient1.append("stop")
						.attr("offset","100%")
						.style("stop-color",b.toString());

		var colorRect1 = svg_provinces.append("rect")
					.attr("x", 30)
					.attr("y", 325)
					.attr("width", 25)
					.attr("height", 30)
					.style("fill","url(#" + linearGradient1.attr("id") + ")");
		
		var linearGradient2 = defs.append("linearGradient")
								.attr("id","linearColor2")
								.attr("x1","0%")
								.attr("y1","0%")
								.attr("x2","100%")
								.attr("y2","0%");

		var stop21 = linearGradient2.append("stop")
						.attr("offset","0%")
						.style("stop-color",b.toString());

		var stop22 = linearGradient2.append("stop")
						.attr("offset","100%")
						.style("stop-color",c.toString());

		var colorRect2 = svg_provinces.append("rect")
					.attr("x", 55)
					.attr("y", 325)
					.attr("width", 25)
					.attr("height", 30)
					.style("fill","url(#" + linearGradient2.attr("id") + ")");
		
		var linearGradient3 = defs.append("linearGradient")
								.attr("id","linearColor3")
								.attr("x1","0%")
								.attr("y1","0%")
								.attr("x2","100%")
								.attr("y2","0%");

		var stop31 = linearGradient3.append("stop")
						.attr("offset","0%")
						.style("stop-color",c.toString());

		var stop32 = linearGradient3.append("stop")
						.attr("offset","100%")
						.style("stop-color",e.toString());

		var colorRect3 = svg_provinces.append("rect")
					.attr("x", 80)
					.attr("y", 325)
					.attr("width", 25)
					.attr("height", 30)
					.style("fill","url(#" + linearGradient3.attr("id") + ")");
		
		var linearGradient4 = defs.append("linearGradient")
								.attr("id","linearColor4")
								.attr("x1","0%")
								.attr("y1","0%")
								.attr("x2","100%")
								.attr("y2","0%");

		var stop41 = linearGradient4.append("stop")
						.attr("offset","0%")
						.style("stop-color",e.toString());

		var stop42 = linearGradient4.append("stop")
						.attr("offset","100%")
						.style("stop-color",f.toString());

		var colorRect4 = svg_provinces.append("rect")
					.attr("x", 105)
					.attr("y", 325)
					.attr("width", 25)
					.attr("height", 30)
					.style("fill","url(#" + linearGradient4.attr("id") + ")");
		
		function drawColor(year){
		
			var year2 = year - 1952;
			
			provinces.style("fill", function(d){
						var color, k = 0;
						for(var i = 0 ; i < array[year2].length; i++){
							if(d.properties.name == array[year2][i].name){
								color = array[year2][i].color;
								k++;
								break;
							}
						}
						if(k == 0) color = "#ccc";
						return color;
					 })
					.on('click', function(d, i){
						d3.select(this)
						  .attr("stroke","black");
						console.log(1);
						prvName = d.properties.name;
						console.log(prvName);
						valueShow(year, prvName);
						// var array0 = prv_year(databacis, prvName);
						// var dataPoint = matrixGdp2(array0);
						// drawMDS2(dataPoint, prvName);
					})
					.on('mouseout',function(d, i){
						d3.select(this)
						  .attr("stroke", "white");
					});
			
			minText.text(mindata[year2]);
			maxText.text(maxdata[year2]);
			if(temp == 2) {
				drawMDS2(year, yuzhi);
			}
			if(temp == 1) drawMDS();
		}
		
		function valueShow(year, prv){
			
			d3.select("#valueText2").remove();
			
			var year2 = year - 1952;
			var proValue;
				
			for(var i = 0; i < array[year2].length; i++){
				if(prv == array[year2][i].name)
				{
					var proValue = array[year2][i].Gdp0116;
				}
			}
			var showPro = svg_provinces.append("text")
									   .attr("id", "valueText2")
									   .attr("class", "valueText2")
									   .text(year + " : " + prv + "   " + proValue)
									   .attr("x", 240)
									   .attr("y", 347);
		}
		