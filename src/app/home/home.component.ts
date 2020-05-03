import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../apidata.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private localUrl = 'https://covid-19-data.p.rapidapi.com/totals?format=json';
  confirmed=0;
  recovered=0;
  death=0;
  active=0;
  loading= true;
  
  title = "Countries Chart of more than One Lakh Cases";
  columnNames = ['Country', 'Cases'];
  myType = '';
  myData = [
    //  ['Country', 'Cases'],
      // ['London', 8136000],
      // ['New York', 8538000],
      // ['Paris', 2244000],
      // ['Berlin', 3470000],
      // ['Kairo', 19500000]
    ];
   
    
  constructor(private dataService:ApidataService) {  }

   init_chart()
  {
    this.myType='PieChart';
    
    this.dataService.getHomeChartData().subscribe(
      element => {
        //this.pieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
        for(let i=0;i<element['response'].length;i++)
      {
        let country_name = element['response'][i]['country'];
        let total_cases = element['response'][i]['cases']['total'];
        if(total_cases>100000 && country_name!="All")
        {
          this.myData.push([country_name,total_cases]);
          //console.log(this.myData);
        }
        //console.log(country_name+" "+total_cases);
      }
    },
    (err: HttpErrorResponse) => {
        console.log (err.message);
    }
    );

    console.log(this.myData);
  }



  ngOnInit(): void {

    //console.log(this.loading);
    // this.init_chart();
    // this.myType='PieChart';
    
    // this.dataService.getHomeChartData().subscribe(
    //   element => {
    //     //this.pieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
    //     for(let i=0;i<element['response'].length;i++)
    //   {
    //     let country_name = element['response'][i]['country'];
    //     let total_cases = element['response'][i]['cases']['total'];
    //     if(total_cases>100000 && country_name!="All")
    //     {
    //       this.myData.push([country_name,total_cases]);
    //       //console.log(this.myData);
    //     }
    //     //console.log(country_name+" "+total_cases);
    //   }
    // },
    // (err: HttpErrorResponse) => {
    //     console.log (err.message);
    // }
    // );

    console.log(this.myData);

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            
            console.log(result);
            
            // result.forEach(cs => {

              this.confirmed = result.confirmed;
              this.recovered = result.recovered;
              this.death = result.deaths;
              this.active = this.confirmed-(this.recovered+this.death);

            // })

            this.init_chart();
          }, 
          complete : ()=>{
            this.loading = false;
          }
        }
      )





    // this.dataService.getGlobalData().forEach(element => {
    //   console.log(element)
    //   this.confirmed = element.confirmed;
    //   this.recovered = element.recovered;
    //   this.death = element.deaths;
    //   this.active = this.confirmed-(this.recovered+this.death);
    //  // this.loading='false';
    // });
 
    //console.log(this.loading);
    
  }


}
