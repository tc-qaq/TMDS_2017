
	function mds(matrix){		
		var M = numeric.mul(-0.5, numeric.pow(matrix, 2));
		var rowMeans = mean(M);
		var colMeans = mean(numeric.transpose(M));
		var totalMeans = mean(rowMeans);
		
		for( var i = 0; i < M.length; i++){
			for( var j = 0; j < M[0].length; j++){
				M[i][j] += totalMeans - rowMeans[i] - colMeans[j];
			}
		}
		
		var ret = numeric.svd(M);
		var eigenValues = numeric.sqrt(ret.S);
		
		return ret.U.map(function(row){
			return numeric.mul(row, eigenValues).splice(0, 2);
		});
		
	}
	function mean(a){ 
		return numeric.div(numeric.add.apply(null, a), a.length); 
	}