import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class DataService {
    constructor(private http: HttpClient) { }

    placesURL = "https://my-weather-forecast-api.firebaseapp.com/city/";
    weatherURL = "https://my-weather-forecast-api.firebaseapp.com/weather/";
    geoURL = "https://my-weather-forecast-api.firebaseapp.com/geo/";

    // placesURL = "http://localhost:9000/city/";
    // weatherURL = "http://localhost:9000/weather/";
    // geoURL = "http://localhost:9000/geo/";
    
    checkLocation(term: string){
        return this.http.get(this.placesURL + term);
    }

    checkWeather(term: string){
        return this.http.get(this.weatherURL + term);
    }

    checkCurrentLocation(lat, lng){
        return this.http.get(this.geoURL + lat + "/" + lng);
    }
}
