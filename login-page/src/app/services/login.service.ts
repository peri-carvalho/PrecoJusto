import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/loginResponse.type';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(name: string, password: string){
    return this.httpClient.post<LoginResponse>("/login", {name, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token),
        sessionStorage.setItem("name", value.name)
      })
    )
  }

  /* DTO
  login(login: Login){
    return this.httpClient.post<LoginResponse>("/login", {login}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token),
        sessionStorage.setItem("name", value.name)
      })
    )
  }
*/


}
