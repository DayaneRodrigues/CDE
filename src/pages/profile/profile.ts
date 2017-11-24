import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  userAuth: any;
  user:Observable<any>;

  ionViewDidEnter(){
    console.log("ionViewDidEnter");
  }
  ionViewCanEnter(){
    console.log("ionViewCanEnter");
  }
  ionViewWillEnter(){
    console.log("lala");
  }

  constructor(public navCtrl: NavController, private app: App,public afAuth: AngularFireAuth) {

    this.userAuth = afAuth.getAuth();
    
    var userId = firebase.auth().currentUser.uid;
    
    firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
      this.user = (snapshot.val());
    });
    
    
  }

  editProfile(){
    this.app.getRootNav().push(EditProfilePage, {uid:this.userAuth.uid, user:this.user, }); 
  }

  logout(){
	//clear any cached data
	  this.app.getRootNav().setRoot(LoginPage);
	}

}
