import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventResponse } from './event-response';
import { Observable } from 'rxjs';


const apiUrl = "http://localhost:8082/api/v1/evenement/";
@Injectable({
  providedIn: 'root'
})
export class CreateNeweventService {

  constructor(private http: HttpClient) { }

  createNewEvent(event: EventResponse): Observable<{message: string, result: string, errors: string, errorMap: string[]}> {
    return this.http.post<{message: string, result: string, errors: string, errorMap: string[]}>(apiUrl + 'new', event);
  }

  getEventByIdUser(id: string): Observable<{message: string, result: string, errors: string, errorMap: string[]}> {
    return this.http.get<{message: string, result: string, errors: string, errorMap: string[]}>(apiUrl + 'show/user/' + id);
  }

  getEventById(id: string): Observable<{message: string, result: string, errors: string, errorMap: string[]}> {
    return this.http.get<{message: string, result: string, errors: string, errorMap: string[]}>(apiUrl + 'show/' + id);
  }
}
