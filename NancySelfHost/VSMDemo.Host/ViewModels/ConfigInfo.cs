using System;

namespace VSMDemo.Web
{
	[Serializable]
	public class ConfigInfo
	{
		public int UpdateInterval { get; set; }
		public string ServerName { get; set; }
	}
}
