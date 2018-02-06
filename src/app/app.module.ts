import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { ProfilePage } from '../pages/profile/profile';
import { JobsPage } from '../pages/jobs/jobs';
import { TabsPage } from '../pages/tabs/tabs';
import { MyJobsPage } from '../pages/myjobs/myjobs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth-service';

/*YOU HAVE TO PUT YOUR APIKEY FROM YOUR FIREBASE COUNT*/

export const firebaseConfig = {
  apiKey: "AIzaSyDVbfn5YNK8KkSj-HaBcVF866-v-as7BjA",
  authDomain: "cefrp-6a3e7.firebaseapp.com",
  databaseURL: "https://cefrp-6a3e7.firebaseio.com",
  projectId: "cefrp-6a3e7",
  storageBucket: "cefrp-6a3e7.appspot.com",
  messagingSenderId: "991226644523"
};

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    ProfilePage,
    JobsPage,
    MyJobsPage,
    LoginPage,
    SignUpPage,
    TabsPage,
    EditProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    ProfilePage,
    JobsPage,
    MyJobsPage,
    LoginPage,
    SignUpPage,
    TabsPage,
    EditProfilePage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    FCM,
    AngularFireDatabase,
  
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
