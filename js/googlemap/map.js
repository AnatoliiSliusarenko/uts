google.maps.visualRefresh = true;

var map;

function initMap(){
	/*
	var $mapHolder = $("#map-holder");
	google.maps.visualRefresh = true;
	$mapHolder.gMap({
        controls: {
            panControl: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        },
        scrollwheel: true,
    	address: $mapHolder.attr("data-address"),
    	zoom: 1,
    	markers:[{
    			latitude: $mapHolder.attr("data-latitude"),
    			longitude: $mapHolder.attr("data-longitude")
   		}]
    });  */
	
	
	var mapOptions = {
		    zoom: 14,
		    center: new google.maps.LatLng(48.618600, 22.298765),
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  map = new google.maps.Map(document.getElementById('map-holder'),
		      mapOptions);
		  //google.maps.event.trigger(map, 'resize'); 
		  setTimeout(function() {
            google.maps.event.trigger(map,'resize');
        }, 500);
		 
}
google.maps.event.addDomListener(window, 'load', initMap);
