using UnityEngine;
using System.Collections;

// This class is used to simulate aerodynamic wings or ground effects.
// Add it to a node to have lift or downforce applied at that point.
public class Wing : MonoBehaviour {

	// Cached rigidbody
	Rigidbody body;
	
	// lift coefficient (use negative values for downforce).
	public float liftCoefficient;
	
	// Get rigidbody.
	void Start () {
		Transform trs = transform;
		while (trs != null && trs.rigidbody == null)
			trs = trs.parent;
		if (trs != null)
			body = trs.rigidbody;
	}
	
	// Update is called once per frame
	void Update () {
		if (body != null)
		{
			float lift = liftCoefficient * body.velocity.sqrMagnitude;
			body.AddForceAtPosition(lift * transform.up, transform.position);
		}
	}
}
