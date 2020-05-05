import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../apidata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  confirmed=0;
  recovered=0;
  death=0;
  active=0;
  loading= true;
  
 
  constructor(private dataService:ApidataService) {  }



  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe(
        {
          next: (result) => {
            
            console.log(result);           

              this.confirmed = result.confirmed;
              this.recovered = result.recovered;
              this.death = result.deaths;
              this.active = this.confirmed-(this.recovered+this.death);

          }, 
          complete : ()=>{
            this.loading = false;
          }
        });
    
  }

}
