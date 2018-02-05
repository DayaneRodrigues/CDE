import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase, } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFire, AngularFireModule, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

import { LoginPage } from '../login/login';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'jobs.html'
})
export class JobsPage {

	items:Observable<any[]>;
	// items:any[]= [{nome:"andre"},{nome:"day"}];
  array:any;
  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase, private _auth: AuthService) {
   
    // this.db = firebase.database().ref('/interships/');

    // this.db.orderByChild("status").equalTo(1).once('value', resp =>{
    //   this.items = resp;
    //   console.log('items',this.items)
    //   console.log('resp: ', resp.val());
    //   resp.forEach( element => {
    //      console.log('element: ', element.val().internshipVacancy);
    //      this.items = element.val()
    //      console.log('items',this.items)
    //    });
    //});
    
  }

  ngOnInit(){
    this.array = firebase.database().ref('/interships/').orderByChild('status').equalTo(1);
    this.array.once('value', dataSnapshot =>{
      this.items = dataSnapshot;
      console.log(dataSnapshot.val());
        
    })
  
    
  }

}
