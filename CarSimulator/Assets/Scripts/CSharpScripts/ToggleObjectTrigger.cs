using UnityEngine;
using System.Collections;

public class ToggleObjectTrigger : MonoBehaviour
{
	void Awake()
	{
		renderer.enabled = false;
	}

	void OnTriggerEnter()
	{
		renderer.enabled = true;
	}
	
	void OnTriggerExit()
	{
		renderer.enabled = false;
	}
}
