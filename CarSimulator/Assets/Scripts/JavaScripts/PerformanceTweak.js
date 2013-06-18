var fpsCounter : FPSCounter;
var terrain : Terrain;
var messageTime = 10.0;
var scrollTime = 0.7;

private var messages = new Array();
private var times = new Array();
private var lastTime = 0.0;
private var doneNotes = false;
private var origDetailDist = 0.0;
private var origSplatDist = 0.0;
private var origTreeDist = 0.0;
private var origMaxLOD = 0;
private var softVegetationOff = false;
private var splatmapsOff = false;

private var lowFPS = 15.0;
private var highFPS = 35.0;

private var skipChangesTimeout = 1.0;
private var nextTerrainChange = 0;

function Start()
{
	if( !fpsCounter || !terrain ) {
		Debug.LogWarning("Some of performance objects are not set up");
		enabled = false;
		return;
	}
	
	origDetailDist = terrain.detailObjectDistance;
	origSplatDist = terrain.basemapDistance;
	origTreeDist = terrain.treeDistance;
	origMaxLOD = terrain.heightmapMaximumLOD;
	skipChangesTimeout = 0.0;
	
	var distances : float[] = new float[32];
	distances[16] = Camera.main.farClipPlane;
	Camera.main.layerCullDistances = distances;
}

function Update ()
{
	if( !fpsCounter || !terrain )
		return;
		
	if( !doneNotes && !Application.isEditor )
	{
		var gfxCard = SystemInfo.graphicsDeviceName.ToLower();
		var gfxVendor = SystemInfo.graphicsDeviceVendor.ToLower();
		if( gfxVendor.Contains("intel") )
		{
			// on pre-GMA950, increase fog and reduce far plane by 4x :)
			softVegetationOff = true;
			QualitySettings.softVegetation = false;
			AddMessage( "Note: turning off soft vegetation (Intel video card detected)" );
		}
		else if( gfxVendor == "sis" )
		{
			softVegetationOff = true;
			QualitySettings.softVegetation = false;
			AddMessage( "Note: turning off soft vegetation (SIS video card detected)" );
		}
		else if( gfxCard.Contains("geforce") && (gfxCard.Contains("5200") || gfxCard.Contains("5500") || gfxCard.Contains("6100")) )
		{
			// on slow/old geforce cards, increase fog and reduce far plane by 2x
			ReduceDrawDistance( 2.0, "Note: reducing draw distance (slow GeForce card detected)" );
			
			softVegetationOff = true;
			QualitySettings.softVegetation = false;
			AddMessage( "Note: turning off soft vegetation (slow GeForce card detected)" );
		}
		else
		{
			// on other old cards, increase fog and reduce far plane by 2x
//			if( hwWater == IslandWater.WaterMode.Simple )
//			{
//				ReduceDrawDistance( 2.0, "Note: reducing draw distance (old video card detected)" );
//			}
		}
		
		skipChangesTimeout = 0.0;
		doneNotes = true;
	}
	
	DoTweaks();
	
	UpdateMessages();
}

function ReduceDrawDistance( factor : float, message : String )
{
	AddMessage( message );
//	RenderSettings.fogDensity *= factor;
//	Camera.main.farClipPlane /= factor;
	var distances : float[] = Camera.main.layerCullDistances;
	for(var i : int = 0; i < distances.Length; i++)
		distances[i] /= factor;
	Camera.main.layerCullDistances = distances;
}

function OnDisable()
{
	QualitySettings.softVegetation = true;
}

