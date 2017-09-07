
	var svg_maxtrix;

	function drawMatrix(year){
		
		d3.select("#draw_Matrix").remove();
				
		var year2 = year - 1952;
		var data = array[year2].matrix;
		var min = array[year2].min_m;
		var max = array[year2].max_m;
		
		var width = 150;
		var height = 150;
		
		var len = 140;

		var padding = {top: 5, left: 5, bottom: 5, right: 5};
		
		svg_maxtrix = d3.select("#Matrix")
		                  .append("svg")
						  .attr("id", "draw_Matrix")
						  .attr("width", width)
						  .attr("height", height);

		var gridSize = Math.floor(len / data.length);
        var legendElementWidth = gridSize*2;
        var buckets = 6;
        var colors = ['#f6faaa','#FEE08B','#FDAE61','#F46D43','#D53E4F','#9E0142'];
		
		var colorScale = d3.scale.quantile()
						   .domain([0, buckets - 1, max])
						   .range(colors);
						   
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < data.length; j++){
				svg_maxtrix.append("rect")
				           .attr("x", i*gridSize + padding.left)
						   .attr("y", j*gridSize + padding.top)
						   .attr("rx", 2)
						   .attr("ry", 2)
						   .attr("width", gridSize)
						   .attr("height", gridSize)
						   .attr("fill", colorScale(data[i][j]));
			}
		}
	}