import { Component } from '@angular/core';
import { SiteShiftedService } from '../services/site-shifted.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-shifted',
  templateUrl: './site-shifted.component.html',
  styleUrls: ['./site-shifted.component.css']
})
export class SiteShiftedComponent {
siteShiftedForm: any;
FormGroup: any;
block_name: string[] = [];
Buildingcode: any;
allDistrictList: any[] = []; // Holds the district data
selectedDistrict: number | null = null; // Holds the selected district's ID
selectedBlock: number | null = null; // Holds the selected district's ID
blocks: any;
hodIds: any;
selectedHodId: number | null = null;
hodIdsList: any;
departmentNames: any;
buildingCodes: any[] = []; // Array to hold building codes
selectedBuildingCode: string | null = null; // To store the selected building code
hodIdsAddress: any;
AddressByHodId: any;

  

constructor(private siteShiftedService: SiteShiftedService,
  private fb: FormBuilder,

) {

}


ngOnInit(): void {
  // throw new Error('Method not implemented.');
  this.getAllDistrict();
  this.formControls();
}

getAllDistrict(){
  this.siteShiftedService.getAllDistrict().subscribe(
    (data) => {
      this.allDistrictList = data;
    },
    (error) => {
      console.error('Error fetching districts:', error);
    }
  );
}


fetchBlocks(event: Event): void {
  let districtId : number | null = this.selectedDistrict;
  this.siteShiftedService.getBlocksByDistrictId(districtId).subscribe(
    (data) => {
      this.blocks = data;
      console.log('Blocks data:', this.blocks);
    },
    (error) => {
      console.error('Error fetching blocks:', error);
    }
  );
}

fetchHOD(event: Event): void {
  let blockId : number | null = this.selectedBlock;
  this.siteShiftedService.getHodsByBlockId(blockId).subscribe(
    (data) => {
      this.hodIds = data;
      console.log('hoid data:', this.hodIds);
    },
    (error) => {
      console.error('Error fetching blocks:', error);
    }
  );
}

async fetchHODDetail(event: Event) {
  let hodId : number | null = this.selectedHodId;

  this.siteShiftedService.getHodsListByHodId(hodId).subscribe(
    async (data) => {
        this.hodIdsList =   await data[0];
      this.fetchAddressByHodId(this.hodIdsList.HO_id);
      console.log('hodIdsList data:', this.hodIdsList);
      
    },
    (error) => {
      console.error('Error fetching blocks:', error);
    }
  );
  
}


fetchAddressByHodId(hodId:number){
  this.siteShiftedService.getAddressByHodId(hodId).subscribe(
    (data) => {
      this.hodIdsAddress = data[0];

      console.log('hodIdsAdress data 999:', this.hodIdsAddress);

      this.editAddress(this.hodIdsAddress);
      
    },
    (error) => {
      console.error('Error fetching blocks:', error);
    }
  );
}


editAddress(allAdress:any){
    this.siteShiftedForm.patchValue({
      oldAddress: allAdress?.Old_address,
      NewAddress: allAdress?.New_address,
  });
}

formControls(){
  this.siteShiftedForm = this.fb.group({
    oldAddress: new FormControl('', Validators.required),
    NewAddress: new FormControl(''),
})
}

onUpdate(){
  const post = this.siteShiftedForm.getRawValue();
  const updatePost = {
    
  }
  this.siteShiftedService.updateSiteShifted(updatePost).subscribe((res: any) => {
    this.AddressByHodId();
  });
}

}