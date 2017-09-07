function changeA(){
	document.getElementById('slider_hcluster_thresh').min = 0;
	document.getElementById('slider_hcluster_thresh').max = 10;
	var value = document.getElementById('slider_hcluster_thresh').value;
	
	$("#hcluster_thresh").val(value/10);
	if(isCurrent == "1")
     	currentNewPoint(value);
	if(isDynamic == "0"){
        if(drawType == "0")	drawMovementHcluster(value,$("#hcluster_year").val());
        else            	drawMovementHcluster1(value,$("#hcluster_year").val());
    }else{
    	if(drawType == "0")	drawMovementHclusterDynamic(value,$("#hcluster_year").val());
         else            	drawMovementHcluster1Dynamic(value,$("#hcluster_year").val());
    }
	drawBar();
}
function changeB(){
	document.getElementById('slider_hcluster_year').min = 0;
	if(array != undefined)
		document.getElementById('slider_hcluster_year').max = array.length-1;
	var value = document.getElementById('slider_hcluster_year').value;
	var y = 1952 + parseInt(value);
	if (name == "Gdp.csv") {
	    drawPcp(y);
	    $("#hcluster_year").val(y);
	} else {
	    drawPcp(140601 + parseInt(value));
	    $("#hcluster_year").val(1+parseInt(value));
	}
	
	hcluster_year = value;
	 if(isCurrent == "1")
     	currentNewPoint(value);
     if(isDynamic == "0"){
     	if(drawType == "0")	drawMovementHcluster($("#hcluster_thresh").val()*10,value);
         else             	drawMovementHcluster1($("#hcluster_thresh").val()*10,value);
     }else{
     	if(drawType == "0")	drawMovementHclusterDynamic($("#hcluster_thresh").val()*10,value);
         else             	drawMovementHcluster1Dynamic($("#hcluster_thresh").val()*10,value);
     }
     drawBar();
}

/*$(function(){
	 $("#slider_hcluster_thresh").slider({
	        min: 2,
	        max: 10,
	        range: "min",
	        value: 5,
	        slide: function (event, ui) {
	            $("#hcluster_thresh").val(ui.value/10);
	            if(isDynamic == "0"){
		            if(drawType == "0")	drawMovementHcluster(ui.value,$("#hcluster_year").val());
		            else            	drawMovementHcluster1(ui.value,$("#hcluster_year").val());
	            }else{
	            	if(drawType == "0")	drawMovementHclusterDynamic(ui.value,$("#hcluster_year").val());
	 	            else            	drawMovementHcluster1Dynamic(ui.value,$("#hcluster_year").val());
	            }
	        }
	    });
	    $("#slider_hcluster_year").slider({
	        min: 0,
	        max: array.length-1,
	        range: "min",
	        value: 0,
	        slide: function (event, ui) {
	            $("#hcluster_year").val(ui.value);
	            hcluster_year = ui.value;
	            if(isCurrent == "1")
	            	currentNewPoint(ui.value);
	            if(isDynamic == "0"){
	            	if(drawType == "0")	drawMovementHcluster($("#hcluster_thresh").val()*10,ui.value);
	                else             	drawMovementHcluster1($("#hcluster_thresh").val()*10,ui.value);
	            }else{
	            	if(drawType == "0")	drawMovementHclusterDynamic($("#hcluster_thresh").val()*10,ui.value);
	                else             	drawMovementHcluster1Dynamic($("#hcluster_thresh").val()*10,ui.value);
	            }
	            
	            
	            drawBar();
	        }
	    });
});*/