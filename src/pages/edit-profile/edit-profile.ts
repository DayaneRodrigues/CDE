import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';
import { FCM } from '@ionic-native/fcm';
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
  programOptions:any;
  semesterOptions:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public fcm: FCM) {
    this.uid = navParams.get('uid');
    this.user = navParams.get('user');    
    this.programOptions = ['Agronegócio','Análise e Desenvolvimento de Sistemas','Informática para Negócios'];
    this.semesterOptions = ['1','2','3','4','5','6','7','8','9','10'];
  }
  
  onSubmit(formData){
    let loading = this.loadingCtrl.create({
      content: '<ion-spinner name="crescent"></ion-spinner> Por favor espere...',
      duration: 3000,
      dismissOnPageChange: true
    }).present();

    const itemRef = this.db.object('users/' + this.uid);
    itemRef.update({ 
      program: formData.value.program,
      semester: formData.value.semester,
      name: formData.value.name || false
    }).then(
      (response)=>{

        let toast = this.toastCtrl.create({
          message: 'Atualizado com sucesso',
          duration: 2000,
          position: 'top',          
        });

        toast.present();

        this.navCtrl.push(TabsPage,{index: 1});
        
      }).catch(
          (error)=>{

            let toast = this.toastCtrl.create({
              message: 'Erro ao atualizar, tente mais tarde!',
              duration: 5000,
              position: 'top',
              showCloseButton:true
            });

            toast.present();

      });
  }

  cancel(){
    this.navCtrl.pop();
  }
}
