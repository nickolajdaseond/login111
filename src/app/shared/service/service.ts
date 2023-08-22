import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Service {
  private appConfig:any;

  private url:string = 'assets/config.json';
  constructor(private http: HttpClient, ) {}
  loadConfig(){
    return this.http.get(this.url)
    .toPromise()
      .then( (data)=> {
        this.appConfig = data;
      });
}
//api of login
getConfig():string {
  return this.appConfig.API_URL;
}

//list on homepage
getlist():string{
  return this.appConfig.DATA_INFOR_LIST
}
}
