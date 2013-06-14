var uvAnimationTileX : int = 4;
var uvAnimationTileY : int = 4;
var framesPerSecond : float = 60.0;

private var initTiling : Vector2 = Vector2.zero;

function Start()
{
	initTiling = renderer.material.GetTextureScale ("_BumpMap");
}

function Update()
{
	var index : int = (Time.time * framesPerSecond);
	index = index % (uvAnimationTileX * uvAnimationTileY);
	
	var size : Vector2 = new Vector2(1.0 / uvAnimationTileX, 1.0 / uvAnimationTileY);
	
	var uIndex : float = index % uvAnimationTileX;
	var vIndex : float = index / uvAnimationTileX;
	
	var offset : Vector2 = new Vector2 (uIndex * size.x, 1.0 - size.y - vIndex * size.y);
	
	size = Vector2.Scale(size, initTiling);
	renderer.material.SetTextureOffset ("_BumpMap", offset);
	renderer.material.SetTextureScale ("_BumpMap", size);
}