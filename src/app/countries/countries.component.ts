import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGlobalData } from '../models/gobal-data';
import { Observable } from 'rxjs';
import { ApidataService } from '../apidata.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  private localUrl = 'https://covid-19-data.p.rapidapi.com/help/countries';
  default_country="India";
  confirmed=0;
  recovered=0;
  death=0;
  active=0;
  loading = true;
  countries:string[]  = [];
  datewisedata=[];

  constructor(private apiDataService:ApidataService) { }

  ngOnInit(): void {

    // For Loading Country names in dropdown on page load
    this.apiDataService.getHomeChartData().subscribe(
    {
        next: (result) => {          
          for(let i=0;i<result['response'].length;i++)
          {
            let country_name = result['response'][i]['country'];
            this.countries.push(country_name);
          }
           this.countries.sort();
        }, 
        complete : ()=>{
          this.loading = false;
        }
    });
  // Loads default country statistics 
    this.updateCountryWiseData(this.default_country);
  }



  updateCountryWiseData(country:string):void{

    this.loading = true;
    console.log(country);

    this.apiDataService.getCountryWiseData(country).subscribe(
      {
        next: (result) => {
          
        this.confirmed = +result['response'][0]['cases']['total'];
        this.active= +result['response'][0]['cases']['active'];
        this.recovered= +result['response'][0]['cases']['recovered'];
        this.death= +result['response'][0]['deaths']['total'];

        this.updateCountryDateWiseData(country);
        }, 
        complete : ()=>{
          this.loading = false;
        }
      });

  }


  updateCountryDateWiseData(country:string){
    // fhgfhgf
    this.datewisedata = [];
    this.loading = true;
    let date:string,confirmed,recovered,death;
    this.apiDataService.getCountryWiseDateData(country).subscribe(
      {
        next: (result) => {
        // const arrayOfObj = Object.entries(result).map((e) => ( { [e[0]]: e[1] } ));
        var myData = Object.keys(result).map(key => {
          return result[key];
      })
         //console.log(myData);
        
         for(let i=0;i<myData.length;i++){
            //console.log(myData[i]);
            date=myData[i]['Date'];
            confirmed=myData[i]['Confirmed'];
            recovered=myData[i]['Recovered'];
            death=myData[i]['Deaths'];
            let date1=date.substr(0,10);
            this.datewisedata.push([date1,confirmed,recovered,death]);
         }
         console.log(this.datewisedata);
        
        }, 
        complete : ()=>{
          this.loading = false;
        }
      });
  }



}
