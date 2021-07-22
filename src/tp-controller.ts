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

  getSettingByKey(key: string): number | string {
    return this.tpClient.on("Info", (data: any) => {
      try {
        return data.settings[0][key];
      } catch (err) {
        throw new Error(`No settings exist for key: ${key}`);
      }
    });
  }

  updateState(key: string, value: string | number): void {
    try {
      this.tpClient.stateUpdate(key, value);
    } catch (err) {
      console.log(err);
    }
  }
}
