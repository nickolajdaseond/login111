import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from "../module/user";
import API_URL from 'src/assets/config.json'
import { Observable} from 'rxjs';

interface AppConfig {
  API_URL: string;
}
@Injectable({
  providedIn: 'root'
})
export class Service {
  private url:string = API_URL.API_URL;
  private config!: AppConfig |any;
  constructor(private http: HttpClient) {}
  loadConfig(){
      return this.http
          .get<AppConfig>(this.url)

  }
  getConfig(){
      return this.config.API_URL;
  }
}
