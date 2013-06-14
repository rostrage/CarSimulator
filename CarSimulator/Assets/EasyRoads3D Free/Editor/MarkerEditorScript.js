import EasyRoads3D;
@CustomEditor(MarkerScript)
@CanEditMultipleObjects
class MarkerEditorScript extends Editor
{
var oldPos : Vector3;
var pos : Vector3;
var ODOOCDQODD : GUISkin;
var OCCQOOQODO : GUISkin;
var showGui : int;
var OQCQDCDOOC : boolean;
var count:int = 0;
function OnEnable(){
if(target.objectScript == null) target.SetObjectScript();
}
function OnInspectorGUI()
{


showGui = EasyRoadsGUIMenu(false, false, target.objectScript);
if(showGui != -1 && !target.objectScript.ODODDQOO) Selection.activeGameObject =  target.transform.parent.parent.gameObject;
else if(target.objectScript.OQQCDDDQQOs.length <= 1  && !target.objectScript.ODODDDOO) ERMarkerGUI(target);
else  if(target.objectScript.OQQCDDDQQOs.length == 2 && !target.objectScript.ODODDDOO) MSMarkerGUI(target);
else if(target.objectScript.ODODDDOO)TRMarkerGUI(target);


}
function OnSceneGUI() {
if(target.objectScript.OCDQDOOOCO == null || target.objectScript.erInit == "") Selection.activeGameObject =  target.transform.parent.parent.gameObject;
else MarkerOnScene(target);
}
function EasyRoadsGUIMenu(flag : boolean, senderIsMain : boolean,  nRoadScript : RoadObjectScript) : int {
if((target.objectScript.ODDCOQQQOO == null || target.objectScript.OODQQQDQOC == null || target.objectScript.OODQDDOOQC == null) && target.objectScript.OCDQDOOOCO){
target.objectScript.ODDCOQQQOO = new boolean[5];
target.objectScript.OODQQQDQOC = new boolean[5];
target.objectScript.OODQDDOOQC = nRoadScript;

target.objectScript.ODQDQCCCOO = target.objectScript.OCDQDOOOCO.OQCDQDDCQQ();
target.objectScript.ODODQOQO = target.objectScript.OCDQDOOOCO.OODQDQDDCC();
target.objectScript.ODODQOQOInt = target.objectScript.OCDQDOOOCO.ODOOQODCQO();
}else if(target.objectScript.OCDQDOOOCO == null) return;

if(target.objectScript.ODOOCDQODD == null){
target.objectScript.ODOOCDQODD = Resources.Load("ER3DSkin", GUISkin);
target.objectScript.OQOCDODQOD = Resources.Load("ER3DLogo", Texture2D);
}
if(!flag) target.objectScript.OCCQOCQQCD();
GUI.skin = target.objectScript.ODOOCDQODD;
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal ();
GUILayout.FlexibleSpace();
target.objectScript.ODDCOQQQOO[0] = GUILayout.Toggle(target.objectScript.ODDCOQQQOO[0] ,new GUIContent("", " Add road markers. "),"AddMarkers",GUILayout.Width(40), GUILayout.Height(22));
if(target.objectScript.ODDCOQQQOO[0] == true && target.objectScript.OODQQQDQOC[0] == false) {
target.objectScript.OCCQOCQQCD();
target.objectScript.ODDCOQQQOO[0] = true;  target.objectScript.OODQQQDQOC[0] = true;
Selection.activeGameObject =  target.transform.parent.parent.gameObject;
}
target.objectScript.ODDCOQQQOO[1]  = GUILayout.Toggle(target.objectScript.ODDCOQQQOO[1] ,new GUIContent("", " Insert road markers. "),"insertMarkers",GUILayout.Width(40),GUILayout.Height(22));
if(target.objectScript.ODDCOQQQOO[1] == true && target.objectScript.OODQQQDQOC[1] == false) {
target.objectScript.OCCQOCQQCD();
target.objectScript.ODDCOQQQOO[1] = true;  target.objectScript.OODQQQDQOC[1] = true;
Selection.activeGameObject =  target.transform.parent.parent.gameObject;
}
target.objectScript.ODDCOQQQOO[2]  = GUILayout.Toggle(target.objectScript.ODDCOQQQOO[2] ,new GUIContent("", " Process the terrain and create road geometry. "),"terrain",GUILayout.Width(40),GUILayout.Height(22));

if(target.objectScript.ODDCOQQQOO[2] == true && target.objectScript.OODQQQDQOC[2] == false) {
if(target.objectScript.markers < 2){
EditorUtility.DisplayDialog("Alert", "A minimum of 2 road markers is required before the terrain can be leveled!", "Close");
target.objectScript.ODDCOQQQOO[2] = false;
}else{
target.objectScript.ODDCOQQQOO[2] = false;
Selection.activeGameObject =  target.transform.parent.parent.gameObject;





}
}
if(target.objectScript.ODDCOQQQOO[2] == false && target.objectScript.OODQQQDQOC[2] == true){

target.objectScript.OODQQQDQOC[2] = false;
Selection.activeGameObject =  target.transform.parent.parent.gameObject;
}
target.objectScript.ODDCOQQQOO[3]  = GUILayout.Toggle(target.objectScript.ODDCOQQQOO[3] ,new GUIContent("", " General settings. "),"settings",GUILayout.Width(40),GUILayout.Height(22));
if(target.objectScript.ODDCOQQQOO[3] == true && target.objectScript.OODQQQDQOC[3] == false) {
target.objectScript.OCCQOCQQCD();
target.objectScript.ODDCOQQQOO[3] = true;  target.objectScript.OODQQQDQOC[3] = true;
Selection.activeGameObject =  target.transform.parent.parent.gameObject;
}
target.objectScript.ODDCOQQQOO[4]  = GUILayout.Toggle(target.objectScript.ODDCOQQQOO[4] ,new GUIContent("", "Version and Purchase Info"),"info",GUILayout.Width(40),GUILayout.Height(22));
if(target.objectScript.ODDCOQQQOO[4] == true && target.objectScript.OODQQQDQOC[4] == false) {
target.objectScript.OCCQOCQQCD();
target.objectScript.ODDCOQQQOO[4] = true;  target.objectScript.OODQQQDQOC[4] = true;
Selection.activeGameObject =  target.transform.parent.parent.gameObject;
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
GUI.skin = null;
target.objectScript.OQCQQQDOCD = -1;
for(var i : int  = 0; i < 5; i++){
if(target.objectScript.ODDCOQQQOO[i]){
target.objectScript.OQCQQQDOCD = i;
target.objectScript.OQQCDCDOQD = i;
}
}
if(target.objectScript.OQCQQQDOCD == -1) target.objectScript.OCCQOCQQCD();
var markerMenuDisplay : int = 1;
if(target.objectScript.OQCQQQDOCD == 0 || target.objectScript.OQCQQQDOCD == 1) markerMenuDisplay = 0;
else if(target.objectScript.OQCQQQDOCD == 2 || target.objectScript.OQCQQQDOCD == 3 || target.objectScript.OQCQQQDOCD == 4) markerMenuDisplay = 0;
if(target.objectScript.OQDDDOQQOC && !target.objectScript.ODDCOQQQOO[2] && !target.objectScript.ODODDQOO){
target.objectScript.OQDDDOQQOC = false;
if(target.objectScript.objectType != 2)target.objectScript.OCOCOQCQCO();
if(target.objectScript.objectType == 2 && target.objectScript.OQDDDOQQOC){
Debug.Log("restore");
target.objectScript.OCDQDOOOCO.ODQQQQOCDD(target.transform, true);
}
}
GUI.skin.box.alignment = TextAnchor.UpperLeft;
if(target.objectScript.OQCQQQDOCD >= 0 && target.objectScript.OQCQQQDOCD != 4){
if(target.objectScript.ODQDQCCCOO == null || target.objectScript.ODQDQCCCOO.Length == 0){

target.objectScript.ODQDQCCCOO = target.objectScript.OCDQDOOOCO.OQCDQDDCQQ();
target.objectScript.ODODQOQO = target.objectScript.OCDQDOOOCO.OODQDQDDCC();
target.objectScript.ODODQOQOInt = target.objectScript.OCDQDOOOCO.ODOOQODCQO();
}
EditorGUILayout.BeginHorizontal();
GUILayout.Box(target.objectScript.ODQDQCCCOO[target.objectScript.OQCQQQDOCD], GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(50));
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
}
return target.objectScript.OQCQQQDOCD;
}
function ERMarkerGUI( markerScript : MarkerScript){
EditorGUILayout.Space();
GUILayout.Box(" Marker: " + (target.markerNum + 1).ToString(), GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
if(target.distance == "-1" && target.objectScript.OCDQDOOOCO != null){
var arr = target.objectScript.OCDQDOOOCO.ODCODCOQOD(target.markerNum);
target.distance = arr[0];
target.OQDQDOOCDO = arr[1];
target.OODCQCQOQQ = arr[2];
}
GUILayout.Label(" Total Distance to Marker: " + target.distance.ToString() + " km");
GUILayout.Label(" Segment Distance to Marker: " + target.OQDQDOOCDO.ToString() + " km");
GUILayout.Label(" Marker Distance: " + target.OODCQCQOQQ.ToString() + " m");
EditorGUILayout.Space();
GUILayout.Box(" Marker Settings", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
var oldss : boolean = markerScript.OCOQCDCCCD;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Soft Selection", "When selected, the settings of other road markers within the selected distance will change according their distance to this marker."),  GUILayout.Width(105));
GUI.SetNextControlName ("OCOQCDCCCD");
markerScript.OCOQCDCCCD = EditorGUILayout.Toggle (markerScript.OCOQCDCCCD);
EditorGUILayout.EndHorizontal();
if(markerScript.OCOQCDCCCD){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("         Distance", "The soft selection distance within other markers should change too."),  GUILayout.Width(105));
markerScript.ODOCQOOOQC = EditorGUILayout.Slider(markerScript.ODOCQOOOQC, 0, 500);
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
}
if(oldss != markerScript.ODOCQOOOQC) target.objectScript.ResetMaterials(markerScript);
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Left Indent", "The distance from the left side of the road to the part of the terrain levelled at the same height as the road") ,  GUILayout.Width(105));
GUI.SetNextControlName ("ri");
oldfl = markerScript.ri;
markerScript.ri = EditorGUILayout.Slider(markerScript.ri, target.objectScript.indent, 100);
EditorGUILayout.EndHorizontal();
if(oldfl != markerScript.ri){
target.objectScript.OCDQCQQQCD("ri", markerScript);
markerScript.OOQOQQOO = markerScript.ri;
}
GUI.enabled = true;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Right Indent", "The distance from the right side of the road to the part of the terrain levelled at the same height as the road") ,  GUILayout.Width(105));
oldfl = markerScript.li;
markerScript.li =  EditorGUILayout.Slider(markerScript.li, target.objectScript.indent, 100);
EditorGUILayout.EndHorizontal();
if(oldfl != markerScript.li){
target.objectScript.OCDQCQQQCD("li", markerScript);
markerScript.ODODQQOO = markerScript.li;
}
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Left Surrounding", "This represents the distance over which the terrain will be gradually leveled on the left side of the road to the original terrain height"),  GUILayout.Width(105));
oldfl = markerScript.rs;
GUI.SetNextControlName ("rs");
markerScript.rs = EditorGUILayout.Slider(markerScript.rs,  target.objectScript.indent, 100);
EditorGUILayout.EndHorizontal();
if(oldfl != markerScript.rs){
target.objectScript.OCDQCQQQCD("rs", markerScript);
markerScript.ODOQQOOO = markerScript.rs;
}
GUI.enabled = true;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Right Surrounding", "This represents the distance over which the terrain will be gradually leveled on the right side of the road to the original terrain height"),  GUILayout.Width(105));
oldfl = markerScript.ls;
markerScript.ls = EditorGUILayout.Slider(markerScript.ls,  target.objectScript.indent, 100);
EditorGUILayout.EndHorizontal();
if(oldfl != markerScript.ls){
target.objectScript.OCDQCQQQCD("ls", markerScript);
markerScript.DODOQQOO = markerScript.ls;
}
if(target.objectScript.objectType == 0){
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
oldfl = markerScript.rt;
GUILayout.Label(new GUIContent("    Left Tilting", "Use this setting to tilt the road on the left side (m)."),  GUILayout.Width(105));
markerScript.rt = EditorGUILayout.Slider(markerScript.rt, 0, target.objectScript.roadWidth * 0.5f);
EditorGUILayout.EndHorizontal();
if(oldfl != markerScript.rt){
target.objectScript.OCDQCQQQCD("rt", markerScript);
markerScript.ODDQODOO = markerScript.rt;
}
GUI.enabled = true;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Right Tilting", "Use this setting to tilt the road on the right side (cm)."),  GUILayout.Width(105));
oldfl = markerScript.lt;
markerScript.lt = EditorGUILayout.Slider(markerScript.lt, 0, target.objectScript.roadWidth * 0.5f);
EditorGUILayout.EndHorizontal();
if(oldfl != markerScript.lt){
target.objectScript.OCDQCQQQCD("lt", markerScript);
markerScript.ODDOQOQQ = markerScript.lt;
}
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Bridge Object", "When selected this road segment will be treated as a bridge segment."),  GUILayout.Width(105));
GUI.SetNextControlName ("bridgeObject");
markerScript.bridgeObject = EditorGUILayout.Toggle (markerScript.bridgeObject);
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
if(markerScript.bridgeObject){
GUILayout.Label(new GUIContent("      Distribute Heights", "When selected the terrain, the terrain will be gradually leveled between the height of this road segment and the current terrain height of the inner bridge segment."),  GUILayout.Width(135));
GUI.SetNextControlName ("distHeights");
markerScript.distHeights = EditorGUILayout.Toggle (markerScript.distHeights);
}
EditorGUILayout.EndHorizontal();
GUI.enabled = true;
}else{
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Floor Depth", "Use this setting to change the floor depth for this marker."),  GUILayout.Width(105));
oldfl = markerScript.floorDepth;
markerScript.floorDepth = EditorGUILayout.Slider(markerScript.floorDepth, 0, 50);
EditorGUILayout.EndHorizontal();
if(oldfl != markerScript.floorDepth){
target.objectScript.OCDQCQQQCD("floorDepth", markerScript);
markerScript.oldFloorDepth = markerScript.floorDepth;
}
}
EditorGUILayout.Space();
GUI.enabled = false;
if(target.objectScript.objectType == 0){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Start New LOD Segment", "Use this to split the road or river object in segments to use in LOD system."),  GUILayout.Width(170));
markerScript.newSegment = EditorGUILayout.Toggle (markerScript.newSegment);
EditorGUILayout.EndHorizontal();
}
GUI.enabled = true;
EditorGUILayout.Space();
if(!markerScript.autoUpdate){
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Refresh Surface", GUILayout.Width(225))){
target.objectScript.OOQOQQDQCO();
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
}
if (GUI.changed && !target.objectScript.OOQDQDOCQD){
target.objectScript.OOQDQDOCQD = true;
}else if(target.objectScript.OOQDQDOCQD){
target.objectScript.OQQCCCOCOO(markerScript);
target.objectScript.OOQDQDOCQD = false;
}
oldfl = markerScript.rs;
}
function MSMarkerGUI( markerScript : MarkerScript){
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button (new GUIContent(" Align XYZ", "Click to distribute the x, y and z values of all markers in between the selected markers in a line between the selected markers."), GUILayout.Width(150))){
Undo.RegisterUndo(target.transform.parent.GetComponentsInChildren(typeof(Transform)), "Marker align");
target.objectScript.OCDQDOOOCO.OCQOOQQCCO(target.objectScript.OQQCDDDQQOs, 0);
target.objectScript.OOQOQQDQCO();
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button (new GUIContent(" Align XZ", "Click to distribute the x and z values of all markers in between the selected markers in a line between the selected markers."), GUILayout.Width(150))){
Undo.RegisterUndo(target.transform.parent.GetComponentsInChildren(typeof(Transform)), "Marker align");
target.objectScript.OCDQDOOOCO.OCQOOQQCCO(target.objectScript.OQQCDDDQQOs, 1);
target.objectScript.OOQOQQDQCO();
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button (new GUIContent(" Align XZ  Snap Y", "Click to distribute the x and z values of all markers in between the selected markers in a line between the selected markers and snap the y value to the terrain height at the new position."), GUILayout.Width(150))){
Undo.RegisterUndo(target.transform.parent.GetComponentsInChildren(typeof(Transform)), "Marker align");
target.objectScript.OCDQDOOOCO.OCQOOQQCCO(target.objectScript.OQQCDDDQQOs, 2);
target.objectScript.OOQOQQDQCO();
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button (new GUIContent(" Average Heights ", "Click to distribute the heights all markers in between the selected markers."), GUILayout.Width(150))){
Undo.RegisterUndo(target.transform.parent.GetComponentsInChildren(typeof(Transform)), "Marker align");
target.objectScript.OCDQDOOOCO.OCQOOQQCCO(target.objectScript.OQQCDDDQQOs, 3);
target.objectScript.OOQOQQDQCO();
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
EditorGUILayout.Space();
}
function TRMarkerGUI(markerScript : MarkerScript){
EditorGUILayout.Space();
}
function MarkerOnScene(markerScript : MarkerScript){
var cEvent : Event = Event.current;

if(!target.objectScript.ODODDDOO || target.objectScript.objectType == 2){
if(cEvent.shift && (target.objectScript.OQQCDCDOQD == 0 || target.objectScript.OQQCDCDOQD == 1)) {
Selection.activeGameObject =  markerScript.transform.parent.parent.gameObject;
}else if(cEvent.shift && target.objectScript.OQQCDDDQQO != target.transform){
target.objectScript.ODOODCCQOC(markerScript);
Selection.objects = target.objectScript.OQQCDDDQQOs;
}else if(target.objectScript.OQQCDDDQQO != target.transform && count == 0){
if(!target.InSelected()){
target.objectScript.OQQCDDDQQOs = new GameObject[0];
target.objectScript.ODOODCCQOC(markerScript);
Selection.objects = target.objectScript.OQQCDDDQQOs;


count++;
}

}else{
pos = markerScript.oldPos;
if(pos  != oldPos && !markerScript.changed){
oldPos = pos;
if(!cEvent.shift){
target.objectScript.OCOODDOODQ(markerScript);
}
}
}
if(cEvent.shift && markerScript.changed){
OQCQDCDOOC = true;
}
markerScript.changed = false;
if(!cEvent.shift && OQCQDCDOOC){
target.objectScript.OCOODDOODQ(markerScript);
OQCQDCDOOC = false;
}
}

}
}
