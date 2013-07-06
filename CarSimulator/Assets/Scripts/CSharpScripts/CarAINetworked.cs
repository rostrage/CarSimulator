//the standard AI that wraps around the CarDataCollection and Car scripts to control them over a networked connection - the default AI used in production
using UnityEngine;
using System;
using System.Collections;
using System.IO;
using System.Net.Sockets;
using System.Threading;
using LitJson;
public class CarAINetworked : MonoBehaviour {
	public string server;
	public int port;
	public CarDataCollection carData;
	public Car carController;
	private StreamReader sr;
	private StreamWriter sw;
	private Thread writeThread;
	private Thread readThread;
	private JsonData moveCommands;
	// Use this for initialization
	void Awake () {
		TcpClient client = new TcpClient(server, port);
		try {
			NetworkStream s = client.GetStream();
			sr = new StreamReader(s);
			sw = new StreamWriter(s);
			sw.AutoFlush = false; //we want to manually decide when to send a packet, not let it guess for us
			writeThread = new Thread(new ThreadStart(Write));
			writeThread.Priority  = System.Threading.ThreadPriority.Lowest; //prioritize actual simulation of world over sending network data
			writeThread.Start();
			readThread = new Thread(new ThreadStart(Read));
			readThread.Priority = System.Threading.ThreadPriority.Lowest;
			readThread.Start();
		}
		catch(Exception e) {
			Debug.LogError(e);
		}
	}
	
	void Update() 
	{
		carController.ProcessAICommands((float)(int)moveCommands["Throttle"],(float)(int)moveCommands["Steer"]);
	}
	
	void Write() {
		while(true) {
			try {
				sw.WriteLine(carData.sensorData.ToJson());
				sw.Flush();
				System.Threading.Thread.Sleep(1); //wait 1ms to send the next chunk of data
			}
			catch (Exception e) {
					Debug.LogError(e);
			}
		}
	}
	
	void Read() {
		while(true) {
			try {
				string rawData = sr.ReadLine();
				moveCommands = JsonMapper.ToObject(rawData);
			}
			catch (Exception e)
			{
				Debug.LogError(e);
			}
		}
	}
	
	void OnApplicationQuit() {
		readThread.Abort();
		writeThread.Abort();
	}
}
