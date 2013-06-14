using UnityEngine;
using System.Collections;

[ExecuteInEditMode]
[AddComponentMenu("Image Effects/Color Correction PCMac")]
public class ColorCorrectionEffectPCMac_26 : ImageEffectBase {
	public Texture  textureRampPC;
	public Texture  textureRampMac;
	public float    rampOffsetR;
	public float    rampOffsetG;
	public float    rampOffsetB;
	
	// Called by camera to apply image effect
	void OnRenderImage (RenderTexture source, RenderTexture destination) {
		bool useMac = false;
		switch (Application.platform)
		{
			case RuntimePlatform.OSXEditor:
			case RuntimePlatform.OSXPlayer:
			case RuntimePlatform.OSXWebPlayer:
			case RuntimePlatform.OSXDashboardPlayer:
				useMac = true;
				break;
			default:
				break;
		}
			
		if (useMac)
			material.SetTexture("_RampTex", textureRampMac);
		else
			material.SetTexture("_RampTex", textureRampPC);
		
		material.SetVector("_RampOffset", new Vector4 (rampOffsetR, rampOffsetG, rampOffsetB, 0));
		Graphics.Blit(  source, destination, material );
	}
}