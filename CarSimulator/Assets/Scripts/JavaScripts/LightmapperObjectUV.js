@script ExecuteInEditMode()

var fudgeScale : float = 1.0;
var theObject : Transform;
var terrainSize : Vector3 = new Vector3 (1450, 1450, -1450); // inverse the z here

function Start()
{
	if(!theObject)
		theObject = transform;
}

function OnRenderObject()
{
	var inverseScale : Vector3 = new Vector3(1.0 / terrainSize.x, 1.0 / terrainSize.y, 1.0 / terrainSize.z);
	var uvMat : Matrix4x4 = Matrix4x4.TRS(Vector3.Scale (new Vector3 (theObject.position.x, theObject.position.z, theObject.position.y), inverseScale), Quaternion.Euler(90,0,0) * Quaternion.Inverse(theObject.rotation), inverseScale * fudgeScale); 
	Shader.SetGlobalMatrix("_LightmapMatrix", uvMat);
}
