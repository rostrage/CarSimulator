using UnityEngine;

// This class implements simple ghosting type Motion Blur.
// If Extra Blur is selected, the scene will allways be a little blurred,
// as it is scaled to a smaller resolution.
// The effect works by accumulating the previous frames in an accumulation
// texture.
[ExecuteInEditMode]
[AddComponentMenu("Image Effects/Motion Blur Edge")]
public class MotionBlurEdge : ImageEffectBase
{
	public float blurAmount = 0.8f;
	public float endRadius = 0.5f;
	public float startRadius = 0.2f;

	public float minSpeed = 10f;
	public float maxSpeed = 60f;
	
	public float centerOffsetX = 0;
	public float centerOffsetY = 0;

	public float transitionCurve = 1f;
	public bool debugView = false;
			
	float speedFactor = 0f;
	float speed = 0f;
	Vector3 lastPos = Vector3.zero;
	Transform myTransform = null;
	
	private RenderTexture accumTexture;
	
	protected new void OnDisable()
	{
		base.OnDisable();
		DestroyImmediate(accumTexture);
	}
	
	void Awake()
	{
		myTransform = transform;
	}
	
	void FixedUpdate()
	{
		if (maxSpeed < 0)
			maxSpeed = 0;
		minSpeed = Mathf.Clamp( minSpeed, 0, maxSpeed );
		speed = Mathf.Abs( Vector3.Dot( myTransform.forward,  myTransform.position - lastPos)) / Time.deltaTime;
		lastPos = myTransform.position;
		speedFactor = Mathf.Clamp01(Mathf.InverseLerp( minSpeed, maxSpeed, speed));
	}
	
	// Called by camera to apply image effect
	void OnRenderImage (RenderTexture source, RenderTexture destination)
	{
		// Create the accumulation texture
		if (accumTexture == null || accumTexture.width != source.width || accumTexture.height != source.height)
		{
			if (accumTexture != null )
				DestroyImmediate(accumTexture);
			accumTexture = new RenderTexture(source.width, source.height, 0);
			accumTexture.hideFlags = HideFlags.HideAndDontSave;
			ImageEffects.Blit( source, accumTexture );
		}

		if (this.debugView)			
		{
			//ImageEffects.Blit( source, accumTexture );
			Shader.EnableKeyword( "MOTIONBLUREDGE_DEBUG" );
			Shader.DisableKeyword( "MOTIONBLUREDGE_NORMAL" );
		}
		else
		{
			Shader.EnableKeyword( "MOTIONBLUREDGE_NORMAL" );
			Shader.DisableKeyword("MOTIONBLUREDGE_DEBUG" );
		}

		// Clamp the motion blur variable, so it can never leave permanent trails in the image
//		blurAmount = Mathf.Clamp( blurAmount, 0.0f, 0.92f );
		endRadius = Mathf.Clamp( endRadius, 0.01f, 10f );
		startRadius = Mathf.Clamp( startRadius, 0.01f, 10f );
		float scaledEndRad = endRadius * source.height * 0.5f;
		float scaledStartRad = startRadius * source.height * 0.5f;
		float increaseFactor = 1.0f / (scaledEndRad - scaledStartRad);
		float startOffset = increaseFactor * scaledStartRad;
		Shader.SetGlobalVector("_WindowsCorrection", new Vector4( source.width, source.height, 0, 0 ));
		// Setup the texture and floating point values in the shader
		material.SetTexture("_MainTex", accumTexture);
		material.SetFloat("_AccumOrig", 1.0F-blurAmount * speedFactor  ); // * speedFactor);
		material.SetVector("_CenterPos", new Vector4( source.width * (0.5f + centerOffsetX), source.height * (0.5f + centerOffsetY), increaseFactor, startOffset));
		material.SetFloat("_TransitionCurve", transitionCurve );
		// Render the image using the motion blur shader
		ImageEffects.BlitWithMaterial (material, source, accumTexture);
		ImageEffects.Blit(accumTexture, destination);
	}
}
