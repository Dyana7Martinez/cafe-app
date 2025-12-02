import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    tok!: string;

    constructor(private router: Router, private cookies: CookieService){}

    login(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response =>{
                firebase.auth().currentUser?.getIdToken()
                .then(
                    tok =>{
                        this.tok = tok;
                        this.cookies.set('tok', this.tok);
                        this.router.navigate(['/']);
                    }
                )
            },
            error =>{
                console.log(error);
            }
        )
    }

    getIdToken(){
        //return this.token;
        return this.cookies.get('tok');
    }

    estaLogueado(){
        //console.log(this.token);
        //return this.token;
        return this.cookies.get('tok');
    }

    logout(){
        firebase.auth().signOut()
        .then(
            ()=>{
                this.tok = "";
                this.cookies.set('tok', this.tok);
                //this.cookies.delete('token');
                this.router.navigate(['/login']);
            }
        )
    }
}
