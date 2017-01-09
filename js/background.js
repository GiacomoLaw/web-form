MAX_DEPTH = 32;

    var canvas, ctx;
    var stars = new Array(512);

    window.onload = function() {
      canvas = document.getElementById("starfield");
      if( canvas && canvas.getContext ) {
        ctx = canvas.getContext("2d");
        initStars();
        setInterval(loop,33);
       }
    }

    /* Returns a random number in the range [minVal,maxVal] */
    function randomRange(minVal,maxVal) {
      return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
    }

    function initStars() {
      for( var i = 0; i < stars.length; i++ ) {
        stars[i] = {
          x: randomRange(-25,25),
          y: randomRange(-25,25),
          z: randomRange(1,MAX_DEPTH)
         }
      }
    }

    function loop() {
      var halfWidth  = canvas.width / 2;
      var halfHeight = canvas.height / 2;

      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      for( var i = 0; i < stars.length; i++ ) {
        stars[i].z -= 0.2;

        if( stars[i].z <= 0 ) {
          stars[i].x = randomRange(-25,25);
          stars[i].y = randomRange(-25,25);
          stars[i].z = MAX_DEPTH;
        }

        var k  = 128.0 / stars[i].z;
        var px = stars[i].x * k + halfWidth;
        var py = stars[i].y * k + halfHeight;

        if( px >= 0 && px <= 500 && py >= 0 && py <= 400 ) {
          var size = (1 - stars[i].z / 32.0) * 5;
          var shade = parseInt((1 - stars[i].z / 32.0) * 255);
          ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
          ctx.fillRect(px,py,size,size);
        }
      }
    }
