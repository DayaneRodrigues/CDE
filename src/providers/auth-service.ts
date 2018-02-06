import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
//import { Http } from '@angular/http';


@Injectable()
export class AuthService {
  private authState:any;

  constructor(public auth$:AngularFireAuth) {
    this.authState = auth$.authState.subscribe(resp=>{
      this.authState = resp;
    });
    
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  // signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
  //   return this.auth$.login({
  //     provider: AuthProviders.Facebook,
  //     method: AuthMethods.Popup
  //   });
  // }

  signOut(): void {
    this.auth$.auth.signOut();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }
}