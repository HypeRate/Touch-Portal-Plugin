// @ts-ignore
import TouchPortalAPI from "touchportal-api";

export class TPController {
  private tpClient: typeof TouchPortalAPI.Client;

  constructor(pluginId: string) {
    this.tpClient = new TouchPortalAPI.Client();

    try {
      console.log("[HypeRate] Connecting to TouchPortal...");

      this.tpClient.connect({ pluginId });

      this.tpClient.on("Info", (_data: any) => {
        console.log("[HypeRate] Connected to TouchPortal");
      });
    } catch (err) {
      throw new Error(`Could not connect to the plugin with ID ${pluginId}`);
    }
  }

  get client() {
    return this.tpClient;
  }

  /**
   * Retrieves a setting from the TouchPortal client
   * @param key Setting key
   * @returns Value of the setting
   */
  getSettingByKey(key: string): Promise<string> {
    console.log(`[HypeRate] Getting setting ${key}`);

    return new Promise((resolve, reject) => {
      try {
        this.tpClient.on("Settings", async (data: any) => {
          console.log(`[HypeRate] Setting ${key} retrieved`);

          resolve(data[0][key]);
        });
      } catch (err) {
        console.log("[HypeRate] Error getting setting");
        reject(console.log(err));
      }
    });
  }

  /**
   * Set a setting on the TouchPortal client
   * @param key Setting key
   * @param value Setting value
   */
  updateState(key: string, value: string | number): void {
    this.tpClient.stateUpdate(key, value);
  }
}
