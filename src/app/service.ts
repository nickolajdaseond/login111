import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from "./user";
import apiUrl from 'src/assets/config.json'
@Injectable({
  providedIn: 'root'
})
export class Service {
  private url:string = apiUrl.apiUrl;
  constructor(
    private http: HttpClient,
    ) { }
  getData() {
    return this.http.get<IUser[]>(this.url);
  }
}
