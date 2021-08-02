// @ts-ignore
import TouchPortalAPI from "touchportal-api";

export class TPController {
  private tpClient: typeof TouchPortalAPI.Client;

  constructor(pluginId: string) {
    this.tpClient = new TouchPortalAPI.Client();
    console.log("TP Client initialized...");

    try {
      this.tpClient.connect({ pluginId });
    } catch (err) {
      console.log(err);
      throw new Error(`Could not connect to the plugin with ID ${pluginId}`);
    }
  }

  get client() {
    return this.tpClient;
  }

  // Get TouchPortal Setting by its key
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

  // Update TouchPortal State
  updateState(key: string, value: string | number): void {
    try {
      this.tpClient.stateUpdate(key, value);
    } catch (err) {
      console.log(err);
    }
  }
}
