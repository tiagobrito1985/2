// Phonegap Barcode scanner
// Author: Umer Pasha
// Date: 8/26/14

var resultDiv;



        // Wait for PhoneGap to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // PhoneGap is ready
        //
        function onDeviceReady() {
			document.querySelector("#startScan").addEventListener("touchend", startScan, false);
			document.querySelector("#startCam").addEventListener("touchend", startCam, false);
			document.querySelector("#startVCam").addEventListener("touchend", startVCam, false);
			document.querySelector("#startGLoc").addEventListener("touchend", startGLoc, false);
			resultDiv = document.querySelector("#results");
			GLocDiv = document.querySelector("#GLoc");


        }

		
function startScan() {

	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			resultDiv.innerHTML = s;
		}, 
		function (error) {
			alert("Scanning failed: " + error);
		}
	);
	
	
}

function startGLoc() {

	navigator.geolocation.getCurrentPosition(
		function (position) {
			var s = "<a href='geo:" + position.coords.latitude + "," + position.coords.longitude + "'>Open Map</a><br />" +
							"Latitude: "           + position.coords.latitude              + "<br />" +
                            "Longitude: "          + position.coords.longitude             + "<br />" +
                            "Altitude: "           + position.coords.altitude              + "<br />" +
                            "Accuracy: "           + position.coords.accuracy              + "<br />" +
                            "Altitude Accuracy: "  + position.coords.altitudeAccuracy      + "<br />" +
                            "Heading: "            + position.coords.heading               + "<br />" +
                            "Speed: "              + position.coords.speed                 + "<br />" +
                            "Timestamp: "          + position.timestamp                    + "<br />";
			GLocDiv.innerHTML = s;
		}, 
		function (error) {
			alert("GPS failed: " + error);
		}
	);
	
	
}

function startCam() {

	
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto,
                                        function(message) { alert('get picture failed'); },
                                        { quality: 50, 
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.CAMERA,
										MediaType: Camera.MediaType.ALLMEDIA}
                                        );
	
	
}


function startVCam() {

	
            // Retrieve image file location from specified source
			navigator.device.capture.captureVideo(uploadPhoto, function(message) { alert('get video failed'); }, {limit: 2});
}


        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://some.server.com/upload.php", win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " = error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
