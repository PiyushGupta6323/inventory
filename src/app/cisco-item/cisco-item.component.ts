import { Component, OnInit } from '@angular/core';
import { CiscoItem, CiscoItemService } from 'src/app/services/cisco-item.service';

@Component({
  selector: 'app-cisco-item',
  templateUrl: './cisco-item.component.html',
  styleUrls: ['./cisco-item.component.css']
})
export class CiscoItemComponent implements OnInit {
  items: CiscoItem[] = [];
  selectedItem: CiscoItem | null = null;
  searchText: string = '';

  constructor(private service: CiscoItemService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this.service.getItems().subscribe(data => this.items = data);
  }

  filteredItems(): CiscoItem[] {
    if (!this.searchText) return this.items;

    const lower = this.searchText.toLowerCase();
    return this.items.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(lower)
      )
    );
  }

  onEdit(item: CiscoItem) {
    this.selectedItem = { ...item }; // Clone the item for editing
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.service.deleteItem(id).subscribe(() => {
        this.getAllItems();
      });
    }
  }

  onSubmit() {
    if (!this.selectedItem) return;

    if (this.selectedItem.Id) {
      // Update existing item
      this.service.updateItem(this.selectedItem.Id, this.selectedItem).subscribe(() => {
        this.getAllItems();
        this.selectedItem = null;
      });
    } else {
      // Create new item
      this.service.createItem(this.selectedItem).subscribe(() => {
        this.getAllItems();
        this.selectedItem = null;
      });
    }
  }

  onCancel() {
    this.selectedItem = null;
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { CiscoItem, CiscoItemService } from 'src/app/services/cisco-item.service';

// // interface CiscoItem {
// //   Id: number;
// //   Site_id: number;
// //   District_Name: string;
// //   Item_name: string;
// //   Old_serial_no: string;
// //   New_serial_no: string;
// //   HDMS_tiket_no: string;
// //   Remark: string;
// //   Tiket_status: string; // ✅ Make sure this line exists
// //   Request_no: string;
// //   RMA_no: string;
// //   Is_active: boolean;
// //   Is_delete: boolean;
// //   last_modified: string;
// //   Created_on: string;
// //   User_Name: string;
// //   User_No: string;
// //   Ip_Address: string;
// //   Engineer_name: string;
// //   Engineer_mobileno: string;
// //   Chnage_orderno: string;
// //   System_id: string;
// // }

// @Component({
//   selector: 'app-cisco-item',
//   templateUrl: './cisco-item.component.html',
//   styleUrls: ['./cisco-item.component.css']
// })
// export class CiscoItemComponent implements OnInit{
//   items: CiscoItem[] = [];
//   selectedItem: CiscoItem | null = null;

//   itemForm!: FormGroup;
//   isEdit = false;
//   currentItemId: number | null = null;
// searchText: string = '';
  
//    constructor(
//     private service: CiscoItemService,
//     private fb: FormBuilder
//    ) {}

//   ngOnInit(): void {
//     this.itemForm = this.fb.group({
//       name: [''],
//       description: ['']
      
//     });
//     this.getAllItems();
//   }
  
//   getAllItems() {
//     this.service.getItems().subscribe(data => this.items = data);
//     }

//     onSubmit() {
//       // const formData = this.itemForm.value;
// if (this.selectedItem?.Id) {
//   this.service.updateItem(this.selectedItem.Id, this.selectedItem).subscribe(() => {
//     this.getAllItems();
//     this.resetForm();
//   });
// }else {
//     this.service.createItem(this.selectedItem!).subscribe(() => {
//       this.getAllItems();
//       this.selectedItem= null;
//     });
//   }
// }
//   onCancel() {
//   this.selectedItem = null;
//  }

    
//     onEdit(item: CiscoItem) {
//       // this.isEdit = true;
//       // this.currentItemId = item.id;
//       // this.itemForm.patchValue(item)
//       this.selectedItem = { ...item }; 
//     }
//     onDelete(id: number) {
//       if (confirm('Are you sure to delete this item?')) {
//         this.service.deleteItem(id).subscribe(() => {
//           this.getAllItems();
//       });
//     }
//   }
//   resetForm() {
//     this.itemForm.reset();
//     this.isEdit = false;
//     this.currentItemId = null;
//   }
// }
