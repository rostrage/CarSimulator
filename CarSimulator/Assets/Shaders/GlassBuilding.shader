// Upgrade NOTE: replaced 'PositionFog()' with multiply of UNITY_MATRIX_MVP by position
// Upgrade NOTE: replaced 'V2F_POS_FOG' with 'float4 pos : SV_POSITION'

Shader "Building/Glass" {
Properties {
	_Lightmap ("Lightmap (RGB) Reflectiveness (A)", 2D) = "black" {}
	_Color ("Main Color", Color) = (1,1,1,1)
	_Cube ("Reflection Cubemap", Cube) = "" { TexGen CubeReflect }
}

Category {
	Tags { "Queue" = "Transparent-110" }
	Blend SrcAlpha OneMinusSrcAlpha
	Lighting Off
	Colormask RGB

	// ---- fragment program cards
	SubShader {
		Pass {
			
CGPROGRAM
// Upgrade NOTE: excluded shader from DX11 and Xbox360; has structs without semantics (struct v2f members normal,viewDir,rotNormal,uv)
#pragma exclude_renderers d3d11 xbox360
// Upgrade NOTE: excluded shader from Xbox360; has structs without semantics (struct v2f members normal,viewDir,rotNormal,uv)
#pragma exclude_renderers xbox360
#pragma vertex vert
#pragma fragment frag
#pragma fragmentoption ARB_fog_exp2
#pragma fragmentoption ARB_precision_hint_fastest 
#include "UnityCG.cginc"

struct v2f {
	float4 pos : SV_POSITION;
	float3  normal;
	float3	viewDir;
	float3	rotNormal;
	float2  uv;
};

uniform float4x4 _RotMatrix;
uniform float4 _Lightmap_ST;

v2f vert (appdata_tan v)
{	
	v2f o;
	o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
	o.normal = mul( (float3x3)_Object2World, v.normal );
	o.rotNormal = mul( (float3x3)_RotMatrix, o.normal );
	o.viewDir = mul( (float3x3)_Object2World, ObjSpaceViewDir(v.vertex) );
	o.uv = TRANSFORM_TEX(v.texcoord, _Lightmap);
	return o;
}

uniform samplerCUBE _Cube;
uniform float4 _Color;
uniform sampler2D _Lightmap;

float4 frag (v2f i)  : COLOR
{
	float3 normal = i.normal;
	i.viewDir = normalize(i.viewDir);
	half nsv = saturate(dot( normal, i.viewDir ));
	
	// calculate reflection vector in world space
	half3 r = reflect(-i.viewDir, i.rotNormal);
	
	half4 lightmapColor = tex2D(_Lightmap, i.uv);
	half4 reflcolor = texCUBE(_Cube, r);
	
	half fresnel = 1 - nsv*0.5;
	half fresnelAlpha = 1 - nsv * (1 - _Color.a);
	half4 c = half4( lerp( _Color.rgb, reflcolor.rgb, fresnel * lightmapColor.a ), fresnelAlpha );
	
	c.rgb *= lightmapColor.rgb;
	
	return c;
}
ENDCG  
		}
	}
	
	// ---- cards that can do cube maps
	SubShader {
		Pass {
			SetTexture [_Cube] { matrix[_RotMatrix] constantColor(1,1,1,0.5) combine texture, constant }
		}
	}
	
	// ---- cards that can't do anything
	SubShader {
		Pass {
			Color (1,1,1,0.3)
		}
	}
}

}
