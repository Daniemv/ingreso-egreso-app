import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';


const childrenRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(childrenRoutes)
  ],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
