import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventResponse } from './event-response';
import { Observable } from 'rxjs';
import { EventResponse1 } from '../EventResponse1';
import { Response } from './Response';


const apiUrl = "http://localhost:8082/api/v1/evenement/";
@Injectable({
  providedIn: 'root'
})
export class CreateNeweventService {

  constructor(private http: HttpClient) { }

  createNewEvent(event: EventResponse1): Observable<{message: string, result: string, errors: string, errorMap: string[]}> {
    return this.http.post<{message: string, result: string, errors: string, errorMap: string[]}>(apiUrl + 'new', event);
  }

  getEventByIdUser(id: string): Observable<{message: string, result: string, errors: string, errorMap: string[]}> {
    return this.http.get<{message: string, result: string, errors: string, errorMap: string[]}>(apiUrl + 'show/user/' + id);
  }

  getEventById(id: string): Observable<{message: string, result: string, errors: string, errorMap: string[]}> {
    return this.http.get<{message: string, result: string, errors: string, errorMap: string[]}>(apiUrl + 'show/' + id);
  }

  deleteEvent(id: number): Observable<{message: string, result: string, errors: string, errorMap: string[]}> {
    return this.http.delete<{message: string, result: string, errors: string, errorMap: string[]}>(apiUrl + 'delete/' + id);
  }

  getEventByCode(code: string): Observable<{message: string, result: EventResponse, errors: string, errorMap: string[]}> {
    return this.http.get<{message: string, result: EventResponse, errors: string, errorMap: string[]}>(apiUrl + code);
  }

  addUserInEvent(firstName: string, lastName: string, email: string, phone: string, eventId: number): Observable<Response<string>> {
    return this.http.post<Response<string>>(apiUrl + 'new/user', { firstName, lastName, email, phone, eventId });
  }

  
}
