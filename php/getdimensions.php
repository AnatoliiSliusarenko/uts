<?php
//------Global variables----------------------------------------------------------------------------------------------------------
$tileWidth = 128;
$spaceWidth = 10;
$types = array(
	'round' => array('tiles' => 1, 'tileHC' => 1),
	'horsquare' => array('tiles' => 2, 'tileHC' => 2),
	'bigsquare' => array('tiles' => 4, 'tileHC' => 4),
	'square' => array('tiles' => 1, 'tileHC' => 1),
	'bigsquare-square' => array('tiles' => 5, 'tileHC' => 5)
);
//------Recieved------------------------------------------------------------------------------------------------------------------
$tiles = isset($_GET['tiles']) ? $_GET['tiles'] : array();
$windowWidth = isset($_GET['windowWidth']) ? $_GET['windowWidth'] : 0;
//--------------------------------------------------------------------------------------------------------------------------------

function getMatrixProperties(&$_tiles, $_types)
{
	$needTiles = 0;
	$minColCount = 1;
	
	foreach ($_tiles as $i=>$tile)
	{
		$_tiles[$i]['located'] = false;
		$needTiles += $_types[$tile['type']]['tiles'];
		if ($_types[$tile['type']]['tileHC']>$minColCount) $minColCount = $_types[$tile['type']]['tileHC'];
	}
	
	return array('needTiles' => $needTiles, 'minColCount' => $minColCount);
}


function createMatrix($_windowW, $_tileW, $_spaceW, &$_matrixProperties)
{
	$colCount = floor(($_windowW+$_spaceW)/($_tileW+$_spaceW));
	
	if ($colCount < $_matrixProperties['minColCount']) $colCount = $_matrixProperties['minColCount'];

	$rowCount = ceil($_matrixProperties['needTiles']/$colCount);
	
	$_matrix = array();
	
	for ($i=0; $i<$rowCount; $i++)
	{
		$_matrix[$i] = array();
	
		for ($j=0; $j<$colCount; $j++)
		{
			$_matrix[$i][$j] = 0;
		}
	}
	
	$_matrixProperties['colCount'] = $colCount;
	$_matrixProperties['rowCount'] = $rowCount;
	return $_matrix;
}

function sortTilesByHorC(&$_tiles, $_types)
{
	$sortTiles = array();
	
	while ($_tiles != array())
	{
		$max = $_tiles[0];
		$maxInd = 0;
		
		foreach ($_tiles as $i=>$tile)
		{
			if ($_types[$tile['type']]['tileHC']>$_types[$max['type']]['tileHC']) 
			{
				$max =  $tile;
				$maxInd = $i;
			}
		}
		
		$sortTiles[] = $max;
		unset($_tiles[$maxInd]);
	}
	
	$_tiles = $sortTiles;
}

function locateTiles(&$_tiles, &$_matrix, $_matrixProperties, $_types)
{
	$colCount = $_matrixProperties['colCount'];
	$rowCount = $_matrixProperties['rowCount'];
	
	foreach ($_tiles as $i=>$tile)
	{
		$_tiles[$i] = placeTile($tile, $_matrix, $_types, $colCount, $rowCount);
	}
}

function placeTile($_tile, &$_matrix, $_types, $cc, $rc)
{
	$tileType = $_tile['type'];
	$tileHC = $_types[$tileType]['tileHC'];
	
	
	
	
	
	
	$_tile['located'] = true;
	return $_tile;
}
//--------------------------------------------------------------------------------------------------------------------------

$matrixProperties = getMatrixProperties($tiles, $types);
$matrix = createMatrix($windowWidth, $tileWidth, $spaceWidth, $matrixProperties);
sortTilesByHorC($tiles, $types);
locateTiles($tiles, $matrix, $matrixProperties, $types);
die(var_dump($tiles));
var_dump($matrix);

?>