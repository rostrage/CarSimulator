/////////
// SoundController.js
//
// This script controls the sound for a car. It automatically creates the needed AudioSources, and ensures
// that only a certain number of sound are played at any time, by limiting the number of OneShot
// audio clip that can be played at any time. This is to ensure that it does not play more sounds than Unity
// can handle.
// The script handles the sound for the engine, both idle and running, gearshifts, skidding and crashing.
// PlayOneShot is used for the non-looping sounds are needed. A separate AudioSource is create for the OneShot
// AudioClips, since the should not be affected by the pitch-changes applied to other AudioSources.

private var car : Car;

var D : AudioClip = null;
var DVolume : float = 1.0;
var E : AudioClip = null;
var EVolume : float = 1.0;
var F : AudioClip = null;
var FVolume : float = 1.0;
var K : AudioClip = null;
var KVolume : float = 1.0;
var L : AudioClip = null;
var LVolume : float = 1.0;

var wind : AudioClip = null;
var windVolume : float = 1.0;
var tunnelSound : AudioClip = null;
var tunnelVolume : float = 1.0;

var crashLowSpeedSound : AudioClip = null;
var crashLowVolume : float = 1.0;
var crashHighSpeedSound : AudioClip = null;
var crashHighVolume : float = 1.0;
var skidSound : AudioClip = null;

var BackgroundMusic : AudioClip = null;
var BackgroundMusicVolume : float = 0.6;

private var DAudio : AudioSource = null;
private var EAudio : AudioSource = null;
private var FAudio : AudioSource = null;
private var KAudio : AudioSource = null;
private var LAudio : AudioSource = null;

private var tunnelAudio : AudioSource = null;
private var windAudio : AudioSource = null;
private var skidAudio : AudioSource = null;
private var carAudio : AudioSource = null;

private var backgroundMusic : AudioSource = null;

private var carMaxSpeed : float = 55.0;
private var gearShiftTime : float = 0.1;
private var shiftingGear : boolean = false;
private var gearShiftsStarted : int = 0;
private var crashesStarted : int = 0;
private var crashTime : float = 0.2;
private var oneShotLimit : int = 8;

private var idleFadeStartSpeed : float = 3.0;
private var idleFadeStopSpeed : float = 10.0;
private var idleFadeSpeedDiff : float = 7.0;
private var speedFadeStartSpeed : float = 0.0;
private var speedFadeStopSpeed : float = 8.0;
private var speedFadeSpeedDiff : float = 8.0;

private var soundsSet : boolean = false;

private var inputFactor : float = 0;
private var gear : int = 0;
private var topGear : int = 6;

private var idlePitch : float = 0.7;
private var startPitch : float = 0.85;
private var lowPitch : float = 1.17;
private var medPitch : float = 1.25;
private var highPitchFirst : float = 1.65;
private var highPitchSecond : float = 1.76;
private var highPitchThird : float = 1.80;
private var highPitchFourth : float = 1.86;
private var shiftPitch : float = 1.44;

private var prevPitchFactor : float = 0;

