import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';
import {PrincipalPage} from '../principal/principal';
import {Usuario} from '../usuario/usuario.model';
import {Observable} from 'rxjs/Observable';



import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsuarioService{
  loggedIn: Boolean=false;
  local: Storage = new Storage(LocalStorage);
  url: string = 'http://162.243.83.72:8080'

  constructor(private http: Http) { }
  logout() {
    this.local.remove('token');
    this.local.remove('profile');
  }

  getUsuario(): Promise<Usuario[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  return this.http.post(this.url + '/auth/sign_in', JSON.stringify({'email':'prueba@prueba.com','password':'prueba1234'}),
   { headers: headers })
             .toPromise()
             .then(response => response.json().data)
             .catch(error => console.log('error'));
    }

  isLoggedIn(){


                return this.local.get('profile').then(profile =>
                  {console.log(profile);
                    if(profile==null){return false;}
                  else {return true;}
                }).catch(error => error
              );

  }

}
