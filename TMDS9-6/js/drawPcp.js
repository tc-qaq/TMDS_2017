var margin = { top: 40, right: 0, bottom: 5, left: 0 },
        width = 700 - margin.left - margin.right, height = 220 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangePoints([0, width], 1), y = {}, dragging = {};

var line = d3.svg.line(), axis = d3.svg.axis().orient("left").ticks(0),
    background, foreground;
function drawPcp(year) {
    console.log(year);
    d3.select("#drawPcp1").remove();
    var svg = d3.select("#pcp1").append("svg").attr("id","drawPcp1").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var gData = new Array();
    var len = databacis.length;
    var max = new Array();
    var min = new Array();
    max[0] = 0; max[1] = 0; max[2] = 0; max[3] = 0; max[4] = 0; max[5] = 0; max[6] = 0; max[7] = 0;
    min[0] = 100; min[1] = 100; min[2] = 100; min[3] = 100; min[4] = 100; min[5] = 100; min[6] = 100; min[7] = 100;
    for (var i = 3; i < len; i++) {
        if (name == "Gdp.csv") {
            max[0] = max[0] > parseFloat(databacis[i].Gdp0102) ? max[0] : parseFloat(databacis[i].Gdp0102);
            max[1] = max[1] > parseFloat(databacis[i].Gdp0103) ? max[1] : parseFloat(databacis[i].Gdp0103);
            max[2] = max[2] > parseFloat(databacis[i].Gdp0104) ? max[2] : parseFloat(databacis[i].Gdp0104);
            max[3] = max[3] > parseFloat(databacis[i].Gdp0105) ? max[3] : parseFloat(databacis[i].Gdp0105);
            max[4] = max[4] > parseFloat(databacis[i].Gdp0106) ? max[4] : parseFloat(databacis[i].Gdp0106);
            max[5] = max[5] > parseFloat(databacis[i].Gdp0107) ? max[5] : parseFloat(databacis[i].Gdp0107);
            max[6] = max[6] > parseFloat(databacis[i].Gdp0108) ? max[6] : parseFloat(databacis[i].Gdp0108);
            max[7] = max[7] > parseFloat(databacis[i].Gdp0116) ? max[7] : parseFloat(databacis[i].Gdp0116);

            min[0] = min[0] < parseFloat(databacis[i].Gdp0102) ? min[0] : parseFloat(databacis[i].Gdp0102);
            min[1] = min[1] < parseFloat(databacis[i].Gdp0103) ? min[1] : parseFloat(databacis[i].Gdp0103);
            min[2] = min[2] < parseFloat(databacis[i].Gdp0104) ? min[2] : parseFloat(databacis[i].Gdp0104);
            min[3] = min[3] < parseFloat(databacis[i].Gdp0105) ? min[3] : parseFloat(databacis[i].Gdp0105);
            min[4] = min[4] < parseFloat(databacis[i].Gdp0106) ? min[4] : parseFloat(databacis[i].Gdp0106);
            min[5] = min[5] < parseFloat(databacis[i].Gdp0107) ? min[5] : parseFloat(databacis[i].Gdp0107);
            min[6] = min[6] < parseFloat(databacis[i].Gdp0108) ? min[6] : parseFloat(databacis[i].Gdp0108);
            min[7] = min[7] < parseFloat(databacis[i].Gdp0116) ? min[7] : parseFloat(databacis[i].Gdp0116);        
        } else {
            max[0] = max[0] > parseFloat(databacis[i].a0102) ? max[0] : parseFloat(databacis[i].a0102);
            max[1] = max[1] > parseFloat(databacis[i].a0104) ? max[1] : parseFloat(databacis[i].a0104);
            max[2] = max[2] > parseFloat(databacis[i].a0106) ? max[2] : parseFloat(databacis[i].a0106);
            max[3] = max[3] > parseFloat(databacis[i].a0108) ? max[3] : parseFloat(databacis[i].a0108);
            max[4] = max[4] > parseFloat(databacis[i].a0110) ? max[4] : parseFloat(databacis[i].a0110);
            max[5] = max[5] > parseFloat(databacis[i].a0114) ? max[5] : parseFloat(databacis[i].a0114);

            min[0] = min[0] < parseFloat(databacis[i].a0102) ? min[0] : parseFloat(databacis[i].a0102);
            min[1] = min[1] < parseFloat(databacis[i].a0104) ? min[1] : parseFloat(databacis[i].a0104);
            min[2] = min[2] < parseFloat(databacis[i].a0106) ? min[2] : parseFloat(databacis[i].a0106);
            min[3] = min[3] < parseFloat(databacis[i].a0108) ? min[3] : parseFloat(databacis[i].a0108);
            min[4] = min[4] < parseFloat(databacis[i].a0110) ? min[4] : parseFloat(databacis[i].a0110);
            min[5] = min[5] < parseFloat(databacis[i].a0114) ? min[5] : parseFloat(databacis[i].a0114);
        }                
    }

    for (var i = 3, j = 0; i < len; i++) {
        if (name == "Gdp.csv") {
            if (databacis[i].Sgnyea == year.toString()) {
                gData[j] = {};
                gData[j].first = databacis[i].Gdp0102;
                gData[j].second = databacis[i].Gdp0103;
                gData[j].industry = databacis[i].Gdp0104;
                gData[j].construction = databacis[i].Gdp0105;
                gData[j].third = databacis[i].Gdp0106;
                gData[j].TransportationStorage = databacis[i].Gdp0107;
                gData[j].wholesaleRetail = databacis[i].Gdp0108;
                gData[j].agdp = databacis[i].Gdp0116;
                j++;
            }
        } else {
            if (databacis[i].Sgnyea == year.toString()) {
                gData[j] = {};
                gData[j].PM25 = databacis[i].a0102;
                gData[j].PM10 = databacis[i].a0104;
                gData[j].SO2 = databacis[i].a0106;
                gData[j].NO2 = databacis[i].a0108;
                gData[j].O3 = databacis[i].a0110;
                gData[j].CO = databacis[i].a0114;
                j++;
            }
        }
    }
    // Extract the list of dimensions and create a scale for each
    x.domain(dimensions = d3.keys(gData[0]).filter(function (d) {//d3.extent(gData, function (p) { return +p[d]; })
        return (d != "Sgnyea") && (y[d] = d3.scale.linear()
            .domain(d3.extent(databacis, function (p) {
                if (d == "first") return +p["Gdp0102"];
                else if(d == "second") return +p["Gdp0103"];
                else if(d == "industry") return +p["Gdp0104"];
                else if(d == "construction") return +p["Gdp0105"];
                else if(d == "third") return +p["Gdp0106"];
                else if(d == "TransportationStorage") return +p["Gdp0107"];
                else if(d == "wholesaleRetail") return +p["Gdp0108"];
                else if (d == "agdp") return +p["Gdp0116"];
                
                else if(d == "PM25") return +p["a0102"];
                else if(d == "PM10") return +p["a0104"];
                else if(d == "SO2") return +p["a0106"];
                else if(d == "NO2") return +p["a0108"];
                else if(d == "O3") return +p["a0110"];
                else if(d == "CO") return +p["a0114"];
            })).range([height, 0]));
    }));
    // Add grey background lines for context.
    background = svg.append("g").attr("class", "background").selectAll("path")
                               .data(gData).enter().append("path").attr("d", path);
    // Add blue foreground lines for focus.
    foreground = svg.append("g").attr("class", "foreground").selectAll("path")
                              .data(gData).enter().append("path").attr("d", path);
    var g = svg.selectAll(".dimension").data(dimensions).enter().append("g")
                     .attr("class", "dimension").attr("transform", function (d) { return "translate(" + x(d) + ")"; })
                     .call(d3.behavior.drag()
                     .origin(function (d) { return { x: x(d) }; })
                     .on("dragstart", function (d) { dragging[d] = x(d); background.attr("visibility", "hidden"); })
                     .on("drag", function (d) { dragging[d] = Math.min(width, Math.max(0, d3.event.x)); foreground.attr("d", path); dimensions.sort(function (a, b) { return position(a) - position(b); }); x.domain(dimensions); g.attr("transform", function (d) { return "translate(" + position(d) + ")"; }) })
                     .on("dragend", function (d) { delete dragging[d]; transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")"); transition(foreground).attr("d", path); background.attr("d", path).transition().delay(500).duration(0).attr("visibility", null); }));
    // Add an axis and title.
    g.append("g").attr("class", "axis").each(function (d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text").style("font-size", "12px").style("text-anchor", "middle").attr("y", -15)
      .text(function (d) {
          if (d == "first") return "第一产业";
          else if (d == "second") return "第二产业";
          else if (d == "industry") return "工业";
          else if (d == "construction") return "建筑业";
          else if (d == "third") return "第三产业";
          else if (d == "TransportationStorage") return "交通仓储邮政产业";
          else if (d == "wholesaleRetail") return "批发零售产业";
          else if (d == "agdp") return "人均GDP";
          else return d;
      });
    // Add and store a brush for each axis.
    g.append("g").attr("class", "brush").each(function (d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush)); })
     .selectAll("rect").attr("x", -8).attr("width", 16);
    if (name == "Gdp.csv") {
        g.append("text").attr("x", -30).attr("y", 0).attr("dx", -8).attr("dy", 5)
        .text(function (d) {
            if (d == "first") return max[0];
            else if (d == "second") return max[1];
            else if (d == "industry") return max[2];
            else if (d == "construction") return max[3];
            else if (d == "third") return max[4];
            else if (d == "TransportationStorage") return max[5];
            else if (d == "wholesaleRetail") return max[6];
            else if (d == "agdp") return max[7];
        });
        g.append("text").attr("x", 0).attr("y", 175).attr("dx", -8).attr("dy", 0)
        .text(function (d) {
            if (d == "first") return min[0];
            else if (d == "second") return min[1];
            else if (d == "industry") return min[2];
            else if (d == "construction") return min[3];
            else if (d == "third") return min[4];
            else if (d == "TransportationStorage") return min[5];
            else if (d == "wholesaleRetail") return min[6];
            else if (d == "agdp") return min[7];
        });
    } else {
        g.append("text").attr("x", -20).attr("y", 0).attr("dx", -8).attr("dy", 5)
       .text(function (d) {
           if (d == "PM25") return max[0];
           else if (d == "PM10") return max[1];
           else if (d == "SO2") return max[2];
           else if (d == "NO2") return max[3];
           else if (d == "O3") return max[4];
           else if (d == "CO") return max[5];
           
       });
        g.append("text").attr("x", -20).attr("y", 175).attr("dx", -8).attr("dy", 0)
        .text(function (d) {
            if (d == "PM25") return min[0];
            else if (d == "PM10") return min[1];
            else if (d == "SO2") return min[2];
            else if (d == "NO2") return min[3];
            else if (d == "O3") return min[4];
            else if (d == "CO") return min[5];
        });
    }
}

function position(d) {
    var v = dragging[d]; return v == null ? x(d) : v;
}
function transition(g) {
    return g.transition().duration(500);
}
// Returns the path for a given data point.
function path(d) {
    return line(dimensions.map(function (p) { return [position(p), y[p](d[p])]; }));
}
function brushstart() {
    d3.event.sourceEvent.stopPropagation();
}
// Handles a brush event, toggling the display of foreground lines.
function brush() {
    var actives = dimensions.filter(function (p) { return !y[p].brush.empty(); }),
          extents = actives.map(function (p) { return y[p].brush.extent(); });
    foreground.style("display", function (d) {
        return actives.every(function (p, i) { return extents[i][0] <= d[p] && d[p] <= extents[i][1]; }) ? null : "none";
    });
}