import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaceComplaintItemService } from 'src/app/services/replace-complaint-item.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-replace-complaint-item',
  templateUrl: './replace-complaint-item.component.html',
  styleUrls: ['./replace-complaint-item.component.css']
})
export class ReplaceComplaintItemComponent implements OnInit {
  replaceComplaintItem: any = {};
  replaceItem: any = {};  // ✅ Define replaceItem for Template-driven Forms
  serialNumbers: string[] = [];
  siteId: string | null = null;
  errorMessage: string | null = null;
  itemDetails: any;
  // Removed duplicate declaration of activatedRoute
 
  constructor(
    // private fb: FormBuilder,  // ✅ Inject FormBuilder
    private replaceComplaintItemService: ReplaceComplaintItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient  // ✅ Inject HttpClient
  ) {} 
    
    getItemDetails(siteId: number): Observable<any> {
      return this.http.get(`/api/replace-item?siteId=${siteId}`);
    }
    
    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
        this.siteId = params.get('siteId');
        console.log("Loaded Site ID:", this.siteId);
        if (this.siteId) {
          this.loadItemDetails();
        } else {
          console.error("Error: Site ID not found in the route!");
        }
      });
    
    // ✅ Initialize the form with form controls
    // this.replaceItem = this.fb.group({
    //   Site_id: ['', Validators.required],
    //   District_Name: ['', Validators.required],
    //   Block_Name: ['', Validators.required],
    //   Department_Name: ['', Validators.required],
    //   Item_Name: ['', Validators.required],
    //   Old_serial_no: ['', Validators.required],
    //   Item_Type: ['', Validators.required],  // ✅ Ensure Item_Type is defined
    //   Replace_With: ['', Validators.required],
    //   New_serial_no: ['', Validators.required],
    //   HDMS_tiket_no: ['', Validators.required],
    //   Chnage_orderno: ['', Validators.required],
    //   Remark: ['', Validators.required]
    // });
    this.fetchSerialNumbers();
  }
  loadItemDetails() { // No parameters
    if (this.siteId) {
     
        this.replaceComplaintItemService.getItemDetails(+this.siteId).subscribe({
            next: (data) => {
              console.log("Fetched item for replacement:", data);
              this.replaceComplaintItem = data;
            },
            error: (error) => {
                console.error("Error fetching item details:", error);
            }
        });
    }
    
  }

  // loadItemDetails(itemId: string): void {
  //   if (!this.itemId) {
  //     console.error("No item ID found in the route!");
  //     return;
  //   }
  
  //   this.replaceComplaintItemService.getItemDetails(this.itemId).subscribe({
  //    next: (data) => {
  //       this.replaceItem = data;
  //     },
  //     error: (err) => {
  //       console.error("Error fetching item details:", console.error);
  //     }
  // });
  // }
  fetchSerialNumbers() {
    this.replaceComplaintItemService.getSerialNumbers().subscribe({
      next: (data) => {
        this.serialNumbers = data; 
        // .map((item: any) => item.New_serial_no); // ✅ Extract serial numbers
      },
      error: (err) => {
        console.error('Error fetching serial numbers:', err);
        this.errorMessage = 'Could not load serial numbers';
      }
    });
  }
  

  onSubmit() {
    // if (this.replaceItemForm.valid) {  // ✅ Ensure form is valid
    this.replaceComplaintItemService.addReplacementItem(this.replaceItem).subscribe({
     next:  (response) => {
        alert('Replacement item saved successfully!');
        this.router.navigate(['/dashboard']); // Redirect after success
      },
      error: (err) => {
        alert('Error saving replacement item.');
        console.error(err);
      }
  });
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
  
}
// export class ReplaceComplaintItemComponent {
//   formData: any = {}; // ✅ Initialize form data
//   complaintItem: any = {  // ✅ Define complaintItem to prevent errors
//     Site_id: 101,
//     District_Name: "District A",
//     Block_name: "Block X",
//     Department_name: "IT Department",
//     Item_name: "Router",
//     Old_serial_no: "OLD12345"
//   };
//   serialOptions: string[] = ["NEW12345", "NEW67890", "NEW98765"];  // ✅ Define serialOptions here
//   replaceOptions: string[] = ["New Router", "New Switch", "New Cable"];  // ✅ Define replaceOptions

//   constructor(private itemService: ReplaceComplaintItemService,
//     private location: Location  // ✅ Inject Location service
//   ) {}
//   replaceItem() {
//     const replacementData = {
//       Site_id: 2349,
//       District_Name: "JAIPUR",
//       Block_Name: "BASSI" ,
//       Department_Name: "ADM",
//       Item_name: "1 KVA UPS",
//       Old_serial_no: "8312l1209100877",
//       Item_Type: "Other",
//       Replace_With: "",
//       New_serial_no: "8312L1208103642",
//       HDMS_tiket_no: "993726",
//       Chnage_orderno: null,
//       Remark: "Equipment Faulty"
//     };

    
//     this.itemService.replaceItem(replacementData).subscribe({
//       next: (response: any) => {
//         console.log('Item replaced:', response);
//         alert("Item replaced successfully!");
//       },
//       error: (error: any) => {
//         console.error('Error replacing item:', error);
//       }
//     });
//   }
//   submitForm() {
//     console.log("Submitting Form Data:", this.formData);
//   }
//   goBack() {
//     this.location.back(); // Navigates back to the previous page
//   }
// }