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
    	zoom: 5,
    	markers:[{
    			latitude: $mapHolder.attr("data-latitude"),
    			longitude: $mapHolder.attr("data-longitude")
   		}]
    });  */
	
	
	var mapOptions = {
		    zoom: 8,
		    center: new google.maps.LatLng(-34.397, 150.644),
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  map = new google.maps.Map(document.getElementById('map-holder'),
		      mapOptions);
		  google.maps.event.trigger(map, 'resize'); 
}
google.maps.event.addDomListener(window, 'load', initMap);