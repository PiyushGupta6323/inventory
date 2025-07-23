import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemComplainService } from 'src/app/services/item-complain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-item-complain',
  templateUrl: './other-item-complain.component.html',
  styleUrls: ['./other-item-complain.component.css']
})
export class OtherItemComplainComponent implements OnInit {
  itemComplaints: any[] = [];
 data: any[] = [];
  replaceItemForm!: FormGroup; // ✅ Define replaceItemForm

  // ✅ Reference to Modal Element
  @ViewChild('replaceItemModal', { static: false }) replaceItemModal!: ElementRef;

  constructor(private itemcomplainService: ItemComplainService,
    private fb: FormBuilder,  // ✅ Inject FormBuilder
    private router: Router  // ✅ Inject Router
  ) {}
  ngOnInit(): void {
    this.fetchItemComplaints();
    this.initializeForm();  // ✅ Initialize Form
  }

  fetchItemComplaints(): void {
    this.itemcomplainService.getItemComplaints().subscribe(
      (data) => {
        console.log("Fetched Data:", data); // Debugging
        this.itemComplaints = data;
      },
      (error) => {
        console.error("Error fetching complaints:", error);
      }
    );
  }

  // ✅ Initialize Form
  initializeForm(): void {
    this.replaceItemForm = this.fb.group({
      Site_id: ['', Validators.required],
      District_Name: ['', Validators.required],
      Block_name: ['', Validators.required],
      Department_name: ['', Validators.required],
      Item_name: ['', Validators.required],
      Old_serial_no: ['', Validators.required],
      Item_type: ['', Validators.required],
      New_serial_no: ['', Validators.required],
      HDMS_tiket_no: ['', Validators.required],
      Chnage_orderno: ['', Validators.required],
      Remark: ['', Validators.required]
    });
  }

  onUpdate(): void {
    if (this.replaceItemForm.valid) {
      console.log('Form Data:', this.replaceItemForm.value);
      alert('Item replacement data submitted successfully!');
    } else {
      alert('Please fill out all required fields.');
    }
  }

  replaceItem(siteId: number): void {
    console.log("Navigating to replace item with Site ID:", siteId);
  if (!siteId) {
    console.error("Error: Site ID is missing!", siteId);
    alert("Error: Site ID is missing!");
    return;
  }
  this.router.navigate(['/replace-complaint-item', siteId]);  // Only pass the ID
}

  itemDelete(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemcomplainService.deleteItemComplaint(id).subscribe(
        () => {
          console.log(`Item with ID ${id} deleted successfully.`);
          this.fetchItemComplaints();
        },
        (error) => {
          console.error('Error deleting complaint:', error);
        }
      );
    }
  }
   // ✅ Add closeReplacePopup() to Hide the Modal
   closeReplacePopup(): void {
    if (this.replaceItemModal) {
      (this.replaceItemModal.nativeElement as HTMLElement).classList.remove('show');
      (this.replaceItemModal.nativeElement as HTMLElement).setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open'); // Remove background overlay
    }
  }
}
