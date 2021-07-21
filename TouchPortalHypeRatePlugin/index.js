"use strict";
// @ts-ignore
// import WebSocket from "ws";
// const socket = new WebSocket("wss://app.hyperate.io/socket/websocket");
// socket.addEventListener("open", function () {
//   console.dir(socket);
// });
var TouchPortalAPI = require("touchportal-api");
// Create an instance of the Touch Portal Client
var TPClient = new TouchPortalAPI.Client();
// Define a pluginId, matches your entry.tp file
var pluginId = "hyperate_sockets";
// After join to Touch Portal, it sends an info message
// handle it here
TPClient.on("Info", function (_data) {
    //Do something with the Info message here
    // NOTE: the "settings" section is already handled and will emit the Settings event, no need to duplicate here, just documenting since it is part of the info message
    /*
          {
              "type":"info",
              "settings":[{"Setting 1":"Value 1"},...,],
              "sdkVersion":"(SDK version code)"
              "tpVersionString":"(Version of Touch Portal in string format)"
              "tpVersionCode":"(Version of Touch Portal in code format)"
              "pluginVersion":"(Your plug-in version)"
          }
      */
    // Read some data about your program or interface, and update the choice list in Touch Portal
    TPClient.choiceUpdate("hyperate_current_heartrate", ["choice1", "choice2"]);
    // Dynamic State additions - for use when you want control over what states are available in TouchPortal
    TPClient.createState("test_state", "Description", "Default Value");
});
TPClient.on("Broadcast", function (_data) {
    // If you want to handle page change events - this is what happens
    // more info here: https://www.touch-portal.com/api/index.php?section=dynamic-actions
    /*
      {"type":"broadcast",
       "event":"pageChange",
       "pageName":"name of the page switched to"
      }
    */
});
TPClient.on("Settings", function (_data) {
    //Do something with the Settings message here
    // Note: this can be called any time settings are modified or saved in the TouchPortal Settings window.
    /*
        [{"Setting 1":"Value 1"},{"Setting 2":"Value 2"},...,{"Setting N":"Value N"}]
      */
    // Will throw an exception if/when stateIdToRemove has not been created by the Plugin
    TPClient.removeState("stateIdToRemove");
});
TPClient.on("Update", function (_curVersion, _remoteVersion) {
    // Do something to indicate to your user there is an update
    // Open a localhost page, navigate them to the repo about the update, whatever you want to do.
    // Note: this is only checked on startup of the application and will not inform users of update until a full restart of Touch Portal or the plugin itself.
});
//Connects and Pairs to Touch Portal via Sockete
TPClient.connect({ pluginId: pluginId });
console.log("===== HypeRate TouchPortal Plugin started =====");
TPClient.stateUpdate("hyperate_current_heartrate", "value", 95);
//If you want touchportal-node-api to check for updates on startup,
// TPClient.connect({ pluginId, updateUrl: "<url to remote entry.tp file>" });
