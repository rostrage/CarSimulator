import EasyRoads3D;
import EasyRoads3DEditor;
@CustomEditor(RoadObjectScript)
class RoadObjectEditorScript extends Editor
{
var counter : int;
var pe : float;
var tv : boolean;
var tvDone : boolean;
var debugDone : boolean;
var res : boolean;
var col : Collider;

function OnEnable(){

target.backupLocation = EditorPrefs.GetInt("ER3DbckLocation", 0);

if(target.OCDQDOOOCO == null){
OOQQQDDDQQ();
target.ODQQDDQDDO(null, null, null);
}
if(target.customMesh != null){
if(target.customMesh.GetComponent(typeof(Collider))){
col = target.customMesh.GetComponent(typeof(Collider));
}else if(ODDQOOCDOC.terrain != null){
col = ODDQOOCDOC.terrain.GetComponent(typeof(TerrainCollider));
}
}else if(ODDQOOCDOC.terrain != null){
col = ODDQOOCDOC.terrain.GetComponent(typeof(TerrainCollider));
}

if(OOQQQDDDQQ()){
ODDQOOCDOC.OCCCOCQQCO();
}
target.OQQCDDDQQOs = new GameObject[0];




}
function OnInspectorGUI(){

EasyRoadsGUIMenu(true, true, target);
}
function OnSceneGUI() {
if(target.OCDQDOOOCO == null){
OOQQQDDDQQ();
target.ODQQDDQDDO(null, null, null);
if(target.ODQCOQQQOC != EditorApplication.currentScene && target.OCDQDOOOCO == null){
OQQCODDDQQ.terrainList.Clear();
target.ODQCOQQQOC = EditorApplication.currentScene;
}

}

OnScene();

}
function EasyRoadsGUIMenu(flag : boolean, senderIsMain : boolean,  nRoadScript : RoadObjectScript) : int {





if(target.ODDCOQQQOO == null || target.OODQQQDQOC == null || target.OODQDDOOQC == null || target.ODDCOQQQOO.Length == 0 ){
target.ODDCOQQQOO = new boolean[5];
target.OODQQQDQOC = new boolean[5];
target.OODQDDOOQC = nRoadScript;

target.ODQDQCCCOO = target.OCDQDOOOCO.OQCDQDDCQQ();
target.ODODQOQO = target.OCDQDOOOCO.OODQDQDDCC();
target.ODODQOQOInt = target.OCDQDOOOCO.ODOOQODCQO();
}
origAnchor = GUI.skin.box.alignment;
if(target.ODOOCDQODD == null){
target.ODOOCDQODD = Resources.Load("ER3DSkin", GUISkin);
target.OQOCDODQOD = Resources.Load("ER3DLogo", Texture2D);
}
if(!flag) target.OCCQOCQQCD();
if(target.OQCQQQDOCD == -1) target.OQQCDDDQQO = null;
var origSkin : GUISkin = GUI.skin;
GUI.skin = target.ODOOCDQODD;
EditorGUILayout.Space();

EditorGUILayout.BeginHorizontal ();
GUILayout.FlexibleSpace();
target.ODDCOQQQOO[0] = GUILayout.Toggle(target.ODDCOQQQOO[0] ,new GUIContent("", " Add road markers. "),"AddMarkers",GUILayout.Width(40), GUILayout.Height(22));
if(target.ODDCOQQQOO[0] == true && target.OODQQQDQOC[0] == false) {
target.OCCQOCQQCD();
target.ODDCOQQQOO[0] = true;  target.OODQQQDQOC[0] = true;
}
target.ODDCOQQQOO[1]  = GUILayout.Toggle(target.ODDCOQQQOO[1] ,new GUIContent("", " Insert road markers. "),"insertMarkers",GUILayout.Width(40),GUILayout.Height(22));
if(target.ODDCOQQQOO[1] == true && target.OODQQQDQOC[1] == false) {
target.OCCQOCQQCD();
target.ODDCOQQQOO[1] = true;  target.OODQQQDQOC[1] = true;
}
target.ODDCOQQQOO[2]  = GUILayout.Toggle(target.ODDCOQQQOO[2] ,new GUIContent("", " Process the terrain and create road geometry. "),"terrain",GUILayout.Width(40),GUILayout.Height(22));

if(target.ODDCOQQQOO[2] == true && (target.OODQQQDQOC[2] == false || target.doTerrain)) {

if(target.markers <= 2){
EditorUtility.DisplayDialog("Alert", "A minimum of 3 road markers is required before the terrain can be leveled!", "Close");
target.ODDCOQQQOO[2] = false;
}else{
if(target.disableFreeAlerts)EditorUtility.DisplayDialog("Alert", "Note that switching back to 'Edit Mode' is not supported in the free version\n\nClick Close to generate the road mesh and deform the terrain. This process can take some time depending on the terrains heightmap resolution and the optional vegetation removal, please be patient!\n\nYou can always use Undo afterwards to restore the terrain.", "Close");
if(!flag){
EditorUtility.DisplayDialog("Alert", "The Unity Terrain Object does not accept height values < 0. The river floor will be equal or higher then the water level. Position all markers higher above the terrain!", "Close");
target.ODDCOQQQOO[2] = false;
}else{
tvDone = false;
target.OCCQOCQQCD();
target.ODDCOQQQOO[2] = true;  target.OODQQQDQOC[2] = true;
target.OQDDDOQQOC = true;
target.doTerrain = false;
target.markerDisplayStr = "Show Markers";
if(target.objectType < 2){




Undo.RegisterUndo(ODDQOOCDOC.terrain.terrainData, "EasyRoads3D Terrain leveling");




if(!target.displayRoad){
target.displayRoad = true;
target.OCDQDOOOCO.OQDQCDCOOD(true, target.OODDOCQDQO);
}
OQQCODDDQQ.OCODQQCCOD = false;

OQOODODOCC(target);
if(target.OOQDOOQQ)target.OQCQCCOCOQ();



}else{

target.OCDQDOOOCO.ODQQQQOCDD(target.transform, false);
}
} 
}
}

target.ODDCOQQQOO[3]  = GUILayout.Toggle(target.ODDCOQQQOO[3] ,new GUIContent("", " General settings. "),"settings",GUILayout.Width(40),GUILayout.Height(22));
if(target.ODDCOQQQOO[3] == true && target.OODQQQDQOC[3] == false) {
target.OCCQOCQQCD();
target.ODDCOQQQOO[3] = true;  target.OODQQQDQOC[3] = true;
}
target.ODDCOQQQOO[4]  = GUILayout.Toggle(target.ODDCOQQQOO[4] ,new GUIContent("", "Version and Purchase Info"),"info",GUILayout.Width(40),GUILayout.Height(22));
if(target.ODDCOQQQOO[4] == true && target.OODQQQDQOC[4] == false) {
target.OCCQOCQQCD();
target.ODDCOQQQOO[4] = true;  target.OODQQQDQOC[4] = true;
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
GUI.skin = null;
GUI.skin = origSkin;
target.OQCQQQDOCD = -1;
for(var i : int  = 0; i < 5; i++){
if(target.ODDCOQQQOO[i]){
target.OQCQQQDOCD = i;
target.OQQCDCDOQD = i;
}
}
if(target.OQCQQQDOCD == -1) target.OCCQOCQQCD();
var markerMenuDisplay : int = 1;
if(target.OQCQQQDOCD == 0 || target.OQCQQQDOCD == 1) markerMenuDisplay = 0;
else if(target.OQCQQQDOCD == 2 || target.OQCQQQDOCD == 3 || target.OQCQQQDOCD == 4) markerMenuDisplay = 0;

if(target.OQDDDOQQOC && !target.ODDCOQQQOO[2] && Application.isPlaying){
EditorPrefs.SetBool("ERv2isPlaying", true);

}







if(target.OQDDDOQQOC && !target.ODDCOQQQOO[2]){ 
target.ODDCOQQQOO[2] = true;
target.OODQQQDQOC[2] = true;
if(target.disableFreeAlerts)EditorUtility.DisplayDialog("Alert", "Switching back to 'Edit Mode' to add markers marker settings is not supported in the free version\n\nDrag the road mesh to the root of the hierarchy and delete the EasyRoads3D editor object once the road is ready!\n\nYou can use Undo to restore the terrain.", "Close");
}
GUI.skin.box.alignment = TextAnchor.UpperLeft;
if(target.OQCQQQDOCD >= 0 && target.OQCQQQDOCD != 4){
if(target.ODQDQCCCOO == null || target.ODQDQCCCOO.Length == 0){

target.ODQDQCCCOO = target.OCDQDOOOCO.OQCDQDDCQQ();
target.ODODQOQO = target.OCDQDOOOCO.OODQDQDDCC();
target.ODODQOQOInt = target.OCDQDOOOCO.ODOOQODCQO();
}
EditorGUILayout.BeginHorizontal();
GUILayout.Box(target.ODQDQCCCOO[target.OQCQQQDOCD], GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(50));
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
}
if(target.OQCQQQDOCD == -1 && target.OQQCDDDQQO != null) Selection.activeGameObject =  target.OQQCDDDQQO.gameObject;
GUI.skin.box.alignment = origAnchor;

if(target.erInit == "" || (OQQCODDDQQ.debugFlag && !debugDone)){
debugDone = true;
target.erInit = "done";
target.OCDQDOOOCO.erInit = target.erInit;



this.Repaint();

}
if(target.erInit != "" && res){

target.OOCQOCQOOD(target.geoResolution, false, false);
res = false;
}
if(target.erInit.Length == 0){
}else if(target.OQCQQQDOCD == 0 || target.OQCQQQDOCD == 1){
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Refresh Surfaces", GUILayout.Width(200))){
target.OCCCQCDCDC();
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
}else if(target.OQCQQQDOCD == 3){

GUI.skin.box.alignment = TextAnchor.MiddleLeft;
GUILayout.Box(" General Settings", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
if(target.objectType != 2){
GUILayout.Space(10);
var oldDisplay : boolean = target.displayRoad;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Display object", "This will activate/deactivate the road object transforms"), GUILayout.Width(125) );
target.displayRoad = EditorGUILayout.Toggle (target.displayRoad);
EditorGUILayout.EndHorizontal();
if(oldDisplay != target.displayRoad){
target.OCDQDOOOCO.OQDQCDCOOD(target.displayRoad, target.OODDOCQDQO);
}
}
if(target.materialStrings == null){target.materialStrings = new String[2]; target.materialStrings[0] = "Diffuse Shader"; target.materialStrings[1] = "Transparent Shader"; }
if(target.materialStrings.Length == 0){target.materialStrings = new String[2]; target.materialStrings[0] = "Diffuse Shader"; target.materialStrings[1] = "Transparent Shader"; }
var cm : int = target.materialType;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Surface Material", "The material type used for the road surfaces."), GUILayout.Width(125) );
target.materialType = EditorGUILayout.Popup (target.materialType, target.materialStrings,   GUILayout.Width(115));
EditorGUILayout.EndHorizontal();
if(cm != target.materialType) target.OCDQDOOOCO.OQCDQOOQOD(target.materialType);
if(target.materialType == 1){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("        Surface Opacity", "This controls the transparacy level of the surface objects."), GUILayout.Width(125) );
var so : float = target.surfaceOpacity;
target.surfaceOpacity = EditorGUILayout.Slider(target.surfaceOpacity, 0, 1,  GUILayout.Width(150));
EditorGUILayout.EndHorizontal();
if(so != target.surfaceOpacity) target.OCDQDOOOCO.ODOOCCDQDQ(target.surfaceOpacity);
}
EditorGUILayout.Space();
if(target.objectType < 2){
var od: boolean = target.multipleTerrains;
}
GUI.enabled = true;
GUI.enabled = false;
var cl = target.backupLocation;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Backup Location", "Use outside Assets folder unless you are using the asset server."), GUILayout.Width(125) );
target.backupLocation = EditorGUILayout.Popup (target.backupLocation, target.backupStrings,   GUILayout.Width(115));
EditorGUILayout.EndHorizontal();
if(target.backupLocation != cl){
if(target.backupLocation == 1){
if(EditorUtility.DisplayDialog("Backup Location", "Changing the backup location to inside the assets folder is only recommended when you want to synchronize EasyRoads3D backup files with the assetserver.\n\nWould you like to continue?", "Yes", "No")){
EditorPrefs.SetInt("ER3DbckLocation", target.backupLocation);
OQDCCCDDCD.SwapFiles(target.backupLocation);
EditorUtility.DisplayDialog("Confirmation", "The backup location has been updated, all backup folders and files have been copied to the new location.\n\nUse CTRL+R to update the assets folder!", "Close");
}else target.backupLocation = 0;
}else{
if(EditorUtility.DisplayDialog("Backup Location", "The backup location will be changed to outside the assets folder.\n\nWould you like to continue?", "Yes", "No")){
EditorPrefs.SetInt("ER3DbckLocation", target.backupLocation);
OQDCCCDDCD.SwapFiles(target.backupLocation);
EditorUtility.DisplayDialog("Confirmation", "The backup location has been updated, all backup folders and files have been copied to the new location.\n\nUse CTRL+R to update the assets folder!", "Close");
}else target.backupLocation = 1;
}
}
GUI.enabled = true;
od = OQQCODDDQQ.debugFlag;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Enable Debugging", "This will enable debugging."), GUILayout.Width(125) );;
OQQCODDDQQ.debugFlag = EditorGUILayout.Toggle (OQQCODDDQQ.debugFlag);
EditorGUILayout.EndHorizontal();
if(od != OQQCODDDQQ.debugFlag && OQQCODDDQQ.debugFlag) debugDone = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Free version alerts", "Uncheck to disable free version alerts."), GUILayout.Width(125) );;
target.disableFreeAlerts = EditorGUILayout.Toggle (target.disableFreeAlerts);
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
GUILayout.Box(" Object Settings", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
EditorGUILayout.BeginHorizontal();
var wd : float = target.roadWidth;
if(target.objectType == 0)GUILayout.Label(new GUIContent("    Road width", "The width of the road") ,  GUILayout.Width(125));
else GUILayout.Label(new GUIContent("    River Width", "The width of the river") ,  GUILayout.Width(125));
target.roadWidth = EditorGUILayout.FloatField(target.roadWidth, GUILayout.Width(40) );
EditorGUILayout.EndHorizontal();
if(wd != target.roadWidth) target.OOCQOCQOOD(target.geoResolution, false, false);
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Default Indent", "The distance from the left and right side of the road to the part of the terrain levelled at the same height as the road"),  GUILayout.Width(125));
target.indent = EditorGUILayout.FloatField(target.indent, GUILayout.Width(40));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Raise Markers", "This will raise the position of the markers (m)."), GUILayout.Width(125) );;
target.raiseMarkers = EditorGUILayout.FloatField (target.raiseMarkers, GUILayout.Width(40));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Force Y Position", "When toggled on, ne road markers will inherit the y position of the previous marker."), GUILayout.Width(125) );;
target.forceY = EditorGUILayout.Toggle (target.forceY);
EditorGUILayout.EndHorizontal();
if(target.forceY){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("        Y Change", "The marker will be raised / lowered according this amount for every 100 meters."), GUILayout.Width(125) );;
target.yChange = EditorGUILayout.FloatField (target.yChange, GUILayout.Width(40));
EditorGUILayout.EndHorizontal();
}
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Surrounding", "This represents the distance over which the terrain will be gradually leveled to the original terrain height"),  GUILayout.Width(125));
target.surrounding = EditorGUILayout.FloatField(target.surrounding, GUILayout.Width(40));
EditorGUILayout.EndHorizontal();
var OldClosedTrack : boolean = target.OOQDOOQQ;
EditorGUILayout.BeginHorizontal();
if(target.objectType == 0)GUILayout.Label(new GUIContent("    Closed Track", "This will connect the 'start' and 'end' of the road"), GUILayout.Width(125) );
else if(target.objectType == 1)GUILayout.Label(new GUIContent("    Closed River", "This will connect the 'start' and 'end' of the river"), GUILayout.Width(125) );
else GUILayout.Label(new GUIContent("    Closed Object", "This will connect the 'start' and 'end' of the object"), GUILayout.Width(125) );
target.OOQDOOQQ = EditorGUILayout.Toggle (target.OOQDOOQQ);
EditorGUILayout.EndHorizontal();
if(OldClosedTrack != target.OOQDOOQQ){
target.OCCCQCDCDC();
}
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Geometry Resolution", "The polycount of the generated surfaces. It is recommended to use a low resolution while creating the road. Use the maximum resolution when processing the final terrain."), GUILayout.Width(125) );
var gr : float = target.geoResolution;
target.geoResolution = EditorGUILayout.Slider(target.geoResolution, 0.5, 5,  GUILayout.Width(150));
EditorGUILayout.EndHorizontal();
if(gr != target.geoResolution) target.OOCQOCQOOD(target.geoResolution, false, false);
EditorGUILayout.Space();
GUILayout.Box(" Render Settings", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
if(ODDQOOCDOC.selectedTerrain == null)ODDQOOCDOC.OCCCOCQQCO();
var st : int = ODDQOOCDOC.selectedTerrain;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Active Terrain", "The terrain that will be updated"), GUILayout.Width(125) );
ODDQOOCDOC.selectedTerrain = EditorGUILayout.Popup (ODDQOOCDOC.selectedTerrain, ODDQOOCDOC.terrainStrings,   GUILayout.Width(115));
EditorGUILayout.EndHorizontal();
if(st != ODDQOOCDOC.selectedTerrain)ODDQOOCDOC.OOCDQCOQDO();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Update Vegetation", "When toggled on tree and detail objects near the road will be removed when rendering the terrain."), GUILayout.Width(125) );;
target.handleVegetation = EditorGUILayout.Toggle (target.handleVegetation);
EditorGUILayout.EndHorizontal();
if(target.handleVegetation){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("      Tree Distance (m)", "The distance from the left and the right of the road up to which terrain trees should be removed."), GUILayout.Width(125) );
var tr : float = target.OCQOCOCDOQ;
target.OCQOCOCDOQ = EditorGUILayout.Slider(target.OCQOCOCDOQ, 0, 25,  GUILayout.Width(150));
EditorGUILayout.EndHorizontal();
if(tr != target.OCQOCOCDOQ) target.OCDQDOOOCO.OCQOCOCDOQ = target.OCQOCOCDOQ;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("      Detail Distance (m)", "The distance from the left and the right of the road up to which terrain detail opbjects should be removed."), GUILayout.Width(125) );
tr = target.OQCOOCDOCO;
target.OQCOOCDOCO = EditorGUILayout.Slider(target.OQCOOCDOCO, 0, 25,  GUILayout.Width(150));
EditorGUILayout.EndHorizontal();
if(tr != target.OQCOOCDOCO) target.OCDQDOOOCO.OQCOOCDOCO = target.OQCOOCDOCO;
}
EditorGUILayout.Space();


}else if(target.OQCQQQDOCD == 2){

EditorGUILayout.Space();
if(target.objectType == 0)GUILayout.Box(" Road Settings:", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
else GUILayout.Box(" River Settings:", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
GUILayout.Space(10);
var oldRoad : boolean = target.renderRoad;
var oldRoadResolution : float = target.roadResolution;
var oldRoadUV : float = target.tuw;
var oldRaise : float = target.raise;
var oldSegments : int = target.OdQODQOD;
var oldOOQQQDOD : float = target.OOQQQDOD;
var oldOOQQQDODOffset : float = target.OOQQQDODOffset;
var oldOOQQQDODLength : float = target.OOQQQDODLength;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Render"," When active, terrain matching road geometry will be created."), GUILayout.Width(105) );
target.renderRoad = EditorGUILayout.Toggle (target.renderRoad);
EditorGUILayout.EndHorizontal();
if(target.renderRoad){
if(target.objectType == 0){
if(target.roadTexture == null){
mat = Resources.Load("roadMaterial", typeof(Material));
target.roadTexture = mat.mainTexture;
}
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Material"," The road texture."), GUILayout.Width(105) );
if(GUILayout.Button (target.roadTexture, GUILayout.Width(75), GUILayout.Height(75))){
}
EditorGUILayout.EndHorizontal();
GUI.enabled = true;
}
EditorGUILayout.BeginHorizontal();
GUI.enabled = false;
GUILayout.Label(new GUIContent(" Road Segments"," The number of segments over the width of the road."), GUILayout.Width(105) );
target.OdQODQOD = EditorGUILayout.IntSlider(target.OdQODQOD, 1, 10,  GUILayout.Width(175));
GUI.enabled = true;
EditorGUILayout.EndHorizontal();
if(target.OdQODQOD > 1){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Bumpyness"," The bumypness of the surface of the road."), GUILayout.Width(95) );
target.OOQQQDOD = EditorGUILayout.Slider(target.OOQQQDOD, 0, 1,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Bumpyness Offset"," The bumypness variation of the road."), GUILayout.Width(95) );
target.OOQQQDODOffset = EditorGUILayout.Slider(target.OOQQQDODOffset, 0, 1,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Bumpyness Density"," The bumypness density on the road."), GUILayout.Width(95) );
target.OOQQQDODLength = EditorGUILayout.Slider(target.OOQQQDODLength, 0.01, 1,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
}
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Resolution"," The resolution level of the road geometry."), GUILayout.Width(95) );
target.roadResolution = EditorGUILayout.IntSlider(target.roadResolution, 1, 10,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUI.enabled = true;
if(target.objectType == 0){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" UV Mapping"," Use the slider to control texture uv mapping of the road geometry."), GUILayout.Width(95) );
target.tuw = EditorGUILayout.Slider(target.tuw, 1, 30,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Raise (cm)","Optionally increase this setting when parts of the terrain stick through the road geometry. It is recommended to adjust these areas using the terrain tools!"), GUILayout.Width(95) );
target.raise = EditorGUILayout.Slider(target.raise, 0, 100, GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
}else{
}
GUILayout.Space(5);
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Save Geometry", GUILayout.Width(175))){
target.OCQCCDQQQO();
Debug.Log("Road object geometry saved");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
GUI.enabled = true;
}
EditorGUILayout.Space();
if(oldRoad != target.renderRoad || oldRoadResolution != target.roadResolution || oldRoadUV != target.tuw || oldRaise != target.raise || oldSegments != target.OdQODQOD || target.OOQQQDOD != oldOOQQQDOD || target.OOQQQDODOffset != oldOOQQQDODOffset || target.OOQQQDODLength != oldOOQQQDODLength){

target.ODCCCDDDCC();

}
GUILayout.Box(" Terrain Settings:", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
GUILayout.Space(5);
var oldApplySplatmap : boolean = target.applySplatmap;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Apply Splatmap"," When active, the road will be added to the terrain splatmap. The quality highly depends on the terrain Control Texture Resolution size."), GUILayout.Width(125) );
target.applySplatmap = EditorGUILayout.Toggle (target.applySplatmap);
EditorGUILayout.EndHorizontal();
if(target.applySplatmap){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Terrain texture", "This represents the terrain texture which will be used for the road spatmap."), GUILayout.Width(125) );
target.splatmapLayer = EditorGUILayout.IntPopup (target.splatmapLayer, target.ODODQOQO, target.ODODQOQOInt,   GUILayout.Width(120));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Expand"," Use this setting to increase the size of the splatmap."), GUILayout.Width(125) );
target.expand = EditorGUILayout.IntSlider(target.expand,0, 3, GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Smooth Level"," Use this setting to blur the road splatmap for smoother results."), GUILayout.Width(125) );
target.splatmapSmoothLevel = EditorGUILayout.IntSlider (target.splatmapSmoothLevel, 0, 3,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Offset x"," Moves the road splatmap in the x direction."), GUILayout.Width(125) );
target.offsetX = EditorGUILayout.IntField (target.offsetX, GUILayout.Width(50));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Offset y"," Moves the road splatmap in the y direction."), GUILayout.Width(125) );
target.offsetY= EditorGUILayout.IntField (target.offsetY, GUILayout.Width(50));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Opacity","Use this setting to blend the road splatmap with the terrain splatmap."), GUILayout.Width(125) );
target.opacity = EditorGUILayout.Slider (target.opacity, 0, 1,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUILayout.Space(5);
GUI.enabled = target.OQCDQDDODD;
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Apply Changes", GUILayout.Width(175))){
target.OQCQCCOCOQ();

if(target.OOQDOOQQ)target.OQCQCCOCOQ();
target.OQCDQDDODD = false;
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
}
GUILayout.Space(5);
if(oldApplySplatmap != target.applySplatmap){
target.OQCQCCOCOQ();

if(target.OOQDOOQQ)target.OQCQCCOCOQ();
}
GUI.enabled = true;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Terrain Smoothing:", "This will smoothen the terrain near the surface edges according the below distance."), GUILayout.Width(175) );
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Edges (m)","This represents the smoothen distance."), GUILayout.Width(125) );
target.smoothDistance = EditorGUILayout.Slider (target.smoothDistance, 0, 5,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUILayout.Space(5);
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Update Edges", GUILayout.Width(175))){

Undo.RegisterUndo(ODDQOOCDOC.terrain.terrainData, "EasyRoads3D Terrain smooth");
target.OCDQDOOOCO.OQDDQQDDOQ(target.smoothDistance, 0);
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Surrounding (m)","This represents the smoothen distance."), GUILayout.Width(125) );
target.smoothSurDistance = EditorGUILayout.Slider (target.smoothSurDistance, 0, 15,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUILayout.Space(5);
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Update Surrounding", GUILayout.Width(175))){

Undo.RegisterUndo(ODDQOOCDOC.terrain.terrainData, "EasyRoads3D Terrain smooth");
target.OCDQDOOOCO.OQDDQQDDOQ(target.smoothSurDistance, 1);
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
}else if(target.OQCQQQDOCD == 4){
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();

GUILayout.Label(target.OQOCDODQOD);
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
GUILayout.Label(" EasyRoads3D v"+target.version);
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();

GUILayout.Label(" Version Type: Free Version", GUILayout.Height(22));
if(GUILayout.Button ("i", GUILayout.Width(22))){
Application.OpenURL ("http://www.unityterraintools.com");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Help", GUILayout.Width(225))){
Application.OpenURL ("http://www.unityterraintools.com/manual.php");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
GUI.skin = origSkin;
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
GUILayout.Box("Check out the full version if you had like to take advantage of all the features including the built-in paramatric modeling tool", GUILayout.Width(250));
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Purchase Full Version from website", GUILayout.Width(225))){
Application.OpenURL ("http://www.unityterraintools.com/store.php");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Purchase from Assetstore", GUILayout.Width(225))){
//	AssetStore.Open("http://u3d.as/content/anda-soft/easy-roads3d-pro/1Ch");
Application.OpenURL ("http://u3d.as/content/anda-soft/easy-roads3d-pro/1Ch");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
}else{
if(target.markers != target.OODDOCQDQO.childCount){
target.OCCCQCDCDC();
}
EditorGUILayout.Space();
GUILayout.Box(" General Info", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));

if(RoadObjectScript.objectStrings == null){
RoadObjectScript.objectStrings = new String[3];
RoadObjectScript.objectStrings[0] = "Road Object"; RoadObjectScript.objectStrings[1]="River Object";RoadObjectScript.objectStrings[2]="Procedural Mesh Object";
}
if(target.distance == "-1"){
var ar : String[]  = target.OCDQDOOOCO.ODCODCOQOD(-1);
target.distance = ar[0];
}
EditorGUILayout.Space();
GUILayout.Label(" Object Type: " + RoadObjectScript.objectStrings[target.objectType]);
if(target.objectType == 0) GUILayout.Label(" Total Road Distance: " + target.distance.ToString() + " km");
}
EditorGUILayout.Space();
if (GUI.tooltip != "") GUI.Label(new Rect(Input.mousePosition.x, Screen.height - Input.mousePosition.y, 200, 40), GUI.tooltip);
if (GUI.changed)
{
target.OQCDQDDODD = true;
}
return markerMenuDisplay;
}
function OnScene(){
var cEvent : Event = Event.current;
if(target.OQQCDCDOQD != -1  && Event.current.shift) target.ODDCOQQQOO[target.OQQCDCDOQD] = true;
if(target.ODDCOQQQOO == null || target.ODDCOQQQOO.Length == 0){
target.ODDCOQQQOO = new boolean[5];
target.OODQQQDQOC = new boolean[5];
}
if((cEvent.shift  && cEvent.type == EventType.mouseDown) || target.ODDCOQQQOO[1])
{
var hit : RaycastHit;
var mPos : Vector2 = cEvent.mousePosition;
mPos.y = Screen.height - mPos.y - 40;
var ray : Ray = Camera.current.ScreenPointToRay(mPos);


if (col.Raycast (ray, hit, 3000))
{
if(target.ODDCOQQQOO[0]){
Undo.RegisterSceneUndo("Add Marker");
target.OQCOCOCQCC(hit.point);
}
else if(target.ODDCOQQQOO[1] && cEvent.type == EventType.mouseDown && cEvent.shift){
Undo.RegisterSceneUndo("Insert Marker");
target.OODQCQCQOD(hit.point, true);
}
else if(target.ODDCOQQQOO[1]  && cEvent.shift) target.OODQCQCQOD(hit.point, false);
else if(target.handleInsertFlag) target.handleInsertFlag = target.OCDQDOOOCO.OCQDQDOCQQ();
Selection.activeGameObject = target.obj.gameObject;
}
}
if(target.ODCCCQOCDD != target.obj || target.obj.name != target.OCDCOOODQQ){
target.OCDQDOOOCO.OOOQDOQDOO();
target.ODCCCQOCDD = target.obj;
target.OCDCOOODQQ = target.obj.name;
}
if(target.OQQCDDDQQO != null){
target.OCDQDOOOCO.OCQDQDOCQQ();

}
if(target.transform.position != Vector3.zero) target.transform.position = Vector3.zero;
}
static function OOQQQDDDQQ() : boolean{

var flag : boolean = false;
var terrains : Terrain[]  = MonoBehaviour.FindObjectsOfType(typeof(Terrain));
for(terrain in terrains) {
if(!terrain.gameObject.GetComponent(EasyRoads3DTerrainID)){
var terrainscript : EasyRoads3DTerrainID = terrain.gameObject.AddComponent("EasyRoads3DTerrainID");
var id : String = UnityEngine.Random.Range(100000000,999999999).ToString();
terrainscript.terrainid = id;
flag = true;

path = Directory.GetCurrentDirectory() + OQDCCCDDCD.backupFolder+ "/" + id;
if( !Directory.Exists(path)){
try{
Directory.CreateDirectory( path);
}
catch(e:System.Exception)
{
Debug.Log("Could not create directory: " + path + " " + e);
}
}
if(Directory.Exists(path)){


}
}
}
}
static function OQOODODOCC(target){
EditorUtility.DisplayProgressBar("Build EasyRoads3D Object","Initializing", 0);

scripts = FindObjectsOfType(typeof(RoadObjectScript));
var rObj:ArrayList = new ArrayList();
for(script in scripts) {
if(script.transform != target.transform) rObj.Add(script.transform);
}
if(target.ODODQOQO == null){
target.ODODQOQO = target.OCDQDOOOCO.OODQDQDDCC();
target.ODODQOQOInt = target.OCDQDOOOCO.ODOOQODCQO();
}
target.OOCQOCQOOD(0.5f, true, false);

var hitOCQOCDOOOQ : ArrayList = target.OCDQDOOOCO.OOOOQDCCOQ(Vector3.zero, target.raise, target.obj, target.OOQDOOQQ, rObj, target.handleVegetation);
var changeArr : ArrayList = new ArrayList();
var stepsf : float = Mathf.Floor(hitOCQOCDOOOQ.Count / 10);
var steps : int = Mathf.RoundToInt(stepsf);
for(i = 0; i < 10;i++){
changeArr = target.OCDQDOOOCO.OODOOOCQCQ(hitOCQOCDOOOQ, i * steps, steps, changeArr);
EditorUtility.DisplayProgressBar("Build EasyRoads3D Object","Updating Terrain", i * 10);
}

changeArr = target.OCDQDOOOCO.OODOOOCQCQ(hitOCQOCDOOOQ, 10 * steps, hitOCQOCDOOOQ.Count - (10 * steps), changeArr);
target.OCDQDOOOCO.OQODQDCCCO(changeArr, rObj);

target.OQCQCCOCOQ();
EditorUtility.ClearProgressBar();

}
function ODOOQOQDQO(target){
EditorUtility.DisplayProgressBar("Restore EasyRoads3D Object","Restoring terrain data", 0f);
target.OCOCOQCQCO();
EditorUtility.ClearProgressBar();
}
}
