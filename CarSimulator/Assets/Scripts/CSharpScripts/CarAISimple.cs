//this is a non networked AI that can be run without a server - only using this for testing sensors and car

using UnityEngine;
using System.Collections;

public class CarAISimple : MonoBehaviour {
	public Car car;
	public CarDataCollection carData;
	public GameObject targetNode; //used for pathfinding
	void Update() {
		float steer = 0.0f;
		float throttle = 0.0f;
		Vector3 distanceVector = targetNode.transform.position-this.transform.position;
		if(distanceVector.magnitude>1) //if we haven't reached the goal
		{
			Vector3 currentDirection = this.transform.forward;
			float angle = CalculateAngle(distanceVector,currentDirection);
			if(Mathf.Abs(angle)<5) //already going the right direction
			{
				steer = 0.0f;
			}
			else if(angle<0) // we are aiming to the right of the target
			{
				steer = 1.0f;
			}
			else //we are aiming to the left of the target
			{
				steer = -1.0f;
			}
			throttle=1.0f;
		}
		car.ProcessAICommands(throttle, steer);
	}
	
	void OnTriggerEnter(Collider theCollision)
	{
		targetNode = theCollision.GetComponent<RoadNode>().nextNode;
	}
	float CalculateAngle(Vector3 forwardVector, Vector3 targetVector)
	{
		Vector3 rightVector = Vector3.Cross(Vector3.up, forwardVector);
		//this calculates the angel between vectors, but only between 0-180
		float angle = Vector3.Angle(forwardVector, targetVector);
		//calculate whether it is on the left or the right
		int sign = (Vector3.Dot(targetVector, rightVector) > 0.0f) ? 1: -1;
		return sign*angle;
	}
}
