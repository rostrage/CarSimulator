using UnityEngine;
using System.Collections;

public class PingSensor : CarSensor {

	public float maxRange;
	
	// Update is called once per frame
	void Update () {
		RaycastHit hit;
		Debug.DrawRay(transform.position, transform.forward, Color.green);
		if(Physics.Raycast(transform.position, transform.forward, out hit, maxRange))
		{
			dataThisFrame["Distance"] = hit.distance;
		}
		else
		{
			dataThisFrame["Distance"] = -1;
		}
	}
}
