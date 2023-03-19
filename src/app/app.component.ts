import { Component } from "@angular/core";
import { OneSignal } from "onesignal-ngx";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "onesignal-client";

  constructor(private oneSignal: OneSignal) {
    this.oneSignal
      .init({
        appId: "d0892710-d4bc-4d4e-8040-6dcaf444d79e",
        safari_web_id:
          "web.onesignal.auto.002ea938-3ebd-4740-ada1-6c17c5eb4600",
        autoResubscribe: true,
      })
      .then(() => {
        console.log("running");
      });

    this.oneSignal.on("notificationDisplay", (event) => {
      console.log("OneSignal notification received:", event);
      // Handle the event here, e.g., update the UI or store data
    });
  }

  subscribeToNotifications(): void {
    console.log("asking for permission");
    this.oneSignal.isPushNotificationsEnabled(async (enabled) => {
      console.log("is push notification enabled", enabled);

      if (enabled) {
        this.oneSignal.getUserId().then((userId: string) => {
          // userId to be sent as FCM token
          console.log("User ID:", userId);
        });
      } else {
        try {
          await this.oneSignal.registerForPushNotifications();
          console.log("User successfully subscribed to push notifications");
        } catch (error) {
          console.error("Error subscribing to push notifications:", error);
        }
      }
    });
  }
}
