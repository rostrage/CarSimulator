Shader "Lightmapped/Diffuse Detail" {
Properties {
	_Color ("Main Color", Color) = (1,1,1,1)
	_SpecColor ("Spec Color", Color) = (1,1,1,1)
	_Shininess ("Shininess", Range (0.01, 1)) = 0.7
	_MainTex ("Base (RGB)", 2D) = "white" {}
	_Detail ("Detail (RGB)", 2D) = "gray" {}
	_LightMap ("Lightmap (RGB)", 2D) = "lightmap" { LightmapMode }
	_SpecMap ("Spec (A)", 2D) = "white" {}
	_SpecThreshold ("Spec Threshold", Range (0.01, 1)) = 0.7
}

Category {
	Tags { "RenderType"="Opaque" }
	LOD 250
	/* Upgrade NOTE: commented out, possibly part of old style per-pixel lighting: Blend AppSrcAdd AppDstAdd */
	Fog { Color [_AddFog] }
		
	// ------------------------------------------------------------------
	// ARB fragment program
	
	#warning Upgrade NOTE: SubShader commented out; uses Unity 2.x per-pixel lighting. You should rewrite shader into a Surface Shader.
/*SubShader {
		Tags { "RenderType"="Opaque" }
	//	UsePass "Lightmapped/VertexLit Detail/BASE"

				// Pixel lights
		Pass {
			Name "PPL"
			Tags { "LightMode" = "Pixel" }
CGPROGRAM
// Upgrade NOTE: excluded shader from Xbox360; has structs without semantics (struct v2f members uv,viewDirT,lightDirT,shininess)
#pragma exclude_renderers xbox360
#pragma vertex vert
#pragma fragment frag
#pragma multi_compile_builtin
#pragma fragmentoption ARB_fog_exp2
#pragma fragmentoption ARB_precision_hint_fastest
#include "UnityCG.cginc"
#include "AutoLight.cginc"

struct appdata_lightmap {
    float4 vertex : POSITION;
    float4 tangent : TANGENT;
    float3 normal : NORMAL;
    float4 texcoord : TEXCOORD0;
    float4 texcoord1 : TEXCOORD1;
};

struct v2f {
	V2F_POS_FOG;
	LIGHTING_COORDS
	float2	uv[3];
	float3	viewDirT;
	float3	lightDirT;
	float	shininess;
};

uniform float4 _MainTex_ST, _Detail_ST, _LightMap_ST;
uniform float _Shininess;

v2f vert (appdata_lightmap v)
{
	v2f o;
	PositionFog( v.vertex, o.pos, o.fog );
	o.uv[0] = TRANSFORM_TEX(v.texcoord,_MainTex);
	o.uv[1] = TRANSFORM_TEX(v.texcoord,_Detail);
	o.uv[2] = TRANSFORM_TEX(v.texcoord1,_LightMap);
	o.shininess = _Shininess * 128;
	
	TANGENT_SPACE_ROTATION;
	o.lightDirT = normalize(mul( rotation, ObjSpaceLightDir( v.vertex ) ));	
	o.viewDirT = mul( rotation, ObjSpaceViewDir( v.vertex ) );	
	
	TRANSFER_VERTEX_TO_FRAGMENT(o);
	return o;
}

uniform sampler2D _MainTex;
uniform sampler2D _Detail;
uniform sampler2D _LightMap;
uniform sampler2D _SpecMap;
uniform float4 _Color;
uniform float _SpecThreshold;

half4 frag (v2f i) : COLOR
{
	half4 texcol = tex2D(_MainTex,i.uv[0]) * _Color;
	float4 speccol = tex2D( _SpecMap, i.uv[0] );
	half4 detail = lerp( half4(0.5,0.5,0.5,0.5), tex2D(_Detail,i.uv[1]), texcol.a);
	texcol.rgb *= detail.rgb * 2;
	half4 lmap = tex2D(_LightMap, i.uv[2]);
	half shade = LIGHT_ATTENUATION(i);
	
	half lmapstr = length(lmap);
	half4 lmapNorm = lmap / lmapstr;
	lmapstr = min(lmapstr, shade * 2);
	lmap = (lmapNorm * lmapstr);
	
	half4 lightmapPart = texcol * lmap;
	
	i.viewDirT = normalize(i.viewDirT);
	half3 h = normalize( i.lightDirT + i.viewDirT );
	
	half diffuse = i.lightDirT.z;
	
	float nh = saturate(h.z * lmapstr - _SpecThreshold);
	float spec = pow( nh, i.shininess ) * speccol.a;
	
	half4 c;
	c.rgb = (texcol.rgb * _ModelLightColor0.rgb * diffuse + _SpecularLightColor0.rgb * spec) * (lmapstr);
	c.a = _SpecularLightColor0.a * spec * lmapstr;
	
	half4 color = lightmapPart + c;

	return half4(color.rgb,0);
} 
ENDCG
		}
	}*/
}

Fallback "Lightmapped/VertexLit", 1

}