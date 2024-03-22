import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserLogin } from '../../auth/login/UserLogin';
import { TokenService } from '../token-service.service';
import { UserRegister } from 'src/app/auth/register/UserRegister';

const apiUrl = "http://localhost:8082/api/v1/rest/auth/login";
const apiUrl1 = "http://localhost:8082/api/v1/rest/auth/new/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private tokenservice : TokenService) { }

  login(userLogin: UserLogin): Observable<{message: string, result: string}> {
    return this.http.post<any>(apiUrl, userLogin).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred';
        if (error && error.error && error.error.errors && error.error.errors.length > 0) {
          errorMessage = error.error.errors[0].message;
        }
        return throwError(errorMessage);
      }),
      tap(response => {
        if (response) {
          this.tokenservice.saveToken(response.result);
        }
      })
    );
  }

  register(userRegister: UserRegister): Observable<{message: string, result: string}> {
    return this.http.post<any>(apiUrl1, userRegister).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred';
        if (error && error.error && error.error.errors && error.error.errors.length > 0) {
          errorMessage = error.error.errors[0].message;
        }
        return throwError(errorMessage);
      }),
      tap(response => {
        if (response) {
          this.tokenservice.saveToken(response.result);
        }
      })
    );
  }

  logout(): Boolean {
    this.tokenservice.removeToken();
    return true;
  }
}
