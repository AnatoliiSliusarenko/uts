<?php
//------Global variables----------------------------------------------------------------------------------------------------------
$tileWidth = 150;
$spaceWidth = 10;
$mainTypes = array(
	'square' => array('tiles' => 1, 'tileHC' => 1, 'tileVC' => 1, 'template' => array(0 => array(1))),
	'horsquare' => array('tiles' => 2, 'tileHC' => 2, 'tileVC' => 1, 'template' => array(0 => array(1, 1))),
	'bigsquare' => array('tiles' => 4, 'tileHC' => 2, 'tileVC' => 2, 'template' => array(0 => array(1, 1), 1 => array(1,1))),
	'bigsquare-square' => array('tiles' => 5, 'tileHC' => 3,  'tileVC' => 2, 'template' => array(0 => array(1, 1, 1), 1 => array(1, 1, 0)))
);
//------Recieved------------------------------------------------------------------------------------------------------------------
$contentTiles = isset($_GET['tiles']) ? $_GET['tiles'] : array();
$windowWidth = isset($_GET['windowWidth']) ? $_GET['windowWidth'] : 0;
//--------------------------------------------------------------------------------------------------------------------------------

function getMainMatrixProperties(&$tiles, $types)
{
	$needTiles = 0;
	$minColCount = 1;
	
	foreach ($tiles as $i=>$tile)
	{
		if (isset($types[$tile['type']])==false)
		{
			unset($tiles[$i]);
			continue;
		}
		$needTiles += $types[$tile['type']]['tiles'];
		if ($types[$tile['type']]['tileHC']>$minColCount) $minColCount = $types[$tile['type']]['tileHC'];
	}
	
	return array('needTiles' => $needTiles, 'minColCount' => $minColCount);
}


function createMatrix($cc, $rc)
{
	$matrix = array();
	
	for ($i=0; $i<$rc; $i++)
	{
		$matrix[$i] = array();
	
		for ($j=0; $j<$cc; $j++)
		{
			$matrix[$i][$j] = 0;
		}
	}
	
	return $matrix;
}
//----sort tiles array by tile horizontal count
function sortTilesByHC(&$tiles, $types)
{
	$sortTiles = array();
	
	while ($tiles != array())
	{
		$max = $tiles[0];
		$maxInd = 0;
		
		foreach ($tiles as $i=>$tile)
		{
			if ($types[$tile['type']]['tileHC']>$types[$max['type']]['tileHC']) 
			{
				$max =  $tile;
				$maxInd = $i;
			}
		}
		
		$sortTiles[] = $max;
		unset($tiles[$maxInd]);
	}
	
	$tiles = $sortTiles;
}

function locateTiles(&$tiles, &$matrix, $cc, &$rc, $types)
{
	foreach ($tiles as $i=>$tile)
	{
		$tiles[$i] = placeTile($tile, $matrix, $types, $cc, $rc);
	}
}

function placeTile($tile, &$matrix, $types, $cc, &$rc)
{
	$tileType = $tile['type'];
	$tileHC = $types[$tileType]['tileHC'];
	$tileVC = $types[$tileType]['tileVC'];
	$tileTemplate = $types[$tileType]['template'];
	
	//----change matrix row count
	if ($rc < $tileVC)
	{
		for ($i = $rc; $i<$tileVC; $i++)
		{
			$matrix[$i] = array();
			
			for ($j=0; $j<$cc; $j++)
			{
				$matrix[$i][$j] = 0;
			}
		}
		
		$rc = $tileVC;
	}
	
	$bufMatrix = createMatrix($tileHC, $tileVC);
	
	for ($row=0; $row<=($rc-$tileVC);$row++)
	{
		for ($col=0; $col<=($cc-$tileHC);$col++)
		{
			copyMatrix($bufMatrix, 0, 0, $matrix, $col, $row, $tileHC, $tileVC);
			
			if (canPlace($bufMatrix, $tileTemplate, $tileHC, $tileVC))
			{
				copyMatrix($matrix, $col, $row, $tileTemplate, 0, 0, $tileHC, $tileVC);
				
				$tile['x'] = $col;
				$tile['y'] = $row;
				
				return $tile;
			}
		}	
	}
	
	$rc = $rc + 1;
	
	$matrix[$rc-1] = array();
		
	for ($j=0; $j<$cc; $j++)
	{
		$matrix[$rc-1][$j] = 0;
	}
	
	return placeTile($tile, $matrix, $types, $cc, $rc);
}

function canPlace($destMatrix, $templateMatrix, $cc, $rc)
{
	for ($row=0;$row<$rc;$row++)
	{
		for ($col=0;$col<$cc;$col++)
		{
			if (($templateMatrix[$row][$col] == 1) && ($destMatrix[$row][$col] == 1))
				return false;
		}	
	}
	
	return true;
}

function copyMatrix(&$destMatrix, $xStartDest, $yStartDest, $resMatrix, $xStartRes, $yStartRes, $cc, $rc)
{
	for ($row=0;$row<$rc;$row++)
	{
		for ($col=0;$col<$cc;$col++)
		{
			$destMatrix[$yStartDest+$row][$xStartDest+$col] = $resMatrix[$yStartRes+$row][$xStartRes+$col];
		}	
	}
}
//--------------------------------------------------------------------------------------------------------------------------

$mainMatrixProperties = getMainMatrixProperties($contentTiles, $mainTypes);

$colCount = floor(($windowWidth+$spaceWidth)/($tileWidth+$spaceWidth));
if ($colCount < $mainMatrixProperties['minColCount']) 
	$colCount = $mainMatrixProperties['minColCount'];
$rowCount = ceil($mainMatrixProperties['needTiles']/$colCount);

$mainMatrix = createMatrix($colCount, $rowCount);

sortTilesByHC($contentTiles, $mainTypes);

locateTiles($contentTiles, $mainMatrix, $colCount, $rowCount, $mainTypes);

$response['W'] = $tileWidth;
$response['S'] = $spaceWidth;
foreach ($contentTiles as $i=>$tile)
{
	$contentTiles[$i]['L'] = ($tile['x'])*($tileWidth+$spaceWidth);
	$contentTiles[$i]['T'] = ($tile['y'])*($tileWidth+$spaceWidth);
	
	unset($contentTiles[$i]['type']);
	unset($contentTiles[$i]['x']);
	unset($contentTiles[$i]['y']);
}

$response['tiles'] = $contentTiles;

print json_encode($response);

?>