// Create the needed AudioSources
function Awake()
{
	car = transform.GetComponent(Car);
	
	DVolume *= 0.4;
	EVolume *= 0.4;
	FVolume *= 0.4;
	KVolume *= 0.7;
	LVolume *= 0.4;
	windVolume *= 0.4;
	
	DAudio = gameObject.AddComponent(AudioSource);
	DAudio.loop = true;
	DAudio.clip = D;
	DAudio.volume = DVolume;
	DAudio.Play();

	EAudio = gameObject.AddComponent(AudioSource);
	EAudio.loop = true;
	EAudio.clip = E;
	EAudio.volume = EVolume;
	EAudio.Play();
	
	FAudio = gameObject.AddComponent(AudioSource);
	FAudio.loop = true;
	FAudio.clip = F;
	FAudio.volume = FVolume;
	FAudio.Play();
	
	KAudio = gameObject.AddComponent(AudioSource);
	KAudio.loop = true;
	KAudio.clip = K;
	KAudio.volume = KVolume;
	KAudio.Play();
	
	LAudio = gameObject.AddComponent(AudioSource);
	LAudio.loop = true;
	LAudio.clip = L;
	LAudio.volume = LVolume;
	LAudio.Play();
	
	windAudio = gameObject.AddComponent(AudioSource);
	windAudio.loop = true;
	windAudio.clip = wind;
	windAudio.volume = windVolume;
	windAudio.Play();
	
	tunnelAudio = gameObject.AddComponent(AudioSource);
	tunnelAudio.loop = true;
	tunnelAudio.clip = tunnelSound;
//	tunnelAudio.maxVolume = tunnelVolume;
	tunnelAudio.volume = tunnelVolume;
	
	skidAudio = gameObject.AddComponent(AudioSource);
	skidAudio.loop = true;
	skidAudio.clip = skidSound;
	skidAudio.volume = 0.0;
	skidAudio.Play();
	
	carAudio = gameObject.AddComponent(AudioSource);
	carAudio.loop = false;
	carAudio.playOnAwake = false;
	carAudio.Stop();
	
	crashTime = Mathf.Max(crashLowSpeedSound.length, crashHighSpeedSound.length);
	soundsSet = false;
	
	idleFadeSpeedDiff = idleFadeStopSpeed - idleFadeStartSpeed;
	speedFadeSpeedDiff = speedFadeStopSpeed - speedFadeStartSpeed;
	
	backgroundMusic = gameObject.AddComponent(AudioSource);
	backgroundMusic.loop = true;
	backgroundMusic.clip = BackgroundMusic;
//	backgroundMusic.maxVolume = BackgroundMusicVolume;
//	backgroundMusic.minVolume = BackgroundMusicVolume;
	backgroundMusic.volume = BackgroundMusicVolume;
	backgroundMusic.Play();
}

function Update()
{
	var carSpeed : float = car.rigidbody.velocity.magnitude;
	var carSpeedFactor : float = Mathf.Clamp01(carSpeed / car.topSpeed);
	
	KAudio.volume = Mathf.Lerp(0, KVolume, carSpeedFactor);
	windAudio.volume = Mathf.Lerp(0, windVolume, carSpeedFactor * 2);
	
	if(shiftingGear)
		return;
	
	var pitchFactor : float = Sinerp(0, topGear, carSpeedFactor);
	var newGear : int = pitchFactor;
	
	pitchFactor -= newGear;
	var throttleFactor : float = pitchFactor;
	pitchFactor *= 0.3;
	pitchFactor += throttleFactor * (0.7) * Mathf.Clamp01(car.throttle * 2);
	
	if(newGear != gear)
	{
		if(newGear > gear)
			GearShift(prevPitchFactor, pitchFactor, gear, true);
		else
			GearShift(prevPitchFactor, pitchFactor, gear, false);
		gear = newGear;
	}
	else
	{
		var newPitch : float = 0;
		if(gear == 0)
			newPitch = Mathf.Lerp(idlePitch, highPitchFirst, pitchFactor);
		else
		if(gear == 1)
			newPitch = Mathf.Lerp(startPitch, highPitchSecond, pitchFactor);
		else
		if(gear == 2)
			newPitch = Mathf.Lerp(lowPitch, highPitchThird, pitchFactor);
		else
			newPitch = Mathf.Lerp(medPitch, highPitchFourth, pitchFactor);
		SetPitch(newPitch);
		SetVolume(newPitch);
	}
	prevPitchFactor = pitchFactor;
}

function Coserp(start : float, end : float, value : float) : float
{
	return Mathf.Lerp(start, end, 1.0 - Mathf.Cos(value * Mathf.PI * 0.5));
}

function Sinerp(start : float, end : float, value : float) : float
{
    return Mathf.Lerp(start, end, Mathf.Sin(value * Mathf.PI * 0.5));
}

function SetPitch(pitch : float)
{
	DAudio.pitch = pitch;
	EAudio.pitch = pitch;
	FAudio.pitch = pitch;
	LAudio.pitch = pitch;
	tunnelAudio.pitch = pitch;
}

