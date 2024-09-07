import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { throwError } from 'rxjs';
import { MasterItemsService } from 'src/app/services/master-items.service';

@Component({
  selector: 'app-master-items',
  templateUrl: './master-items.component.html',
  styleUrls: ['./master-items.component.css']
})
export class MasterItemsComponent {
  masterItemForm: any;
  masterItemList: any[] = [];

  constructor(private masterItemsService: MasterItemsService,
    private fb: FormBuilder,
  ) 
  { 

  }

  ngOnInit(): void {
    this.getMasterItems();

    this.masterItemForm = this.fb.group({
      item_name: new FormControl(''),
      item_type: new FormControl(''),
      active: new FormControl(false),
      HDMS: new FormControl(false)
    });
    
   /* this.systemitemEditForm = this.fb.group({
     description: new FormControl(''),
     Is_active: new FormControl(''),
     Is_delete: new FormControl(''),
     Last_Modified: new FormControl(''),
     Created_on: new FormControl(''),
     item_type: new FormControl(''),
     order_no: new FormControl(''),
     Ref_no: new FormControl(''),
     Is_HDMS: new FormControl(''),
     Make_And_Model: new FormControl(''),
     LocationIdentifire: new FormControl(''),
    });*/
  }

  onSave(){
    const post = this.masterItemForm.getRawValue();
    console.log('asda',post);
    const data = {
      item_name: post.item_name,
      active: post.active ? 1 : 0,
      created: "2023-09-06T14:30:00",   // Adjust as per current date and time
      updated: "2023-09-06T14:30:00",   // Adjust as per current date and time
      deleted: 0,
      item_type: post.item_type,
      order_no: "",
      HDMS: post.HDMS ? 1 : 0,
      make_and_model: "",
      location_identifier: "",
      ref_no: ""
    }
  

    this.masterItemsService.createItems(data).subscribe((res:any) => {
      if (res) {
        console.log(res)
        this.getMasterItems();
      }
    });


    /*this.masterItemsService.addBook(newBook).subscribe((res:any) => {
      if (res) {
        console.log(res)
      }
    });*/
  }

  getMasterItems(){
    this.masterItemsService.getMasterItems().subscribe(
      (data: any[]) => {
        console.log('systemitem data', data);
        this.masterItemList = data;
        console.log('SYSTEMITEM List:', this.masterItemList);
  }
    );
    
  }

  editItems(id:number){

  }

}
