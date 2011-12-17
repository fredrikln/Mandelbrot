;(function(){
	var canvas = document.getElementById("mandel");
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	canvas.width = width;
	canvas.height = height;
	
	var ctx = canvas.getContext('2d');
	
	var imgData = ctx.getImageData( 0, 0, width, height );
	
	var maxIterations = 4096;
	var maxIterationsSqrt = Math.sqrt(maxIterations);
	
	var minRe = -2.0 * (width/height) / (4/3);
	var maxRe = 1 * (width/height) / (4/3);
	var minIm = -1.2;
	var maxIm = 1.2;
 	
	var reFactor = (maxRe-minRe)/(imgData.width);
	var imFactor = (maxIm-minIm)/(imgData.height);
	
		for( var i = 0; i < width; i++  ) {
		var c_re = minRe + i*reFactor;
		
		
		for( var j = 0; j < height; j++ )
		{
			var c_im = maxIm - j*imFactor;
			
			var z_re = c_re;
			var z_im = c_im;
			
			var isInside = true;
			
			for( var k = 0; k < maxIterations; ++k )
			{
				z_re2 = z_re * z_re;
				z_im2 = z_im * z_im;
				
				if( z_re2 + z_im2  > 4 )
				{
					isInside = false;
					drawPixel( imgData, i, j, k/maxIterations*maxIterationsSqrt*255, k%255 );
					break;
				}

				z_im = 2 * z_re * z_im + c_im;
				z_re = z_re2 - z_im2 + c_re;
			}
			
			if( isInside === true )
			{
				drawPixel( imgData, i, j );
			}
		}
	}
	
	ctx.putImageData( imgData, 0, 0 );
})();

function drawPixel( imgd, x, y, r, g, b ) {
	var idx = ( x + ( y * imgd.width ) ) * 4;
	
	imgd.data[ idx+0 ] = (r !== undefined ? r : 0);
	imgd.data[ idx+1 ] = (g !== undefined ? g : 0);
	imgd.data[ idx+2 ] = (b !== undefined ? b : 0);
	imgd.data[ idx+3 ] = 255;
}