// @ts-ignore
import TouchPortalAPI from "touchportal-api";

export class TPController {
  private tpClient: typeof TouchPortalAPI.Client;

  constructor(pluginId: string) {
    this.tpClient = new TouchPortalAPI.Client();
    console.log('[HypeRate] TP Client initialized...');

    try {
      this.tpClient.connect({ pluginId });
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
    return new Promise((resolve, reject) => {
      try {
        this.tpClient.on("Settings", async (data: any) => {
          resolve(data[0][key]);
        });
      } catch (err) {
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
