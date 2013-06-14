var sound : SoundController;
sound = transform.root.GetComponent(SoundController);

private var car : Car;
car = transform.GetComponent(Car);

function OnCollisionEnter(collInfo : Collision)
{
	if(enabled && collInfo.contacts.Length > 0)
	{
		var volumeFactor : float = Mathf.Clamp01(collInfo.relativeVelocity.magnitude * 0.08);
		volumeFactor *= Mathf.Clamp01(0.3 + Mathf.Abs(Vector3.Dot(collInfo.relativeVelocity.normalized, collInfo.contacts[0].normal)));
		volumeFactor = volumeFactor * 0.5 + 0.5;
		sound.Crash(volumeFactor);
	}
}