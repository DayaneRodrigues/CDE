import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { App } from 'ionic-angular/components/app/app';
import { InternshipPage } from '../internship/internship';

@Component({
  selector: 'page-myjobs',
  templateUrl: 'myjobs.html'
})
export class MyJobsPage {
  
  items:Observable<any>;
  userId:any;
  user:Observable<any>;
  program:any;
  constructor(public app:App,public afAuth:AngularFireAuth ,public navCtrl: NavController, public afDB:AngularFireDatabase) {
    this.userId = this.afAuth.auth.currentUser.uid;
    this.user = this.afDB.object('/users/' + this.userId).snapshotChanges();
    this.user.subscribe(sub=>{
      this.program = sub.payload.val().program
      console.log("program: ", this.program);
      this.items = this.afDB.list('/interships', ref => ref.orderByChild('program').equalTo(this.program)).snapshotChanges()   
      console.log("items: ", this.items);
      this.items.forEach(element => {
        console.log("element: ", element);
      });
    })
   }
  view(id){
    this.app.getRootNav().push(InternshipPage, {internshipId:id});
    console.log('id:', id);
  } 
}
