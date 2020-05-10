import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  constructor(private http:HttpClient) { }


  getGlobalData(){
    let localUrl = 'https://covid-19-data.p.rapidapi.com/totals?format=json';
    //return this.http.get( localUrl ,{headers: {"x-rapidapi-host": "covid-19-data.p.rapidapi.com","x-rapidapi-key": "8dab45a16fmsh59c7b5c80bab8dep175e69jsncbca2b095e1b"}} );

    return this.http.get( localUrl ,{headers: {"x-rapidapi-host": "covid-19-data.p.rapidapi.com","x-rapidapi-key": "8dab45a16fmsh59c7b5c80bab8dep175e69jsncbca2b095e1b"}} ).pipe(
      map(result => {
      
        return result[0];

      })
    )
  }  


  getHomeChartData(){
    return this.http.get("https://covid-193.p.rapidapi.com/statistics" ,{headers: {"x-rapidapi-host": "covid-193.p.rapidapi.com","x-rapidapi-key": "8dab45a16fmsh59c7b5c80bab8dep175e69jsncbca2b095e1b"}} );
    // return this.http.get("https://api.covid19api.com/summary").pipe(
    //   map(result => {      
    //     return result['Countries'];
    //   })
    // );
  }


  getCountries()
  {

    return this.http.get("https://api.covid19api.com/summary").pipe(
      map(result => {      
        return result['Countries'];
      })
    );
    //return this.http.get<IGlobalData[]>(localUrl ,{headers: {"x-rapidapi-host": "covid-19-data.p.rapidapi.com","x-rapidapi-key": "8dab45a16fmsh59c7b5c80bab8dep175e69jsncbca2b095e1b"}} );
  }

  getGlobalTodayData(){
    return this.http.get("https://api.covid19api.com/summary").pipe(
        map(result => {      
          return result['Global'];
        })
      );
  }


  getStates(){
    return this.http.get("https://api.covid19india.org/state_district_wise.json").pipe(
      map(result => {      
        return result;
      })
    );
  }

  getStateDailyData(){
    return this.http.get("https://api.covid19india.org/states_daily.json").pipe(
      map(result => {      
        return result;
      })
    );
  }

  getCountryWiseData(country:string){
    let todayDate = new Date().toISOString().slice(0,10);
    let url = "https://covid-193.p.rapidapi.com/history?day="+todayDate+"&country="+country+"";
    console.log(url);
    return this.http.get( url ,{headers: {"x-rapidapi-host": "covid-193.p.rapidapi.com","x-rapidapi-key": "8dab45a16fmsh59c7b5c80bab8dep175e69jsncbca2b095e1b"}} );
  }

  getCountryWiseDateData(country:string){
    if(country=='USA')
    country='united-states';

    if(country=='Africa')
    country='south-africa';

    return this.http.get("https://api.covid19api.com/total/country/"+country.toLowerCase()).pipe(
      map(result => {      
        return result;
      })
    );
  }

}
