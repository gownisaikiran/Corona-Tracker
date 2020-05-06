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
  rec_perc=0;
  death_perc=0;
  active_perc=0;
  states:string[]=[];
  districts=[];

  constructor(private apiDataService:ApidataService) { }

  ngOnInit(): void {

    this.apiDataService.getStates().subscribe(
      {
        next: (result) => {  
          for(let key in result)  
          {
            this.states.push(key);
            //console.log(key)
          }  

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
              console.log(entry[0])
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
              console.log(this.confirmed,this.recovered,this.death);
            }            
          }
              this.districts.sort();
        }, 
        complete : ()=>{
          this.loading = false;
        }
      });
  }

}
