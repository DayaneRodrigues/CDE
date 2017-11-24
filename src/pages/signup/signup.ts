import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignUpPage implements OnInit{
  root:any;
  error:any;
  loading:any;


  constructor(public navCtrl: NavController,public afDB: AngularFireDatabase,public auth: AuthService,public af: AngularFire, public element: ElementRef, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
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
          duration: 4000,
          dismissOnPageChange: true
        }).present();
  
    if(formData.valid && formData.value.password == formData.value.repeatpassword) {
      
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password,
      }).then(
        (firebaseUser) => {

        let itemRef = this.afDB.object('users/'+ firebaseUser.uid);
        itemRef.set({email:formData.value.email, name:formData.value.name, program:formData.value.program, semester:formData.value.semester});

        
        this.alertCtrl.create({  
          title: 'Sucesso',
          subTitle: 'Usuário criado!',
          buttons: ['Ok']
        }).present();
        
        this.navCtrl.push(LoginPage);

      }).catch(
        (err) => {
        
          console.log(err.message);
          this.error = err.message;
        
          this.alertCtrl.create({
            title: 'Registro falhou',
            subTitle: this.error,
            buttons: ['Ok']
          }).present();
        
          
      })
    }else{
      this.alertCtrl.create({
        title: 'Registro falhou',
        subTitle: 'As senhas não são iguais',
        buttons: ['Ok']
      }).present();
    }
  }

 ngOnInit(){
 }

 public goLogin() {
     this.navCtrl.push(LoginPage);
  }

}
