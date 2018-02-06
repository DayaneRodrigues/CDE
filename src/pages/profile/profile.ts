import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  userAuth: any;
  user:Observable<any>;
  userId:any;
  profile:any;
  constructor(public afDB:AngularFireDatabase, public navCtrl: NavController, private app: App,public afAuth: AngularFireAuth) {
    this.userId = this.afAuth.auth.currentUser.uid
    this.userAuth = this.afAuth.auth.currentUser;
    //console.log(this.userId);
    //console.log(this.userAuth);
    
    this.user = this.afDB.object('/users/' + this.userId).snapshotChanges();
    console.log("This.user : ", this.user);


    this.user.subscribe(sub => {
      this.profile = sub.payload.val();
      console.log('subscribe: ', sub);
    }) 
  }

  editProfile(){
    this.app.getRootNav().push(EditProfilePage, {uid:this.userId, user:this.user, }); 
  }

  logout(){
	//clear any cached data
	  this.app.getRootNav().setRoot(LoginPage);
	}

}
