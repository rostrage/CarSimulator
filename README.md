Car Simulator
=============

This is the simulation platform for the self driving vehicle at https://github.com/derivatived/self-driving-car.

Overview
-------

The car simulator is built in the Unity3D Game Engine (Version 4.x), using pre-existing assets for the road and terrain. Currently, the simulator applies Artificial Intelligence to the car by sending and receiving information to a server. As such, the simulator is accompanied by a sample Artificial Intelligence server coded in Node.js.

Since default Unity projects maintain large amounts of metadata personalized to each user, the simulator utilizes an alternate form for source control (.metadata). This will require a more specific setup to manage the program through GitHub. 

Pre-requisites
--------------

* Unity3D -- Download and install the latest version of Unity 3d at (http://unity3d.com/)
* Node.js -- Node.js is ONLY needed to run the AI server. Download at (http://nodejs.org/)

Setup
-----

### Car Simulator

1.  Preset Unity3D to manage version control through meta files
2.  Create a New Project in Unity (needed to access Unity Settings)
3.  Select Edit -> Project Settings -> Editor to open an "Editor Settings" panel
4.  In "Version Control", change mode to "Meta Files"
5.  Save the project and Quit Unity3D so that the settings are applied
6.  Pull or download the Car Simulator into a new, desired folder
7.  Re-open Unity, then choose File -> Open Project...
8.  Select the folder Car Simulator was pulled to and open the project.
9.  The current scene used by the Simulator is "Complete Scene"

Note: it is currently not known if a opening a new/separate project first is required to properly change the version control setting, but better safe than sorry.
