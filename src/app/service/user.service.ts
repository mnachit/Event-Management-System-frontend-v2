import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthorizedGuardService } from '../guard/authorized-guard.service';
import { UserEdit } from '../model/user-edit';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8082/api/v1';

  constructor(private http: HttpClient, private authorizedGuard: AuthorizedGuardService) { }
  
  getUserByEmail(): Observable<{message: String, result: User}> {
    const email = this.authorizedGuard.getEmailFromToken();
    return this.http.get<{message: String, result: User}>(`${this.baseUrl}/user/${email}`);
  }

  updateUser(user: UserEdit): Observable<{message: String, result: User}> {
    return this.http.put<{message: String, result: User}>(`${this.baseUrl}/user/edit`, user);
  }
}
