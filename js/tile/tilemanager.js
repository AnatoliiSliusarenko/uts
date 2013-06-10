//----------CORE-----------------------------
var Page = {
		initialized: false,
		callback: null,
		tilesProcessed: -1,
		fireCallback: function(){
			Page.tilesProcessed--;
			if ((Page.tilesProcessed == 0) && (Page.callback != null))
			{
				Page.callback();
				Page.callback = null;
			}
		},
		getDimensions: function()
		{
			var tiles = Page.getTiles();
			
			Server.getDimensions(tiles);
		},
		getTiles: function(){
			var	divs = new Array();
			
			$('.tile').each(function(){
				
				divs.push({
					id: $(this).attr('id'),
					type: $(this).attr('tile-type')
				});
			});
			
			var dataTiles = {
				tiles: divs,
				windowWidth: $("#content-holder").width()
			};
			
			return dataTiles;
		},
		setPositions: function(tilesInfo){
			Page.tilesProcessed = tilesInfo.tiles.length;
			
			if (Page.initialized)
			{
				for (i=0; i<tilesInfo.tiles.length;i++)
				{
					TileLib.updateTile(tilesInfo.tiles[i].id, tilesInfo.tiles[i].L, tilesInfo.tiles[i].T, tilesInfo.W, tilesInfo.S, 1);
				}
			}else
			{
				for (i=0; i<tilesInfo.tiles.length;i++)
				{
					TileLib.initTile(tilesInfo.tiles[i].id, tilesInfo.tiles[i].L, tilesInfo.tiles[i].T, tilesInfo.W, tilesInfo.S);
				}
				Page.initialized = true;
			}
			
		}
}


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
				Page.setPositions(dataResp);
			});
		}
};

var TileLib = {
		initTile: function(id, L, T, w, s){
			if ($("#"+id).hasClass('container') == false)
			{
				TweenMax.to($("#"+id), 0, {
					top: T+"px",
					left: L+"px",
					width: w+"px",
					height: w+"px",
					position: "absolute",
					onComplete: Page.fireCallback
				});
			} else
			{
				$("#"+id).find(".container-item").each(function(){
					var itemInfo = tcitems[$(this).attr('item-type')],
						xItem = $(this).attr('item-x'),
						yItem = $(this).attr('item-y'),
						plusLeft = $(this).hasClass('plus-left'), 
						topItem, leftItem, widthItem, heightItem;
						
					widthItem = ((w+s)*itemInfo.cc-s);
					heightItem = ((w+s)*itemInfo.rc-s);
					
					topItem = T+yItem*(w+s);
					leftItem = L+xItem*(w+s);
					
					if (plusLeft)
					{
						leftItem -= s-1;
						widthItem += s-1; 
					}
					
					TweenMax.to($(this), 0, {
						width: widthItem+"px",
						height: heightItem+"px",
						top: topItem+"px",
						left: leftItem+"px",
						position: "absolute"
					});
					
				});
				
				Page.fireCallback();
			}			
		},
		updateTile: function(id, L, T, w, s, speed){
			if ($("#"+id).hasClass('container') == false)
			{
				TweenMax.to($("#"+id), speed, {
					top: T+"px",
					left: L+"px"
				});
			} else
			{
				$("#"+id).find(".container-item").each(function(){
					var	xItem = $(this).attr('item-x'),
						yItem = $(this).attr('item-y'),
						plusLeft = $(this).hasClass('plus-left'),
						topItem, leftItem;
						
					
					topItem = T+yItem*(w+s);
					leftItem = L+xItem*(w+s);
					

					if (plusLeft)
					{
						leftItem -= s; 
					}
					
					TweenMax.to($(this), speed, {
						top: topItem+"px",
						left: leftItem+"px"
					});
				});
			}
		}
};

//------set listeners------------------------
window.onresize = Page.getDimensions; 
//------tile container items-----------------
var tcitems = {
	"c2r1": {cc: 2, rc:1},
	"c1r1": {cc: 1, rc:1},
	"c2r2": {cc: 2, rc:2},
	"c1r2": {cc: 1, rc:2},
	"c3r2": {cc: 3, rc:2}
};