function SetVolume(pitch : float)
{
	var pitchFactor : float = Mathf.Lerp(0, 1, (pitch - startPitch) / (highPitchSecond - startPitch));
	DAudio.volume = Mathf.Lerp(0, DVolume, pitchFactor);
	var fVolume : float = Mathf.Lerp(FVolume * 0.80, FVolume, pitchFactor);
	FAudio.volume = fVolume * 0.7 + fVolume * 0.3 * Mathf.Clamp01(car.throttle);
	var eVolume : float = Mathf.Lerp(EVolume * 0.89, EVolume, pitchFactor);
	EAudio.volume = eVolume * 0.8 + eVolume * 0.2 * Mathf.Clamp01(car.throttle);
}

function GearShift(oldPitchFactor : float, newPitchFactor : float, gear : int, shiftUp : boolean)
{
	shiftingGear = true;
	
	var timer : float = 0;
	var pitchFactor : float	= 0;
	var newPitch : float = 0;
	
	if(shiftUp)
	{
		while(timer < gearShiftTime)
		{
			pitchFactor = Mathf.Lerp(oldPitchFactor, 0, timer / gearShiftTime);
			if(gear == 0)
				newPitch = Mathf.Lerp(lowPitch, highPitchFirst, pitchFactor);
			else
				newPitch = Mathf.Lerp(lowPitch, highPitchSecond, pitchFactor);
			SetPitch(newPitch);
			SetVolume(newPitch);
			timer += Time.deltaTime;
			yield;
		}
	}
	else
	{
		while(timer < gearShiftTime)
		{
			pitchFactor = Mathf.Lerp(0, 1, timer / gearShiftTime);
			newPitch = Mathf.Lerp(lowPitch, shiftPitch, pitchFactor);
			SetPitch(newPitch);
			SetVolume(newPitch);
			timer += Time.deltaTime;
			yield;
		}
	}
		
	shiftingGear = false;
}

function Skid(play : boolean, volumeFactor : float)
{
	if(!skidAudio)
		return;
	if(play)
	{
		skidAudio.volume = Mathf.Clamp01(volumeFactor + 0.3);
	}
	else
		skidAudio.volume = 0.0;
}

// Checks if the max amount of crash sounds has been started, and
// if the max amount of total one shot sounds has been started.
function Crash(volumeFactor : float)
{
	if(crashesStarted > 3 || OneShotLimitReached())
		return;
	if(volumeFactor > 0.9)
		carAudio.PlayOneShot(crashHighSpeedSound, Mathf.Clamp01((0.5 + volumeFactor * 0.5) * crashHighVolume));
	carAudio.PlayOneShot(crashLowSpeedSound, Mathf.Clamp01(volumeFactor * crashLowVolume));
	crashesStarted++;
	
	yield new WaitForSeconds(crashTime);
	
	crashesStarted--;
}

// A function for testing if the maximum amount of OneShot AudioClips
// has been started.
function OneShotLimitReached()
{
	return (crashesStarted + gearShiftsStarted) > oneShotLimit;
}

function OnTriggerEnter(coll : Collider)
{
	var st : SoundToggler = coll.transform.GetComponent(SoundToggler);
	if(st)
		ControlSound(true, st.fadeTime);
}

function OnTriggerExit(coll : Collider)
{
	var st : SoundToggler = coll.transform.GetComponent(SoundToggler);
	if(st)
		ControlSound(false, st.fadeTime);
}

function ControlSound(play : boolean, fadeTime : float)
{
	var timer : float = 0;
	if(play && !tunnelAudio.isPlaying)
	{
		tunnelAudio.volume = 0;
		tunnelAudio.Play();
		while(timer < fadeTime)
		{
			tunnelAudio.volume = Mathf.Lerp(0, tunnelVolume, timer / fadeTime);
			timer += Time.deltaTime;
			yield;
		}
	}
	else if(!play && tunnelAudio.isPlaying)
	{
		while(timer < fadeTime)
		{
			tunnelAudio.volume = Mathf.Lerp(0, tunnelVolume, timer / fadeTime);
			timer += Time.deltaTime;
			yield;
		}
		tunnelAudio.Stop();
	}
}
