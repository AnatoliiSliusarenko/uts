//------USER FUNCTIONS-----------------------
function getDimensions()
{
	var	divs = new Array();
	
	$('.tile').each(function(){
		
		divs.push({
			id: $(this).attr('id'),
			type: $(this).attr('tile-type')
		});
	});
	
	var data = {
		tiles: divs,
		windowWidth: $("#content-holder").width()
	};
	
	Server.getDimensions(data);
}
//-------------------------------------------

var Server = {
		getDimensions: function(dataSend){
			$.ajax(
				{
					url: "php/getdimensions.php",
					data: dataSend,
					type: "GET"
				}
			).success(function(dataResp){
				debugger;
			});
		}
};



