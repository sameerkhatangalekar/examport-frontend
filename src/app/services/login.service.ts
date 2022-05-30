import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  public getCurrentUser()
  {
     return this.http.get(`${baseURL}/current-user`);
  }

  //generate token
  public generateToken(loginData: any)
  {
    return this.http.post(`${baseURL}/generate-token`,loginData)
  }

  // login user: sets token in localstorage
  public loginUser(token: string)
  {
    localStorage.setItem("token",token);
    return true;
  }

  //isLogin : user is logged in or not

  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null)
    {
      return false;
    }
    else{
      return true;
    }
  }

  //logout : remove token from local storage
  public logout()
  {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return true;
  }

  //get Token from local
  public getToken()
  {
    return localStorage.getItem("token");
  }

  //set User details to local storage
  public setUser(user:Object)
  {
    localStorage.setItem("user",JSON.stringify(user))
  }
  //get User details
  public getUser()
  {
    let userStr =  localStorage.getItem("user")
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else
    {
      this.logout();
      return null;
    }
  }

  //get User Role
  public getUserRole()
  {
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}
