import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../shared/service/service';
import { HttpClient } from '@angular/common/http';
import { SLUser } from '../shared/module/showlistUser';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // standalone: true,
  // imports: [MatTableModule],
})
export class HomeComponent {
    displayedColumns: string[] = ['id', 'name', 'avatar', 'creatAt'];
    dataSource: SLUser[] = [];
  constructor(
    private router: Router,
    private loginservice: Service,
    private http : HttpClient,) {}
  ngOnInit(): void{
    const url = this.loginservice.getlist();
  this.http.get(url).subscribe(
    (user:any)=>{
      this.dataSource = user;
    }
  )
  }
  logout(){
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
  }
}

