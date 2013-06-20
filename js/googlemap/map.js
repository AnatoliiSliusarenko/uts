function initMap(){
	resizeMap();
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
    	address: $mapHolder.attr("data-address"),
    	zoom: 5,
    	markers:[{
    			latitude: $mapHolder.attr("data-latitude"),
    			longitude: $mapHolder.attr("data-longitude")
   		}]
    });  
}

function resizeMap()
{
	TweenMax.to($('#map-holder'), 1, {height:window.innerHeight*0.4+"px"});
}