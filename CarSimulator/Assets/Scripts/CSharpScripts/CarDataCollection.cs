using UnityEngine;
using System.Collections;
using LitJson;
public class CarDataCollection : MonoBehaviour {
	public JsonData sensorData = new JsonData();
	public CarSensor[] dataCollectors;	
	void Update()
	{
		foreach(CarSensor currentSensor in dataCollectors)
		{
			sensorData[currentSensor.sensorName] = currentSensor.dataThisFrame;
		}
	}
}
