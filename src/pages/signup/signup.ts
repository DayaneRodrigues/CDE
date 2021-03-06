import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignUpPage implements OnInit{
  root:any;
  error:any;
  loading:any;


  constructor(public afAuth:AngularFireAuth ,public fcm:FCM, public navCtrl: NavController,public afDB: AngularFireDatabase,public auth: AuthService, public element: ElementRef, public loadingCtrl: LoadingController, public toastCtrl: ToastController ) {
    window.localStorage.removeItem('user');
    //this.tabBarElement = document.querySelector('.tabbar');
    this.element.nativeElement
  }

 presentLoading() {
    this.loadingCtrl.create({
      content: '<ion-spinner name="crescent"></ion-spinner> Por favor espere...',
      duration: 8000,
      dismissOnPageChange: true
    }).present();
  }

  onSubmit(formData) {

    let loading = this.loadingCtrl.create({
      content: '<ion-spinner name="crescent"></ion-spinner> Por favor espere...',
      duration: 7000,
      dismissOnPageChange: true
    });
  
    if(formData.valid && formData.value.password == formData.value.repeatpassword) {
      
      loading.present();
      
      
      this.afAuth.auth.createUserWithEmailAndPassword(
         formData.value.email,
         formData.value.password,
      ).then(
        (firebaseUser) => {

        let itemRef = this.afDB.object('users/'+ firebaseUser.uid);
        itemRef.set({

            email:formData.value.email,
            name:formData.value.name,
            program:formData.value.program,
            semester:formData.value.semester,
            status:3

          }).then(() =>{
            if (formData.value.program =="Análise e Desenvolvimento de Sistemas") {
              this.fcm.subscribeToTopic('ads').then(resp=>{
                console.log('Resp subscribrerToTopic: ', resp);
              })
            }
            if (formData.value.program =="Informática para Negócios") {
              this.fcm.subscribeToTopic('info').then(resp=>{
                console.log('Resp subscribrerToTopic: ', resp);
              })
            }
            if (formData.value.program =="Agronegócio") {
              this.fcm.subscribeToTopic('agro').then(resp=>{
                console.log('Resp subscribrerToTopic: ', resp);
              })
            }
            this.afAuth.auth.signInWithEmailAndPassword(

               formData.value.email,
               formData.value.password

            ).then(()=>{
              
              let toast = this.toastCtrl.create({
                message: 'Conta criada com sucesso!',
                duration: 4000,
                position: 'top',
                
              });

              toast.present();
              
              this.navCtrl.push(TabsPage);

            }).catch(()=>{
              
              loading.dismiss();

              let toast = this.toastCtrl.create({
                message: 'Erro ao autentificar, tente fazer login novamente!',
                duration: 6000,
                position: 'top',
                showCloseButton:true
              });
  
              toast.present();

              this.navCtrl.push(LoginPage);
              
            });
          });

      }).catch(
        (err) => {
        
          loading.dismiss();

          this.error = err.message;
        
          let toast = this.toastCtrl.create({
            message: 'Falha de autentificação, tente se registrar novamente!',
            duration: 6000,
            position: 'top',
            showCloseButton:true
          });

          toast.present();
          
          
      });

    }else{
      let toast = this.toastCtrl.create({
        message: 'As senhas não são iguais!',
        duration: 6000,
        position: 'top',
        showCloseButton:true
      });

      toast.present();
    }
  }

 ngOnInit(){
 }

 public goLogin() {
     this.navCtrl.push(LoginPage);
  }

}
