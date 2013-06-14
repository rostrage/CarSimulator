using UnityEngine;
using System.Collections;

public class Generate2DReflection : MonoBehaviour
{
	public bool useRealtimeReflection = false;
	
	public int textureSize = 128;
	public LayerMask mask = 1 << 0;
	private Camera cam;
	public RenderTexture rtex = null;
	public Material reflectingMaterial; 
	
	public Texture staticCubemap = null;

	void Start()
	{
		reflectingMaterial.SetTexture("_Cube", staticCubemap);
	}

	void LateUpdate()
	{
		if(!useRealtimeReflection)
			return;
		
		if (Application.platform != RuntimePlatform.WindowsEditor && Application.platform != RuntimePlatform.WindowsPlayer )
			UpdateReflection();
	}
	
	void OnDisable() {
		if(rtex)	
			Destroy(rtex);
			
		reflectingMaterial.SetTexture("_Cube", staticCubemap);
	}
	
	void UpdateReflection()
	{
		if(!rtex)
		{
			rtex = new RenderTexture(textureSize, textureSize, 16);
			rtex.hideFlags = HideFlags.HideAndDontSave;
			rtex.isPowerOfTwo = true;
			rtex.isCubemap = true;
			rtex.useMipMap = false;
			rtex.Create();
			
			reflectingMaterial.SetTexture("_Cube", rtex);
		}

		if(!cam)
		{
			GameObject go = new GameObject("CubemapCamera", typeof(Camera));
			go.hideFlags = HideFlags.HideAndDontSave;
			cam = go.camera;
			// cam.nearClipPlane = 0.05f;
			cam.farClipPlane = 150f;
			cam.enabled = false;
			cam.cullingMask = mask;
		}

		cam.transform.position = Camera.main.transform.position; 
		cam.transform.rotation = Camera.main.transform.rotation;
		
		cam.RenderToCubemap(rtex, 63);
	}
}
