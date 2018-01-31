import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService';
import { DataService } from '../../services/dataService';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerObj: {
    email: string,
    password: string,
    passwordConfirm: string
  };

  errorObj = {
    show: false,
    message: ""
  };

  emailControl = new FormControl();
  passControl = new FormControl();
  passConfirmControl = new FormControl();

  constructor(private authService: AuthService, private router: Router, 
    private afs: AngularFirestore, private dataService : DataService) { }

  ngOnInit() {
    this.registerObj = {
      email: "",
      password: "",
      passwordConfirm: ""
    };

    this.authService.checkAuth()
    .subscribe(user => {
      if(user){
        this.router.navigate(['']);
      }
    });
  }

  lookupGeo(position){
    return this.dataService.checkCurrentLocation(position.coords.latitude, position.coords.longitude);
  }

  addNewProfile(newProfile){
    this.afs.collection('profiles')
    .add(newProfile)
    .then(data => {
      
    })
    .catch(error => {
      this.errorObj.show = true;
      this.errorObj.message = error.message;
    });
  }

  geoLocate(uid){
    var newProfile = {
      location: "",
      userID: uid
    };

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.lookupGeo(position)
        .subscribe((data:any) => {
          newProfile.location = data.results[0].formatted_address;
          this.addNewProfile(newProfile);
        });
      }, error => {
        this.addNewProfile(newProfile);
      });
    }
    else{
      this.addNewProfile(newProfile);
    }
  }

  register(){
    if(this.registerObj.email && this.registerObj.password && this.registerObj.passwordConfirm){
      if(this.registerObj.password === this.registerObj.passwordConfirm){
        this.authService.register(this.registerObj.email, this.registerObj.password)
        .then(user => {
          this.authService.setCookie(user.uid);
          this.geoLocate(user.uid);
        })
        .catch(error => {
          this.errorObj.show = true;
          this.errorObj.message = error.message;
        });
      }
      else{
        this.errorObj.show = true;
        this.errorObj.message = "password mismatch";
      }
    }
    else{
      this.errorObj.show = true;
      this.errorObj.message = "empty fields detected";
    }
  }
}

