import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { MasterItemsService } from 'src/app/services/master-items.service';
import { ShqService } from 'src/app/services/shq.service';


@Component({
  selector: 'app-master-items',
  templateUrl: './master-items.component.html',
  styleUrls: ['./master-items.component.css']
})
export class MasterItemsComponent implements OnInit {
  @ViewChild('shqEditModal') shqEditModal!: ElementRef;

  masterItemForm: any;
  masterItemList: any[] = [];

  masterItem: any;
  showEditForm: boolean = false;
  shqId: string | null = null;
  units = ["Nos", "Pair", "Mtrs"];
  ItemTypes = ["CISCO", "DELL", "HP", "Other"];
  shqEditFormValues: any = {};
  shqEditForm!: FormGroup<any>;
  currentUnit: any;
  editMode: boolean = false;
  currentItemId: number = -1;
  currentItemType: string = "";
  currentLocationIdentifire: string = "";
  LocationIdentifires = ["H", "V", "both"];
  constructor(private masterItemsService: MasterItemsService,
    private fb: FormBuilder, private shqService: ShqService,

  ) {

  }

  ngOnInit(): void {
    this.getMasterItems();

    this.masterItemForm = this.fb.group({
      item_name: new FormControl('', Validators.required),
      item_type: new FormControl(''),
      active: new FormControl(false),
      HDMS: new FormControl(false),
      make_and_model: new FormControl(''),
      location_identifire: new FormControl('')
    });

    this.shqEditForm = this.fb.group({
      description: new FormControl(''),
      qty: new FormControl(''),
      unit: new FormControl(''),
      serialNoOrId: new FormControl(''),
      remark: new FormControl(''),
    });
  }


  onSave() {
    const post = this.masterItemForm.getRawValue();
    const data = {
      item_name: post.item_name,
      active: post.active ? 1 : 0,
      created: "2023-09-06T14:30:00",   // Adjust as per current date and time
      updated: "2023-09-06T14:30:00",   // Adjust as per current date and time
      deleted: 0,
      item_type: post.item_type,
      order_no: "",
      HDMS: post.HDMS ? 1 : 0,
      make_and_model: post.make_and_model,
      location_identifire: post.location_identifire,
      ref_no: ""
    }


    this.masterItemsService.createItems(data).subscribe((res: any) => {
      if (res) {
        const last_inserted_id = res.lastInsertedId;

        const shqPost = {
          master_item_id: last_inserted_id, item_name: post.item_name
        }
        console.log('result items', res)

        console.log(shqPost);
        this.shqService.createShq(shqPost).subscribe((shqRes: any) => {
          console.log('shq data insert', shqRes)
        });

        this.getMasterItems();
      }
    });
  }

  getMasterItems() {
    this.masterItemsService.getMasterItems().subscribe(
      (data: any[]) => {
        this.masterItemList = data;
      }
    );
  }

  masterItemsEdit(id: number): void {
    this.editMode = true;
    this.currentItemId = id;

    let masterItemById = this.masterItemList.find(item => {
      if (item.Id == id) {
        return item;
      }
    });
    this.currentItemType = masterItemById.item_type;
    this.currentLocationIdentifire = masterItemById.LocationIdentifire;
    this.masterItemForm.patchValue({
      item_name: masterItemById.Item_name,
      item_type: masterItemById.item_type,
      HDMS: masterItemById.Is_HDMS,
      active: masterItemById.Is_active,
      make_and_model: masterItemById.Make_And_Model,
      location_identifire: masterItemById.LocationIdentifire

    });
  }

  onUpdate() {
    const post = this.masterItemForm.getRawValue();
    const updatePost = {
      item_name: post.item_name,
      active: post.active ? 1 : 0,
      created: "2023-09-06T14:30:00",   // Adjust as per current date and time
      updated: "2023-09-06T14:30:00",   // Adjust as per current date and time
      deleted: 0,
      item_type: post.item_type,
      order_no: "",
      HDMS: post.HDMS ? 1 : 0,
      make_and_model: post.make_and_model,
      location_identifire: post.location_identifire,
      ref_no: "",
      id: this.currentItemId
    }
    this.masterItemsService.updateMasterItem(updatePost).subscribe((res: any) => {
      this.getMasterItems();
    });
  }


  editShqDetails(shqId: number) {
    this.showEditForm = true;
    console.log(shqId);
    this.shqService.getShqById(shqId).subscribe((res: any) => {
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
