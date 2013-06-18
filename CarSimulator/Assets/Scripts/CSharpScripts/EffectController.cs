using UnityEngine;
using System.Collections;

public class EffectController : MonoBehaviour
{
	public Generate2DReflection generate2dReflection;
	public GlowEffectThreshold_26 glowEffect;
	public MotionBlurEdge motionBlur;
	public ColorCorrectionEffect colorCorrection;
	
	void Update()
	{
		if(QualitySettings.currentLevel < QualityLevel.Good)
		{
			if (generate2dReflection)
				generate2dReflection.enabled = false;
			if (glowEffect)
				glowEffect.enabled = false;
			if (motionBlur)	
				motionBlur.enabled = false;
			if (colorCorrection)
				colorCorrection.enabled = false;
		}
		else
		{
			if (generate2dReflection)
				generate2dReflection.enabled = true;
			if (glowEffect)
				glowEffect.enabled = true;
			if (motionBlur)
				motionBlur.enabled = true;
			if (colorCorrection)
				colorCorrection.enabled = true;
		}
	}
}
