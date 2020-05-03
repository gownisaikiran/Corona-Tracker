import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {path:'', component: HomeComponent },
  {path:'countries', component: CountriesComponent },
  {path:'about', component : AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
