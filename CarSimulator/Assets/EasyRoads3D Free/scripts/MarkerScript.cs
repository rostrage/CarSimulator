using UnityEngine;
using System.Collections;
using EasyRoads3D;
[ExecuteInEditMode]
public class MarkerScript : MonoBehaviour {
public float tension = 0.5f;
public float ri;
public float OOQOQQOO;
public float li;
public float ODODQQOO;
public float rs;
public float ODOQQOOO;
public float ls;
public float DODOQQOO;
public float rt;
public float ODDQODOO;
public float lt;
public float ODDOQOQQ;
public bool OCOQCDCCCD;
public bool ODQDOQOO;
public float ODOCQOOOQC;
public float ODOOQQOO;
public Transform[] OQQCDDDQQOs;
public float[] trperc;


public Vector3 oldPos = Vector3.zero;
public bool autoUpdate;
public bool changed;
public Transform surface;
public bool OQODOQQDDQ;
Vector3 position;
private bool updated;
private int frameCount;
private float currentstamp;
private float newstamp;
private bool mousedown;
private Vector3 lookAtPoint;
public bool bridgeObject;
public  bool distHeights;
public RoadObjectScript objectScript;
public ArrayList OQODQQDO = new ArrayList();
public ArrayList ODOQQQDO = new ArrayList();
public ArrayList OQQODQQOO = new ArrayList();
public ArrayList ODDOQQOO = new ArrayList();
public ArrayList ODDDDQOO = new ArrayList();
public ArrayList DQQOQQOO = new ArrayList();
public string[] ODDOOQDO;
public bool[] ODDGDOOO;
public bool[] ODDQOOO;
public float[] ODDQOODO;
public float[] ODOQODOO;
public float[] ODDOQDO;
public int markerNum;
public string distance = "0";
public string OQDQDOOCDO = "0";
public string OODCQCQOQQ = "0";
public bool newSegment = false;
public float floorDepth = 2f;
public float oldFloorDepth = 2f;
public float waterLevel = 0.5f;
public bool lockWaterLevel = true;
public bool sharpCorner = false;
void Start () {
foreach(Transform child in transform) surface = child;
}
void OnDrawGizmos()
{
if(objectScript != null){
if(!objectScript.OQDDDOQQOC){  

Vector3 change = transform.position - oldPos;
if(OCOQCDCCCD && oldPos != Vector3.zero && change != Vector3.zero){
int i = 0;
foreach(Transform tr in OQQCDDDQQOs){
tr.position += change * trperc[i];
i++;
}
}
if(oldPos != Vector3.zero && change != Vector3.zero){
changed = true;
if(objectScript.OQDDDOQQOC){
objectScript.OCDQDOOOCO.specialRoadMaterial = true;
}
}
oldPos = transform.position;
}else if(objectScript.ODODDDOO){ 
transform.position = oldPos;
}
}
}
void SetObjectScript(){

objectScript = transform.parent.parent.GetComponent<RoadObjectScript>();
if(objectScript.OCDQDOOOCO == null){
objectScript.ODQQDDQDDO(null, null, null);
}
}
public void LeftIndent(float change, float perc){
ri += change * perc;
if(ri < objectScript.indent) ri = objectScript.indent;
OOQOQQOO = ri;
}
public void RightIndent(float change, float perc){
li += change * perc;
if(li < objectScript.indent) li = objectScript.indent;
ODODQQOO = li;
}
public void LeftSurrounding(float change, float perc){
rs += change * perc;
if(rs < objectScript.indent) rs = objectScript.indent;
ODOQQOOO = rs;
}
public void RightSurrounding(float change, float perc){
ls += change * perc;
if(ls < objectScript.indent) ls = objectScript.indent;
DODOQQOO = ls;
}
public void LeftTilting(float change, float perc){
rt += change * perc;
if(rt < 0) rt = 0;
ODDQODOO = rt;
}
public void RightTilting(float change, float perc){
lt += change * perc;
if(lt < 0) lt = 0;
ODDOQOQQ = lt;
}
public void FloorDepth(float change, float perc){
floorDepth += change * perc;
if(floorDepth > 0) floorDepth = 0;
oldFloorDepth = floorDepth;
}
public bool InSelected(){

for(int i = 0; i < objectScript.OQQCDDDQQOs.Length; i++){
if(objectScript.OQQCDDDQQOs[i] == this.gameObject)return true;
}
return false;
}
}
