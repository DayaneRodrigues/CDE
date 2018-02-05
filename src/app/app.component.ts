import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') navCtrl: NavController;
  rootPage:any = LoginPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public fcm:FCM) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
        fcm.onNotification().subscribe( data =>{
            if(data.wasTapped){
              //notificação recebida e todaca pelo usuario
            }else{
              //A notificação foi recebida em primeiro plano. Talvez o usuário precise ser notificado.
            }
        });
      // if(platform.is('cordova')) {

      // } else {
      //   statusBar.styleDefault();
      //   splashScreen.hide();
      // }
      
    });
  }
}
