import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/authService";
import { DataService } from "../../services/dataService";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormControl } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm: string;
  autocompleteResults = [];
  uid: string;
  result: any;

  profile = {
    id: '',
    location: '',
    userID: ''
  };

  searchControl = new FormControl();
  cats = [];
  highData = [];
  lowData = [];
  showChart = false;

  chart = new Chart({
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Extended Forecast', align: 'left', style: {color: '#3f51b5'}
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: this.cats
    },
    yAxis: {
      title: {
        text: 'Degrees'
      }
    },
    series: []
  });

  constructor(private authService: AuthService, private http: HttpClient, 
              private router: Router, private afs: AngularFirestore,
              private dataService: DataService, private cookieService: CookieService) { }

  ngOnInit() {
    this.authService.checkAuth()
    .subscribe(user => {
      if(!user){
        this.router.navigate(['login']);
      }
      else{
        if(this.cookieService.get(user.uid)){
          this.uid = user.uid;
          this.retrieveProfileData();
        }
        else{
          this.authService.logout();
        }
      }
    });
  }

  retrieveProfileData(){
    // retrieve profile data
    this.afs.collection('profiles', ref => {
      return ref.where('userID', '==', this.uid)
    })
    .valueChanges()
    .subscribe((data:any) => {
      if(data.length > 0){
        this.profile.location = data[0].location;
        this.profile.userID = data[0].userID;
        this.retrieveProfileID();
      }
    });
  }

  retrieveProfileID(){
    // retrieve profileID
    this.afs.collection('profiles', ref => {
      return ref.where('userID', '==', this.uid);
    })
    .snapshotChanges()
    .subscribe(data => {
      this.profile.id = data[0].payload.doc.id;

      if(this.profile.location) this.checkWeather(this.profile.location)
    });
  }

  checkCity(){
    if(this.searchTerm){
      this.dataService.checkLocation(this.searchTerm)
      .subscribe((data:any) => {
        console.log(data);
        this.autocompleteResults = data.predictions;
      });
    }
    else{
      this.autocompleteResults = [];
    }
  }

  checkWeather(term: string){
    this.dataService.checkWeather(term).subscribe((data:any) => {

      // update location 
      var newProfile = {
        location: term,
        userID: this.uid
      };

      this.afs.doc('profiles/' + this.profile.id).update(newProfile);

      this.searchTerm = "";
      this.autocompleteResults = [];

      var res = data;

      this.result = {
        time: this.getFormattedTime(new Date()),
        location: res.query.results.channel.location,
        forecast: res.query.results.channel.item.forecast.slice(0, 5),
        condition: res.query.results.channel.item.condition,
        image: this.getConditionImage(res.query.results.channel.item.condition.code),
        wind: res.query.results.channel.wind,
        astronomy: res.query.results.channel.astronomy
      };

      this.addForecastPoints(res.query.results.channel.item.forecast)
    });
  }

  getFormattedTime(date){
    var hours = date.getHours();
    var minutes = date.getMinutes().toString();
    var phase = "AM";

    if(hours > 12){
      hours = hours - 12;
      phase = "PM";
    }
    else if(hours == 0){
      hours = 12;
    }

    if(date.getMinutes() < 10){
      minutes = "0" + date.getMinutes();
    }

    return hours + ":" + minutes + " " + phase;
  }

  formatDate(date){
    var mdate = new Date(date)
    return (mdate.getUTCMonth() + 1) + "/" + mdate.getUTCDate() + "/" + mdate.getUTCFullYear()
  }

  getNameOfDay(day){
    if(day == 'Mon') return 'Monday';
    if(day == 'Tue') return 'Tuesday';
    if(day == 'Wed') return 'Wednesday';
    if(day == 'Thu') return 'Thursday';
    if(day == 'Fri') return 'Friday';
    if(day == 'Sat') return 'Saturday';
    if(day == 'Sun') return 'Sunday';
  }

  getConditionImage(code){
    return "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + code + "d.png";
  }

  addForecastPoints(forecast){
    var high = [];
    var low = [];

    this.chart.removeSerie(0);
    this.chart.removeSerie(0);
    this.chart.removeSerie(1);
    this.chart.removeSerie(1);

    for(var i = 0; i < forecast.length; ++i){
      high.push(parseFloat(forecast[i].high));
      low.push(parseFloat(forecast[i].low));
      this.cats.push(forecast[i].date);
    }

    this.chart.addSerie({name: 'High', data: high});
    this.chart.addSerie({name: 'Low', data: low});
  }
}
