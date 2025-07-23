import { Component, OnInit } from '@angular/core';
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


constructor (private districtService: DistrictService,
 private route: ActivatedRoute) {

 }


 ngOnInit(): void {
  this.loadDistricts();
}




saveDistrict() {
  if (this.districtName) {
    // Logic to save the district, for now using localStorage or pass the data to backend API
    let districts = JSON.parse(localStorage.getItem('districts') || '[]');
    districts.push({ name: this.districtName });
    localStorage.setItem('districts', JSON.stringify(districts));
   

    this.districtName = '';
    alert('District Added Successfully');
  } else {
    alert('Please enter a district name.');
  }
}

  loadDistricts() {
    this.districtService.getDistrictData().subscribe(data => {
      this.districts = data;
    });


    /*"Id": 2,
    "District_name": "Alwar",
    "Created_on": "2015-12-31T15:20:50.000Z",
    "LastModified_on": "2015-12-31T15:20:50.000Z",
    "Isactive": true,
    "Iddelete": false
  },*/


  }


  deleteDistrict(index: number) {
    if (confirm('Are you sure you want to delete this district?')) {
      this.districts.splice(index, 1);
      localStorage.setItem('districts', JSON.stringify(this.districts));
      alert('District Deleted');
    }
  }
  
  editDistrict(index: number) {
    let newName = prompt('Edit District Name', this.districts[index].name);
    if (newName) {
      this.districts[index].name = newName;
      localStorage.setItem('districts', JSON.stringify(this.districts));
      alert('District Updated');
    }
  }
}
