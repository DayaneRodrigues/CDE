import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{
	root:any;
  splash = true;
  secondPage = LoginPage;
  user:any;
  itens:any;
  constructor(public navCtrl: NavController,public afDB: AngularFireDatabase,public af: AngularFire, public element: ElementRef, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  	window.localStorage.removeItem('user');
    this.element.nativeElement

  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
    }, 4000);
  }

 ngOnInit(){
 	this.root = this.element.nativeElement;
 }

  onClick(){
   	console.log('logging in with email and password');
   	let self = this;
   	let email:string = this.root.querySelector('#email').value;
   	let password:string = this.root.querySelector('#password').value;
   	this.af.auth.login({
   		email: email,
   		password: password
   	},{
  		provider: AuthProviders.Password,
   		method: AuthMethods.Password,
   	}).then(function(response){
       self.loadingCtrl.create({
          content: '<ion-spinner name="crescent"></ion-spinner> Por favor espere...',
          duration: 8000,
          dismissOnPageChange: true
        }).present();
   		self.navCtrl.push(TabsPage);
   	}).catch(function(error){
      let toast = self.toastCtrl.create({
        message: 'Falha ao fazer login, e-mail ou senha incorreta!',
        duration: 6000,
        position: 'top',
        showCloseButton:true
      });

      toast.present();
   	});
  }
  
  onGoogleLogin(){
    let self = this;
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(function(response){
  
      firebase.database().ref('/users/' + response.uid).once('value').then((snapshot) => {
        self.user = (snapshot.val());
        if(self.user === null){
          let user = {
            email:response.auth.email,
            name:false,
            picture:response.auth.photoURL,
            program:false,
            semester:false,
          };
          let itemRef = self.afDB.object('users/'+ response.uid);
          itemRef.set(user);
      
          window.localStorage.setItem('user',JSON.stringify(user));
          }
      });
  
      
      self.navCtrl.push(TabsPage);
    }).catch(function(error){
      console.log(error);
    });
  }

  onTwitterLogin(){
    let self = this;
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    }).then(function(response){
      let user = {
        email:response.auth.email,
        picture:response.auth.photoURL
      };
      window.localStorage.setItem('user',JSON.stringify(user));
      self.navCtrl.push(TabsPage);
    }).catch(function(error){
      console.log(error);
    });
  }

  onFacebookLogin() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((response) => {
      console.log('Login success with facebook' + JSON.stringify(response));
      let currentuser = {
          email: response.auth.displayName,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.push(TabsPage);
      }).catch((error) => {
        console.log(error);
    })
  }

 public goSignUp() {
   	this.navCtrl.push(SignUpPage);
  }

}
