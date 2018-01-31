import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  getFormattedTime(inputDate){
    var date = new Date(inputDate);

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
}
