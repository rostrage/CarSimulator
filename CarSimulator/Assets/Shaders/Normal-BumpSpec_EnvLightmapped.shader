Shader "Bumped Specular - Env Lightmapped" {
Properties {
	_Color ("Main Color", Color) = (1,1,1,1)
	_SpecColor ("Specular Color", Color) = (0.5, 0.5, 0.5, 1)
	_Shininess ("Shininess", Range (0.03, 1)) = 0.078125
	_MainTex ("Base (RGB) Gloss (A)", 2D) = "white" {}
	_BumpMap ("Bumpmap (RGB)", 2D) = "bump" {}
	_LightMap ("Lightmap (RGB)", 2D) = "grey" {}
	_LightmapDensity("Lightmap Density",Range( 0, 1)) = 0.5
}

Category {
	Tags { "RenderType"="Opaque" }
	LOD 400
	/* Upgrade NOTE: commented out, possibly part of old style per-pixel lighting: Blend AppSrcAdd AppDstAdd */
	Fog { Color [_AddFog] }
	
	// ------------------------------------------------------------------
	// ARB fragment program
	
	#warning Upgrade NOTE: SubShader commented out; uses Unity 2.x per-pixel lighting. You should rewrite shader into a Surface Shader.
/*SubShader { 
		UsePass "Specular/BASE"
		
		// Pixel lights
		Pass { 
			Name "PPL"	
			Tags { "LightMode" = "Pixel" }
			
CGPROGRAM
// Upgrade NOTE: excluded shader from Xbox360; has structs without semantics (struct v2f members uvK,uv2,uv3,viewDirT,lightDirT)
#pragma exclude_renderers xbox360
#pragma vertex vert
#pragma fragment frag
#pragma multi_compile_builtin
#pragma fragmentoption ARB_fog_exp2
#pragma fragmentoption ARB_precision_hint_fastest 
#include "UnityCG.cginc"
#include "AutoLight.cginc" 

struct v2f {
	V2F_POS_FOG;
	LIGHTING_COORDS
	float3	uvK; // xy = UV, z = specular K
	float2	uv2;
	float2	uv3;
	float3	viewDirT;
	float3	lightDirT;
}; 

uniform float4 _MainTex_ST, _BumpMap_ST;
uniform float4x4 _LightmapMatrix;
uniform float _Shininess;

v2f vert (appdata_tan v)
{	
	v2f o;
	PositionFog( v.vertex, o.pos, o.fog );
	o.uvK.xy = TRANSFORM_TEX(v.texcoord, _MainTex);
	o.uvK.z = _Shininess * 128;
	o.uv2 = TRANSFORM_TEX(v.texcoord, _BumpMap);
	o.uv3 = mul(_LightmapMatrix, v.vertex).xy;

	TANGENT_SPACE_ROTATION;
	o.lightDirT = mul( rotation, ObjSpaceLightDir( v.vertex ) );	
	o.viewDirT = mul( rotation, ObjSpaceViewDir( v.vertex ) );	

	TRANSFER_VERTEX_TO_FRAGMENT(o);	
	return o;
}

uniform sampler2D _BumpMap;
uniform sampler2D _MainTex;
uniform sampler2D _LightMap;
uniform float _LightmapDensity;

float4 frag (v2f i) : COLOR
{		
	float4 texcol = tex2D(_MainTex, i.uvK.xy);
	
	// get normal from the normal map
	float3 normal = tex2D(_BumpMap, i.uv2).xyz * 2.0 - 1.0;
	
	half4 lightmapColor = tex2D(_LightMap, i.uv3);
	half lmapstr = (Luminance(lightmapColor.rgb) * _LightmapDensity);
	half4 color = SpecularLight( i.lightDirT, i.viewDirT, normal, texcol, i.uvK.z, LIGHT_ATTENUATION(i) * (lmapstr * 2));
	return color;
}
ENDCG  
		}
	}*/
}

FallBack "Specular", 1

}