using UnityEngine;
using System.Collections;

// This class simulates an anti-roll bar.
// Anti roll bars transfer suspension compressions forces from one wheel to another.
// This is used to minimize body roll in corners, and improve grip by balancing the wheel loads.
// Typical modern cars have one anti-roll bar per axle.
public class AntiRollBar : MonoBehaviour {

	// The two wheels connected by the anti-roll bar. These should be on the same axle.
	public Wheel wheel1;
	public Wheel wheel2;
	
	// Coeefficient determining how much force is transfered by the bar.
	public float coefficient = 10000;
	
	void FixedUpdate () 
	{
		float force = (wheel1.compression - wheel2.compression) * coefficient;
		wheel1.suspensionForceInput =+ force;
		wheel2.suspensionForceInput =- force;
	}
}
