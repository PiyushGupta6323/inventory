import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DistrictService } from 'src/app/services/district.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
// districtLists: any;
// districtId: string | null = null;
  districtName: string = '';
  districts: any[] = [];
  selectedId: number | null = null;
  districtForm!: FormGroup;
  editMode: boolean = false;
  // district: any[] = [];


constructor (private fb: FormBuilder, private districtService: DistrictService) {}


 ngOnInit(): void {
  this.districtForm = this.fb.group({
    District_name: [''],
  });
  this.loadDistricts();
}
loadDistricts() {
    this.districtService.getDistricts().subscribe(data => {
      this.districts = data;
    });
}
 onSubmit() {
  if (this.editMode) {
  this.districtService.updateDistrict(this.selectedId!, this.districtForm.value).subscribe(() => {
    this.loadDistricts();
    this.cancelEdit();
  });
 } else {
   this.districtService.addDistrict(this.districtForm.value).subscribe(() => {
    this.loadDistricts();
    this.districtForm.reset();
   });
 }
}
editDistrict(district: any) {
  this.editMode = true;
  this.selectedId = district.Id;
  this.districtForm.patchValue({
    District_name: district.District_name
  })
}

  cancelEdit() {
    this.editMode = false;
    this.selectedId = null;
    this.districtForm.reset();
  }

  deleteDistrict(id: number) {
    this.districtService.deleteDistrict(id).subscribe(() => {
      this.loadDistricts();
    });
  }
}
  


//   editDistrict(index: number) {
//     let newName = prompt('Edit District Name', this.districts[index].name);
//     if (newName) {
//       this.districts[index].name = newName;
//       localStorage.setItem('districts', JSON.stringify(this.districts));
//       alert('District Updated');
//     }
//   }
// }
