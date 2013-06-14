using UnityEngine;

using System.Collections;
using System.Collections.Generic;
using System;
using EasyRoads3D;

public class RoadObjectScript : MonoBehaviour {
static public string version = "";
public int objectType = 0;
public bool displayRoad = true;
public float roadWidth = 5.0f;
public float indent = 3.0f;
public float surrounding = 5.0f;
public float raise = 1.0f;
public float raiseMarkers = 0.5f;
public bool OOQDOOQQ = false;
public bool renderRoad = true;
public bool beveledRoad = false;
public bool applySplatmap = false;
public int splatmapLayer = 4;
public bool autoUpdate = true;
public float geoResolution = 5.0f;
public int roadResolution = 1;
public float tuw =  15.0f;
public int splatmapSmoothLevel;
public float opacity = 1.0f;
public int expand = 0;
public int offsetX = 0;
public int offsetY = 0;
private Material surfaceMaterial;
public float surfaceOpacity = 1.0f;
public float smoothDistance = 1.0f;
public float smoothSurDistance = 3.0f;
private bool handleInsertFlag;
public bool handleVegetation = true;
public float OCQOCOCDOQ = 2.0f;
public float OQCOOCDOCO = 1f;
public int materialType = 0;
String[] materialStrings;
private MarkerScript[] mSc;

private bool ODDDQQCOOD;
private bool[] ODDCOQQQOO = null;
private bool[] OODQQQDQOC = null;
public string[] ODQDQCCCOO;
public string[] ODODQOQO;
public int[] ODODQOQOInt;
public int OQCQQQDOCD = -1;
public int OQQCDCDOQD = -1;
static public GUISkin ODOOCDQODD;
static public GUISkin OCCQOOQODO;
public bool OQCDQDDODD = false;
private Vector3 cPos;
private Vector3 ePos;
public bool OQODOQQDDQ;
static public Texture2D OQOCDODQOD;
public int markers = 1;
public OQQCODDDQQ OCDQDOOOCO;
private GameObject ODOQDQOO;
public bool OQDDDOQQOC;
public bool doTerrain;
private Transform OQQCDDDQQO = null;
public GameObject[] OQQCDDDQQOs;
private static string ODQCOQQQOC = null;
public Transform obj;
private string OCDCOOODQQ;
public static string erInit = "";
static public Transform ODCCCQOCDD;
private RoadObjectScript OODQDDOOQC;
public bool flyby;


private Vector3 pos;
private float fl;
private float oldfl;
private bool OOQDQDOCQD;
private bool OQCQDCDOOC;
private bool OCCOQCOCCQ;
public Transform OODDOCQDQO;
public int OdQODQOD = 1;
public float OOQQQDOD = 0f;
public float OOQQQDODOffset = 0f;
public float OOQQQDODLength = 0f;
public bool ODODDDOO = false;
static public string[] ODOQDOQO;
static public string[] ODODOQQO; 
static public string[] ODODQOOQ;
public int ODQDOOQO = 0;
public string[] ODQQQQQO;  
public string[] ODODDQOO; 
public bool[] ODODQQOD; 
public int[] OOQQQOQO; 
public int ODOQOOQO = 0; 

public bool forceY = false;
public float yChange = 0f;
public float floorDepth = 2f;
public float waterLevel = 1.5f; 
public bool lockWaterLevel = true;
public float lastY = 0f;
public string distance = "0";
public string markerDisplayStr = "Hide Markers";
static public string[] objectStrings;
public string objectText = "Road";
public bool applyAnimation = false;
public float waveSize = 1.5f;
public float waveHeight = 0.15f;
public bool snapY = true;

private TextAnchor origAnchor;
public bool autoODODDQQO;
public Texture2D roadTexture;
public Texture2D roadMaterial;
public string[] OCCQDOCCQC;
public string[] OCQOQDDDCQ;
public int selectedWaterMaterial;
public int selectedWaterScript;
private bool doRestore = false;
public bool doFlyOver;
public static GameObject tracer;
public Camera goCam;
public float speed = 1f;
public float offset = 0f;
public bool camInit;
public GameObject customMesh = null;
static public bool disableFreeAlerts = true;
public bool multipleTerrains;
public bool editRestore = true;
public Material roadMaterialEdit;
static public int backupLocation = 0;
public string[] backupStrings = new string[2]{"Outside Assets folder path","Inside Assets folder path"};
public Vector3[] leftVecs = new Vector3[0];
public Vector3[] rightVecs = new Vector3[0];
public void ODQQDDQDDO(ArrayList arr, String[] DOODQOQO, String[] OODDQOQO){

OODDQODCCQ(transform, arr, DOODQOQO, OODDQOQO);
}
public void ODOODCCQOC(MarkerScript markerScript){

OQQCDDDQQO = markerScript.transform;



List<GameObject> tmp = new List<GameObject>();
for(int i=0;i<OQQCDDDQQOs.Length;i++){
if(OQQCDDDQQOs[i] != markerScript.gameObject)tmp.Add(OQQCDDDQQOs[i]);
}




tmp.Add(markerScript.gameObject);
OQQCDDDQQOs = tmp.ToArray();
OQQCDDDQQO = markerScript.transform;

OCDQDOOOCO.OCCQCCOCOD(OQQCDDDQQO, OQQCDDDQQOs, markerScript.OCOQCDCCCD, markerScript.ODOCQOOOQC, OODDOCQDQO, out markerScript.OQQCDDDQQOs, out markerScript.trperc, OQQCDDDQQOs);

OQQCDCDOQD = -1;
}
public void OQQCCCOCOO(MarkerScript markerScript){
if(markerScript.ODOCQOOOQC != markerScript.ODOOQQOO || markerScript.ODOCQOOOQC != markerScript.ODOOQQOO){
OCDQDOOOCO.OCCQCCOCOD(OQQCDDDQQO, OQQCDDDQQOs, markerScript.OCOQCDCCCD, markerScript.ODOCQOOOQC, OODDOCQDQO, out markerScript.OQQCDDDQQOs, out markerScript.trperc, OQQCDDDQQOs);
markerScript.ODQDOQOO = markerScript.OCOQCDCCCD;
markerScript.ODOOQQOO = markerScript.ODOCQOOOQC;
}
if(OODQDDOOQC.autoUpdate) OOCQOCQOOD(OODQDDOOQC.geoResolution, false, false);
}
public void ResetMaterials(MarkerScript markerScript){
if(OCDQDOOOCO != null)OCDQDOOOCO.OCCQCCOCOD(OQQCDDDQQO, OQQCDDDQQOs, markerScript.OCOQCDCCCD, markerScript.ODOCQOOOQC, OODDOCQDQO, out markerScript.OQQCDDDQQOs, out markerScript.trperc, OQQCDDDQQOs);
}
public void OCOODDOODQ(MarkerScript markerScript){
if(markerScript.ODOCQOOOQC != markerScript.ODOOQQOO){
OCDQDOOOCO.OCCQCCOCOD(OQQCDDDQQO, OQQCDDDQQOs, markerScript.OCOQCDCCCD, markerScript.ODOCQOOOQC, OODDOCQDQO, out markerScript.OQQCDDDQQOs, out markerScript.trperc, OQQCDDDQQOs);
markerScript.ODOOQQOO = markerScript.ODOCQOOOQC;
}
OOCQOCQOOD(OODQDDOOQC.geoResolution, false, false);
}
private void OCDQCQQQCD(string ctrl, MarkerScript markerScript){
int i = 0;
foreach(Transform tr in markerScript.OQQCDDDQQOs){
MarkerScript wsScript = (MarkerScript) tr.GetComponent<MarkerScript>();
if(ctrl == "rs") wsScript.LeftSurrounding(markerScript.rs - markerScript.ODOQQOOO, markerScript.trperc[i]);
else if(ctrl == "ls") wsScript.RightSurrounding(markerScript.ls - markerScript.DODOQQOO, markerScript.trperc[i]);
else if(ctrl == "ri") wsScript.LeftIndent(markerScript.ri - markerScript.OOQOQQOO, markerScript.trperc[i]);
else if(ctrl == "li") wsScript.RightIndent(markerScript.li - markerScript.ODODQQOO, markerScript.trperc[i]);
else if(ctrl == "rt") wsScript.LeftTilting(markerScript.rt - markerScript.ODDQODOO, markerScript.trperc[i]);
else if(ctrl == "lt") wsScript.RightTilting(markerScript.lt - markerScript.ODDOQOQQ, markerScript.trperc[i]);
else if(ctrl == "floorDepth") wsScript.FloorDepth(markerScript.floorDepth - markerScript.oldFloorDepth, markerScript.trperc[i]);
i++;
}
}
public void OOQOQQDQCO(){
if(markers > 1) OOCQOCQOOD(OODQDDOOQC.geoResolution, false, false);
}
public void OODDQODCCQ(Transform tr, ArrayList arr, String[] DOODQOQO, String[] OODDQOQO){
version = "2.4.7";
ODOOCDQODD = (GUISkin)Resources.Load("ER3DSkin", typeof(GUISkin));


OQOCDODQOD = (Texture2D)Resources.Load("ER3DLogo", typeof(Texture2D));
if(RoadObjectScript.objectStrings == null){
RoadObjectScript.objectStrings = new string[3];
RoadObjectScript.objectStrings[0] = "Road Object"; RoadObjectScript.objectStrings[1]="River Object";RoadObjectScript.objectStrings[2]="Procedural Mesh Object";
}
obj = tr;
OCDQDOOOCO = new OQQCODDDQQ();
OODQDDOOQC = obj.GetComponent<RoadObjectScript>();
foreach(Transform child in obj){
if(child.name == "Markers") OODDOCQDQO = child;
}
OQQCODDDQQ.terrainList.Clear();
Terrain[] terrains = (Terrain[])FindObjectsOfType(typeof(Terrain));
foreach(Terrain terrain in terrains) {
Terrains t = new Terrains();
t.terrain = terrain;
if(!terrain.gameObject.GetComponent<EasyRoads3DTerrainID>()){
EasyRoads3DTerrainID terrainscript = (EasyRoads3DTerrainID)terrain.gameObject.AddComponent("EasyRoads3DTerrainID");
string id = UnityEngine.Random.Range(100000000,999999999).ToString();
terrainscript.terrainid = id;
t.id = id;
}else{
t.id = terrain.gameObject.GetComponent<EasyRoads3DTerrainID>().terrainid;
}
OCDQDOOOCO.OCCCOCQQCO(t);
}
ODDQOOCDOC.OCCCOCQQCO();
if(roadMaterialEdit == null){
roadMaterialEdit = (Material)Resources.Load("materials/roadMaterialEdit", typeof(Material));
}
if(objectType == 0 && GameObject.Find(gameObject.name + "/road") == null){
GameObject road = new GameObject("road");
road.transform.parent = transform;
}

OCDQDOOOCO.OCOCQCCDCD(obj, ODQCOQQQOC, OODQDDOOQC.roadWidth, surfaceOpacity, out OQODOQQDDQ, out indent, applyAnimation, waveSize, waveHeight);
OCDQDOOOCO.OQCOOCDOCO = OQCOOCDOCO;
OCDQDOOOCO.OCQOCOCDOQ = OCQOCOCDOQ;
OCDQDOOOCO.OdQODQOD = OdQODQOD + 1;
OCDQDOOOCO.OOQQQDOD = OOQQQDOD;
OCDQDOOOCO.OOQQQDODOffset = OOQQQDODOffset;
OCDQDOOOCO.OOQQQDODLength = OOQQQDODLength;
OCDQDOOOCO.objectType = objectType;
OCDQDOOOCO.snapY = snapY;
OCDQDOOOCO.terrainRendered = OQDDDOQQOC;
OCDQDOOOCO.handleVegetation = handleVegetation;
OCDQDOOOCO.raise = raise;
OCDQDOOOCO.roadResolution = roadResolution;
OCDQDOOOCO.multipleTerrains = multipleTerrains;
OCDQDOOOCO.editRestore = editRestore;
OCDQDOOOCO.roadMaterialEdit = roadMaterialEdit;
OCDQDOOOCO.renderRoad = renderRoad;
if(backupLocation == 0)OQDCCCDDCD.backupFolder = "/EasyRoads3D";
else OQDCCCDDCD.backupFolder =  "/Assets/EasyRoads3D/backups";

ODODQOQO = OCDQDOOOCO.OODQDQDDCC();
ODODQOQOInt = OCDQDOOOCO.ODOOQODCQO();


if(OQDDDOQQOC){




doRestore = true;
}


OCCCQCDCDC();

if(arr != null || ODODQOOQ == null) OOODOQCDDD(arr, DOODQOQO, OODDQOQO);


if(doRestore) return;
}
public void UpdateBackupFolder(){
}
public void OCCQOCQQCD(){
if(!ODODDDOO || objectType == 2){
if(ODDCOQQQOO != null){
for(int i = 0; i < ODDCOQQQOO.Length; i++){
ODDCOQQQOO[i] = false;
OODQQQDQOC[i] = false;
}
}
}
}

public void OQCOCOCQCC(Vector3 pos){


if(!displayRoad){
displayRoad = true;
OCDQDOOOCO.OQDQCDCOOD(displayRoad, OODDOCQDQO);
}
pos.y += OODQDDOOQC.raiseMarkers;
if(forceY && ODOQDQOO != null){
float dist = Vector3.Distance(pos, ODOQDQOO.transform.position);
pos.y = ODOQDQOO.transform.position.y + (yChange * (dist / 100f));
}else if(forceY && markers == 0) lastY = pos.y;
GameObject go = null;
if(ODOQDQOO != null) go = (GameObject)Instantiate(ODOQDQOO);
else go = (GameObject)Instantiate(Resources.Load("marker", typeof(GameObject)));
Transform newnode = go.transform;
newnode.position = pos;
newnode.parent = OODDOCQDQO;
markers++;
string n;
if(markers < 10) n = "Marker000" + markers.ToString();
else if (markers < 100) n = "Marker00" + markers.ToString();
else n = "Marker0" + markers.ToString();
newnode.gameObject.name = n;
MarkerScript scr = newnode.GetComponent<MarkerScript>();
scr.OQODOQQDDQ = false;
scr.objectScript = obj.GetComponent<RoadObjectScript>();
if(ODOQDQOO == null){
scr.waterLevel = OODQDDOOQC.waterLevel;
scr.floorDepth = OODQDDOOQC.floorDepth;
scr.ri = OODQDDOOQC.indent;
scr.li = OODQDDOOQC.indent;
scr.rs = OODQDDOOQC.surrounding;
scr.ls = OODQDDOOQC.surrounding;
scr.tension = 0.5f;
if(objectType == 1){

pos.y -= waterLevel;
newnode.position = pos;
}
}
if(objectType == 2){
if(scr.surface != null)scr.surface.gameObject.active = false;
}
ODOQDQOO = newnode.gameObject;
if(markers > 1){
OOCQOCQOOD(OODQDDOOQC.geoResolution, false, false);
if(materialType == 0){
OCDQDOOOCO.OQCDQOOQOD(materialType);
}
}
}
public void OOCQOCQOOD(float geo, bool renderMode, bool camMode){
OCDQDOOOCO.OQDCQOCCOQ.Clear();
int ii = 0;
OOQDCQDDQQ k;
foreach(Transform child  in obj)
{
if(child.name == "Markers"){
foreach(Transform marker   in child) {
MarkerScript markerScript = marker.GetComponent<MarkerScript>();
markerScript.objectScript = obj.GetComponent<RoadObjectScript>();
if(!markerScript.OQODOQQDDQ) markerScript.OQODOQQDDQ = OCDQDOOOCO.OQDOCQOCDD(marker);
k  = new OOQDCQDDQQ();
k.position = marker.position;
k.num = OCDQDOOOCO.OQDCQOCCOQ.Count;
k.object1 = marker;
k.object2 = markerScript.surface;
k.tension = markerScript.tension;
k.ri = markerScript.ri;
if(k.ri < 1)k.ri = 1f;
k.li =markerScript.li;
if(k.li < 1)k.li = 1f;
k.rt = markerScript.rt;
k.lt = markerScript.lt;
k.rs = markerScript.rs;
if(k.rs < 1)k.rs = 1f;
k.OCQCQODDOO = markerScript.rs;
k.ls = markerScript.ls;
if(k.ls < 1)k.ls = 1f;
k.OCOCDCCQQQ = markerScript.ls;
k.renderFlag = markerScript.bridgeObject;
k.OCCDCQOOOC = markerScript.distHeights;
k.newSegment = markerScript.newSegment;
k.floorDepth = markerScript.floorDepth;
k.waterLevel = waterLevel;
k.lockWaterLevel = markerScript.lockWaterLevel;
k.sharpCorner = markerScript.sharpCorner;
k.ODCQCCDQOD = OCDQDOOOCO;
markerScript.markerNum = ii;
markerScript.distance = "-1";
markerScript.OODCQCQOQQ = "-1";
OCDQDOOOCO.OQDCQOCCOQ.Add(k);
ii++;
}
}
}
distance = "-1";

OCDQDOOOCO.OCDCQOOQCC = OODQDDOOQC.roadWidth;

OCDQDOOOCO.ODOCODQQOQ(geo, obj, OODQDDOOQC.OOQDOOQQ, renderMode, camMode, objectType);
if(OCDQDOOOCO.leftVecs.Count > 0){
leftVecs = OCDQDOOOCO.leftVecs.ToArray();
rightVecs = OCDQDOOOCO.rightVecs.ToArray();
}
}
public void StartCam(){

OOCQOCQOOD(0.5f, false, true);

}
public void OCCCQCDCDC(){
int i = 0;
foreach(Transform child  in obj)
{
if(child.name == "Markers"){
i = 1;
string n;
foreach(Transform marker in child) {
if(i < 10) n = "Marker000" + i.ToString();
else if (i < 100) n = "Marker00" + i.ToString();
else n = "Marker0" + i.ToString();
marker.name = n;
ODOQDQOO = marker.gameObject;
i++;
}
}
}
markers = i - 1;

OOCQOCQOOD(OODQDDOOQC.geoResolution, false, false);
}
public void OOCDQCQOQD(){
RoadObjectScript[] scripts = (RoadObjectScript[])FindObjectsOfType(typeof(RoadObjectScript));
ArrayList rObj = new ArrayList();
foreach (RoadObjectScript script in scripts) {
if(script.transform != transform) rObj.Add(script.transform);
}
if(ODODQOQO == null){
ODODQOQO = OCDQDOOOCO.OODQDQDDCC();
ODODQOQOInt = OCDQDOOOCO.ODOOQODCQO();
}
OOCQOCQOOD(0.5f, true, false);

OCDQDOOOCO.OOOOQDCCOQ(Vector3.zero, OODQDDOOQC.raise, obj, OODQDDOOQC.OOQDOOQQ, rObj, handleVegetation);
OQCQCCOCOQ();
}
public ArrayList RebuildObjs(){
RoadObjectScript[] scripts = (RoadObjectScript[])FindObjectsOfType(typeof(RoadObjectScript));
ArrayList rObj = new ArrayList();
foreach (RoadObjectScript script in scripts) {
if(script.transform != transform) rObj.Add(script.transform);
}
return rObj;
}
public void OCOCOQCQCO(){

OOCQOCQOOD(OODQDDOOQC.geoResolution, false, false);
if(OCDQDOOOCO != null) OCDQDOOOCO.OCOCOQCQCO();
ODODDDOO = false;
}
public void OQCQCCOCOQ(){
OCDQDOOOCO.OQCQCCOCOQ(OODQDDOOQC.applySplatmap, OODQDDOOQC.splatmapSmoothLevel, OODQDDOOQC.renderRoad, OODQDDOOQC.tuw, OODQDDOOQC.roadResolution, OODQDDOOQC.raise, OODQDDOOQC.opacity, OODQDDOOQC.expand, OODQDDOOQC.offsetX, OODQDDOOQC.offsetY, OODQDDOOQC.beveledRoad, OODQDDOOQC.splatmapLayer, OODQDDOOQC.OdQODQOD, OOQQQDOD, OOQQQDODOffset, OOQQQDODLength);
}
public void ODCCCDDDCC(){
OCDQDOOOCO.ODCCCDDDCC(OODQDDOOQC.renderRoad, OODQDDOOQC.tuw, OODQDDOOQC.roadResolution, OODQDDOOQC.raise, OODQDDOOQC.beveledRoad, OODQDDOOQC.OdQODQOD, OOQQQDOD, OOQQQDODOffset, OOQQQDODLength);
}
public void OODQCQCQOD(Vector3 pos, bool doInsert){


if(!displayRoad){
displayRoad = true;
OCDQDOOOCO.OQDQCDCOOD(displayRoad, OODDOCQDQO);
}

int first = -1;
int second = -1;
float dist1 = 10000;
float dist2 = 10000;
Vector3 newpos = pos;
OOQDCQDDQQ k;
OOQDCQDDQQ k1 = (OOQDCQDDQQ)OCDQDOOOCO.OQDCQOCCOQ[0];
OOQDCQDDQQ k2 = (OOQDCQDDQQ)OCDQDOOOCO.OQDCQOCCOQ[1];

OCDQDOOOCO.ODOQCDDQCO(pos, out first, out second, out dist1, out dist2, out k1, out k2, out newpos);
pos = newpos;
if(doInsert && first >= 0 && second >= 0){
if(OODQDDOOQC.OOQDOOQQ && second == OCDQDOOOCO.OQDCQOCCOQ.Count - 1){
OQCOCOCQCC(pos);
}else{
k = (OOQDCQDDQQ)OCDQDOOOCO.OQDCQOCCOQ[second];
string name = k.object1.name;
string n;
int j = second + 2;
for(int i = second; i < OCDQDOOOCO.OQDCQOCCOQ.Count - 1; i++){
k = (OOQDCQDDQQ)OCDQDOOOCO.OQDCQOCCOQ[i];
if(j < 10) n = "Marker000" + j.ToString();
else if (j < 100) n = "Marker00" + j.ToString();
else n = "Marker0" + j.ToString();
k.object1.name = n;
j++;
}
k = (OOQDCQDDQQ)OCDQDOOOCO.OQDCQOCCOQ[first];
Transform newnode = (Transform)Instantiate(k.object1.transform, pos, k.object1.rotation);
newnode.gameObject.name = name;
newnode.parent = OODDOCQDQO;
MarkerScript scr = newnode.GetComponent<MarkerScript>();
scr.OQODOQQDDQ = false;
float	totalDist = dist1 + dist2;
float perc1 = dist1 / totalDist;
float paramDif = k1.ri - k2.ri;
scr.ri = k1.ri - (paramDif * perc1);
paramDif = k1.li - k2.li;
scr.li = k1.li - (paramDif * perc1);
paramDif = k1.rt - k2.rt;
scr.rt = k1.rt - (paramDif * perc1);
paramDif = k1.lt - k2.lt;
scr.lt = k1.lt - (paramDif * perc1);
paramDif = k1.rs - k2.rs;
scr.rs = k1.rs - (paramDif * perc1);
paramDif = k1.ls - k2.ls;
scr.ls = k1.ls - (paramDif * perc1);
OOCQOCQOOD(OODQDDOOQC.geoResolution, false, false);
if(materialType == 0)OCDQDOOOCO.OQCDQOOQOD(materialType);
if(objectType == 2) scr.surface.gameObject.active = false;
}
}
OCCCQCDCDC();
}
public void OQQCCQODQC(){

DestroyImmediate(OODQDDOOQC.OQQCDDDQQO.gameObject);
OQQCDDDQQO = null;
OCCCQCDCDC();
}
public void OQCDQDQQCQ(){

if(OCDQDOOOCO == null){
OODDQODCCQ(transform, null, null, null);
}
OQQCODDDQQ.OCODQQCCOD = true;
if(!OQDDDOQQOC){
geoResolution = 0.5f;
OQDDDOQQOC = true;
doTerrain = false;
OCCCQCDCDC();
if(objectType < 2) OOCDQCQOQD();
OCDQDOOOCO.terrainRendered = true;
OQCQCCOCOQ();



}
if(displayRoad && objectType < 2){
Material mat = (Material)Resources.Load("roadMaterial", typeof(Material));
if(OCDQDOOOCO.road.renderer != null){

OCDQDOOOCO.road.renderer.material = mat;
}
foreach(Transform t in OCDQDOOOCO.road.transform){
if(t.gameObject.renderer != null){
t.gameObject.renderer.material = mat;
}
}
OCDQDOOOCO.road.transform.parent = null;
OCDQDOOOCO.road.layer = 0;
OCDQDOOOCO.road.name = gameObject.name;
}
else if(OCDQDOOOCO.road != null)DestroyImmediate(OCDQDOOOCO.road);
}
public void OCQCCDQQQO(){
}
public ArrayList OOCOCCDDDQ(){
ArrayList param = new ArrayList();
foreach(Transform child in obj){
if(child.name == "Markers"){
foreach(Transform marker in child){
MarkerScript markerScript = marker.GetComponent<MarkerScript>();

param.Add(markerScript.ODDGDOOO);
param.Add(markerScript.ODDQOODO);
if(marker.name == "Marker0003"){



}
param.Add(markerScript.ODDQOOO);
}
}
}
return param;
}
public void ODDQCDCDCC(){
ArrayList arrNames = new ArrayList();
ArrayList arrInts = new ArrayList();
ArrayList arrIDs = new ArrayList();

for(int i=0;i<ODODOQQO.Length;i++){
if(ODODQQOD[i] == true){
arrNames.Add(ODODQOOQ[i]);
arrIDs.Add(ODODOQQO[i]);
arrInts.Add(i);
}
}
ODODDQOO = (string[]) arrNames.ToArray(typeof(string));
OOQQQOQO = (int[]) arrInts.ToArray(typeof(int));
}
public void OOODOQCDDD(ArrayList arr, String[] DOODQOQO, String[] OODDQOQO){
if(arr == null) return;


bool saveSOs = false;
ODODOQQO = DOODQOQO;
ODODQOOQ = OODDQOQO;






ArrayList markerArray = new ArrayList();
if(obj == null)OODDQODCCQ(transform, null, null, null);
foreach(Transform child  in obj) {
if(child.name == "Markers"){
foreach(Transform marker  in child) {
MarkerScript markerScript = marker.GetComponent<MarkerScript>();
markerScript.OQODQQDO.Clear();
markerScript.ODOQQQDO.Clear();
markerScript.OQQODQQOO.Clear();
markerScript.ODDOQQOO.Clear();
markerArray.Add(markerScript);
}
}
}
mSc = (MarkerScript[]) markerArray.ToArray(typeof(MarkerScript));





ArrayList arBools = new ArrayList();



int counter1 = 0;
int counter2 = 0;

if(ODQQQQQO != null){

if(arr.Count == 0) return;



for(int i = 0; i < ODODOQQO.Length; i++){
ODODDQQO so = (ODODDQQO)arr[i];

for(int j = 0; j < ODQQQQQO.Length; j++){
if(ODODOQQO[i] == ODQQQQQO[j]){
counter1++;


if(ODODQQOD.Length > j ) arBools.Add(ODODQQOD[j]);
else arBools.Add(false);

foreach(MarkerScript scr  in mSc) {


int l = -1;
for(int k = 0; k < scr.ODDOOQDO.Length; k++){
if(so.id == scr.ODDOOQDO[k]){
l = k;
break;
}
}
if(l >= 0){
scr.OQODQQDO.Add(scr.ODDOOQDO[l]);
scr.ODOQQQDO.Add(scr.ODDGDOOO[l]);
scr.OQQODQQOO.Add(scr.ODDQOOO[l]);

if(so.sidewaysDistanceUpdate == 0 || (so.sidewaysDistanceUpdate == 2 && (float)scr.ODDQOODO[l] != so.oldSidwaysDistance)){
scr.ODDOQQOO.Add(scr.ODDQOODO[l]);

}else{
scr.ODDOQQOO.Add(so.splinePosition);

}




}else{
scr.OQODQQDO.Add(so.id);
scr.ODOQQQDO.Add(so.markerActive);
scr.OQQODQQOO.Add(true);
scr.ODDOQQOO.Add(so.splinePosition);
}

}
}
}
if(so.sidewaysDistanceUpdate != 0){



}
saveSOs = false;
}
}


for(int i = 0; i < ODODOQQO.Length; i++){
ODODDQQO so = (ODODDQQO)arr[i];
bool flag = false;
for(int j = 0; j < ODQQQQQO.Length; j++){

if(ODODOQQO[i] == ODQQQQQO[j])flag = true;
}
if(!flag){
counter2++;

arBools.Add(false);

foreach(MarkerScript scr  in mSc) {
scr.OQODQQDO.Add(so.id);
scr.ODOQQQDO.Add(so.markerActive);
scr.OQQODQQOO.Add(true);
scr.ODDOQQOO.Add(so.splinePosition);
}

}
}

ODODQQOD = (bool[]) arBools.ToArray(typeof(bool));


ODQQQQQO = new String[ODODOQQO.Length];
ODODOQQO.CopyTo(ODQQQQQO,0);





ArrayList arInt= new ArrayList();
for(int i = 0; i < ODODQQOD.Length; i++){
if(ODODQQOD[i]) arInt.Add(i);
}
OOQQQOQO  = (int[]) arInt.ToArray(typeof(int));


foreach(MarkerScript scr  in mSc) {
scr.ODDOOQDO = (string[]) scr.OQODQQDO.ToArray(typeof(string));
scr.ODDGDOOO = (bool[]) scr.ODOQQQDO.ToArray(typeof(bool));
scr.ODDQOOO = (bool[]) scr.OQQODQQOO.ToArray(typeof(bool));
scr.ODDQOODO = (float[]) scr.ODDOQQOO.ToArray(typeof(float));

}
if(saveSOs){

}



}
public bool CheckWaterHeights(){
if(ODDQOOCDOC.terrain == null) return false;
bool flag = true;

float y = ODDQOOCDOC.terrain.transform.position.y;
foreach(Transform child  in obj) {
if(child.name == "Markers"){
foreach(Transform marker  in child) {
//MarkerScript markerScript = marker.GetComponent<MarkerScript>();
if(marker.position.y - y <= 0.1f) flag = false;
}
}
}
return flag;
}
}
