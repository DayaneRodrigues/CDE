import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, AlertController, LoadingController, App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the EditProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  uid:any;
  user:any;
  rootPage:any = ProfilePage;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public db: AngularFireDatabase, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private app: App) {
    this.uid = navParams.get('uid');
    this.user = navParams.get('user');    
  }
  
  onSubmit(formData){

    // let loading = this.loadingCtrl.create({
    //   content: '<ion-spinner name="crescent"></ion-spinner> Por favor espere...',
    //   duration: 4000,
    //   dismissOnPageChange: true
    // }).present();

    const itemRef = this.db.object('users/' + this.uid);
    itemRef.update({ 
      program: formData.value.program,
      semester: formData.value.semester,
      name: formData.value.name
    }).then(
      (response)=>{

        this.alertCtrl.create({  
          title: 'Sucesso',
          subTitle: 'Atualização feita!',
          buttons: ['Ok']
        }).present();
        
        this.navCtrl.push(TabsPage,{index: 1});
        
      }).catch(
          (error)=>{

            this.alertCtrl.create({  
              title: 'Erro ao atualizar',
              subTitle: error.message,
              buttons: ['Ok']
            }).present();

      });
  }
}
