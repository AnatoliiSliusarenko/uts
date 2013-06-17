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
					 	  if (callback) 
					 		    callback();*/
			           setSettings: function(callback){
			        	   			  $('#sendbutton').bind('click', SendMessage);
			        	   			  $('#resetbutton').bind('click', resetFields);
			        	   			  $("#content").append("<script type='text/javascript' src='js/googlemap/map.js'></script>");
					        	      
			        	   			  if (callback) 
			        	   				  callback();					
									  
									  initMap();
						            }
	                    };
	routes['about'] = {
					   path: "aboutus", 
					   page: "aboutus.html", 
					   setSettings: function(callback){
						   			  Page.initialized = false;
									  Page.callback = function(){callback();initLinks();}; 
									  Page.getDimensions();
					  			    }
			   			};
	routes['partners'] = {
			   path: "partners", 
			   page: "ninja.html", 
			   setSettings: function(callback){
				   					  if (callback) 
				   						  callback();
			  			    }
			   };
//-------------INIT--------------------------------------------------------------------
function initApp()
{
	route = getRoute(window.location.hash);
	
	$("#content-holder").fadeOut('slow', loadContent);
	
	initLinks();
	addMiniMenu();
}

function initLinks()
{
	$("a.ajax").click(actionClick);
	$("li.minimenu a").click(miniMenuClick);
}

function addMiniMenu()
{
	var speed = 0.5;
	
	if ($(window).width()<940)
	{
		if ($('li.minimenu').position().left<0)
		{
			$('li.home').css({position:'absolute'});
			
			TweenMax.to($('li.home'), speed, {
				left: '-250px',
				onComplete: function(){TweenMax.to($('li.minimenu'), speed, {
					left: '222px',
					onComplete: function(){TweenMax.to($('li.home'), speed, {left: '0px'})}
				})} 
			});
		}
	} else
	{
		if ($('li.minimenu').position().left>0)
		{	
			$('li.home').css({position:'absolute'});
			TweenMax.to($('ul.miniGroup'), 0.5, {left:'-250px'});
			TweenMax.to($('li.home'), speed, {
				left: '-250px',
				onComplete: function(){TweenMax.to($('li.minimenu'), speed, {
					left: '-50px',
					onComplete: function(){TweenMax.to($('li.home'), speed, {left: '0px'})}
				})}
			});
		}
	}
	
	
}

//------------ADD LISTENERS------------------------------------------------------
window.onresize = function(){Page.getDimensions();addMiniMenu();}; 

function actionClick()
{
	$("li").removeClass('active');
	route = getRoute($(this).attr('href'));
	$("#content-holder").fadeOut('slow', loadContent);
	return false;
}

function miniMenuClick()
{
	if($('ul.miniGroup').position().left < 0)
	{
		TweenMax.to($('ul.miniGroup'), 0.5, {left:'0px'});
	} else
	{
		TweenMax.to($('ul.miniGroup'), 0.5, {left:'-250px'});
	}
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