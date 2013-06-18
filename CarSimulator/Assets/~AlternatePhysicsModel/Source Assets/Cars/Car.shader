// Upgrade NOTE: replaced 'PositionFog()' with multiply of UNITY_MATRIX_MVP by position
// Upgrade NOTE: replaced 'V2F_POS_FOG' with 'float4 pos : SV_POSITION'

Shader "Car/Body" {
Properties {
	_MainTex ("Diffuse (RGB) Gloss (A)", 2D) = "white" {}
	_Color ("Main Color", Color) = (1,1,1,1)
	_HighlightColor ("Highlight Color", Color) = (1,1,1,1)
	_SpecularColor ("Specular Color", Color) = (0.5,0.5,0.5,1)
	_BumpMap ("Bump (RGB) AO (A)", 2D) = "bump" {}
	_Decal ("Decal", 2D) = "black" {}
	_DecalColoring("Decal coloring", Range(0,1)) = 0.5
	_Cube ("Reflection Cubemap", Cube) = "" { TexGen CubeReflect }
	_SparkleTex ("Sparkle noise (RGB)", 2D) = "white" {}
	_Sparkle ("Sparkle strength", Range(0.001, 0.1)) = 0.01
}

// ---- fragment program cards: everything
SubShader { 
	Pass {
	
CGPROGRAM
// Upgrade NOTE: excluded shader from DX11 and Xbox360; has structs without semantics (struct v2f members uv,viewDirT,I,TtoW0,TtoW1,TtoW2)
#pragma exclude_renderers d3d11 xbox360
// Upgrade NOTE: excluded shader from Xbox360; has structs without semantics (struct v2f members uv,viewDirT,I,TtoW0,TtoW1,TtoW2)
#pragma exclude_renderers xbox360
#pragma vertex vert
#pragma fragment frag
#pragma fragmentoption ARB_fog_exp2
#pragma fragmentoption ARB_precision_hint_fastest 
#include "UnityCG.cginc"

struct v2f {
	float4 pos : SV_POSITION;
	float2	uv[2];
	float3	viewDirT;
	float3	I;
	float3	TtoW0;
	float3	TtoW1;
	float3	TtoW2;
};

uniform float _Shininess;
uniform float4x4 _RotMatrix;
uniform float4 _MainTex_ST;
uniform float4 _SparkleTex_ST;

v2f vert (appdata_tan v)
{	
	v2f o;
	o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
	o.uv[0] = TRANSFORM_TEX( v.texcoord, _MainTex );
	o.uv[1] = TRANSFORM_TEX( v.texcoord, _SparkleTex );
	
	float3 objViewDir = ObjSpaceViewDir( v.vertex );
	o.I = mul( (float3x3)_Object2World, -objViewDir );	
	
	TANGENT_SPACE_ROTATION;
	o.viewDirT = mul( rotation, objViewDir );	
	o.TtoW0 = mul(rotation, _Object2World[0].xyz);
	o.TtoW1 = mul(rotation, _Object2World[1].xyz);
	o.TtoW2 = mul(rotation, _Object2World[2].xyz);
		
	return o;
}

uniform sampler2D _BumpMap;
uniform sampler2D _SparkleTex;
uniform samplerCUBE _Cube;
uniform sampler2D _MainTex;
uniform sampler2D _Decal;
uniform float _Sparkle;
uniform float4 _Color;
uniform float4 _HighlightColor;
uniform float4 _SpecularColor;
uniform float _DecalColoring;

float4 frag (v2f i)  : COLOR
{
	half4 main = tex2D( _MainTex, i.uv[0] );
	half4 decal = tex2D( _Decal, i.uv[0] );
	
	half4 normalAO = tex2D( _BumpMap, i.uv[0] );
	half3 normal  = normalAO.xyz * 2 - 1;
	half3 normalN = tex2D( _SparkleTex, i.uv[1] ).xyz * 2 - 1;
	normalN = normalize( normalN );
	
	half3 ns = normalize( normal + normalN * _Sparkle );
	half3 nss = normalize( normal + normalN );
	
	i.viewDirT = normalize(i.viewDirT);
	half nsv = saturate(dot( ns, i.viewDirT ));
	
	half3 c0 = _Color.rgb;
	half3 c2 = _HighlightColor.rgb;
	half3 c1 = c2 * 0.5;
	half3 cs = c2 * 0.4;
	
	half3 duotone = c0 * nsv + c1 * (nsv*nsv) + c2 * (nsv*nsv*nsv*nsv) + cs * pow( saturate(dot( nss, i.viewDirT )), 32 );
	//half3 duotone = c0 * nsv + c1 * (nsv*nsv) + c2 * (nsv*nsv*nsv*nsv);
	
	half3 mainduo = main.rgb * duotone;
	half3 decalduo = decal.rgb * lerp(half3(1,1,1), duotone, _DecalColoring);
	half3 c = lerp( mainduo, decalduo, decal.a );
	
	// transform normal to world space
	half3 wn;
	wn.x = dot(i.TtoW0, ns);
	wn.y = dot(i.TtoW1, ns);
	wn.z = dot(i.TtoW2, ns);
	
	wn = mul((float3x3)_RotMatrix,wn);
	
	// calculate reflection vector in world space
	half3 r = reflect(i.I, wn);
	
	half4 reflcolor = texCUBE(_Cube, r);
	
	half fresnel = 1 - nsv * 0.5;
	c += reflcolor.rgb * _SpecularColor.rgb * fresnel;
	
	c *= main.a;
	c *= normalAO.a;
	
	return half4( c, 0 );
}
ENDCG  
	}
}

// ---- four texture cards: no sparkle, no gloss map, no bumpmaps, no dual tone
SubShader {
	ColorMask RGB
	Pass {
		SetTexture[_MainTex] { constantColor[_Color] combine texture * constant }
		SetTexture[_BumpMap] { combine previous * texture alpha }
		SetTexture[_Decal] { combine texture lerp(texture) previous }
		SetTexture[_Cube] { matrix[_RotMatrix] constantColor[_SpecularColor] combine texture * constant + previous, previous }
	}
}

// ---- three texture cards: same as above, draw in two passes
SubShader {
	ColorMask RGB
	Pass {
		SetTexture[_MainTex] { constantColor[_Color] combine texture * constant }
		SetTexture[_BumpMap] { combine previous * texture alpha }
		SetTexture[_Decal] { combine texture lerp(texture) previous }
	}
	Pass {
		Blend One One
		ZWrite Off
		SetTexture[_Cube] { matrix[_RotMatrix] constantColor[_SpecularColor] combine texture * constant }
	}
}

// ---- two texture cards: same as above, draw in three passes
SubShader {
	ColorMask RGB
	Pass {
		SetTexture[_MainTex] { constantColor[_Color] combine texture * constant }
		SetTexture[_BumpMap] { combine previous * texture alpha }
	}
	Pass {
		Blend SrcAlpha OneMinusSrcAlpha
		ZWrite Off
		SetTexture[_Decal] { combine texture }
	}
	Pass {
		Blend One One
		ZWrite Off
		SetTexture[_Cube] { matrix[_RotMatrix] constantColor[_SpecularColor] combine texture * constant }
	}
}

// ---- single texture cards: +no reflections, draw in three passes
SubShader {
	ColorMask RGB
	Pass {
		SetTexture[_MainTex] { constantColor[_Color] combine texture * constant }
	}
	Pass {
		Blend Zero SrcAlpha
		ZWrite Off
		SetTexture[_BumpMap] { combine texture alpha }
	}
	Pass {
		Blend SrcAlpha OneMinusSrcAlpha
		ZWrite Off
		SetTexture[_Decal] { combine texture }
	}
}

// ---- the lowest of the low end: just texture and color
SubShader {
	ColorMask RGB
	Pass {
		SetTexture[_MainTex] { constantColor[_Color] combine texture * constant }
	}
}

FallBack  "VertexLit", 0

}
