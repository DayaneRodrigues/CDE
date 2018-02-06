import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase, } from 'angularfire2/database';
import * as firebase from 'firebase/app';


import { LoginPage } from '../login/login';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'jobs.html'
})
export class JobsPage {

	items:any;
  array:any;
  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase, private _auth: AuthService) {}  
  
  ngOnInit(){
    this.items = this.afDB.list('/interships', ref => ref.orderByChild('status').equalTo(1)).snapshotChanges()   
    console.log("items: ", this.items);
  }
}
