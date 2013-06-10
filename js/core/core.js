$(document).ready(function(){
	initApp();
});
//-------USER VARIABLES----------------------------------------------------------------
var baseRoute = "index";
//-------GLOBAL VARIABLES--------------------------------------------------------------
var route = null,	
	routes = new Array();
//--------ROUTING----------------------------------------------------------------------
	routes['index'] = {
					   path: "index", 
					   page: "index.html", 
					   setSettings: function(callback){
						   			  $('.sendbutton').bind('click', SendMessage);
						   			  $("#content").append("<script type='text/javascript' src='js/libs/slider/wowslider.js'></script><script type='text/javascript' src='js/libs/slider/script.js'></script><script type='text/javascript' src='js/libs/slider/script2.js'></script>");
						   			  
						   			  Page.initialized = false;
									  Page.callback = callback; 
									  Page.getDimensions();
					  			    }
					   };
	routes['contact'] = {
			           path: "contact", 
			           page: "contact.html", 
			           /*----------this is default setSettings function
					 	  if (callback!=='undefined') 
					 		    callback();*/
			           setSettings: function(callback){
			        	   			  $('.sendbutton').bind('click', SendMessage);
			        	   			  $("#content").append("<script type='text/javascript' src='js/googlemap/map.js'></script>");
					        	      
									  Page.initialized = false;
									  Page.callback = function(){callback();initMap();}; 
									  Page.getDimensions();									  
						            }
	                    };
//-------------INIT--------------------------------------------------------------------
function initApp()
{
	route = getRoute(window.location.hash);
	
	$("#content-holder").fadeOut('slow', loadContent);
	
	$("a.ajax").click(actionClick);
}
//------------ADD CLICK LISTENERS------------------------------------------------------
function actionClick()
{
	$("li").removeClass('active');
	route = getRoute($(this).attr('href'));
	$("#content-holder").fadeOut('slow', loadContent);
	return false;
}
//---------GET ROUTE------------------------------------------------------------------
function getRoute(routeName)
{
	var uri = routeName.replace("#", "");
	
	if (typeof routes[uri] === "object")
	{
		window.location.hash = "#"+uri;
		$("li a.ajax[href='"+window.location.hash+"']").parent().addClass('active');
		return routes[uri];
	}
	
	window.location.hash = "#"+baseRoute;
	$("li a.ajax[href='"+window.location.hash+"']").parent().addClass('active');
	return routes[baseRoute];
}
//----------LOAD CONTENT--------------------------------------------------------------
function loadContent()
{
	var localRoute = route,
		localUrl = "html/"+localRoute.path+"/"+localRoute.page;
	$('#ajax-loader').fadeIn('normal');
	$("#content-holder").empty();
	$("#content-holder").load( localUrl + " #content", afterLoadContent );
}

function afterLoadContent(response, status, xhr)
{
	switch ( status ){
		case "error": console.log( "Error loading page...");
			break;
		case "success": 
			{
				console.log( "Successful loading page...");
				route.setSettings(function(){
					$('#ajax-loader').fadeOut('normal');
					$("#content-holder").fadeIn('slow');
				});
				
			}
			break;		
	}	
}