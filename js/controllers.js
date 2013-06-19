'use strict';

/* Controllers */
romApp.controller('romController', function($scope, romFactory){
        $scope.roms = [];

        $scope.backgroundColor = "#000000";
        $scope.color1 = "#FFFFFF";
        $scope.color2 = "#5A5A5A";
        $scope.color3 = "#3A3A3A";
        $scope.dim = [1,2,3,4,5,6,7,8,9,10];
        $scope.size = 1;

        init();

        function init(){
          $scope.roms = romFactory.getRoms();
        }

        $scope.process = function(){
          var xhr = new XMLHttpRequest;
          xhr.open("GET", "roms/7800/" + $scope.rom.name + ".bin" , true);
          xhr.responseType = "arraybuffer";

          xhr.onload = function () {
             var romData = new Uint8Array(xhr.response);
             readRom(romData);
          };

          xhr.send();
        }


        function b(s) {
              s = s.toString(2);
              while ((s.length % 8) !== 0) {
                  s = '0' + s;
              }
              return s;
          }

        function readRom(rom){
            var data = 0,
              romImage = document.getElementById("rom"),
              canvas = document.createElement("canvas"),
              ctx = canvas.getContext("2d"),
              pix = $scope.size,
              xDim = 1023,
              yDim = 1,
              x = 0,
              y = parseInt((rom.length/xDim)*4);

            canvas.width = xDim*pix;
            canvas.height = y*pix;

            var len = rom.length,
              i = 0,
              yy = 0;

            for(i = 0; i < len; i++){
              data = rom[i].toString(2);
              data = b(data);

              var xx = x;

              // 160a mode
              for(var d=0; d < data.length; d+=2){

                ctx.fillStyle = $scope.backgroundColor;

                if(data[d] ==1 && data[d+1] ==1){
                  ctx.fillStyle = $scope.color3;
                }else if(data[d] ==1){
                  ctx.fillStyle = $scope.color1;
                }else if(data[d+1] ==1){
                  ctx.fillStyle = $scope.color2;
                }

                ctx.fillRect(xx*pix,(y+yy)*pix,pix,pix);

                xx++;

              }
              yy--;

              if(yy <= 0){
                yy = yDim;
                x+=4;
                if(x > xDim){
                  y -= yDim;
                  x = 0;
                }
              }
            }

            var strDataURI = canvas.toDataURL("image/png;base64");
            romImage.src = strDataURI;
          }
    });