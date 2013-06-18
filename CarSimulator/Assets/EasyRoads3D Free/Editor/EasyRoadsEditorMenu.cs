using System;
using System.Collections;
using System.IO;
using UnityEngine;
using UnityEditor;
using System.Reflection;
using EasyRoads3D;
using EasyRoads3DEditor;
public class EasyRoadsEditorMenu : ScriptableObject {







[MenuItem( "EasyRoads3D/New Object" )]
public static void  CreateEasyRoads3DObject ()
{

Terrain[] terrains = (Terrain[]) FindObjectsOfType(typeof(Terrain));
if(terrains.Length == 0){
EditorUtility.DisplayDialog("Alert", "No Terrain objects found! EasyRoads3D objects requires a terrain object to interact with. Please create a Terrain object first", "Close");
return;
}



if(NewEasyRoads3D.instance == null){
NewEasyRoads3D window = (NewEasyRoads3D)ScriptableObject.CreateInstance(typeof(NewEasyRoads3D));
window.ShowUtility();
}



}
[MenuItem( "EasyRoads3D/Back Up/Terrain Height Data" )]
public static void  GetTerrain ()
{
if(GetEasyRoads3DObjects()){

ODDQOOCDOC.ODCCDCCQQO(Selection.activeGameObject);
}else{
EditorUtility.DisplayDialog("Alert", "No EasyRoads3D objects found! Terrain functions cannot be accessed!", "Close");
}
}
[MenuItem( "EasyRoads3D/Restore/Terrain Height Data" )]
public static void  SetTerrain ()
{
if(GetEasyRoads3DObjects()){

ODDQOOCDOC.OOCDCOQQQQ(Selection.activeGameObject);
}else{
EditorUtility.DisplayDialog("Alert", "No EasyRoads3D objects found! Terrain functions cannot be accessed!", "Close");
}
}
[MenuItem( "EasyRoads3D/Back Up/Terrain Splatmap Data" )]
public static void  OCQQDCOQOO()
{
if(GetEasyRoads3DObjects()){

ODDQOOCDOC.OCQQDCOQOO(Selection.activeGameObject);
}else{
EditorUtility.DisplayDialog("Alert", "No EasyRoads3D objects found! Terrain functions cannot be accessed!", "Close");
}
}
[MenuItem( "EasyRoads3D/Restore/Terrain Splatmap Data" )]
public static void  OOCDQOOCDD ()
{
if(GetEasyRoads3DObjects()){
string path = "";
if(EditorUtility.DisplayDialog("Road Splatmap", "Would you like to merge the terrain splatmap(s) with a road splatmap?", "Yes", "No")){
path = EditorUtility.OpenFilePanel("Select png road splatmap texture", "", "png");
}


ODDQOOCDOC.OOCCDQOQQC(true, 100, 4, path, Selection.activeGameObject);
}else{
EditorUtility.DisplayDialog("Alert", "No EasyRoads3D objects found! Terrain functions cannot be accessed!", "Close");
}
}
[MenuItem( "EasyRoads3D/Back Up/Terrain Vegetation Data" )]
public static void  OCCDQODQQD()
{
if(GetEasyRoads3DObjects()){

ODDQOOCDOC.OCCDQODQQD(Selection.activeGameObject, null, "");
}else{
EditorUtility.DisplayDialog("Alert", "No EasyRoads3D objects found! Terrain functions cannot be accessed!", "Close");
}
}
[MenuItem( "EasyRoads3D/Back Up/All Terrain Data" )]
public static void  GetAllData()
{
if(GetEasyRoads3DObjects()){

ODDQOOCDOC.ODCCDCCQQO(Selection.activeGameObject);
ODDQOOCDOC.OCQQDCOQOO(Selection.activeGameObject);
ODDQOOCDOC.OCCDQODQQD(Selection.activeGameObject, null,"");
}else{
EditorUtility.DisplayDialog("Alert", "No EasyRoads3D objects found! Terrain functions cannot be accessed!", "Close");
}
}
[MenuItem( "EasyRoads3D/Restore/Terrain Vegetation Data" )]
public static void  OCDDOODQOQ()
{
if(GetEasyRoads3DObjects()){

ODDQOOCDOC.OCDDOODQOQ(Selection.activeGameObject);
}else{
EditorUtility.DisplayDialog("Alert", "No EasyRoads3D objects found! Terrain functions cannot be accessed!", "Close");
}
}
[MenuItem( "EasyRoads3D/Restore/All Terrain Data" )]
public static void  RestoreAllData()
{
if(GetEasyRoads3DObjects()){

ODDQOOCDOC.OOCDCOQQQQ(Selection.activeGameObject);
ODDQOOCDOC.OOCCDQOQQC(true, 100, 4, "", Selection.activeGameObject);
ODDQOOCDOC.OCDDOODQOQ(Selection.activeGameObject);

}else{
EditorUtility.DisplayDialog("Alert", "No EasyRoads3D objects found! Terrain functions cannot be accessed!", "Close");
}


}
public static bool GetEasyRoads3DObjects(){
RoadObjectScript[] scripts = (RoadObjectScript[])FindObjectsOfType(typeof(RoadObjectScript));
bool flag = false;
foreach (RoadObjectScript script in scripts) {
if(script.OCDQDOOOCO == null){
script.ODQQDDQDDO(null, null, null);
}
flag = true;
}
return flag;
}

static private void OQOODODOCC(RoadObjectScript target){
EditorUtility.DisplayProgressBar("Build EasyRoads3D Object - " + target.gameObject.name,"Initializing", 0);

RoadObjectScript[] scripts = (RoadObjectScript[])FindObjectsOfType(typeof(RoadObjectScript));
ArrayList rObj = new ArrayList();
Undo.RegisterUndo(Terrain.activeTerrain.terrainData, "EasyRoads3D Terrain leveling");
foreach(RoadObjectScript script in scripts) {
if(script.transform != target.transform) rObj.Add(script.transform);
}
if(target.ODODQOQO == null){
target.ODODQOQO = target.OCDQDOOOCO.OODQDQDDCC();
target.ODODQOQOInt = target.OCDQDOOOCO.ODOOQODCQO();
}
target.OOCQOCQOOD(0.5f, true, false);

ArrayList hitOCQOCDOOOQ = target.OCDQDOOOCO.OOOOQDCCOQ(Vector3.zero, target.raise, target.obj, target.OOQDOOQQ, rObj, target.handleVegetation);
ArrayList changeArr = new ArrayList();
float stepsf = Mathf.Floor(hitOCQOCDOOOQ.Count / 10);
int steps = Mathf.RoundToInt(stepsf);
for(int i = 0; i < 10;i++){
changeArr = target.OCDQDOOOCO.OODOOOCQCQ(hitOCQOCDOOOQ, i * steps, steps, changeArr);
EditorUtility.DisplayProgressBar("Build EasyRoads3D Object - " + target.gameObject.name,"Updating Terrain", i * 10);
}

changeArr = target.OCDQDOOOCO.OODOOOCQCQ(hitOCQOCDOOOQ, 10 * steps, hitOCQOCDOOOQ.Count - (10 * steps), changeArr);
target.OCDQDOOOCO.OQODQDCCCO(changeArr, rObj);

target.OQCQCCOCOQ();
EditorUtility.ClearProgressBar();

}
private static void SetWaterScript(RoadObjectScript target){
for(int i = 0; i < target.OCQOQDDDCQ.Length; i++){
if(target.OCDQDOOOCO.road.GetComponent(target.OCQOQDDDCQ[i]) != null && i != target.selectedWaterScript)DestroyImmediate(target.OCDQDOOOCO.road.GetComponent(target.OCQOQDDDCQ[i]));
}
if(target.OCQOQDDDCQ[0] != "None Available!"  && target.OCDQDOOOCO.road.GetComponent(target.OCQOQDDDCQ[target.selectedWaterScript]) == null){
target.OCDQDOOOCO.road.AddComponent(target.OCQOQDDDCQ[target.selectedWaterScript]);

}
}
public static Vector3 ReadFile(string file)
{
Vector3 pos = Vector3.zero;
if(File.Exists(file)){
StreamReader streamReader = File.OpenText(file);
string line = streamReader.ReadLine();
line = line.Replace(",",".");
string[] lines = line.Split("\n"[0]);
string[] arr = lines[0].Split("|"[0]);
float.TryParse(arr[0],System.Globalization.NumberStyles.Float, System.Globalization.NumberFormatInfo.InvariantInfo, out pos.x);
float.TryParse(arr[1],System.Globalization.NumberStyles.Float, System.Globalization.NumberFormatInfo.InvariantInfo, out pos.y);
float.TryParse(arr[2],System.Globalization.NumberStyles.Float, System.Globalization.NumberFormatInfo.InvariantInfo, out pos.z);
}
return pos;
}
}
