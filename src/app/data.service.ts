import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  addContact(user: User): Observable<User> {
    return this.httpClient.post<User>('https://jsonplaceholder.typicode.com/users',user);
  }

  constructor(private httpClient:HttpClient) { }

  getUser():Observable<User[]>{
      return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
