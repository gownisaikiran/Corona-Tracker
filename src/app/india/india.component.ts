import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../apidata.service';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  loading=true;
  default_state='Telangana';
  confirmed=0;
  recovered=0;
  death=0;
  active=0;
  today_confirmed=0;
  today_recovered=0;
  today_deaths=0;
  rec_perc=0;
  death_perc=0;
  active_perc=0;
  states:any[]=[];
  districts=[];
  title = 'Case-type shares in the state as on today';
  type = 'PieChart';
  type1 = 'ColumnChart';
  data1 = [ ];
  data2 = [ ];
  options = {    
    is3D:true,
    colors: ['red','blue','green'],
 };
 options1 = {    
  title: 'Case-type graph in the state as on today', 
  colors: ['blue'],
  animation: {
    duration: 3000,
    easing: 'out',
    startup: true
},
hAxis: {
  title: 'Case Type'
},
vAxis:{
  title: 'No of Cases'
},
};
  width = 400;
  height = 400;




  constructor(private apiDataService:ApidataService) { }

  ngOnInit(): void {

    this.apiDataService.getStates().subscribe(
      {
        next: (result) => {   
          for(let entry of Object.entries(result))
          {
            this.states.push([entry[0],entry[1]['statecode']]);            
          }
         // console.log(this.states)
          this.states.sort();
          
        }, 
        complete : ()=>{
           this.loading = false;
        }
      });

      this.updateStateWiseData(this.default_state);
  }

  updateStateWiseData(state:string){
    this.loading=true;
    this.confirmed=0;
    this.recovered=0;
    this.death=0;
    this.active=0;
    this.districts=[];

    this.apiDataService.getStates().subscribe(
      {
        next: (result) => {  

          for(let entry of Object.entries(result))
          {
            if(entry[0]==state)
            {
             // console.log(entry[0])
              for(let data of Object.entries(entry[1]['districtData']))
              {
                this.districts.push([data[0],data[1]['confirmed'],data[1]['recovered'],data[1]['deceased']]);
                this.confirmed= (+this.confirmed) + (+data[1]['confirmed']);
                this.recovered= (+this.recovered) + ( data[1]['recovered']);
                this.death= (+this.death) + (+data[1]['deceased']);
                this.active = (+this.confirmed) - ((+this.recovered)+(+this.death));
                this.rec_perc= +((this.recovered/this.confirmed)*100).toFixed(2);
                this.death_perc= +((this.death/this.confirmed)*100).toFixed(2);
                this.active_perc= +((this.active/this.confirmed)*100).toFixed(2);
                // console.log(data[1]['confirmed'])
                
              }
             // console.log(this.confirmed,this.recovered,this.death);
            }            
          }
              this.districts.sort();
              if(state=='Telangana') state='tg';
              this.data1=[];
              this.data2=[];
              this.data1.push(['Recovered',this.recovered]);
              this.data1.push(['Deaths',this.death]);
              this.data1.push(['Active',this.active]);
              this.data2.push(['Confimred',this.confirmed]);
              this.data2.push(['Recovered',this.recovered]);
              this.data2.push(['Deaths',this.death]);
              this.data2.push(['Active',this.active]);
              this.stateTodayData(state);

        }, 
        complete : ()=>{
          //this.loading = false;
        }
      });
  }

  stateTodayData(state:string):void{

    for(let i=0;i<this.states.length;i++)
    {
      if(this.states[i][0]==state)
      state=this.states[i][1]
    }

    this.today_confirmed=0;
    this.today_recovered=0;
    this.today_deaths=0;
    state=state.toLowerCase();
    this.apiDataService.getStateDailyData().subscribe({
      next: (result) => {            
      // console.log(result);
       for(let entry of Object.entries(result))
       {
         this.today_confirmed = entry[1][entry[1].length-3][state];
         this.today_recovered = entry[1][entry[1].length-2][state];
         this.today_deaths = entry[1][entry[1].length-1][state];

       // console.log(entry);
       }

             
      }, 
      complete : ()=>{
        this.loading = false;
      }
    });

  }

}
