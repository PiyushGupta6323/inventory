import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShqService } from 'src/app/services/shq.service';
import { SystemitemService } from 'src/app/services/systemitem.service';

@Component({
  selector: 'app-systemitem',
  templateUrl: './systemitem.component.html',
  styleUrls: ['./systemitem.component.css']
})
export class SystemitemComponent {
  @ViewChild('shqEditModal') shqEditModal!: ElementRef;

  systemitemLists: any;
  showEditForm: boolean = false;
  systemitemId: string | null = null;
  units = ["Nos", "Pair", "Mtrs"];
  shqEditFormValues: any = {};
  shqEditForm!: FormGroup<any>;
  currentUnit: any;

  constructor(private systemitemService: SystemitemService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private shqService: ShqService,
  ) 
  { 

  }
  ngOnInit(): void {
    this.getAllSystemitem();

    this.shqEditForm = this.fb.group({
      description: new FormControl(''),
      qty: new FormControl(''),
      unit: new FormControl(''),
      serialNoOrId: new FormControl(''),
      remark: new FormControl(''),
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
  onUpdate(){

  }
  getAllSystemitem(): void {
    this.systemitemService.getSystemItemData().subscribe(
      (data: any[]) => {
        console.log('systemitem data', data);
        this.systemitemLists = data;
        console.log('SYSTEMITEM List:', this.systemitemLists);
  }
    );
 }


 
 editSystemitemDetails(itemName: string) {
  this.showEditForm = true;
  console.log(itemName);
 

  this.shqService.getShqByItemName(itemName).subscribe((res:any) => {
    if (res) {
      this.currentUnit = res["Unit"];
      this.shqEditFormValues = {
        makeModel: res["Make / Model"],
        unit: res["Unit"],
        qty: res["Qty"],
        remark: res["Remark"],
        supplierMakeModel: res["Supplied Make / Model"],
        serialNoOrId: res["Serial No / Processor Board ID"],
        description: "",
      }

      this.shqEditForm.setValue(this.shqEditFormValues);
      
    }

  });
  this.showPopup();

}

showPopup() {
  const modalElement = this.shqEditModal.nativeElement as HTMLElement;
  modalElement.classList.add('show');
  modalElement.style.display = 'block';
  const backdropElement = document.createElement('div');
  backdropElement.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(backdropElement);
}

closeEditPopup() {
  const modalElement = this.shqEditModal.nativeElement as HTMLElement;
  modalElement.classList.remove('show');
  modalElement.style.display = 'none';
  const backdropElement = document.querySelector('.modal-backdrop');
  if (backdropElement) {
    document.body.removeChild(backdropElement);
  }
}




}