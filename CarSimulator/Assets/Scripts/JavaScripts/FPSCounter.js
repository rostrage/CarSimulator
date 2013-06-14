// Attach this to a GUIText to make a frames/second indicator.
//
// It calculates frames/second over each updateInterval,
// so the display does not keep changing wildly.
//
// It is also fairly accurate at very low FPS counts (<10).
// We do this not by simply counting frames per interval, but
// by accumulating FPS for each frame. This way we end up with
// correct overall FPS even if the interval renders something like
// 5.5 frames.
 
var updateInterval = 1.0;
private var accum = 0.0; // FPS accumulated over the interval
private var frames = 0; // Frames drawn over the interval
private var timeleft : float; // Left time for current interval
private var fps = 15.0; // Current FPS
private var lastSample : double;
private var gotIntervals = 0;

function Start()
{
    timeleft = updateInterval;
    lastSample = Time.realtimeSinceStartup;
}

function GetFPS() : float { return fps; }
function HasFPS() : boolean { return gotIntervals > 2; }
 
function Update()
{
    ++frames;
    var newSample = Time.realtimeSinceStartup;
    var deltaTime = newSample - lastSample;
    lastSample = newSample;

    timeleft -= deltaTime;
    accum += 1.0 / deltaTime;
    
    // Interval ended - update GUI text and start new interval
    if( timeleft <= 0.0 )
    {
        // display two fractional digits (f2 format)
        fps = accum/frames;
//        guiText.text = fps.ToString("f2");
        timeleft = updateInterval;
        accum = 0.0;
        frames = 0;
        ++gotIntervals;
    }
}

function OnGUI()
{
	GUI.Box(new Rect(Screen.width-160, 10, 150, 40), fps.ToString("f2") + " | QSetting: " + QualitySettings.currentLevel);
}