//------USER FUNCTIONS-----------------------
window.onresize = getDimensions; 

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

function setPositions(tilesInfo)
{
	for (i=0; i<tilesInfo.length;i++)
	{
		TileLib.updateTile(tilesInfo[i]);
	}
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
				dataResp = $.parseJSON(dataResp);
				setPositions(dataResp);
			});
		}
};

var TileLib = {
		updateTile: function(updateData){
			TweenLite.to($("#"+updateData.id), 1, {
				top: updateData.T.toString()+"px",
				left: updateData.L.toString()+"px",
				width: updateData.W.toString()+"px",
				height: updateData.W.toString()+"px",
				position: "absolute"
			});
		}
};

