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
        }, 
        complete : ()=>{
          this.loading = false;
        }
      });

  }
}
