$(document).ready(function(){
	initApp();
});

//--------ROUTING
var	routes = new Array();
	routes['index'] = {path: "index", page: "index.html", setSettings: myfunc};
	routes['contact'] = {path: "contact", page: "contact.html", setSettings: myfunc};

//-------GLOBAL VARIABLES
var baseRoute = "index",
	route = null;	

//---------SETTINGS FOR ROUTES
function myfunc()
{
	//alert('Contact settings here!');
}

function initApp()
{
	route = getRoute(window.location.hash);
	
	$("#content-holder").fadeOut('slow', loadContent);
	
	$("a.ajax").click(actionClick);
}
//------------ADD CLICK LISTENERS
function actionClick()
{
	$("li").removeClass('active');
	route = getRoute($(this).attr('href'));
	$("#content-holder").fadeOut('slow', loadContent);
	return false;
}
//---------GET ROUTE
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
//----------LOAD CONTENT
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
				$('#ajax-loader').fadeOut('normal');
				$("#content-holder").fadeIn('slow');
				route.setSettings();
			}
			break;		
	}	
}