import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailControl = new FormControl();
  passControl = new FormControl();

  loginObj = {
    email: "",
    password: ""
  };

  errorObj = {
    show: false,
    message: ""
  };

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit() {
    this.authService.checkAuth()
    .subscribe(auth => {
      if(auth){
        this.router.navigate(['']);
      }
    });
  }

  login(){
    this.authService.login(this.loginObj.email, this.loginObj.password)
    .then(data => {
      this.authService.setCookie(data.uid);
    })
    .catch(error => {
      this.errorObj.show = true;
      this.errorObj.message = error.message;
    });
  }
}
