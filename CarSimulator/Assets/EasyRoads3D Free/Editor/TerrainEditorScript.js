@CustomEditor(EasyRoads3DTerrainID)
class TerrainEditorScript extends Editor
{
function OnSceneGUI()
{
if(Event.current.shift && RoadObjectScript.ODCCCQOCDD != null) Selection.activeGameObject = RoadObjectScript.ODCCCQOCDD.gameObject;
else RoadObjectScript.ODCCCQOCDD = null;
}
}
