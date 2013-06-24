function initMap(){
	var $mapHolder = $("#map-holder");
	$mapHolder.empty();
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
    	markers:[{
    			latitude: $mapHolder.attr("data-latitude"),
    			longitude: $mapHolder.attr("data-longitude")
   		}],
    	zoom: 5,
   		latitude: 52.009612,
   	    longitude: 8.580322
    }); 
	
}

function resizeMap()
{
	TweenMax.to($('#map-holder'), 1, {height:window.innerHeight*0.5+"px"});
}