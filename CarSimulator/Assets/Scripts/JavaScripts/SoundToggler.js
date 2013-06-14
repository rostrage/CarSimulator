var fadeTime : float = 1.0; 
private var soundScript : SoundController; 

function Start () { 
   soundScript = FindObjectOfType(SoundController); 
} 

function OnTriggerEnter () { 
   soundScript.ControlSound(true, fadeTime); 
} 

function OnTriggerExit () { 
   soundScript.ControlSound(false, fadeTime); 
}