import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn: boolean;
  userEmail: string;
  currentRoute: any;
  uid: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = false;

    this.currentRoute = {
      url: ""
    };

    this.authService.checkAuth()
    .subscribe(auth => {
      if(auth){
        this.uid = auth.uid;
        this.userEmail = auth.email;
        this.isLoggedIn = true;
      }
      else{
        this.userEmail = "";
        this.isLoggedIn = false;
      }
    });
    
    this.router.events.subscribe((event) => {
      this.currentRoute = event;
    });
  }

  logout(){
    this.authService.logout()
    .then(data => {
      // delete session manually
      this.authService.deleteCookie();
    })
    .catch(error => {
      //console.log('error', error);
    });
  }

  goToRegister(){
    this.router.navigate(['register']);
  }
}
