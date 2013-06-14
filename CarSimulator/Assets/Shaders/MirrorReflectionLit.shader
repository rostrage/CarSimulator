Shader "FX/Mirror Reflection Lit" { 
Properties {
	_Color ("Main Color", Color) = (1,1,1,1)
	_ReflectColor ("Reflection Color", Color) = (1,1,1,0.5)
	_MainTex ("Base (RGB) RefStrength (A)", 2D) = "white" {} 
    _ReflectionTex ("Reflection", 2D) = "white" { TexGen ObjectLinear }
	_BumpMap ("Bumpmap (RGB)", 2D) = "bump" {}
}

Category {
	/* Upgrade NOTE: commented out, possibly part of old style per-pixel lighting: Blend AppSrcAdd AppDstAdd */
	Fog { Color [_AddFog] }

	// ------------------------------------------------------------------
	// Three texture cards
	
	Subshader {
		// First pass - vertex lighting or ambient
		Pass {
			Tags {"LightMode" = "Always"}
			Lighting On
			Material {
				Diffuse [_Color]
				Emission [_PPLAmbient]
			}
			SetTexture[_MainTex] { constantColor[_Color] combine texture * primary DOUBLE, texture * constant }
		}
		UsePass "Bumped Diffuse/PPL"
		// Second pass - add reflection
		Pass { 
			Name "BASE"
			Tags {"LightMode" = "Always"}
			SetTexture[_MainTex] { combine texture }
			SetTexture[_ReflectionTex] { matrix [_ProjMatrix] combine texture * previous alpha }
			SetTexture[_ReflectionTex] { constantColor[_ReflectColor] combine previous * constant }
		}
				
		// Pixel lit passes
		UsePass "Diffuse/PPL"
	}	
}

Fallback "VertexLit"
}
