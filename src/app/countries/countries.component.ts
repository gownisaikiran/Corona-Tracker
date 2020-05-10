import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../apidata.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  
  default_country="India";
  confirmed=0;
  recovered=0;
  death=0;
  active=0;
  rec_perc=0;
  death_perc=0;
  active_perc=0;
  today_confirmed=0;
  today_recovered=0;
  today_deaths=0;
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
            if(result['response'][i]['country']!='All')
            {
              let country_name = result['response'][i]['country'];
              this.countries.push(country_name);
            }
            
          }
           this.countries.sort();
        }, 
        complete : ()=>{
          // this.loading = false;
        }
    });
  // Loads default country statistics 
    this.updateCountryWiseData(this.default_country);
  }



  updateCountryWiseData(country:string):void{

    this.loading = true;
    //console.log(country);

    this.apiDataService.getCountryWiseData(country).subscribe(
      {
        next: (result) => {

        console.log(result)

        this.confirmed = +result['response'][0]['cases']['total'];
        this.active= +result['response'][0]['cases']['active'];
        this.recovered= +result['response'][0]['cases']['recovered'];
        this.death= +result['response'][0]['deaths']['total'];
        this.rec_perc= +((this.recovered/this.confirmed)*100).toFixed(2);
        this.death_perc= +((this.death/this.confirmed)*100).toFixed(2);
        this.active_perc= +((this.active/this.confirmed)*100).toFixed(2);

        this.updateCountryDateWiseData(country);
        }, 
        complete : ()=>{
          // this.loading = false;
        },
        error : ()=>{
          this.loading = false;
          
        }
      });

  }


  updateCountryDateWiseData(country:string){
  
    this.datewisedata = [];
    this.loading = true;
    let date:string,confirmed,recovered,death;
    this.apiDataService.getCountryWiseDateData(country).subscribe(
      {
        next: (result) => {
        
        var myData = Object.keys(result).map(key => {
          return result[key];
      })
        console.log(myData);
        
         for(let i=0;i<myData.length;i++){
            //console.log(myData[i]);
            date=myData[i]['Date'];
            confirmed=myData[i]['Confirmed'];
            recovered=myData[i]['Recovered'];
            death=myData[i]['Deaths'];
            let date1=date.substr(0,10);
            this.datewisedata.push([date1,confirmed,recovered,death]);
         }
            this.countryTodayData(country);
        }, 
        complete : ()=>{
          //this.loading = false;
        },
        error : ()=>{
          this.loading = false;
        }
      });
  }

  countryTodayData(country:string):void{

    if(country=='USA')
    country='United States of America';

    if(country=='Africa')
    country='South Africa';

    this.today_confirmed=0;
    this.today_recovered=0;
    this.today_deaths=0;

    this.apiDataService.getCountries().subscribe({
      next: (result) => {            
       console.log(result);
       for(let i=0;i<result.length;i++)
       {
          console.log(country,result[i].Country)
          if(country==result[i].Country)
          {
            this.today_confirmed=result[i].NewConfirmed;
            this.today_recovered=result[i].NewRecovered;
            this.today_deaths=result[i].NewDeaths;
          }     
       }
             
      }, 
      complete : ()=>{
        this.loading = false;
      }
    });

  }

}
