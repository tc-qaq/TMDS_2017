	var checkNum = new Array();
	var databacis;
	var year = 1952;
	var prvName = "甘肃省";
	var maxdata = new Array();
	var mindata = new Array();
	var array = new Array();
	var checked = 17;
	var datapoint = new Array();
	var newdatapoint = new Array();
	var rotateangle = 0;
	var yuzhi = 0;
	var rotate_datapoint = new Array();
	var temp = 1;
	var dev = new Array();
	var cluster = 0;
	var hisData = new Array();
	var prvMove = new Array();
	var hcluster_year = 0;
	var isCurrent = "0";
	var drawType = "0";
	var isDynamic = "0";
	var showType = "-1";
	var sizeType = "1"; //GDP-1 Air-2
	var isAssemble = "0";
	var isdrawBar = "0";

	var Prvname=["甘肃省","青海省","广西壮族自治区","贵州省","重庆市",
				 "北京市","福建省","安徽省","广东省","西藏自治区",
				 "新疆维吾尔自治区","海南省","宁夏回族自治区","陕西省","山西省",
				 "湖北省","湖南省","四川省","云南省","河北省",
				 "河南省","辽宁省","山东省","天津市","江西省",
				 "江苏省","上海市","浙江省","吉林省","内蒙古自治区",
				 "黑龙江省"];
	var Prvid =["1223A","1224A","1225A","1226A","1227A","1228A",
	            "1229A","1230A","1231A","1232A","1233A"];
	var csv = d3.dsv(",", "text.csv; charset = utf-8");
	var name = "Gdp.csv";//"Air.csv"
	
	readData(name);
    
    //for pcp params
	

	function readData(DataName){
		if(DataName == "Gdp.csv"){
		csv(DataName, function(error, gdpdata){
		    if (error) console.log(error);
		    databacis = gdpdata;
			drawPcp(2013);
			for(var i=0;i<gdpdata.length;i++){
				if(gdpdata[i].Sgnyea == "年度标识"){
					var attr = gdpdata[i];					
					break;
				}
			}
			for(var year0 = 0; year0 < 62; year0++){
				array[year0] = new Array();
				for(var j = 0; j < Prvname.length; j++){
					array[year0][j] = {};
					array[year0].cy = 0;
					array[year0].cy_guiyi = 0;
					array[year0].cy_new = 0;
					array[year0].cy_new2 = 0;
					array[year0].min = 0;
					array[year0].max = 0;
					array[year0].min_guiyi = 0;
					array[year0].max_guiyi = 0;
					array[year0].matrix = 0;
					array[year0].min_m = 0;
					array[year0].max_m = 0;
					array[year0].newdatapoint = 0;
					array[year0].newdatapoint2 = 0;
					array[year0].x_max = 0;
					array[year0].x_min = 0;
					array[year0].y_max = 0;
					array[year0].y_min = 0;
					array[year0].rectwidth = 0;
					array[year0].center = [0, 0];
					array[year0].avg_angle = 0;
					array[year0].hcdata = 0;
					array[year0].newhcdata = 0;
					array[year0].currentPoint =  0;
					for( var i = 2; i < gdpdata.length; i++){
						if(gdpdata[i].Sgnyea == (year0 + 1952) && gdpdata[i].Prvcnm == Prvname[j]){
							array[year0][j].year = gdpdata[i].Sgnyea;
							array[year0][j].name = gdpdata[i].Prvcnm;
							array[year0][j].Gdp0101 = parseFloat(gdpdata[i].Gdp0101);
							array[year0][j].Gdp0102 = parseFloat(gdpdata[i].Gdp0102);
							array[year0][j].Gdp0103 = parseFloat(gdpdata[i].Gdp0103);
							array[year0][j].Gdp0104 = parseFloat(gdpdata[i].Gdp0104);
							array[year0][j].Gdp0105 = parseFloat(gdpdata[i].Gdp0105);
							array[year0][j].Gdp0106 = parseFloat(gdpdata[i].Gdp0106);
							array[year0][j].Gdp0107 = parseFloat(gdpdata[i].Gdp0107);
							array[year0][j].Gdp0108 = parseFloat(gdpdata[i].Gdp0108);
							array[year0][j].Gdp0109 = parseFloat(gdpdata[i].Gdp0109);
							array[year0][j].Gdp0110 = parseFloat(gdpdata[i].Gdp0110);
							array[year0][j].Gdp0111 = parseFloat(gdpdata[i].Gdp0111);
							array[year0][j].Gdp0112 = parseFloat(gdpdata[i].Gdp0112);
							array[year0][j].Gdp0113 = parseFloat(gdpdata[i].Gdp0113);
							array[year0][j].Gdp0114 = parseFloat(gdpdata[i].Gdp0114);
							array[year0][j].Gdp0115 = parseFloat(gdpdata[i].Gdp0115);
							array[year0][j].Gdp0116 = parseFloat(gdpdata[i].Gdp0116);
							array[year0][j].Gdp0126 = parseFloat(gdpdata[i].Gdp0126);
							array[year0][j].Gdp0127 = parseFloat(gdpdata[i].Gdp0127);
							array[year0][j].Gdp0128 = parseFloat(gdpdata[i].Gdp0128);
							array[year0][j].Gdp0131 = parseFloat(gdpdata[i].Gdp0131);
							array[year0][j].color = "";
							array[year0][j].x = 0;
							array[year0][j].y = 0;
							array[year0][j].x_new = 0;
							array[year0][j].y_new = 0;
							array[year0][j].x_new_guiyi = 0;
							array[year0][j].y_new_guiyi = 0;
							array[year0][j].x_guiyi = 0;
							array[year0][j].y_guiyi = 0;
							array[year0][j].sub = 0;
							array[year0][j].sub_guiyi = 0;
							array[year0][j].angle = 0;
							array[year0][j].dis = 0;
							break;
						}
					}
				}
			}
			for( var year0 = 0; year0 < 62; year0++){
				maxdata[year0] = 0;
				mindata[year0] = Number.POSITIVE_INFINITY;
				for( var j = 0; j < Prvname.length; j++){
					if(Prvname[j] == array[year0][j].name){
						var value = parseFloat(array[year0][j].Gdp0116);
						if(value >= maxdata[year0]) maxdata[year0] = value; 
						if(value <= mindata[year0]) mindata[year0] = value;
					}
				}
			}		
			dataColor();//分级映射,在中国地图中显示
			datasetNor();// 2017-4-13 14:05:23		
			
			dataMDS();  //调用MatrixGdp实现MDS,并统计平均偏差角
			dataSub();
			
			dataHcluster();
			//turn();
			//汤成 在这里 改了    修正成 遍历角度旋转了 原来是 newDatapoint()
			//newDatapoint();
			newDatapoint3();
			//change(year, yuzhi);2017-4-14 09:05:41 drawBar();
			oriDis();   //2017-4-18 13:30:17 实现了计算数据点之间的距离
			valueShow(year, prvName);
			if(temp == 2) {
				newDatapoint2(year, yuzhi, cluster);
				drawMDS2(year, yuzhi);
			}
			if(temp == 1) {
			    drawMDS3();
			    //tangcheng add animation 2017-3-27 20:11:49    drawRains(array);
			    //tangcheng add histogram to show points movement over time 2017-3-29 14:59:35
			    calProvincesMovementOverYears();
	            //tangcheng add drawmovement 2017-3-30 16:24:52
				drawProvincesMovement();
				//tangcheng add Hierarchchinal Cluster
				Hcluster();
				
			}			
			turn3();
			turn4();
			histogram();
			drawColor(year);
			
		});
		}else{
			csv(DataName, function(error, envdata){
				if(error)	console.log(error);
				databacis = envdata;
				drawPcp(140601);
				for(var i=0;i<envdata.length;i++){
					if(envdata[i].Sgnyea == "年度标识"){
						var attr = envdata[i];
						break;
					}					
				}
				for(var day0 = 0; day0 < 30; day0++){
					array[day0] = new Array();
					for(var j = 0; j < Prvid.length; j++){
						array[day0][j] = {};
						array[day0].cy = 0;
						array[day0].cy_guiyi = 0;
						array[day0].cy_new = 0;
						array[day0].cy_new2 = 0;
						array[day0].min = 0;
						array[day0].max = 0;
						array[day0].min_guiyi = 0;
						array[day0].max_guiyi = 0;
						array[day0].matrix = 0;
						array[day0].min_m = 0;
						array[day0].max_m = 0;
						array[day0].newdatapoint = 0;
						array[day0].newdatapoint2 = 0;
						array[day0].x_max = 0;
						array[day0].x_min = 0;
						array[day0].y_max = 0;
						array[day0].y_min = 0;
						array[day0].rectwidth = 0;
						array[day0].center = [0, 0];
						array[day0].avg_angle = 0;
						array[day0].hcdata = 0;
						array[day0].newhcdata = 0;
						array[day0].currentPoint =  0;
						for( var i = 1; i < envdata.length; i++){
							if(envdata[i].Sgnyea == day2int(day0) && envdata[i].Prvcnm_id == Prvid[j]){
								array[day0][j].year = envdata[i].Sgnyea;
								array[day0][j].name = envdata[i].Prvcnm_id;
								array[day0][j].a0101 = parseFloat(envdata[i].a0101);
								array[day0][j].a0102 = parseFloat(envdata[i].a0102);
								array[day0][j].a0103 = parseFloat(envdata[i].a0103);
								array[day0][j].a0104 = parseFloat(envdata[i].a0104);
								array[day0][j].a0105 = parseFloat(envdata[i].a0105);
								array[day0][j].a0106 = parseFloat(envdata[i].a0106);
								array[day0][j].a0107 = parseFloat(envdata[i].a0107);
								array[day0][j].a0108 = parseFloat(envdata[i].a0108);
								array[day0][j].a0109 = parseFloat(envdata[i].a0109);
								array[day0][j].a0110 = parseFloat(envdata[i].a0110);
								array[day0][j].a0111 = parseFloat(envdata[i].a0111);
								array[day0][j].a0112 = parseFloat(envdata[i].a0112);
								array[day0][j].a0113 = parseFloat(envdata[i].a0113);
								array[day0][j].a0114 = parseFloat(envdata[i].a0114);
								array[day0][j].a0115 = parseFloat(envdata[i].a0115);
								
								array[day0][j].color = "";
								array[day0][j].x = 0;
								array[day0][j].y = 0;
								array[day0][j].x_new = 0;
								array[day0][j].y_new = 0;
								array[day0][j].x_new_guiyi = 0;
								array[day0][j].y_new_guiyi = 0;
								array[day0][j].x_guiyi = 0;
								array[day0][j].y_guiyi = 0;
								array[day0][j].sub = 0;
								array[day0][j].sub_guiyi = 0;
								array[day0][j].angle = 0;
								array[day0][j].dis = 0;
								break;
							}
						}
					}
				}
				for( var day0 = 0; day0 < array.length; day0++){
					maxdata[day0] = 0;	mindata[day0] = Number.POSITIVE_INFINITY;
					for( var j = 0; j < Prvid.length; j++){
						if(Prvid[j] == array[day0][j].name){
							var value = parseFloat(array[day0][j].a0101);
							if(value >= maxdata[day0]) maxdata[day0] = value; 
							if(value <= mindata[day0]) mindata[day0] = value;
						}
					}
				}
				dataColor();
				datasetNorAir();
				dataMDS();
				dataSub();				
				dataHcluster();
				//turn();	
				newDatapoint3();
				drawBar();
				oriDis();   //2017-4-18 13:30:17 实现了计算数据点之间的距离
				valueShow(year, prvName);
				if(temp == 2) {
					newDatapoint2(year, yuzhi, cluster);
					drawMDS2(year, yuzhi);
				}
				if(temp == 1) {
				    drawMDS3();
				    //tangcheng add animation 2017-3-27 20:11:49    drawRains(array);
				    //tangcheng add histogram to show points movement over time 2017-3-29 14:59:35
				    calProvincesMovementOverYears();
		            //tangcheng add drawmovement 2017-3-30 16:24:52
					drawProvincesMovement();
					//tangcheng add Hierarchchinal Cluster
					Hcluster();
				}				
				turn3();
				turn4();
				histogram();
				drawColor(year);
			});
		}
	}
	// from index to date 2017-4-19 22:57:34
	function day2int(daynum){
		if(daynum>=0 && daynum<=29)
			return 140601+daynum;
		else if(daynum>=30 && daynum<=60)
			return 140701+daynum-30;
		else if(daynum>=61 && daynum<=91)
			return 140801+daynum-61;
		else if(daynum>=92 && daynum<=121)
			return 140901+daynum-92;
		else if(daynum>=122 && daynum<=152)
			return 141001+daynum-122;
		else if(daynum>=153 && daynum<=182)
			return 141101+daynum-153;
		else if(daynum>=183 && daynum<=213)
			return 141201+daynum-183;
		else if(daynum>=214 && daynum<=244)
			return 150101+daynum-214;
		else if(daynum>=245 && daynum<=272)
			return 150201+daynum-245;
		else if(daynum>=273 && daynum<=303)
			return 150301+daynum-273;
		else if(daynum>=304 && daynum<=333)
			return 150401+daynum-304;
		else if(daynum>=334 && daynum<=364)
			return 150501+daynum-334;
	}
	//for origin dataset norm
	function datasetNor(){
		var maxset = new Array();
		var minset = new Array();
		for(var i = 0; i < array.length; i++){
			maxset[i] = {};		minset[i] = {};
			maxset[i].Gdp0101 = 0;maxset[i].Gdp0102 = 0;maxset[i].Gdp0103 = 0;maxset[i].Gdp0104 = 0;maxset[i].Gdp0105 = 0;maxset[i].Gdp0106 = 0;maxset[i].Gdp0107 = 0;maxset[i].Gdp0108 = 0;maxset[i].Gdp0109 = 0;maxset[i].Gdp0110 = 0;maxset[i].Gdp0111 = 0;maxset[i].Gdp0112 = 0;maxset[i].Gdp0113 = 0;maxset[i].Gdp0114 = 0;maxset[i].Gdp0115 = 0;maxset[i].Gdp0116 = 0;maxset[i].Gdp0126 = 0;maxset[i].Gdp0127 = 0;maxset[i].Gdp0128 = 0;maxset[i].Gdp0131 = 0;
			minset[i].Gdp0101 = Number.POSITIVE_INFINITY;minset[i].Gdp0102 = Number.POSITIVE_INFINITY;minset[i].Gdp0103 = Number.POSITIVE_INFINITY;minset[i].Gdp0104 = Number.POSITIVE_INFINITY;minset[i].Gdp0105 = Number.POSITIVE_INFINITY;minset[i].Gdp0106 = Number.POSITIVE_INFINITY;minset[i].Gdp0107 = Number.POSITIVE_INFINITY;minset[i].Gdp0108 = Number.POSITIVE_INFINITY;minset[i].Gdp0109 = Number.POSITIVE_INFINITY;minset[i].Gdp0110 = Number.POSITIVE_INFINITY;minset[i].Gdp0111 = Number.POSITIVE_INFINITY;minset[i].Gdp0112 = Number.POSITIVE_INFINITY;minset[i].Gdp0113 = Number.POSITIVE_INFINITY;minset[i].Gdp0114 = Number.POSITIVE_INFINITY;minset[i].Gdp0115 = Number.POSITIVE_INFINITY;minset[i].Gdp0116 = Number.POSITIVE_INFINITY;minset[i].Gdp0126 = Number.POSITIVE_INFINITY;minset[i].Gdp0127 = Number.POSITIVE_INFINITY;minset[i].Gdp0128 = Number.POSITIVE_INFINITY;minset[i].Gdp0131 = Number.POSITIVE_INFINITY;
			for( var j = 0; j < Prvname.length; j++){
				if(Prvname[j] == array[i][j].name){					
					if(array[i][j].Gdp0101 >= maxset[i].Gdp0101) maxset[i].Gdp0101 = array[i][j].Gdp0101; 
					if(array[i][j].Gdp0101 <= minset[i].Gdp0101) minset[i].Gdp0101 = array[i][j].Gdp0101;
					if(array[i][j].Gdp0102 >= maxset[i].Gdp0102) maxset[i].Gdp0102 = array[i][j].Gdp0102; 
					if(array[i][j].Gdp0102 <= minset[i].Gdp0102) minset[i].Gdp0102 = array[i][j].Gdp0102;
					if(array[i][j].Gdp0103 >= maxset[i].Gdp0103) maxset[i].Gdp0103 = array[i][j].Gdp0103; 
					if(array[i][j].Gdp0103 <= minset[i].Gdp0103) minset[i].Gdp0103 = array[i][j].Gdp0103;
					if(array[i][j].Gdp0104 >= maxset[i].Gdp0104) maxset[i].Gdp0104 = array[i][j].Gdp0104; 
					if(array[i][j].Gdp0104 <= minset[i].Gdp0104) minset[i].Gdp0104 = array[i][j].Gdp0104;
					if(array[i][j].Gdp0105 >= maxset[i].Gdp0105) maxset[i].Gdp0105 = array[i][j].Gdp0105; 
					if(array[i][j].Gdp0105 <= minset[i].Gdp0105) minset[i].Gdp0105 = array[i][j].Gdp0105;
					if(array[i][j].Gdp0106 >= maxset[i].Gdp0106) maxset[i].Gdp0106 = array[i][j].Gdp0106; 
					if(array[i][j].Gdp0106 <= minset[i].Gdp0106) minset[i].Gdp0106 = array[i][j].Gdp0106;
					if(array[i][j].Gdp0107 >= maxset[i].Gdp0107) maxset[i].Gdp0107 = array[i][j].Gdp0107; 
					if(array[i][j].Gdp0107 <= minset[i].Gdp0107) minset[i].Gdp0107 = array[i][j].Gdp0107;
					if(array[i][j].Gdp0108 >= maxset[i].Gdp0108) maxset[i].Gdp0108 = array[i][j].Gdp0108; 
					if(array[i][j].Gdp0108 <= minset[i].Gdp0108) minset[i].Gdp0108 = array[i][j].Gdp0108;
					if(array[i][j].Gdp0109 >= maxset[i].Gdp0109) maxset[i].Gdp0109 = array[i][j].Gdp0109; 
					if(array[i][j].Gdp0109 <= minset[i].Gdp0109) minset[i].Gdp0109 = array[i][j].Gdp0109;
					if(array[i][j].Gdp0110 >= maxset[i].Gdp0110) maxset[i].Gdp0110 = array[i][j].Gdp0110; 
					if(array[i][j].Gdp0110 <= minset[i].Gdp0110) minset[i].Gdp0110 = array[i][j].Gdp0110;
					if(array[i][j].Gdp0111 >= maxset[i].Gdp0111) maxset[i].Gdp0111 = array[i][j].Gdp0111; 
					if(array[i][j].Gdp0111 <= minset[i].Gdp0111) minset[i].Gdp0111 = array[i][j].Gdp0111;
					if(array[i][j].Gdp0112 >= maxset[i].Gdp0112) maxset[i].Gdp0112 = array[i][j].Gdp0112; 
					if(array[i][j].Gdp0112 <= minset[i].Gdp0112) minset[i].Gdp0112 = array[i][j].Gdp0112;
					if(array[i][j].Gdp0113 >= maxset[i].Gdp0113) maxset[i].Gdp0113 = array[i][j].Gdp0113; 
					if(array[i][j].Gdp0113 <= minset[i].Gdp0113) minset[i].Gdp0113 = array[i][j].Gdp0113;
					if(array[i][j].Gdp0114 >= maxset[i].Gdp0114) maxset[i].Gdp0114 = array[i][j].Gdp0114; 
					if(array[i][j].Gdp0114 <= minset[i].Gdp0114) minset[i].Gdp0114 = array[i][j].Gdp0114;
					if(array[i][j].Gdp0115 >= maxset[i].Gdp0115) maxset[i].Gdp0115 = array[i][j].Gdp0115; 
					if(array[i][j].Gdp0115 <= minset[i].Gdp0115) minset[i].Gdp0115 = array[i][j].Gdp0115;
					if(array[i][j].Gdp0116 >= maxset[i].Gdp0116) maxset[i].Gdp0116 = array[i][j].Gdp0116; 
					if(array[i][j].Gdp0116 <= minset[i].Gdp0116) minset[i].Gdp0116 = array[i][j].Gdp0116;
					if(array[i][j].Gdp0126 >= maxset[i].Gdp0126) maxset[i].Gdp0126 = array[i][j].Gdp0126; 
					if(array[i][j].Gdp0126 <= minset[i].Gdp0126) minset[i].Gdp0126 = array[i][j].Gdp0126;
					if(array[i][j].Gdp0127 >= maxset[i].Gdp0127) maxset[i].Gdp0127 = array[i][j].Gdp0127; 
					if(array[i][j].Gdp0127 <= minset[i].Gdp0127) minset[i].Gdp0127 = array[i][j].Gdp0127;
					if(array[i][j].Gdp0128 >= maxset[i].Gdp0128) maxset[i].Gdp0128 = array[i][j].Gdp0128; 
					if(array[i][j].Gdp0128 <= minset[i].Gdp0128) minset[i].Gdp0128 = array[i][j].Gdp0128;
					if(array[i][j].Gdp0131 >= maxset[i].Gdp0131) maxset[i].Gdp0131 = array[i][j].Gdp0131; 
					if(array[i][j].Gdp0131 <= minset[i].Gdp0131) minset[i].Gdp0131 = array[i][j].Gdp0131;
				}
			}
		}
		for(var i=0;i<array.length;i++){
			for(var j = 0; j < array[i].length; j++){
				array[i][j].Gdp0101 =guiyi(maxset[i].Gdp0101,minset[i].Gdp0101,array[i][j].Gdp0101);
				array[i][j].Gdp0102 =guiyi(maxset[i].Gdp0102,minset[i].Gdp0102,array[i][j].Gdp0102);
				array[i][j].Gdp0103 =guiyi(maxset[i].Gdp0103,minset[i].Gdp0103,array[i][j].Gdp0103);
				array[i][j].Gdp0104 =guiyi(maxset[i].Gdp0104,minset[i].Gdp0104,array[i][j].Gdp0104);
				array[i][j].Gdp0105 =guiyi(maxset[i].Gdp0105,minset[i].Gdp0105,array[i][j].Gdp0105);
				array[i][j].Gdp0106 =guiyi(maxset[i].Gdp0106,minset[i].Gdp0106,array[i][j].Gdp0106);
				array[i][j].Gdp0107 =guiyi(maxset[i].Gdp0107,minset[i].Gdp0107,array[i][j].Gdp0107);
				array[i][j].Gdp0108 =guiyi(maxset[i].Gdp0108,minset[i].Gdp0108,array[i][j].Gdp0108);
				array[i][j].Gdp0109 =guiyi(maxset[i].Gdp0109,minset[i].Gdp0109,array[i][j].Gdp0109);
				array[i][j].Gdp0110 =guiyi(maxset[i].Gdp0110,minset[i].Gdp0110,array[i][j].Gdp0110);
				array[i][j].Gdp0111 =guiyi(maxset[i].Gdp0111,minset[i].Gdp0111,array[i][j].Gdp0111);
				array[i][j].Gdp0112 =guiyi(maxset[i].Gdp0112,minset[i].Gdp0112,array[i][j].Gdp0112);
				array[i][j].Gdp0113 =guiyi(maxset[i].Gdp0113,minset[i].Gdp0113,array[i][j].Gdp0113);
				array[i][j].Gdp0114 =guiyi(maxset[i].Gdp0114,minset[i].Gdp0114,array[i][j].Gdp0114);
				array[i][j].Gdp0115 =guiyi(maxset[i].Gdp0115,minset[i].Gdp0115,array[i][j].Gdp0115);
				array[i][j].Gdp0116 =guiyi(maxset[i].Gdp0116,minset[i].Gdp0116,array[i][j].Gdp0116);
				array[i][j].Gdp0126 =guiyi(maxset[i].Gdp0126,minset[i].Gdp0126,array[i][j].Gdp0126);
				array[i][j].Gdp0127 =guiyi(maxset[i].Gdp0127,minset[i].Gdp0127,array[i][j].Gdp0127);
				array[i][j].Gdp0128 =guiyi(maxset[i].Gdp0128,minset[i].Gdp0128,array[i][j].Gdp0128);
				array[i][j].Gdp0131 =guiyi(maxset[i].Gdp0131,minset[i].Gdp0131,array[i][j].Gdp0131);
			}
		}
	}
	//compute the dis of provs
	function oriDis(){
		for(var i = 1; i < array.length; i++){
			for(var j1=0; j1<array[i].length; j1++){
				for(var j2=0; j2<array[i-1].length; j2++)
					if(array[i][j1].name == array[i-1][j2].name){
						var dis = (array[i-1][j2].x - array[i][j1].x)*(array[i-1][j2].x - array[i][j1].x) +
							  	  (array[i-1][j2].y - array[i][j1].y)*(array[i-1][j2].y - array[i][j1].y);
						array[i][j1].dis = Math.sqrt(dis);
						break;
					}	
			}
		}
	}
	//for air data nor
	function datasetNorAir(){
		var maxset = new Array();		var minset = new Array();
		for(var i = 0; i < array.length; i++){
			maxset[i] = {};		minset[i] = {};
			maxset[i].a0101 = 0;maxset[i].a0102 = 0;maxset[i].a0103 = 0;maxset[i].a0104 = 0;maxset[i].a0105 = 0;maxset[i].a0106 = 0;maxset[i].a0107 = 0;maxset[i].a0108 = 0;maxset[i].a0109 = 0;maxset[i].a0110 = 0;maxset[i].a0111 = 0;maxset[i].a0112 = 0;maxset[i].a0113 = 0;maxset[i].a0114 = 0;maxset[i].a0115 = 0;maxset[i].a0116 = 0;maxset[i].a0126 = 0;maxset[i].a0127 = 0;maxset[i].a0128 = 0;maxset[i].a0131 = 0;
			minset[i].a0101 = Number.POSITIVE_INFINITY;minset[i].a0102 = Number.POSITIVE_INFINITY;minset[i].a0103 = Number.POSITIVE_INFINITY;minset[i].a0104 = Number.POSITIVE_INFINITY;minset[i].a0105 = Number.POSITIVE_INFINITY;minset[i].a0106 = Number.POSITIVE_INFINITY;minset[i].a0107 = Number.POSITIVE_INFINITY;minset[i].a0108 = Number.POSITIVE_INFINITY;minset[i].a0109 = Number.POSITIVE_INFINITY;minset[i].a0110 = Number.POSITIVE_INFINITY;minset[i].a0111 = Number.POSITIVE_INFINITY;minset[i].a0112 = Number.POSITIVE_INFINITY;minset[i].a0113 = Number.POSITIVE_INFINITY;minset[i].a0114 = Number.POSITIVE_INFINITY;minset[i].a0115 = Number.POSITIVE_INFINITY;minset[i].a0116 = Number.POSITIVE_INFINITY;minset[i].a0126 = Number.POSITIVE_INFINITY;minset[i].a0127 = Number.POSITIVE_INFINITY;minset[i].a0128 = Number.POSITIVE_INFINITY;minset[i].a0131 = Number.POSITIVE_INFINITY;
			for( var j = 0; j < Prvid.length; j++){
				if(Prvid[j] == array[i][j].name){					
					if(array[i][j].a0101 >= maxset[i].a0101) maxset[i].a0101 = array[i][j].a0101; 
					if(array[i][j].a0101 <= minset[i].a0101) minset[i].a0101 = array[i][j].a0101;
					if(array[i][j].a0102 >= maxset[i].a0102) maxset[i].a0102 = array[i][j].a0102; 
					if(array[i][j].a0102 <= minset[i].a0102) minset[i].a0102 = array[i][j].a0102;
					if(array[i][j].a0103 >= maxset[i].a0103) maxset[i].a0103 = array[i][j].a0103; 
					if(array[i][j].a0103 <= minset[i].a0103) minset[i].a0103 = array[i][j].a0103;
					if(array[i][j].a0104 >= maxset[i].a0104) maxset[i].a0104 = array[i][j].a0104; 
					if(array[i][j].a0104 <= minset[i].a0104) minset[i].a0104 = array[i][j].a0104;
					if(array[i][j].a0105 >= maxset[i].a0105) maxset[i].a0105 = array[i][j].a0105; 
					if(array[i][j].a0105 <= minset[i].a0105) minset[i].a0105 = array[i][j].a0105;
					if(array[i][j].a0106 >= maxset[i].a0106) maxset[i].a0106 = array[i][j].a0106; 
					if(array[i][j].a0106 <= minset[i].a0106) minset[i].a0106 = array[i][j].a0106;
					if(array[i][j].a0107 >= maxset[i].a0107) maxset[i].a0107 = array[i][j].a0107; 
					if(array[i][j].a0107 <= minset[i].a0107) minset[i].a0107 = array[i][j].a0107;
					if(array[i][j].a0108 >= maxset[i].a0108) maxset[i].a0108 = array[i][j].a0108; 
					if(array[i][j].a0108 <= minset[i].a0108) minset[i].a0108 = array[i][j].a0108;
					if(array[i][j].a0109 >= maxset[i].a0109) maxset[i].a0109 = array[i][j].a0109; 
					if(array[i][j].a0109 <= minset[i].a0109) minset[i].a0109 = array[i][j].a0109;
					if(array[i][j].a0110 >= maxset[i].a0110) maxset[i].a0110 = array[i][j].a0110; 
					if(array[i][j].a0110 <= minset[i].a0110) minset[i].a0110 = array[i][j].a0110;
					if(array[i][j].a0111 >= maxset[i].a0111) maxset[i].a0111 = array[i][j].a0111; 
					if(array[i][j].a0111 <= minset[i].a0111) minset[i].a0111 = array[i][j].a0111;
					if(array[i][j].a0112 >= maxset[i].a0112) maxset[i].a0112 = array[i][j].a0112; 
					if(array[i][j].a0112 <= minset[i].a0112) minset[i].a0112 = array[i][j].a0112;
					if(array[i][j].a0113 >= maxset[i].a0113) maxset[i].a0113 = array[i][j].a0113; 
					if(array[i][j].a0113 <= minset[i].a0113) minset[i].a0113 = array[i][j].a0113;
					if(array[i][j].a0114 >= maxset[i].a0114) maxset[i].a0114 = array[i][j].a0114; 
					if(array[i][j].a0114 <= minset[i].a0114) minset[i].a0114 = array[i][j].a0114;
					if(array[i][j].a0115 >= maxset[i].a0115) maxset[i].a0115 = array[i][j].a0115; 
					if(array[i][j].a0115 <= minset[i].a0115) minset[i].a0115 = array[i][j].a0115;
				}
			}
		}
		for(var i=0;i<array.length;i++){
			for(var j = 0; j < array[i].length; j++){
				array[i][j].a0101 =guiyi(maxset[i].a0101,minset[i].a0101,array[i][j].a0101);
				array[i][j].a0102 =guiyi(maxset[i].a0102,minset[i].a0102,array[i][j].a0102);
				array[i][j].a0103 =guiyi(maxset[i].a0103,minset[i].a0103,array[i][j].a0103);
				array[i][j].a0104 =guiyi(maxset[i].a0104,minset[i].a0104,array[i][j].a0104);
				array[i][j].a0105 =guiyi(maxset[i].a0105,minset[i].a0105,array[i][j].a0105);
				array[i][j].a0106 =guiyi(maxset[i].a0106,minset[i].a0106,array[i][j].a0106);
				array[i][j].a0107 =guiyi(maxset[i].a0107,minset[i].a0107,array[i][j].a0107);
				array[i][j].a0108 =guiyi(maxset[i].a0108,minset[i].a0108,array[i][j].a0108);
				array[i][j].a0109 =guiyi(maxset[i].a0109,minset[i].a0109,array[i][j].a0109);
				array[i][j].a0110 =guiyi(maxset[i].a0110,minset[i].a0110,array[i][j].a0110);
				array[i][j].a0111 =guiyi(maxset[i].a0111,minset[i].a0111,array[i][j].a0111);
				array[i][j].a0112 =guiyi(maxset[i].a0112,minset[i].a0112,array[i][j].a0112);
				array[i][j].a0113 =guiyi(maxset[i].a0113,minset[i].a0113,array[i][j].a0113);
				array[i][j].a0114 =guiyi(maxset[i].a0114,minset[i].a0114,array[i][j].a0114);
				array[i][j].a0115 =guiyi(maxset[i].a0115,minset[i].a0115,array[i][j].a0115);
			}
		}
	}
	
	function changecluster(c){
		cluster = c.value;
		if(temp == 2) {
			newDatapoint2(year, yuzhi, cluster);
			drawMDS2(year, yuzhi);
		}
	}
	function changerotate(y){
		temp = y.value;
		if(temp == 2) {
			drawMDS2(year, yuzhi);
		}
		if(temp == 1) drawMDS();
	}
	function changecurrent(v){
		isCurrent = v.value;
		drawMovementHcluster($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
		drawBar();
	}
	function changeDrawType(v){
		drawType = v.value;
		if(drawType == "0")
			drawMovementHcluster($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
		else
			drawMovementHcluster1($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
	}
	function changeDynamic(v){
		isDynamic = v.value;
		if(isDynamic == "0"){
			if(drawType == "0")	drawMovementHcluster($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
			else  				drawMovementHcluster1($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
		}else{
			if(drawType == "0")	{
				drawMovementHclusterDynamic($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
			}else{
				drawMovementHcluster1Dynamic($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
			}
		}
	}
	//select vision of bar
	function changeShow() {
	    var select0 = 0, select1 = 0;
	    if (form3.CheckBoxGroup[0].checked == true)
	        select0 = 1;
	    if (form3.CheckBoxGroup[1].checked == true)
	        select1 = 1;
	    if (select0 == 1 && select1 == 0)
	        showType = -1;
	    else if (select0 == 0 && select1 == 1)
	        showType = 0;
	    else if (select0 == 1 && select1 == 1)
	        showType = 1;
	    else showType = -1;
	    drawBar();
	}
    //select vision of MDS
	function changeMDS() {
	    isCurrent = (formA.CheckBoxGroup[0].checked == true) ? -1 : 0;
	    drawType = (formA.CheckBoxGroup[1].checked == true) ? 1 : 0;
	    isDynamic = (formA.CheckBoxGroup[2].checked == true) ? 1 : 0;
	    if (isDynamic == "0") {
	        if (drawType == "0") drawMovementHcluster($("#hcluster_thresh").val() * 10, $("#hcluster_year").val() - 1952);
	        else drawMovementHcluster1($("#hcluster_thresh").val() * 10, $("#hcluster_year").val() - 1952);
	    } else {
	        if (drawType == "0") {
	            drawMovementHclusterDynamic($("#hcluster_thresh").val() * 10, $("#hcluster_year").val() - 1952);
	        } else {
	            drawMovementHcluster1Dynamic($("#hcluster_thresh").val() * 10, $("#hcluster_year").val() - 1952);
	        }
	    }
	}
	function changeHex(v){
		isAssemble = v.value;
		console.log(isAssemble);
		if(isDynamic == "0"){
			if(drawType == "0")	drawMovementHcluster($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
			else  				drawMovementHcluster1($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
		}else{
			if(drawType == "0")	drawMovementHclusterDynamic($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
			else				drawMovementHcluster1Dynamic($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
		}
	}
	// 修改投影点大小
	function changeSize(v){
		sizeType = v.value;
		if(isDynamic == "0"){
			if(drawType == "0")	drawMovementHcluster($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
			else  				drawMovementHcluster1($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
		}else{
			if(drawType == "0")	drawMovementHclusterDynamic($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
			else				drawMovementHcluster1Dynamic($("#hcluster_thresh").val()*10,$("#hcluster_year").val()-1952);
		}
	}
    //
	function changeBar(v) {
	    isdrawBar = v.value;
	    if (isdrawBar == "0") drawBar();
	}
	function checkSelect(){
		
		if(name == "Air.csv"){
			name = "Gdp.csv";
			array = new Array();
			readData(name);
		}
		else{
			name = "Air.csv";
			array = new Array();
			readData(name);
		}
		selectCheck();
		dataMDS();
		dataSub();
		newDatapoint3();//tangcheng add this line
		drawBar();
	}
	function selectCheck(){
		for( var i = 0; i < 19; i++)
			checkNum[i] = 0;
		if (name == "Gdp.csv") {
		    checkNum[1] = 1; checkNum[2] = 1; checkNum[4] = 1;
		    checkNum[5] = 1; checkNum[6] = 1;checkNum[7] = 1;
		    // checkNum[14] = 1; checkNum[15] = 1; checkNum[16] = 1; checkNum[17] = 1; checkNum[18] = 1;
		} else {
		    checkNum[1] = 1; checkNum[3] = 1; checkNum[5] = 1;
		    checkNum[7] = 1; checkNum[9] = 1; checkNum[13] = 1;
		}
	}
	function euclDistance(data, m, n){
		selectCheck();
		var sum = 0;
		sum += (data[m].Gdp0101 - data[n].Gdp0101)*(data[m].Gdp0101 - data[n].Gdp0101)*checkNum[0];
		sum += (data[m].Gdp0102 - data[n].Gdp0102)*(data[m].Gdp0102 - data[n].Gdp0102)*checkNum[1];
		sum += (data[m].Gdp0103 - data[n].Gdp0103)*(data[m].Gdp0103 - data[n].Gdp0103)*checkNum[2];
		sum += (data[m].Gdp0104 - data[n].Gdp0104)*(data[m].Gdp0104 - data[n].Gdp0104)*checkNum[3];
		sum += (data[m].Gdp0105 - data[n].Gdp0105)*(data[m].Gdp0105 - data[n].Gdp0105)*checkNum[4];
		sum += (data[m].Gdp0106 - data[n].Gdp0106)*(data[m].Gdp0106 - data[n].Gdp0106)*checkNum[5];
		sum += (data[m].Gdp0107 - data[n].Gdp0107)*(data[m].Gdp0107 - data[n].Gdp0107)*checkNum[6];
		sum += (data[m].Gdp0108 - data[n].Gdp0108)*(data[m].Gdp0108 - data[n].Gdp0108)*checkNum[7];
		sum += (data[m].Gdp0109 - data[n].Gdp0109)*(data[m].Gdp0109 - data[n].Gdp0109)*checkNum[8];
		sum += (data[m].Gdp0110 - data[n].Gdp0110)*(data[m].Gdp0110 - data[n].Gdp0110)*checkNum[9];
		sum += (data[m].Gdp0111 - data[n].Gdp0111)*(data[m].Gdp0111 - data[n].Gdp0111)*checkNum[10];
		sum += (data[m].Gdp0112 - data[n].Gdp0112)*(data[m].Gdp0112 - data[n].Gdp0112)*checkNum[11];
		sum += (data[m].Gdp0116 - data[n].Gdp0116)*(data[m].Gdp0116 - data[n].Gdp0116)*checkNum[12];
		sum += (data[m].Gdp0126 - data[n].Gdp0126)*(data[m].Gdp0126 - data[n].Gdp0126)*checkNum[13];
		sum += (data[m].Gdp0127 - data[n].Gdp0127)*(data[m].Gdp0127 - data[n].Gdp0127)*checkNum[14];
		sum += (data[m].Gdp0128 - data[n].Gdp0128)*(data[m].Gdp0128 - data[n].Gdp0128)*checkNum[15];
		sum += (data[m].Gdp0131 - data[n].Gdp0131)*(data[m].Gdp0131 - data[n].Gdp0131)*checkNum[16];
		
		var result = Math.sqrt(sum);
		return result;
	}
	//compute distances of Air point
	function euclDistanceAir(data, m, n){
		selectCheck();
		var sum = 0;
		sum += (data[m].a0101 - data[n].a0101)*(data[m].a0101 - data[n].a0101)*checkNum[0];
		sum += (data[m].a0102 - data[n].a0102)*(data[m].a0102 - data[n].a0102)*checkNum[1];
		sum += (data[m].a0103 - data[n].a0103)*(data[m].a0103 - data[n].a0103)*checkNum[2];
		sum += (data[m].a0104 - data[n].a0104)*(data[m].a0104 - data[n].a0104)*checkNum[3];
		sum += (data[m].a0105 - data[n].a0105)*(data[m].a0105 - data[n].a0105)*checkNum[4];
		sum += (data[m].a0106 - data[n].a0106)*(data[m].a0106 - data[n].a0106)*checkNum[5];
		sum += (data[m].a0107 - data[n].a0107)*(data[m].a0107 - data[n].a0107)*checkNum[6];
		sum += (data[m].a0108 - data[n].a0108)*(data[m].a0108 - data[n].a0108)*checkNum[7];
		sum += (data[m].a0109 - data[n].a0109)*(data[m].a0109 - data[n].a0109)*checkNum[8];
		sum += (data[m].a0110 - data[n].a0110)*(data[m].a0110 - data[n].a0110)*checkNum[9];
		sum += (data[m].a0111 - data[n].a0111)*(data[m].a0111 - data[n].a0111)*checkNum[10];
		sum += (data[m].a0112 - data[n].a0112)*(data[m].a0112 - data[n].a0112)*checkNum[11];
		sum += (data[m].a0113 - data[n].a0113)*(data[m].a0113 - data[n].a0113)*checkNum[12];
		sum += (data[m].a0114 - data[n].a0114)*(data[m].a0114 - data[n].a0114)*checkNum[13];
		sum += (data[m].a0115 - data[n].a0115)*(data[m].a0115 - data[n].a0115)*checkNum[14];
		
		var result = Math.sqrt(sum);
		return result;
	}
	function guiyi(max, min, x){
		return max == 0 ? 0 : (x - min)/(max-min);
	}
	function matrixGdp(year){
		var year2 = year - 1952;
		var data = array[year2];
		var matrix = new Array();
		var j = 0,k = 0;
		var m = new Array();
		var max = 0;
		var min = Number.POSITIVE_INFINITY;
		while(j < data.length){
			if(data[j].name == undefined){
				j++;
			}else{
				m[k] = data[j];k++;j++;
			}
		}
		for( var i = 0; i < m.length; i++){
			matrix[i] = new Array();
			for(var j = 0; j < m.length; j++){
				matrix[i][j] = euclDistance(m, i, j);
				if(matrix[i][j] > max) max = matrix[i][j];
				if(matrix[i][j] <= min) min = matrix[i][j];
			}
		}
		
		m.matrix = matrix;
		m.min_m = min;
		m.max_m = max;
		
		var dataPoint = numeric.transpose(mds(matrix));
		m.datapoint = dataPoint;
		m.x_max = d3.max(dataPoint[0]);
		m.x_min = d3.min(dataPoint[0]);
		m.y_max = d3.max(dataPoint[1]);
		m.y_min = d3.min(dataPoint[1]);
		
		var width_rect = [m.x_max, m.y_max, Math.abs(m.x_min), Math.abs(m.y_min)];
		m.rectwidth = d3.max(width_rect);
		
		var x = dataPoint[0];
		var y = dataPoint[1];
		var minX = d3.min(dataPoint[0]);
		var maxX = d3.max(dataPoint[0]);
		var minY = d3.min(dataPoint[1]);
		var maxY = d3.max(dataPoint[1]);
		var sumX = 0;
		var sumY = 0;
		var len = m.length;
		for(var i = 0; i < m.length; i++){
			m[i].x = dataPoint[0][i];
			m[i].x_guiyi = guiyi(maxX, minX, dataPoint[0][i]);
			sumX += m[i].x;
			m[i].y = dataPoint[1][i];
			m[i].y_guiyi = guiyi(maxY, minY, dataPoint[1][i]);
			sumY += m[i].y;
		}
		
		m.center = [sumX/len, sumY/len];
		return m;
	}
	//matrix for Air
	function matrixAir(index){
		var data = array[index];
		var matrix = new Array();
		var j = 0,k = 0;
		var m = new Array();
		while(j < data.length){
			if(data[j].name == undefined){j++;}
			else{	m[k] = data[j];k++;j++;}
		}
		for( var i = 0; i < m.length; i++){
			matrix[i] = new Array();
			for(var j = 0; j < m.length; j++){
				matrix[i][j] = euclDistanceAir(m, i, j);
			}
		}
		
		var dataPoint = numeric.transpose(mds(matrix));
		m.datapoint = dataPoint;
		m.x_max = d3.max(dataPoint[0]);
		m.x_min = d3.min(dataPoint[0]);
		m.y_max = d3.max(dataPoint[1]);
		m.y_min = d3.min(dataPoint[1]);
		
		var width_rect = [m.x_max, m.y_max, Math.abs(m.x_min), Math.abs(m.y_min)];
		m.rectwidth = d3.max(width_rect);

		var sumX = 0;
		var sumY = 0;
		var len = m.length;
		for(var i = 0; i < m.length; i++){
			m[i].x = dataPoint[0][i];
			m[i].x_guiyi = guiyi(m.x_max, m.x_min, m[i].x);
			
			m[i].y = dataPoint[1][i];
			m[i].y_guiyi = guiyi(m.y_max, m.y_min, m[i].y);
			
			sumX += m[i].x;sumY += m[i].y;
		}
		m.center = [sumX/len, sumY/len];
		return m;
	}
	function dataColor(){
		for(var index=0; index<array.length; index++){
			var step = (maxdata[index] + mindata[index])/4;			
			var linear1 = d3.scale.linear().domain([mindata[index], step]).range([0,1]);
			var linear2 = d3.scale.linear().domain([step, 2*step]).range([0,1]);
			var linear3 = d3.scale.linear().domain([2*step, 3*step]).range([0,1]);
			var linear4 = d3.scale.linear().domain([3*step, maxdata[index]]).range([0,1]);
			var a = d3.rgb(255, 0, 0);var b = d3.rgb(255, 255, 0);var c = d3.rgb(0, 255, 0);var e = d3.rgb(0, 255, 255);var f = d3.rgb(0, 0, 255);
			var computeColor1 = d3.interpolate(a, b);
			var computeColor2 = d3.interpolate(b, c);
			var computeColor3 = d3.interpolate(c, e);
			var computeColor4 = d3.interpolate(e, f);
			for(var i = 0; i < array[index].length; i++){
				var proValue = (array.length>300)?array[index][i].a0101:array[index][i].Gdp0116;
				var color;
				if(proValue <= step)
					color = computeColor1(linear1(proValue));
				else if(proValue <= 2*step)
					color = computeColor2(linear2(proValue));
				else if(proValue <= 3*step)
					color = computeColor3(linear3(proValue));
				else
					color = computeColor4(linear4(proValue));
				array[index][i].color = color;
			}
		}
	}
	function dataMDS(){
		if(array.length >40){
			for(var year0 = 1952; year0 <= 2013; year0++)
				array[year0 - 1952] = matrixGdp(year0);
			for(var year0 = 1953; year0 <= 2013; year0++){
				var year2 = year0 - 1952;
				var sum_angle = 0;
				for(var i = 0; i < array[year2 -1].length; i++){
					for(var j = 0; j < array[year2].length; j++){
						if(array[year2 -1][i].name == array[year2][j].name){
							array[year2][j].angle = acos0(array[year2 -1][i].x, array[year2 -1][i].y, array[year2][j].x, array[year2][j].y);
							sum_angle += array[year2][j].angle;
							break;
						}
					}
				}
				array[year2].avg_angle = sum_angle/array[year2].length;
			}
		}else{
			for(var i=0; i<array.length; i++)
				array[i] = matrixAir(i);
			for(var index=1; index<array.length; index++){
				var sum_angle = 0;
				for(var i = 0; i < array[index -1].length; i++){
					for(var j = 0; j < array[index].length; j++){
						if(array[index -1][i].name == array[index][j].name){
							array[index][j].angle = acos0(array[index -1][i].x, array[index -1][i].y, array[index][j].x, array[index][j].y);
							sum_angle += array[index][j].angle;
							break;
						}
					}
				}
				array[index].avg_angle = sum_angle/array[index].length;
			}
		}
	}
	function dataSub(){
		array[0].cy = 0;array[0].min = 0;array[0].max = 0;array[0].cy_guiyi = 0;array[0].min_guiyi = 0;array[0].max_guiyi = 0;
		for(var index=0 ; index<array.length-1; index++){
			var k = 0;
			var sum = 0;var max = 0;var min = Number.POSITIVE_INFINITY;
			var sum2 =0;var max2 =0;var min2 =Number.POSITIVE_INFINITY;
			for(var i = 0; i < array[index].length; i++){
				for(var j = 0; j < array[index+1].length; j++){
					if(array[index][i].name == array[index + 1][j].name){
						var dis = (array[index][i].x - array[index + 1][i].x)*(array[index][i].x - array[index + 1][i].x) +
							(array[index][i].y - array[index + 1][i].y)*(array[index][i].y - array[index + 1][i].y);
						var result = Math.sqrt(dis);
						array[index + 1][i].sub = result;
						if(result >= max) max = result;
						if(result < min) min = result;
						k++;
						break;
					}
				}
			}
			for(var i = 0; i < array[index].length; i++){
				for(var j = 0; j < array[index + 1].length; j++){
					if(array[index][i].name == array[index + 1][j].name){
						var dis = (array[index][i].x_guiyi - array[index + 1][i].x_guiyi)*(array[index][i].x_guiyi - array[index + 1][i].x_guiyi) +
							(array[index][i].y_guiyi - array[index + 1][i].y_guiyi)*(array[index][i].y_guiyi - array[index + 1][i].y_guiyi);
						var result = Math.sqrt(dis);
						array[index + 1][i].sub_guiyi = result;
						sum2 = sum2 + result;
						if(result >= max) max2 = result;
						if(result < min) min2 = result;
						break;
					}
				}
			}
			for(var i = 0; i < array[index + 1].length; i++){
				var result = guiyi(max, min, array[index + 1][i].sub);
				sum += result;
			}
			array[index + 1].cy = sum/k;
			array[index + 1].cy_guiyi = sum2/k;
			array[index + 1].min = min;
			array[index + 1].max = max;
			array[index + 1].min_guiyi = min2;
			array[index + 1].max_guiyi = max2;
		}
	}
	function newDatapoint(){		
		array[0].newdatapoint = new Array();
		for(var i = 0; i < array[0].length; i++){
			array[0].newdatapoint[i] = {};array[0].newdatapoint[i].name = array[0][i].name;array[0].newdatapoint[i].color = array[0][i].color;array[0].newdatapoint[i].x = array[0][i].x;array[0].newdatapoint[i].y = array[0][i].y;array[0].newdatapoint[i].x_guiyi = array[0][i].x_guiyi;array[0].newdatapoint[i].y_guiyi = array[0][i].y_guiyi;
		}
		
		for(var year0 = 1953; year0 <= 2013; year0++){
			var year2 = year0 - 1952;
			var xMax_n = 0, yMax_n = 0, xMin_n = Number.POSITIVE_INFINITY, yMin_n = Number.POSITIVE_INFINITY;
			var sum_n = 0;var ni = new Array();
			var xMax_s = 0, yMax_s = 0, xMin_s = Number.POSITIVE_INFINITY, yMin_s = Number.POSITIVE_INFINITY;
			var sum_s = 0;var shun = new Array();
			var xMax_fz = 0, yMax_fz = 0, xMin_fz = Number.POSITIVE_INFINITY, yMin_fz = Number.POSITIVE_INFINITY;
			var sum_fz = 0;
			array[year2].newdatapoint = new Array();
			//标准差大于1的条件
			if(dev[year2] > 1){
				//初始化新的位置
				for(var i = 0; i < array[year2].length; i++){
					array[year2].newdatapoint[i] = {};
					array[year2].newdatapoint[i].name = array[year2][i].name; array[year2].newdatapoint[i].color = array[year2][i].color; array[year2].newdatapoint[i].x = array[year2][i].x;	array[year2].newdatapoint[i].y = array[year2][i].y;
					if(array[year2].newdatapoint[i].x > xMax_fz) xMax_fz = array[year2].newdatapoint[i].x;
					if(array[year2].newdatapoint[i].x < xMin_fz) xMin_fz = array[year2].newdatapoint[i].x;
					if(array[year2].newdatapoint[i].y > yMax_fz) yMax_fz = array[year2].newdatapoint[i].y;
					if(array[year2].newdatapoint[i].y < yMin_fz) yMin_fz = array[year2].newdatapoint[i].y;
				}
				//归一化处理
				for(var i = 0; i < array[year2].length; i++){
					array[year2][i].x_guiyi = guiyi(xMax_fz, xMin_fz, array[year2][i].x);
					array[year2][i].y_guiyi = guiyi(yMax_fz, yMin_fz, array[year2][i].y);
				}
				//计算前后两年之间相差的距离，与角度
				for(var i = 0; i < array[year2 - 1].length; i++){
					for(var j = 0; j < array[year2].length; j++){
						if(array[year2 - 1][i].name == array[year2][j].name){
							var dis = (array[year2 - 1][i].x_guiyi - array[year2][j].x_guiyi) * (array[year2 - 1][i].x_guiyi - array[year2][j].x_guiyi) + 
									(array[year2 - 1][i].y_guiyi - array[year2][j].y_guiyi) * (array[year2 - 1][i].y_guiyi - array[year2][j].y_guiyi);
							var result = Math.sqrt(dis);
							sum_fz += result;
							break;
						}
					}
				}
				array[year2].cy_new = sum_fz/array[year2].length;				
				var avg_angle = 0;
				var sum_angle = 0;				
				for(var i = 0; i < array[year2 -1].length; i++){
					for(var j = 0; j < array[year2].newdatapoint.length; j++){
						if(array[year2 -1][i].name == array[year2].newdatapoint[j].name){
							sum_angle += acos0(array[year2 -1][i].x, array[year2 -1][i].y, array[year2].newdatapoint[j].x, array[year2].newdatapoint[j].y);
							break;
						}
					}
				}
				avg_angle = sum_angle/array[year2].newdatapoint.length;
				//求解 旋转 顺逆时针
				for(var i = 0; i < array[year2].newdatapoint.length; i++){
					var A = 180 / Math.PI * Math.atan(array[year2].newdatapoint[i].y/array[year2].newdatapoint[i].x);
					
					if(A < 0 && array[year2].newdatapoint[i].x < 0 && array[year2].newdatapoint[i].y > 0) A = 180 + A;
					if(A < 0 && array[year2].newdatapoint[i].x > 0 && array[year2].newdatapoint[i].y < 0) A = 360 + A;
					if(A > 0 && array[year2].newdatapoint[i].x < 0 && array[year2].newdatapoint[i].y < 0) A = 180 + A;
					
					var B1 = A + avg_angle;
					var B2 = Math.PI / 180 * (A + avg_angle);
					var B3 = A - avg_angle;
					var B4 = Math.PI / 180 * (A - avg_angle);
					
					var dis = array[year2].newdatapoint[i].x * array[year2].newdatapoint[i].x + array[year2].newdatapoint[i].y * array[year2].newdatapoint[i].y;
					var result = Math.sqrt(dis);
					
					ni[i] = {};
					ni[i].name = array[year2].newdatapoint[i].name;
					ni[i].color = array[year2].newdatapoint[i].color;
					ni[i].x = result * Math.cos(B2);
					ni[i].y = result * Math.sin(B2);
					
					if(ni[i].x > xMax_n) xMax_n= ni[i].x;
					if(ni[i].x < xMin_n) xMin_n = ni[i].x;
					if(ni[i].y > yMax_n) yMax_n = ni[i].y;
					if(ni[i].y < yMin_n) yMin_n = ni[i].y;
					
					shun[i] = {};
					shun[i].name = array[year2].newdatapoint[i].name;
					shun[i].color = array[year2].newdatapoint[i].color;
					shun[i].x = result * Math.cos(B4);
					shun[i].y = result * Math.sin(B4);
					
					if(shun[i].x > xMax_s) xMax_s= shun[i].x;
					if(shun[i].x < xMin_s) xMin_s = shun[i].x;
					if(shun[i].y > yMax_s) yMax_s = shun[i].y;
					if(shun[i].y < yMin_s) yMin_s = shun[i].y;
				}				
				for(var i = 0; i < ni.length; i++){
					ni[i].x_guiyi = guiyi(xMax_n, xMin_n, ni[i].x);
					ni[i].y_guiyi = guiyi(yMax_n, yMin_n, ni[i].y);
				}
				//求解逆时针旋转后前后两年的距离
				for(var i = 0; i < array[year2 - 1].length; i++){
					for(var j = 0; j < ni.length; j++){
						if(array[year2 - 1][i].name == ni[j].name){
							var dis = (array[year2 - 1][i].x_guiyi - ni[j].x_guiyi) * (array[year2 - 1][i].x_guiyi - ni[j].x_guiyi) + 
									(array[year2 - 1][i].y_guiyi - ni[j].y_guiyi) * (array[year2 - 1][i].y_guiyi - ni[j].y_guiyi);
							var result = Math.sqrt(dis);
							sum_n += result;
							break;
						}
					}
				}
				//求解顺时针旋转后前后两年的距离
				for(var i = 0; i < shun.length; i++){
					shun[i].x_guiyi = guiyi(xMax_s, xMin_s, shun[i].x);
					shun[i].y_guiyi = guiyi(yMax_s, yMin_s, shun[i].y);
				}
				
				for(var i = 0; i < array[year2 - 1].length; i++){
					for(var j = 0; j < shun.length; j++){
						if(array[year2 - 1][i].name == shun[j].name){
							var dis = (array[year2 - 1][i].x_guiyi - shun[j].x_guiyi) * (array[year2 - 1][i].x_guiyi - shun[j].x_guiyi) + 
									(array[year2 - 1][i].y_guiyi - shun[j].y_guiyi) * (array[year2 - 1][i].y_guiyi - shun[j].y_guiyi);
							var result = Math.sqrt(dis);
							sum_s += result;
							break;
						}
					}
				}
				//旋转怎么旋转
				var cy_n = sum_n / ni.length;
				var cy_s = sum_s / shun.length;
				if(cy_n < cy_s && cy_n < array[year2].cy_new){
					array[year2].cy_new = cy_n;
					array[year2].newdatapoint = ni;
				}
				if(cy_s < cy_n && cy_s < array[year2].cy_new){
					array[year2].cy_new = cy_s;
					array[year2].newdatapoint = shun;
				}
				if(array[year2].cy_new < cy_n && array[year2].cy_new < cy_s){
					array[year2].cy_new = array[year2].cy_guiyi;
					for(var i = 0; i < array[year2].length; i++){
						array[year2].newdatapoint[i] = {};
						array[year2].newdatapoint[i].name = array[year2][i].name;
						array[year2].newdatapoint[i].color = array[year2][i].color;
						array[year2].newdatapoint[i].x = array[year2][i].x;
						array[year2].newdatapoint[i].x_guiyi = array[year2][i].x_guiyi;
						array[year2].newdatapoint[i].y = array[year2][i].y;
						array[year2].newdatapoint[i].y_guiyi = array[year2][i].y_guiyi;
					}
				}
				
			}
			//标准差小于1
			else{
				for(var i = 0; i < array[year2].length; i++){
					var A = 180 / Math.PI * Math.atan(array[year2][i].y/array[year2][i].x);
					
					if(A < 0 && array[year2][i].x < 0 && array[year2][i].y > 0) A = 180 + A;
					if(A < 0 && array[year2][i].x > 0 && array[year2][i].y < 0) A = 360 + A;
					if(A > 0 && array[year2][i].x < 0 && array[year2][i].y < 0) A = 180 + A;

					var B1 = A + array[year2].avg_angle;
					var B2 = Math.PI / 180 * (A + array[year2].avg_angle);
					var B3 = A - array[year2].avg_angle;
					var B4 = Math.PI / 180 * (A - array[year2].avg_angle);

					var dis = array[year2][i].x * array[year2][i].x + array[year2][i].y * array[year2][i].y;
					var result = Math.sqrt(dis);
					//逆时针旋转
					ni[i] = {};
					ni[i].name = array[year2][i].name;
					ni[i].color = array[year2][i].color;
					ni[i].x = result * Math.cos(B2);
					ni[i].y = result * Math.sin(B2);
					
					if(ni[i].x > xMax_n) xMax_n= ni[i].x;
					if(ni[i].x < xMin_n) xMin_n = ni[i].x;
					if(ni[i].y > yMax_n) yMax_n = ni[i].y;
					if(ni[i].y < yMin_n) yMin_n = ni[i].y;
					
					shun[i] = {};
					shun[i].name = array[year2][i].name;
					shun[i].color = array[year2][i].color;
					shun[i].x = result * Math.cos(B4);
					shun[i].y = result * Math.sin(B4);
					
					if(shun[i].x > xMax_s) xMax_s= shun[i].x;
					if(shun[i].x < xMin_s) xMin_s = shun[i].x;
					if(shun[i].y > yMax_s) yMax_s = shun[i].y;
					if(shun[i].y < yMin_s) yMin_s = shun[i].y;
				}
				
				for(var i = 0; i < ni.length; i++){
					ni[i].x_guiyi = guiyi(xMax_n, xMin_n, ni[i].x);
					ni[i].y_guiyi = guiyi(yMax_n, yMin_n, ni[i].y);
				}
				
				for(var i = 0; i < array[year2 - 1].length; i++){
					for(var j = 0; j < ni.length; j++){
						if(array[year2 - 1][i].name == ni[j].name){
							var dis = (array[year2 - 1][i].x_guiyi - ni[j].x_guiyi) * (array[year2 - 1][i].x_guiyi - ni[j].x_guiyi) + 
									(array[year2 - 1][i].y_guiyi - ni[j].y_guiyi) * (array[year2 - 1][i].y_guiyi - ni[j].y_guiyi);
							var result = Math.sqrt(dis);
							sum_n += result;
							break;
						}
					}
				}
				
				for(var i = 0; i < shun.length; i++){
					shun[i].x_guiyi = guiyi(xMax_s, xMin_s, shun[i].x);
					shun[i].y_guiyi = guiyi(yMax_s, yMin_s, shun[i].y);
				}
				
				for(var i = 0; i < array[year2 - 1].length; i++){
					for(var j = 0; j < shun.length; j++){
						if(array[year2 - 1][i].name == shun[j].name){
							var dis = (array[year2 - 1][i].x_guiyi - shun[j].x_guiyi) * (array[year2 - 1][i].x_guiyi - shun[j].x_guiyi) + 
									(array[year2 - 1][i].y_guiyi - shun[j].y_guiyi) * (array[year2 - 1][i].y_guiyi - shun[j].y_guiyi);
							var result = Math.sqrt(dis);
							sum_s += result;
							break;
						}
					}
				}
				
				var cy_n = sum_n / ni.length;
				var cy_s = sum_s / shun.length;
				
				if(cy_n < cy_s && cy_n < array[year2].cy_guiyi){
					array[year2].cy_new = cy_n;
					array[year2].newdatapoint = ni;
				}
				if(cy_s < cy_n && cy_s < array[year2].cy_guiyi){
					array[year2].cy_new = cy_s;
					array[year2].newdatapoint = shun;
				}
				if(array[year2].cy_guiyi < cy_n && array[year2].cy_guiyi < cy_s){
					array[year2].cy_new = array[year2].cy_guiyi;
					for(var i = 0; i < array[year2].length; i++){
						array[year2].newdatapoint[i] = {};
						array[year2].newdatapoint[i].name = array[year2][i].name;
						array[year2].newdatapoint[i].color = array[year2][i].color;
						array[year2].newdatapoint[i].x = array[year2][i].x;
						array[year2].newdatapoint[i].x_guiyi = array[year2][i].x_guiyi;
						array[year2].newdatapoint[i].y = array[year2][i].y;
						array[year2].newdatapoint[i].y_guiyi = array[year2][i].y_guiyi;
					}
				}
			}
		}
	}
	
	function newDatapoint2(year, yuzhi, cluster){
		var threshold = yuzhi * 10;
		var year2 = year - 1952;		
		var data = array[year2].hcdata[threshold];
		
		if(year2 == 0)
			rotate_datapoint = data;
		else{
			var xMax_n = 0;
			var xMin_n = Number.POSITIVE_INFINITY;
			var yMax_n = 0;
			var yMin_n = Number.POSITIVE_INFINITY;
			var sum_n = 0;
			var ni = new Array();
			
			for(var i = 0; i < data.length; i++){					
				ni[i] = new Array();				
				for(var j = 0; j < data[i].length; j++){
					var A = 180 / Math.PI * Math.atan(data[i][j].y/data[i][j].x);
										
					if(A < 0 && data[i][j].x < 0 && data[i][j].y > 0) A = 180 + A;
					if(A < 0 && data[i][j].x > 0 && data[i][j].y < 0) A = 360 + A;
					if(A > 0 && data[i][j].x < 0 && data[i][j].y < 0) A = 180 + A;
					
					var B1 = A + data[i].avg_angle;
					var B2 = Math.PI / 180 * (A + data[i].avg_angle);
					var dis = data[i][j].x * data[i][j].x + data[i][j].y * data[i][j].y;
					var result = Math.sqrt(dis);
										
					ni[i][j] = {};
					ni[i][j].name = data[i][j].name;
					ni[i][j].color = data[i][j].color;
					ni[i][j].x = result * Math.cos(B2);
					ni[i][j].y = result * Math.sin(B2);
					
					if(ni[i][j].x > xMax_n) xMax_n = ni[i][j].x;
					if(ni[i][j].x < xMin_n) xMin_n = ni[i][j].x;
					if(ni[i][j].y > yMax_n) yMax_n = ni[i][j].y;
					if(ni[i][j].y < yMin_n) yMin_n = ni[i][j].y;
				}
			}
			
			for(var i = 0; i < ni.length; i++){
				for(var j = 0; j < ni[i].length; j++){
					ni[i][j].x_guiyi = guiyi(xMax_n, xMin_n, ni[i][j].x);
					ni[i][j].y_guiyi = guiyi(yMax_n, yMin_n, ni[i][j].y);
				}
				
				var sum = 0
				for(var j = 0; j < array[year2 - 1].length; j++){
					for(var k = 0; k < ni[i].length; k++){
						if(array[year2 - 1][j].name == ni[i][k].name){
							var dis = (array[year2 - 1][j].x_guiyi - ni[i][k].x_guiyi) * (array[year2 - 1][j].x_guiyi - ni[i][k].x_guiyi) + 
									(array[year2 - 1][j].y_guiyi - ni[i][k].y_guiyi) * (array[year2 - 1][j].y_guiyi - ni[i][k].y_guiyi);
							var result = Math.sqrt(dis);
							ni[i][k].sub_guiyi = result;
							sum += result;
							sum_n += result;
							break;
						}
					}
				}
				ni[i].cy_guiyi = sum / ni[i].length;
			}
			ni.cy_guiyi = sum_n / (array[year2].length);
				
			var xMax_s = 0;
			var xMin_s = Number.POSITIVE_INFINITY;
			var yMax_s = 0;
			var yMin_s = Number.POSITIVE_INFINITY;
			var sum_s = 0;
			var shun = new Array();
			
			for(var i = 0; i < data.length; i++){
				
				shun[i] = new Array();
				
				for(var j = 0; j < data[i].length; j++){
					var A = 180 / Math.PI * Math.atan(data[i][j].y/data[i][j].x);
					
					if(A < 0 && data[i][j].x < 0 && data[i][j].y > 0) A = 180 + A;
					if(A < 0 && data[i][j].x > 0 && data[i][j].y < 0) A = 360 + A;
					if(A > 0 && data[i][j].x < 0 && data[i][j].y < 0) A = 180 + A;
					
					var B1 = A - data[i].avg_angle;
					var B2 = Math.PI / 180 * (A - data[i].avg_angle);
					var dis = data[i][j].x * data[i][j].x + data[i][j].y * data[i][j].y;
					var result = Math.sqrt(dis);
										
					shun[i][j] = {};
					shun[i][j].name = data[i][j].name;
					shun[i][j].color = data[i][j].color;
					shun[i][j].x = result * Math.cos(B2);
					shun[i][j].y = result * Math.sin(B2);
					
					if(shun[i][j].x > xMax_s) xMax_s = shun[i][j].x;
					if(shun[i][j].x < xMin_s) xMin_s = shun[i][j].x;
					if(shun[i][j].y > yMax_s) yMax_s = shun[i][j].y;
					if(shun[i][j].y < yMin_s) yMin_s = shun[i][j].y;
				}
			}
			
			for(var i = 0; i < shun.length; i++){
				for(var j = 0; j < shun[i].length; j++){
					shun[i][j].x_guiyi = guiyi(xMax_s, xMin_s, shun[i][j].x);
					shun[i][j].y_guiyi = guiyi(yMax_s, yMin_s, shun[i][j].y);
				}
				
				var sum = 0
				
				for(var j = 0; j < array[year2 - 1].length; j++){
					for(var k = 0; k < shun[i].length; k++){
						if(array[year2 - 1][j].name == shun[i][k].name){
							var dis = (array[year2 - 1][j].x_guiyi - shun[i][k].x_guiyi) * (array[year2 - 1][j].x_guiyi - shun[i][k].x_guiyi) + 
									(array[year2 - 1][j].y_guiyi - shun[i][k].y_guiyi) * (array[year2 - 1][j].y_guiyi - shun[i][k].y_guiyi);
							var result = Math.sqrt(dis);
							shun[i][k].sub_guiyi = result;
							sum += result;
							sum_s += result;
							break;
						}
					}
				}
				shun[i].cy_guiyi = sum / shun[i].length;
			}
			shun.cy_guiyi = sum_s / (array[year2].length);
			
			var data2 = array[year2].hcdata[threshold][cluster];
			turn2(year, data2);
			
			if(ni[cluster].cy_guiyi < shun[cluster].cy_guiyi)
				rotate_datapoint = ni;
			else
				rotate_datapoint = shun;
		}
	}
    //tangcheng write this compare for sort 
	function compare(property) {
	    return function(a,b){
	        var value1 = a[property];
	        var value2 = b[property];
	        return value2 - value1;
	    }
	}
	//tangcheng write this point3 for finding avgAngle to rotate and max distance to symmetry 
	function newDatapoint3(){
		array[0].newdatapoint = new Array();
		for(var i = 0; i < array[0].length; i++){
			array[0].newdatapoint[i] = {};array[0].newdatapoint[i].name = array[0][i].name;array[0].newdatapoint[i].color = array[0][i].color;array[0].newdatapoint[i].x = array[0][i].x;array[0].newdatapoint[i].y = array[0][i].y;array[0].newdatapoint[i].x_guiyi = array[0][i].x_guiyi;array[0].newdatapoint[i].y_guiyi = array[0][i].y_guiyi;array[0].newdatapoint[i].dis = 0;
		}
		for(var index=1; index<array.length; index++){
			var xMax_rotate = 0, yMax_rotate = 0, xMin_rotate = Number.POSITIVE_INFINITY, yMin_rotate = Number.POSITIVE_INFINITY;
			//var sum_rotate = 0;
			var rotate = new Array();
			var xMax_symmetry = 0, yMax_symmetry = 0, xMin_symmetry = Number.POSITIVE_INFINITY, yMin_symmetry = Number.POSITIVE_INFINITY;
			//var sum_symmetry = 0;
			var symmetry = new Array();
			var xMax_fz = 0, yMax_fz = 0, xMin_fz = Number.POSITIVE_INFINITY, yMin_fz = Number.POSITIVE_INFINITY;
			var sum_fz = 0;
			array[index].newdatapoint = new Array();
			//init new position
			for(var i = 0; i < array[index].length; i++){
				array[index].newdatapoint[i] = {};
				array[index].newdatapoint[i].name = array[index][i].name;
				array[index].newdatapoint[i].color = array[index][i].color;
				array[index].newdatapoint[i].x = array[index][i].x;
				array[index].newdatapoint[i].y = array[index][i].y;
				array[index].newdatapoint[i].dis = 0;
				if(array[index].newdatapoint[i].x > xMax_fz) xMax_fz = array[index].newdatapoint[i].x;
				if(array[index].newdatapoint[i].x < xMin_fz) xMin_fz = array[index].newdatapoint[i].x;
				if(array[index].newdatapoint[i].y > yMax_fz) yMax_fz = array[index].newdatapoint[i].y;
				if(array[index].newdatapoint[i].y < yMin_fz) yMin_fz = array[index].newdatapoint[i].y;
			}
			//normalization 
			for(var i = 0; i < array[index].length; i++){
				array[index][i].x_guiyi = guiyi(xMax_fz, xMin_fz, array[index][i].x);
				array[index][i].y_guiyi = guiyi(yMax_fz, yMin_fz, array[index][i].y);
				array[index].newdatapoint[i].x_guiyi = guiyi(xMax_fz, xMin_fz, array[index][i].x);
				array[index].newdatapoint[i].y_guiyi = guiyi(yMax_fz, yMin_fz, array[index][i].y);
			}
		    //computer adajcent years distances and angle
		    // updata cy_new to campare with the rotate and symmetry.           
			sum_fz = 0;
			for (var i = 0; i < array[index - 1].newdatapoint.length; i++) {
			    for (var j = 0; j < array[index].newdatapoint.length; j++) {
			        if (array[index - 1].newdatapoint[i].name == array[index].newdatapoint[j].name) {
			            var dis = (array[index - 1].newdatapoint[i].x_guiyi - array[index].newdatapoint[j].x_guiyi) * (array[index - 1].newdatapoint[i].x_guiyi - array[index].newdatapoint[j].x_guiyi) +
								  (array[index - 1].newdatapoint[i].y_guiyi - array[index].newdatapoint[j].y_guiyi) * (array[index - 1].newdatapoint[i].y_guiyi - array[index].newdatapoint[j].y_guiyi);
			            var result = Math.sqrt(dis);
			            sum_fz += result;
			            break;
			        }
			    }
			}
			array[index].cy_new = sum_fz / array[index].length;

			var avg_rotate_angle = 0;
			var sum_rotate_angle = 0;
			for(var i = 0; i < array[index -1].newdatapoint.length; i++){
				for(var j = 0; j < array[index].newdatapoint.length; j++){
					if(array[index -1].newdatapoint[i].name == array[index].newdatapoint[j].name){
						sum_rotate_angle+= acos0(array[index -1].newdatapoint[i].x, array[index -1].newdatapoint[i].y, array[index].newdatapoint[j].x, array[index].newdatapoint[j].y);
						break;
					}
				}
			}
			var max_symmetry = new Array();
			for(var i=0;i<3;i++){
				max_symmetry[i] = {};
				max_symmetry[i].dis    = 0;
				max_symmetry[i].index0 = 0;
				max_symmetry[i].index1 = 0;
			}
			for(var i = 0; i < array[index -1].newdatapoint.length; i++){
				for(var j = 0; j < array[index].newdatapoint.length; j++){
					if(array[index -1].newdatapoint[i].name == array[index].newdatapoint[j].name){
						var distances = Math.pow(array[index -1].newdatapoint[i].x - array[index].newdatapoint[j].x,2) +
									    Math.pow(array[index -1].newdatapoint[i].y - array[index].newdatapoint[j].y,2);
						max_symmetry[i] = {};
						max_symmetry[i].dis = distances;
						max_symmetry[i].index0 = j;
						max_symmetry[i].index1 = i;
						break;
					}
				}
			}
		    max_symmetry.sort(compare('dis'));
			//rotate
			avg_rotate_angle = sum_rotate_angle/array[index].newdatapoint.length;			
			for(var i = 0; i < array[index - 1].length; i++){
				for(var j = 0; j < array[index].length; j++){
					if(array[index - 1][i].name == array[index][j].name){						
						var A = 180 / Math.PI * Math.atan(array[index][i].y/array[index][i].x);							
						if(A < 0 && array[index][i].x < 0 && array[index][i].y > 0) A = 180 + A;
						if(A < 0 && array[index][i].x > 0 && array[index][i].y < 0) A = 360 + A;
						if(A > 0 && array[index][i].x < 0 && array[index][i].y < 0) A = 180 + A; 
						var B2 = Math.PI / 180 * (A - avg_rotate_angle);
						var dis = array[index][i].x * array[index][i].x + array[index][i].y * array[index][i].y;
						var result = Math.sqrt(dis);							
						rotate[i] = {};
						rotate[i].name = array[index][i].name;
						rotate[i].color = array[index][i].color;
						rotate[i].x = result * Math.cos(B2);
						rotate[i].y = result * Math.sin(B2);						
						if(rotate[i].x > xMax_rotate) xMax_rotate = rotate[i].x;
						if(rotate[i].x < xMin_rotate) xMin_rotate = rotate[i].x;
						if(rotate[i].y > yMax_rotate) yMax_rotate = rotate[i].y;
						if(rotate[i].y < yMin_rotate) yMin_rotate = rotate[i].y;
						break;
					}
				}
			}
			var avg_symmetry_angle =0;
			var avg_symmetry_k     =0;
			for(var i=0;i<3;i++){
				var x0 = array[index].newdatapoint[max_symmetry[i].index0].x;
				var y0 = array[index].newdatapoint[max_symmetry[i].index0].y;
                //console.log
				var x1 = array[index - 1].newdatapoint[max_symmetry[i].index1].x;
				var y1 = array[index - 1].newdatapoint[max_symmetry[i].index1].y;
				var angle = Math.atan((y1 - y0)/(x1 - x0));
				var k     = -1/((y1 - y0)/(x1 - x0));
				if(i == 0){
					avg_symmetry_angle = Math.atan((y1 - y0)/(x1 - x0));
					avg_symmetry_k	   = -1/((y1 - y0)/(x1 - x0));
				}
				else{
					avg_symmetry_angle = (avg_symmetry_angle * 29 + angle)/30;
				    avg_symmetry_k     = (avg_symmetry_k *29 + k)/30;
				}
			}
			//symmetry		
			for(var i = 0; i < array[index - 1].length; i++){
				for(var j = 0; j < array[index].length; j++){
					if(array[index - 1][i].name == array[index][j].name){						
						var x0 = array[index][i].x;
						var y0 = array[index][i].y;	
						var k  = avg_symmetry_k;
						symmetry[i] = {};
						symmetry[i].name = array[index].newdatapoint[i].name;
						symmetry[i].color = array[index].newdatapoint[i].color;
						symmetry[i].x = (2*k*y0-(k*k-1)*x0)/(1+k*k);
						symmetry[i].y = (2*k*x0-(1-k*k)*y0)/(1+k*k);
						if(symmetry[i].x > xMax_symmetry) xMax_symmetry = symmetry[i].x;
						if(symmetry[i].x < xMin_symmetry) xMin_symmetry = symmetry[i].x;
						if(symmetry[i].y > yMax_symmetry) yMax_symmetry = symmetry[i].y;
						if(symmetry[i].y < yMin_symmetry) yMin_symmetry = symmetry[i].y;
						break;
					}
				}
			}
			
			for(var i = 0; i < rotate.length; i++){
				rotate[i].x_guiyi = guiyi(xMax_rotate, xMin_rotate, rotate[i].x);
				rotate[i].y_guiyi = guiyi(yMax_rotate, yMin_rotate, rotate[i].y);
			}
			for(var i = 0; i < symmetry.length; i++){
				symmetry[i].x_guiyi = guiyi(xMax_symmetry, xMin_symmetry, symmetry[i].x);
				symmetry[i].y_guiyi = guiyi(yMax_symmetry, yMin_symmetry, symmetry[i].y);
			}
			
			//compute distance
			var sum_rotate  = 0;
			for(var i = 0; i < array[index - 1].newdatapoint.length; i++){
				for(var j = 0; j < rotate.length; j++){
					if(array[index - 1].newdatapoint[i].name == rotate[j].name){
						var dis = (array[index - 1].newdatapoint[i].x_guiyi - rotate[j].x_guiyi) * (array[index - 1].newdatapoint[i].x_guiyi - rotate[j].x_guiyi) + 
								  (array[index - 1].newdatapoint[i].y_guiyi - rotate[j].y_guiyi) * (array[index - 1].newdatapoint[i].y_guiyi - rotate[j].y_guiyi);
						var result = Math.sqrt(dis);
						sum_rotate += result;
						break;
					}
				}
			}
			var sum_symmetry= 0;
			for(var i = 0; i < array[index - 1].newdatapoint.length; i++){
				for(var j = 0; j < symmetry.length; j++){
					if(array[index - 1].newdatapoint[i].name == symmetry[j].name){
						var dis = (array[index - 1].newdatapoint[i].x_guiyi - symmetry[j].x_guiyi) * (array[index - 1].newdatapoint[i].x_guiyi - symmetry[j].x_guiyi) + 
								  (array[index - 1].newdatapoint[i].y_guiyi - symmetry[j].y_guiyi) * (array[index - 1].newdatapoint[i].y_guiyi - symmetry[j].y_guiyi);
						var result = Math.sqrt(dis);
						sum_symmetry+=result;
						break;
					}
				}
			}
			if (sum_rotate / rotate.length < array[index].cy_new && sum_rotate < sum_symmetry) {
				array[index].cy_new = sum_rotate/rotate.length;
				array[index].newdatapoint = rotate;
			} else if (sum_symmetry / symmetry.length < array[index].cy_new && sum_symmetry < sum_rotate) {
				array[index].cy_new = sum_symmetry/symmetry.length;
				array[index].newdatapoint = symmetry;
			}else{
				for(var i = 0; i < array[index].length; i++){
					array[index].newdatapoint[i] = {};
					array[index].newdatapoint[i].name = array[index][i].name;
					array[index].newdatapoint[i].color = array[index][i].color;
					array[index].newdatapoint[i].x = array[index][i].x;
					array[index].newdatapoint[i].x_guiyi = array[index][i].x_guiyi;
					array[index].newdatapoint[i].y = array[index][i].y;
					array[index].newdatapoint[i].y_guiyi = array[index][i].y_guiyi;
				}
			}
			for(var i=0;i<array[index-1].newdatapoint.length;i++){
				for(var j=0;j<array[index].newdatapoint.length;j++){
					if(array[index - 1].newdatapoint[i].name == array[index].newdatapoint[j].name){
						 var dis= (array[index - 1].newdatapoint[i].x_guiyi - array[index].newdatapoint[j].x_guiyi) * (array[index - 1].newdatapoint[i].x_guiyi - array[index].newdatapoint[j].x_guiyi) + 
								  (array[index - 1].newdatapoint[i].y_guiyi - array[index].newdatapoint[j].y_guiyi) * (array[index - 1].newdatapoint[i].y_guiyi - array[index].newdatapoint[j].y_guiyi);
						 array[index].newdatapoint[j].dis = Math.sqrt(dis);
						 break;
					}
				}
			}
		}
	}
	//based current years data to orthogonal transform
	function currentNewPoint(year){
		array[year].currentPoint = new Array();
		for(var i = 0; i < array[year].length; i++){
			array[year].currentPoint[i] = {};array[year].currentPoint[i].name = array[year][i].name;array[year].currentPoint[i].color = array[year][i].color;array[year].currentPoint[i].x = array[year][i].x;array[year].currentPoint[i].y = array[year][i].y;array[year].currentPoint[i].x_guiyi = array[year][i].x_guiyi;array[year].currentPoint[i].y_guiyi = array[year][i].y_guiyi;
			array[year].currentPoint[i].dis = 0;
		}
		array[year].cy_new = 0;
		//before current year
		for(var year0 = year-1; year0 >= 0; year0--){
			var year2 = year0;
			array[year0].currentPoint = new Array();
			var xMax_rotate = 0, yMax_rotate = 0, xMin_rotate = Number.POSITIVE_INFINITY, yMin_rotate = Number.POSITIVE_INFINITY;
			var rotate = new Array();
			var xMax_symmetry = 0, yMax_symmetry = 0, xMin_symmetry = Number.POSITIVE_INFINITY, yMin_symmetry = Number.POSITIVE_INFINITY;
			var symmetry = new Array();	var xMax_fz = 0, yMax_fz = 0, xMin_fz = Number.POSITIVE_INFINITY, yMin_fz = Number.POSITIVE_INFINITY;
			var sum_fz = 0;			
			//init new position
			for(var i = 0; i < array[year2].length; i++){
				array[year2].currentPoint[i] = {};array[year2].currentPoint[i].name = array[year2][i].name;array[year2].currentPoint[i].color = array[year2][i].color;array[year2].currentPoint[i].x = array[year2][i].x;array[year2].currentPoint[i].y = array[year2][i].y;
				if(array[year2].currentPoint[i].x > xMax_fz)xMax_fz = array[year2].currentPoint[i].x;if(array[year2].currentPoint[i].x < xMin_fz)xMin_fz = array[year2].currentPoint[i].x;if(array[year2].currentPoint[i].y > yMax_fz)yMax_fz = array[year2].currentPoint[i].y;if(array[year2].currentPoint[i].y < yMin_fz)yMin_fz = array[year2].currentPoint[i].y;
			}
			//normalization 
			for(var i = 0; i < array[year2].length; i++){
				array[year2].currentPoint[i].x_guiyi = guiyi(xMax_fz, xMin_fz, array[year2][i].x);array[year2].currentPoint[i].y_guiyi = guiyi(yMax_fz, yMin_fz, array[year2][i].y);
			}
		    //computer adajcent years distances and angle
		    //updata cy_new to campare with the rotate and symmetry.   
			sum_fz = 0;
			for (var i = 0; i < array[year2].currentPoint.length; i++) {
			    for (var j = 0; j < array[year2 + 1].currentPoint.length; j++) {
			        if (array[year2].currentPoint[i].name == array[year2 + 1].currentPoint[j].name) {
			            var dis = (array[year2].currentPoint[i].x_guiyi - array[year2 + 1].currentPoint[j].x_guiyi) * (array[year2].currentPoint[i].x_guiyi - array[year2+1].currentPoint[j].x_guiyi) +
								  (array[year2].currentPoint[i].y_guiyi - array[year2 + 1].currentPoint[j].y_guiyi) * (array[year2].currentPoint[i].y_guiyi - array[year2+1].currentPoint[j].y_guiyi);
			            var result = Math.sqrt(dis);
			            sum_fz += result;
			            break;
			        }
			    }
			}
			array[year2].cy_new = sum_fz / array[year2].length;

			var avg_rotate_angle = 0;
			var sum_rotate_angle = 0;
			for(var i = 0; i < array[year2].currentPoint.length; i++){
				for(var j = 0; j < array[year2+1].currentPoint.length; j++){
					if(array[year2].currentPoint[i].name == array[year2+1].currentPoint[j].name){
						sum_rotate_angle+= acos0(array[year2].currentPoint[i].x, array[year2].currentPoint[i].y, array[year2+1].currentPoint[j].x, array[year2+1].currentPoint[j].y);
						break;
					}
				}
			}
			var max_symmetry = new Array();
			for(var i=0;i<3;i++){
				max_symmetry[i] = {};max_symmetry[i].dis    = 0;max_symmetry[i].index0 = 0;	max_symmetry[i].index1 = 0;
			}
			for(var i = 0; i < array[year2].currentPoint.length; i++){
				for(var j = 0; j < array[year2 + 1].currentPoint.length; j++){
					if(array[year2].currentPoint[i].name == array[year2 + 1].currentPoint[j].name){
						var distances = Math.pow(array[year2].currentPoint[i].x - array[year2+1].currentPoint[j].x,2) + Math.pow(array[year2].currentPoint[i].y - array[year2+1].currentPoint[j].y,2);
						max_symmetry[i] = {};max_symmetry[i].dis = distances;max_symmetry[i].index0 = i;	max_symmetry[i].index1 = j;
						break;
					}
				}
			}
		    max_symmetry.sort(compare('dis'));
			//rotate
			avg_rotate_angle = sum_rotate_angle/array[year2].currentPoint.length;			
			for(var i = 0; i < array[year2].length; i++){
				for(var j = 0; j < array[year2+1].length; j++){
					if(array[year2][i].name == array[year2+1][j].name){						
						var A = 180 / Math.PI * Math.atan(array[year2][i].y/array[year2][i].x);							
						if(A < 0 && array[year2][i].x < 0 && array[year2][i].y > 0) A = 180 + A;
						if(A < 0 && array[year2][i].x > 0 && array[year2][i].y < 0) A = 360 + A;
						if(A > 0 && array[year2][i].x < 0 && array[year2][i].y < 0) A = 180 + A; 
						var B2 = Math.PI / 180 * (A - avg_rotate_angle);
						var dis = array[year2][i].x * array[year2][i].x + array[year2][i].y * array[year2][i].y;
						var result = Math.sqrt(dis);							
						rotate[i] = {};
						rotate[i].name = array[year2][i].name;
						rotate[i].color = array[year2][i].color;
						rotate[i].x = result * Math.cos(B2);
						rotate[i].y = result * Math.sin(B2);						
						if(rotate[i].x > xMax_rotate) xMax_rotate = rotate[i].x;
						if(rotate[i].x < xMin_rotate) xMin_rotate = rotate[i].x;
						if(rotate[i].y > yMax_rotate) yMax_rotate = rotate[i].y;
						if(rotate[i].y < yMin_rotate) yMin_rotate = rotate[i].y;
						break;
					}
				}
			}
			var avg_symmetry_angle =0;
			var avg_symmetry_k     =0;
			for(var i=0;i<3;i++){
				var x0 = array[year2].currentPoint[max_symmetry[i].index0].x;
				var y0 = array[year2].currentPoint[max_symmetry[i].index0].y;
				var x1 = array[year2 + 1].currentPoint[max_symmetry[i].index1].x;
				var y1 = array[year2 + 1].currentPoint[max_symmetry[i].index1].y;
				var angle = Math.atan((y1 - y0)/(x1 - x0));
				var k     = -1/((y1 - y0)/(x1 - x0));
				if(i == 0){
					avg_symmetry_angle = Math.atan((y1 - y0)/(x1 - x0));
					avg_symmetry_k	   = -1/((y1 - y0)/(x1 - x0));
				}
				else{
					avg_symmetry_angle = (avg_symmetry_angle * 29 + angle)/30;
				    avg_symmetry_k     = (avg_symmetry_k *29 + k)/30;
				}
			}
			//symmetry		
			for(var i = 0; i < array[year2].length; i++){
				for(var j = i; j < array[year2+1].length; j++){
					if(array[year2][i].name == array[year2+1][j].name){						
						var x0 = array[year2][i].x;
						var y0 = array[year2][i].y;	
						var k  = avg_symmetry_k;
						symmetry[i] = {};
						symmetry[i].name = array[year2][i].name;
						symmetry[i].color = array[year2][i].color;
						symmetry[i].x = (2*k*y0-(k*k-1)*x0)/(1+k*k);
						symmetry[i].y = (2*k*x0-(1-k*k)*y0)/(1+k*k);
						if(symmetry[i].x > xMax_symmetry) xMax_symmetry = symmetry[i].x;
						if(symmetry[i].x < xMin_symmetry) xMin_symmetry = symmetry[i].x;
						if(symmetry[i].y > yMax_symmetry) yMax_symmetry = symmetry[i].y;
						if(symmetry[i].y < yMin_symmetry) yMin_symmetry = symmetry[i].y;
						break;
					}
				}
			}
			for(var i = 0; i < rotate.length; i++){
				rotate[i].x_guiyi = guiyi(xMax_rotate, xMin_rotate, rotate[i].x);
				rotate[i].y_guiyi = guiyi(yMax_rotate, yMin_rotate, rotate[i].y);
			}
			for(var i = 0; i < symmetry.length; i++){
				symmetry[i].x_guiyi = guiyi(xMax_symmetry, xMin_symmetry, symmetry[i].x);
				symmetry[i].y_guiyi = guiyi(yMax_symmetry, yMin_symmetry, symmetry[i].y);
			}
			
			//compute distance
			var sum_rotate  = 0;
			for(var i = 0; i < array[year2+1].currentPoint.length; i++){
				for(var j = 0; j < rotate.length; j++){
					if(array[year2 + 1].currentPoint[i].name == rotate[j].name){
						var dis = (array[year2 + 1].currentPoint[i].x_guiyi - rotate[j].x_guiyi) * (array[year2 + 1].currentPoint[i].x_guiyi - rotate[j].x_guiyi) + 
								  (array[year2 + 1].currentPoint[i].y_guiyi - rotate[j].y_guiyi) * (array[year2 + 1].currentPoint[i].y_guiyi - rotate[j].y_guiyi);
						var result = Math.sqrt(dis);
						sum_rotate += result;
						break;
					}
				}
			}
			var sum_symmetry= 0;
			for(var i = 0; i < array[year2 + 1].currentPoint.length; i++){
				for(var j = 0; j < symmetry.length; j++){
					if(array[year2 + 1].currentPoint[i].name == symmetry[j].name){
						var dis = (array[year2 + 1].currentPoint[i].x_guiyi - symmetry[j].x_guiyi) * (array[year2 + 1].currentPoint[i].x_guiyi - symmetry[j].x_guiyi) + 
								  (array[year2 + 1].currentPoint[i].y_guiyi - symmetry[j].y_guiyi) * (array[year2 + 1].currentPoint[i].y_guiyi - symmetry[j].y_guiyi);
						var result = Math.sqrt(dis);
						sum_symmetry+=result;
						break;
					}
				}
			}
			if (sum_rotate / rotate.length < array[year2].cy_new && sum_rotate < sum_symmetry) {
				array[year2].cy_new = sum_rotate/rotate.length;
				array[year2].currentPoint = rotate;
			} else if (sum_symmetry / symmetry.length < array[year2].cy_new && sum_symmetry < sum_rotate) {
				array[year2].cy_new = sum_symmetry/symmetry.length;
				array[year2].currentPoint = symmetry;
			}else{
				for(var i = 0; i < array[year2].length; i++){
					array[year2].currentPoint[i] = {};
					array[year2].currentPoint[i].name = array[year2][i].name;
					array[year2].currentPoint[i].color = array[year2][i].color;
					array[year2].currentPoint[i].x = array[year2][i].x;
					array[year2].currentPoint[i].x_guiyi = array[year2][i].x_guiyi;
					array[year2].currentPoint[i].y = array[year2][i].y;
					array[year2].currentPoint[i].y_guiyi = array[year2][i].y_guiyi;
				}
			}
			for(var i=0;i<array[year2].currentPoint.length;i++){
				for(var j=0;j<array[year2+1].currentPoint.length;j++){
					if(array[year2].currentPoint[i].name == array[year2 + 1].currentPoint[j].name){
						 var dis= (array[year2].currentPoint[i].x_guiyi - array[year2+1].currentPoint[j].x_guiyi) * (array[year2].currentPoint[i].x_guiyi - array[year2+1].currentPoint[j].x_guiyi) + 
								  (array[year2].currentPoint[i].y_guiyi - array[year2+1].currentPoint[j].y_guiyi) * (array[year2].currentPoint[i].y_guiyi - array[year2+1].currentPoint[j].y_guiyi);
						 array[year2].currentPoint[i].dis = Math.sqrt(dis);
						 break;
					}
				}
			}
		}
		
		//after current year
		for(var year0=year+1; year0<array.length ; year0++){
			var year2 = year0;
			var xMax_rotate = 0, yMax_rotate = 0, xMin_rotate = Number.POSITIVE_INFINITY, yMin_rotate = Number.POSITIVE_INFINITY;
			//var sum_rotate = 0;
			var rotate = new Array();
			var xMax_symmetry = 0, yMax_symmetry = 0, xMin_symmetry = Number.POSITIVE_INFINITY, yMin_symmetry = Number.POSITIVE_INFINITY;
			//var sum_symmetry = 0;
			var symmetry = new Array();
			var xMax_fz = 0, yMax_fz = 0, xMin_fz = Number.POSITIVE_INFINITY, yMin_fz = Number.POSITIVE_INFINITY;
			var sum_fz = 0;
			array[year2].currentPoint = new Array();
			//init new position
			for(var i = 0; i < array[year2].length; i++){
				array[year2].currentPoint[i] = {};array[year2].currentPoint[i].name = array[year2][i].name;array[year2].currentPoint[i].color = array[year2][i].color;array[year2].currentPoint[i].x = array[year2][i].x;array[year2].currentPoint[i].y = array[year2][i].y;
				if(array[year2].currentPoint[i].x > xMax_fz)xMax_fz = array[year2].currentPoint[i].x;
				if(array[year2].currentPoint[i].x < xMin_fz)xMin_fz = array[year2].currentPoint[i].x;
				if(array[year2].currentPoint[i].y > yMax_fz)yMax_fz = array[year2].currentPoint[i].y;
				if(array[year2].currentPoint[i].y < yMin_fz)yMin_fz = array[year2].currentPoint[i].y;
			}
			//normalization 
			for(var i = 0; i < array[year2].length; i++){
				array[year2].currentPoint[i].x_guiyi = guiyi(xMax_fz, xMin_fz, array[year2][i].x);
				array[year2].currentPoint[i].y_guiyi = guiyi(yMax_fz, yMin_fz, array[year2][i].y);
			}
		    //computer adajcent years distances and angle
		    //updata cy_new to campare with the rotate and symmetry.   
			sum_fz = 0;
			for (var i = 0; i < array[year2 - 1].currentPoint.length; i++) {
			    for (var j = 0; j < array[year2].currentPoint.length; j++) {
			        if (array[year2 - 1].currentPoint[i].name == array[year2].currentPoint[j].name) {
			            var dis = (array[year2 - 1].currentPoint[i].x_guiyi - array[year2].currentPoint[j].x_guiyi) * (array[year2 - 1].currentPoint[i].x_guiyi - array[year2].currentPoint[j].x_guiyi) +
								  (array[year2 - 1].currentPoint[i].y_guiyi - array[year2].currentPoint[j].y_guiyi) * (array[year2 - 1].currentPoint[i].y_guiyi - array[year2].currentPoint[j].y_guiyi);
			            var result = Math.sqrt(dis);
			            sum_fz += result;
			            break;
			        }
			    }
			}
			array[year2].cy_new = sum_fz / array[year2].length;

			var avg_rotate_angle = 0;
			var sum_rotate_angle = 0;
			for(var i = 0; i < array[year2 -1].currentPoint.length; i++){
				for(var j = 0; j < array[year2].currentPoint.length; j++){
					if(array[year2 -1].currentPoint[i].name == array[year2].currentPoint[j].name){
						sum_rotate_angle+= acos0(array[year2 -1].currentPoint[i].x, array[year2 -1].currentPoint[i].y, array[year2].currentPoint[j].x, array[year2].currentPoint[j].y);
						break;
					}
				}
			}
			var max_symmetry = new Array();
			for(var i=0;i<3;i++){
				max_symmetry[i] = {};
				max_symmetry[i].dis    = 0;
				max_symmetry[i].index0 = 0;
				max_symmetry[i].index1 = 0;
			}
			for(var i = 0; i < array[year2 -1].currentPoint.length; i++){
				for(var j = 0; j < array[year2].currentPoint.length; j++){
					if(array[year2 -1].currentPoint[i].name == array[year2].currentPoint[j].name){
						var distances = Math.pow(array[year2 -1].currentPoint[i].x - array[year2].currentPoint[j].x,2) +
									    Math.pow(array[year2 -1].currentPoint[i].y - array[year2].currentPoint[j].y,2);
						max_symmetry[i] = {};
						max_symmetry[i].dis = distances;
						max_symmetry[i].index0 = i;
						max_symmetry[i].index1 = j;
						break;
					}
				}
			}
		    max_symmetry.sort(compare('dis'));
			//rotate
			avg_rotate_angle = sum_rotate_angle/array[year2].currentPoint.length;			
			for(var i = 0; i < array[year2 - 1].length; i++){
				for(var j = 0; j < array[year2].length; j++){
					if(array[year2 - 1][i].name == array[year2][j].name){						
						var A = 180 / Math.PI * Math.atan(array[year2][i].y/array[year2][i].x);							
						if(A < 0 && array[year2][i].x < 0 && array[year2][i].y > 0) A = 180 + A;
						if(A < 0 && array[year2][i].x > 0 && array[year2][i].y < 0) A = 360 + A;
						if(A > 0 && array[year2][i].x < 0 && array[year2][i].y < 0) A = 180 + A; 
						var B2 = Math.PI / 180 * (A - avg_rotate_angle);
						var dis = array[year2][i].x * array[year2][i].x + array[year2][i].y * array[year2][i].y;
						var result = Math.sqrt(dis);							
						rotate[i] = {};
						rotate[i].name = array[year2][i].name;
						rotate[i].color = array[year2][i].color;
						rotate[i].x = result * Math.cos(B2);
						rotate[i].y = result * Math.sin(B2);						
						if(rotate[i].x > xMax_rotate) xMax_rotate = rotate[i].x;
						if(rotate[i].x < xMin_rotate) xMin_rotate = rotate[i].x;
						if(rotate[i].y > yMax_rotate) yMax_rotate = rotate[i].y;
						if(rotate[i].y < yMin_rotate) yMin_rotate = rotate[i].y;
						break;
					}
				}
			}
			var avg_symmetry_angle =0;
			var avg_symmetry_k     =0;
			for(var i=0;i<3;i++){
				var x0 = array[year2].currentPoint[max_symmetry[i].index0].x;
				var y0 = array[year2].currentPoint[max_symmetry[i].index0].y;
				var x1 = array[year2 - 1].currentPoint[max_symmetry[i].index1].x;
				var y1 = array[year2 - 1].currentPoint[max_symmetry[i].index1].y;
				var angle = Math.atan((y1 - y0)/(x1 - x0));
				var k     = -1/((y1 - y0)/(x1 - x0));
				if(i == 0){
					avg_symmetry_angle = Math.atan((y1 - y0)/(x1 - x0));
					avg_symmetry_k	   = -1/((y1 - y0)/(x1 - x0));
				}
				else{
					avg_symmetry_angle = (avg_symmetry_angle * 29 + angle)/30;
				    avg_symmetry_k     = (avg_symmetry_k *29 + k)/30;
				}
			}
			//symmetry		
			for(var i = 0; i < array[year2 - 1].length; i++){
				for(var j = 0; j < array[year2].length; j++){
					if(array[year2 - 1][i].name == array[year2][j].name){						
						var x0 = array[year2][i].x;
						var y0 = array[year2][i].y;	
						var k  = avg_symmetry_k;
						symmetry[i] = {};
						symmetry[i].name = array[year2].currentPoint[i].name;
						symmetry[i].color = array[year2].currentPoint[i].color;
						symmetry[i].x = (2*k*y0-(k*k-1)*x0)/(1+k*k);
						symmetry[i].y = (2*k*x0-(1-k*k)*y0)/(1+k*k);
						if(symmetry[i].x > xMax_symmetry) xMax_symmetry = symmetry[i].x;
						if(symmetry[i].x < xMin_symmetry) xMin_symmetry = symmetry[i].x;
						if(symmetry[i].y > yMax_symmetry) yMax_symmetry = symmetry[i].y;
						if(symmetry[i].y < yMin_symmetry) yMin_symmetry = symmetry[i].y;
						break;
					}
				}
			}
			
			for(var i = 0; i < rotate.length; i++){
				rotate[i].x_guiyi = guiyi(xMax_rotate, xMin_rotate, rotate[i].x);
				rotate[i].y_guiyi = guiyi(yMax_rotate, yMin_rotate, rotate[i].y);
			}
			for(var i = 0; i < symmetry.length; i++){
				symmetry[i].x_guiyi = guiyi(xMax_symmetry, xMin_symmetry, symmetry[i].x);
				symmetry[i].y_guiyi = guiyi(yMax_symmetry, yMin_symmetry, symmetry[i].y);
			}
			
			//compute distance
			var sum_rotate  = 0;
			for(var i = 0; i < array[year2 - 1].currentPoint.length; i++){
				for(var j = 0; j < rotate.length; j++){
					if(array[year2 - 1].currentPoint[i].name == rotate[j].name){
						var dis = (array[year2 - 1].currentPoint[i].x_guiyi - rotate[j].x_guiyi) * (array[year2 - 1].currentPoint[i].x_guiyi - rotate[j].x_guiyi) + 
								  (array[year2 - 1].currentPoint[i].y_guiyi - rotate[j].y_guiyi) * (array[year2 - 1].currentPoint[i].y_guiyi - rotate[j].y_guiyi);
						var result = Math.sqrt(dis);
						sum_rotate += result;
						break;
					}
				}
			}
			var sum_symmetry= 0;
			for(var i = 0; i < array[year2 - 1].currentPoint.length; i++){
				for(var j = 0; j < symmetry.length; j++){
					if(array[year2 - 1].currentPoint[i].name == symmetry[j].name){
						var dis = (array[year2 - 1].currentPoint[i].x_guiyi - symmetry[j].x_guiyi) * (array[year2 - 1].currentPoint[i].x_guiyi - symmetry[j].x_guiyi) + 
								  (array[year2 - 1].currentPoint[i].y_guiyi - symmetry[j].y_guiyi) * (array[year2 - 1].currentPoint[i].y_guiyi - symmetry[j].y_guiyi);
						var result = Math.sqrt(dis);
						sum_symmetry+=result;
						break;
					}
				}
			}
			if (sum_rotate / rotate.length < array[year2].cy_new && sum_rotate < sum_symmetry) {
				array[year2].cy_new = sum_rotate/rotate.length;
				array[year2].currentPoint = rotate;
			} else if (sum_symmetry / symmetry.length < array[year2].cy_new && sum_symmetry < sum_rotate) {
				array[year2].cy_new = sum_symmetry/symmetry.length;
				array[year2].currentPoint = symmetry;
			}else{
				for(var i = 0; i < array[year2].length; i++){
					array[year2].currentPoint[i] = {};
					array[year2].currentPoint[i].name = array[year2][i].name;
					array[year2].currentPoint[i].color = array[year2][i].color;
					array[year2].currentPoint[i].x = array[year2][i].x;
					array[year2].currentPoint[i].x_guiyi = array[year2][i].x_guiyi;
					array[year2].currentPoint[i].y = array[year2][i].y;
					array[year2].currentPoint[i].y_guiyi = array[year2][i].y_guiyi;
				}
			}
			for(var i=0;i<array[year2].currentPoint.length;i++){
				for(var j=0;j<array[year2-1].currentPoint.length;j++){
					if(array[year2].currentPoint[i].name == array[year2 - 1].currentPoint[j].name){
						 var dis= (array[year2].currentPoint[i].x_guiyi - array[year2-1].currentPoint[j].x_guiyi) * (array[year2].currentPoint[i].x_guiyi - array[year2-1].currentPoint[j].x_guiyi) + 
								  (array[year2].currentPoint[i].y_guiyi - array[year2-1].currentPoint[j].y_guiyi) * (array[year2].currentPoint[i].y_guiyi - array[year2-1].currentPoint[j].y_guiyi);
						 array[year2].currentPoint[j].dis = Math.sqrt(dis);
						 break;
					}
				}
			}
		}
	}
	function acos0(x1, y1, x2, y2){
		var cos0 = (x1*x2 + y1*y2)/(Math.sqrt(x1*x1 + y1*y1)*Math.sqrt(x2*x2 + y2*y2));
		return 180 / Math.PI * Math.acos(cos0);
	}
	
	function cut(data ,threshold){
		if (threshold < 0) throw new Error('Threshold too small');
		var list = [data];
		var ans = [];
		while(list.length > 0){
			var aux = list.shift();
			if(threshold >= aux.height)
				ans.push(aux);
			else
				list = list.concat(aux.children);
		}
		return ans;
	}
	
	function maxDistance(data){
		var list = [data];
		var ans = [];
		var maxDis = 0;
		while(list.length > 0){
			var aux = list.shift();
			if(aux.height > maxDis) maxDis = aux.height;
		}
		return maxDis;
	}
	
	function dataHcluster(){
		for(var index = 0; index<array.length; index++){
			var hclusterdata = new Array();
			var cluster = d3.layout.cluster();
			for(var i = 0; i < array[index].length; i++){
				hclusterdata[i] = {"name": array[index][i].name, "position": [], "color": array[index][i].color};
				hclusterdata[i].position.push(array[index][i].x, array[index][i].y);
			}
			
			var dataset = hcluster().distance('euclidean').linkage('avg').data(hclusterdata.sort(function(a, b){ return Math.random() - 0.5; }));
			var maxDis = maxDistance(dataset.tree());
			var hcdata = new Array();
			var nodes = new Array();		
			for(var i = 0; i <= 10; i++){
				var yuzhi = i / 10;
				var threshold = yuzhi * maxDis;				
				hcdata[i] = cut(dataset.tree(), threshold);
				nodes[i] = new Array();
				for(var j = 0; j < hcdata[i].length; j++){
					var hcdata_nodes = cluster.nodes(hcdata[i][j]);
					nodes[i][j] = {};
					nodes[i][j] = new Array();
					var l = 0;
					for(var k = 0; k < hcdata_nodes.length; k++){
						if(hcdata_nodes[k].children){
						}else{
							nodes[i][j][l] = {};
							nodes[i][j][l].name = hcdata_nodes[k].name;
							nodes[i][j][l].position = hcdata_nodes[k].position;
							nodes[i][j][l].x = hcdata_nodes[k].position[0];
							nodes[i][j][l].y = hcdata_nodes[k].position[1];
							for(var m = 0; m < hclusterdata.length; m++){
								if(hclusterdata[m].name == nodes[i][j][l].name) {
									nodes[i][j][l].color = hclusterdata[m].color;
									break;
								}
							}
							l++;
						}
					}
					nodes[i][j].length = l;
				}				
				for(var j = 0; j < nodes[i].length; j++){
					var sum_angle = 0;
					var sum_sub_guiyi = 0;
					for(var l = 0; l < nodes[i][j].length; l++){
						for(var k = 0; k < array[index].length; k++){
							if(array[index][k].name == nodes[i][j][l].name){
								nodes[i][j][l].x_guiyi = array[index][k].x_guiyi;
								nodes[i][j][l].y_guiyi = array[index][k].y_guiyi;
								nodes[i][j][l].angle = array[index][k].angle;
								nodes[i][j][l].sub_guiyi = array[index][k].sub_guiyi;
								sum_angle += array[index][k].angle;
								sum_sub_guiyi += array[index][k].sub_guiyi;
								break;
							}
						}
					}
					nodes[i][j].avg_angle = sum_angle / nodes[i][j].length;
					nodes[i][j].cy_guiyi = sum_sub_guiyi / nodes[i][j].length;
				}
			}			
			array[index].hcdata = nodes;
		}
	}
	//tangcheng write this for hcluster the after transformate projection
	function Hcluster(){
		for(var year0 = 1952; year0 < 2013; year0++){
			var year2 = year0 - 1952;
			var hclusterdata = new Array();
			var cluster = d3.layout.cluster();
			for(var i = 0; i < array[year2].newdatapoint.length; i++){
				hclusterdata[i] = {"name": array[year2].newdatapoint[i].name, "position": [], "color": array[year2].newdatapoint[i].color};
				hclusterdata[i].position.push(array[year2].newdatapoint[i].x, array[year2].newdatapoint[i].y);
			}
			var dataset = hcluster().distance('euclidean').linkage('avg').data(hclusterdata.sort(function(a, b){ return Math.random() - 0.5; }));
			var maxDis = maxDistance(dataset.tree());
			var hcdata = new Array();
			var nodes = new Array();
			for(var i = 0; i <= 10; i++){
				var yuzhi = i / 10;
				var threshold = yuzhi * maxDis;		
				hcdata[i] = cut(dataset.tree(), threshold);
				nodes[i] = new Array();
				for(var j = 0; j < hcdata[i].length; j++){
					var hcdata_nodes = cluster.nodes(hcdata[i][j]);
					nodes[i][j] = {};
					nodes[i][j] = new Array();
					var l = 0;
					for(var k = 0; k < hcdata_nodes.length; k++){
						if(hcdata_nodes[k].children){
						}else{
							nodes[i][j][l] = {};
							nodes[i][j][l].name = hcdata_nodes[k].name;
							nodes[i][j][l].position = hcdata_nodes[k].position;
							nodes[i][j][l].x = hcdata_nodes[k].position[0];
							nodes[i][j][l].y = hcdata_nodes[k].position[1];
							for(var m = 0; m < hclusterdata.length; m++){
								if(hclusterdata[m].name == nodes[i][j][l].name) {
									nodes[i][j][l].color = hclusterdata[m].color;
									break;
								}
							}
							l++;
						}
					}
					nodes[i][j].length = l;
				}				
				for(var j = 0; j < nodes[i].length; j++){
					var sum_angle = 0;
					var sum_sub_guiyi = 0;
					for(var l = 0; l < nodes[i][j].length; l++){
						for(var k = 0; k < array[year2].length; k++){
							if(array[year2][k].name == nodes[i][j][l].name){
								nodes[i][j][l].x_guiyi = array[year2][k].x_guiyi;
								nodes[i][j][l].y_guiyi = array[year2][k].y_guiyi;
								nodes[i][j][l].angle = array[year2][k].angle;
								nodes[i][j][l].sub_guiyi = array[year2][k].sub_guiyi;
								sum_angle += array[year2][k].angle;
								sum_sub_guiyi += array[year2][k].sub_guiyi;
								break;
							}
						}
					}
					nodes[i][j].avg_angle = sum_angle / nodes[i][j].length;
					nodes[i][j].cy_guiyi = sum_sub_guiyi / nodes[i][j].length;
				}
			}			
			array[year2].newhcdata = nodes;		
		}
	}
	//tangcheng hierarchy cluster for one time.
	function HclusterYear(data){
		var hclusterdata = new Array();
		var cluster = d3.layout.cluster();
		for(var i = 0; i < data.length; i++){
			hclusterdata[i] = {"name": data[i].name, "position": [], "color": data[i].color};
			hclusterdata[i].position.push(data[i].x, data[i].y);
		}
		var dataset = hcluster().distance('euclidean').linkage('avg').data(hclusterdata.sort(function(a, b){ return Math.random() - 0.5; }));
		var maxDis = maxDistance(dataset.tree());
		var hcdata = new Array();
		var nodes = new Array();
		for(var i = 0; i <= 10; i++){
			var yuzhi = i / 10;
			var threshold = yuzhi * maxDis;		
			hcdata[i] = cut(dataset.tree(), threshold);
			nodes[i] = new Array();
			for(var j = 0; j < hcdata[i].length; j++){
				var hcdata_nodes = cluster.nodes(hcdata[i][j]);
				nodes[i][j] = {};
				nodes[i][j] = new Array();
				var l = 0;
				for(var k = 0; k < hcdata_nodes.length; k++){
					if(hcdata_nodes[k].children){
					}else{
						nodes[i][j][l] = {};
						nodes[i][j][l].name = hcdata_nodes[k].name;
						nodes[i][j][l].position = hcdata_nodes[k].position;
						nodes[i][j][l].x = hcdata_nodes[k].position[0];
						nodes[i][j][l].y = hcdata_nodes[k].position[1];
						for(var m = 0; m < hclusterdata.length; m++){
							if(hclusterdata[m].name == nodes[i][j][l].name) {
								nodes[i][j][l].color = hclusterdata[m].color;
								break;
							}
						}
						l++;
					}
				}
				nodes[i][j].length = l;
			}				
			for(var j = 0; j < nodes[i].length; j++){
				var sum_angle = 0;
				var sum_sub_guiyi = 0;
				for(var l = 0; l < nodes[i][j].length; l++){
					for(var k = 0; k < data.length; k++){
						if(data[k].name == nodes[i][j][l].name){
							nodes[i][j][l].x_guiyi = data[k].x_guiyi;
							nodes[i][j][l].y_guiyi = data[k].y_guiyi;
							nodes[i][j][l].angle = data[k].angle;
							nodes[i][j][l].sub_guiyi = data[k].sub_guiyi;
							sum_angle += data[k].angle;
							sum_sub_guiyi += data[k].sub_guiyi;
							break;
						}
					}
				}
				nodes[i][j].avg_angle = sum_angle / nodes[i][j].length;
				nodes[i][j].cy_guiyi = sum_sub_guiyi / nodes[i][j].length;
			}
		}
		return nodes;	
	}
	
	
	//tangcheng write this for computing the movement of points from 1952 to 2013
	function calProvincesMovementOverYears() {
	    var move_sum1 = 0;
	    var move_sum2 = 0;
	    for (var i = 0; i < Prvname.length; i++) {
	        prvMove[i] = {};
	        prvMove[i].dis1 = 0;
	        prvMove[i].dis2 = 0;
	        prvMove[i].name = Prvname[i];
	        for (var j = 0; j < array.length - 1; j++) {
	            for (var k = 0; k < array[j].newdatapoint.length; k++) {
	                if (Prvname[i] == array[j].newdatapoint[k].name) {
	                    var frontX = array[j].newdatapoint[k].x_guiyi;
	                    var frontY = array[j].newdatapoint[k].y_guiyi;
	                    for (var l = 0; l < array[j + 1].newdatapoint.length; l++) {
	                        if (Prvname[i] == array[j + 1].newdatapoint[l].name) {
	                            var nextX = array[j + 1].newdatapoint[l].x_guiyi;
	                            var nextY = array[j + 1].newdatapoint[l].y_guiyi;
	                            prvMove[i].dis1 += Math.sqrt((frontX - nextX) * (frontX - nextX) + (frontY - nextY) * (frontY - nextY));
	                        }
	                    }
	                }
	            }
	        }
	        for (var j = 0; j < array.length - 1; j++) {
	            for (var k = 0; k < array[j].length; k++) {
	                if (Prvname[i] == array[j][k].name) {
	                    var frontX = array[j][k].x_guiyi;
	                    var frontY = array[j][k].y_guiyi;
	                    for (var l = 0; l < array[j + 1].length; l++) {
	                        if (Prvname[i] == array[j + 1][l].name) {
	                            var nextX = array[j + 1][l].x_guiyi;
	                            var nextY = array[j + 1][l].y_guiyi;
	                            prvMove[i].dis2 += Math.sqrt((frontX - nextX) * (frontX - nextX) + (frontY - nextY) * (frontY - nextY));
	                            break;
	                        }
	                    }
	                }
	            }
	        }
	    }
	    for (var i = 0; i < prvMove.length; i++) {
	        move_sum1 += prvMove[i].dis1 / Prvname.length;
	        move_sum2 += prvMove[i].dis2 / Prvname.length;
	    }
	    prvMove[Prvname.length] = {};
	    prvMove[Prvname.length].name = "汇总后均值";
	    prvMove[Prvname.length].dis1 = move_sum1;
	    prvMove[Prvname.length].dis2 = move_sum2;
	}

	function turn(){
		for(var index=1; index<=array.length; index++){
			var data1 = array[index - 1];
			var data2 = array[index];
			var k = new Array();
			var dis = new Array();
			var dis2 = new Array();
			var count = 0;
			var max = 0;
			var min = Number.POSITIVE_INFINITY;
			for(var i = 0; i < data1.length; i++){
				for(var j = 0; j < data2.length; j++){
					if(data1[i].name == data2[j].name){
						dis2[i] = Math.sqrt((data1[i].x - data2[j].x) * (data1[i].x - data2[j].x) + (data1[i].y - data2[j].y) * (data1[i].y - data2[j].y));
						value = Math.sqrt((data1[i].x - data2[j].x) * (data1[i].x - data2[j].x) + (data1[i].y - data2[j].y) * (data1[i].y - data2[j].y));
						k[i] = Math.abs(180 / Math.PI * Math.atan((data1[i].y - data2[j].y)/(data1[i].x - data2[j].x)));
						break;
					}
				}
			}
			var histogram = d3.layout.histogram()
							  .range([d3.min(k), d3.max(k)])
							  .bins(10)
							  .frequency(true);
							  
			hisData[index] = histogram(k);
			var hist = histogram(k);
			var tick = hist.map(function(d){ return d.x});
			hisData[index].map = tick;
			dev[index] = d3.deviation(k);
		}
		
	}
	
	function turn2(year0, data2){
			var year2 = year0 - 1952;
			var data1 = array[year2 - 1];
			var k = new Array();
			for(var i = 0; i < data2.length; i++){
				for(var j = 0; j < data1.length; j++){
					if(data2[i].name == data1[j].name){
						k[i] = (data1[j].y - data2[i].y)/(data1[j].x - data2[i].x);
						break;
					}
				}
			}
	}
	
	function turn3(){
		var data1 = array[5][3];
		var data2 = array[5][19];
		var data3, data4;
		var k = new Array();
		for(var i = 0; i < array[6].length; i++){
			if(array[6][i].name == data1.name){
				data3 = [array[6][i].x, array[6][i].y];
				k.push((data1.y - array[6][i].y)/(data1.x - array[6][i].x));
			}
			if(array[6][i].name == data2.name){
				data4 = [array[6][i].x, array[6][i].y];
				k.push((data2.y - array[6][i].y)/(data2.x - array[6][i].x));
			}
		}
		
	}
	
	function turn4(){
		var data1 = array[24][3];
		var data2 = array[24][19];
		var data3, data4;
		var k = new Array();
		for(var i = 0; i < array[25].length; i++){
			if(array[25][i].name == data1.name){
				data3 = [array[25][i].x, array[25][i].y];
				k.push((data1.y - array[25][i].y)/(data1.x - array[25][i].x));
			}
			if(array[25][i].name == data2.name){
				data4 = [array[25][i].x, array[25][i].y];
				k.push((data2.y - array[25][i].y)/(data2.x - array[25][i].x));
			}
		}
	}
	function sleep(numberMillis){
		var now = new Date();
		var exitTime = now.getTime() + numberMillis;
		while (true) {
			now = new Date();
		    if (now.getTime() > exitTime)
		    	return;
		}
	}
	function groupAnimate(){
		drawMovementHclusterAnimation($("#hcluster_thresh").val()*10);
	}