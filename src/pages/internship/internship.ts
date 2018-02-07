import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the InternshipPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-internship',
  templateUrl: 'internship.html',
})
export class InternshipPage {
  internshipId:any;
  item:any;
  internship:Observable<any>;
  constructor(public afDB:AngularFireDatabase,public navParam:NavParams,public navCtrl: NavController, public navParams: NavParams) {
   
  }
  
  ionViewDidLoad() {
    this.internshipId = this.navParam.get('internshipId');

    this.internship = this.afDB.object('/interships/' + this.internshipId).snapshotChanges();
    console.log("This.internship : ", this.internship );


    this.internship.subscribe(sub => {
      this.item = sub.payload.val();
      console.log('subscribe: ', sub);
    }) 
  }

}