function DoTweaks()
{
	if( !fpsCounter.HasFPS() )
		return; // enough time did not pass yet to get decent FPS count
	
	var fps : float  = fpsCounter.GetFPS();
	
	// don't do too many adjustments at time... allow one per
	// FPS update interval
	skipChangesTimeout -= Time.deltaTime;
	if( skipChangesTimeout < 0.0 )
		skipChangesTimeout = 0.0;
	if( skipChangesTimeout > 0.0 )
		return;
	
	// terrain tweaks
	if( fps > 25.0 )
	{
		// bump up!
		++nextTerrainChange;
		if( nextTerrainChange >= 4 )
			nextTerrainChange = 0;
			
		if( nextTerrainChange == 0 && terrain.detailObjectDistance < origDetailDist )
		{
			terrain.detailObjectDistance *= 2.0;
			if( !softVegetationOff )
				QualitySettings.softVegetation = true;
			AddMessage( "Framerate ok, increasing vegetation detail" );
			return;
		}
		if( nextTerrainChange == 1 && !splatmapsOff && terrain.basemapDistance < origSplatDist )
		{
			terrain.basemapDistance *= 2.0;
			AddMessage( "Framerate ok, increasing terrain texture detail" );
			return;
		}
		if( nextTerrainChange == 2 && terrain.treeDistance < origTreeDist )
		{
			terrain.treeDistance *= 2.0;
			AddMessage( "Framerate ok, increasing tree draw distance" );
			return;
		}
	}
	if( fps < lowFPS )
	{
		// lower it
		++nextTerrainChange;
		if( nextTerrainChange >= 4 ) {
			nextTerrainChange = 0;
			lowFPS = 10.0; // ok, this won't be fast...
		}
			
		if( nextTerrainChange == 0 && terrain.detailObjectDistance >= origDetailDist / 16.0 ) {
			terrain.detailObjectDistance *= 0.5;
			QualitySettings.softVegetation = false;
			AddMessage( "Framerate low, reducing vegetation detail" );
			return;
		}
		if( nextTerrainChange == 1 && !splatmapsOff && terrain.basemapDistance >= origSplatDist / 16.0 )
		{
			terrain.basemapDistance *= 0.5;
			AddMessage( "Framerate low, reducing terrain texture detail" );
			return;
		}
		if( nextTerrainChange == 2 && terrain.treeDistance >= origTreeDist / 16.0 )
		{
			terrain.treeDistance *= 0.5;
			AddMessage( "Framerate low, reducing tree draw distance" );
			return;
		}
	}
	if(fps < 20)
	{
		if(QualitySettings.currentLevel > QualityLevel.Fastest)
			QualitySettings.DecreaseLevel();
	}
	else if(fps > highFPS)
	{
		if(QualitySettings.currentLevel < QualityLevel.Fantastic)
			QualitySettings.IncreaseLevel();
	}
	
	if(QualitySettings.currentLevel < QualityLevel.Good)
	{
		var sh : Shader = Shader.Find("VertexLit");
		var bumpedObjects : GameObject[] = GameObject.FindGameObjectsWithTag("Bumped");
		for(var i : int = 0; i < bumpedObjects.length; i++)
		{
			bumpedObjects[i].renderer.material.shader = sh;
		}
	}
}

function AddMessage( t : String )
{
	messages.Add( t );
	times.Add( messageTime );
	lastTime = scrollTime;
	skipChangesTimeout = fpsCounter.updateInterval * 3.0;
}

function UpdateMessages()
{
	var dt = Time.deltaTime;
	for( var t in times )
		t -= dt;
	while( times.length > 0 && times[0] < 0.0 ) {
		times.Shift();
		messages.Shift();	
	}
	lastTime -= dt;
	if( lastTime < 0.0 )
		lastTime = 0.0;
}

function OnGUI()
{
	var height = 15;
	var n : int = messages.length;
	var rc = Rect( 2, Screen.height - 2 - n * height + (lastTime/scrollTime*height), 600, 20 );
	for( var i = 0; i < n; ++i )
	{
		var text : String = messages[i];
		var time : float = times[i];
		var alpha = time / messageTime;
		if( alpha < 0.2 )
			GUI.color.a = alpha / 0.2;
		else if( alpha > 0.9 )
			GUI.color.a = 1.0 - (alpha-0.9) / (1-0.9);
		else
			GUI.color.a = 1.0;
		
		GUI.Label( rc, text );
		rc.y += height;
	}
}
