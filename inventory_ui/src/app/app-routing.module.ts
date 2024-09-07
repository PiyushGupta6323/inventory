import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShqComponent } from './component/shq/shq.component';
import { AppComponent } from './app.component';
import { SystemitemComponent } from './component/systemitem/systemitem.component';
import { MasterItemsComponent } from './component/master-items/master-items.component';

const routes: Routes = [ 
 
  { path: 'shq', component: ShqComponent },  //Route to view page
  { path: 'system-item', component: SystemitemComponent }, //Route to create create/Edit page
  { path: 'master-items', component: MasterItemsComponent }, //Route to create create/Edit page
  //{ path: '', redirectTo: '/system-item', pathMatch: 'full'}  //Redirect to create/edit path
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
