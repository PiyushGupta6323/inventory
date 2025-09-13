import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'inventory_ui';
  shqLists: any;
  systemitemLists!: any[];
  verticalLists: any;
  districtLists: any;
  designationLists: any;

  constructor() {
  }
  
  ngOnInit(): void {

  }
}

