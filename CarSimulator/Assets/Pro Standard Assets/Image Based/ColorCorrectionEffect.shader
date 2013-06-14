Shader "Hidden/Grayscale Effect_26" {
Properties {
	_MainTex ("Base (RGB)", 2D) = "white" {}
	_RampTex ("Base (RGB)", 2D) = "grayscaleRamp" {}
}

SubShader {
	Pass {
		ZTest Always Cull Off ZWrite Off
		Fog { Mode off }
		
CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#pragma fragmentoption ARB_precision_hint_fastest

#include "UnityCG.cginc"

v2f_img vert(appdata_img v)
{
	v2f_img o;
	o.pos = mul(UNITY_MATRIX_MVP,v.vertex);
	o.uv = v.texcoord;
	
	return o;
}

uniform sampler2D _MainTex;
uniform sampler2D _RampTex;
uniform float4    _RampOffset;

float4 frag (v2f_img i) : COLOR
{
	float4 orig = tex2D(_MainTex, i.uv);
	float4 color;	
	
	color.r = tex2D(_RampTex, float2(orig.r + _RampOffset.r, 0)).r;
	color.g = tex2D(_RampTex, float2(orig.g + _RampOffset.g, 0)).g;
	color.b = tex2D(_RampTex, float2(orig.b + _RampOffset.b, 0)).b;
	color.a = orig.a;
	
	return color;
}
ENDCG

}
}
}