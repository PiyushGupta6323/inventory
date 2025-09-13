import { Component, OnInit } from '@angular/core';
import { BlocksService } from '../services/blocks.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  
   blocks: any[] = [];
  blockForm!: any;
  isEditMode = false;
  editId: number | null = null;
  districts: any[] = [];
  poplocations: any[] = [];
  block: any;
  
  

  constructor(private fb: FormBuilder, private blocksService: BlocksService) {}
  
  ngOnInit(): void {
    this.loadBlocks();
    this.loadDistricts();
    this.loadPopLocations();

    this.blockForm = this.fb.group({
      Dist_id: ['', Validators.required],
      Unique_id: ['', Validators.required],
      Block_name: [''],
      Buildingcode: [''],
      POP_Location: [''],
      LAT: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:\.[0-9]{1,6})?)$/)
        ]
      ],
      Long: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:\.[0-9]{1,6})?)$/)
        ]
      ],
      DHQBHQ: [''],
      Govt: [''],
      Airtel: [''],
      BSNL: [''],
      NIC: [''],
      Isactive: [true]

    });
    
  }

   loadBlocks(): void {
    this.blocksService.getBlocks().subscribe({
      next: (data) => (this.blocks = data),
      error: (err) => console.error('Error loading blocks:', err)
    });
  }
  loadDistricts(): void {
    this.blocksService.getDistricts().subscribe({
      next: (data) => (this.districts = data),
      error: (err) => console.error('Error loading Districts:', err)
    });
  }
  
  loadPopLocations(): void {
    this.blocksService.getPopLocations().subscribe({
      next: (data) => (this.poplocations = data),
      error: (err) => console.error('Error loading poplocations:', err)
    })
  }
   onSubmit(): void {
    if (!this.blockForm.valid) {
      alert("Please enter valid data. Check Latitude/Longitude format.");
      return;
    }

    if (this.isEditMode && this.editId !== null) {
      this.blocksService.updateBlock(this.editId, this.blockForm.value).subscribe({
        next: () => {
          alert("Block updated successfully!");
          this.loadBlocks();
          this.resetForm();
        },
        error: (err) => console.error('Error updating block:', err)
      });
    } else {
      this.blocksService.addBlock(this.blockForm.value).subscribe({
        next: () => {
          alert("Block added successfully!");
          this.loadBlocks();
          this.resetForm();
        },
        error: (err) => console.error('Error adding block:', err)
      });
    }
  }
   editBlock(block: any): void {
    this.isEditMode = true;
    this.editId = block.Id;
    this.blockForm.patchValue(block);
   }


  
  deleteBlock(id: number): void {
    if (confirm('Are you sure you want to delete this block?')) {
      this.blocksService.deleteBlock(id).subscribe(() => {
        this.loadBlocks();
      });
    }
  }
     resetForm(): void {
    this.blockForm.reset({ Isactive: true });
    this.isEditMode = false;
    this.editId = null;
   }
  }
  
//     blocks: any[] = [];
//     districts: string[] = [];
//     popLocations: string[] = ['CCC', 'Panchayat Samiti', 'Tehsil', 'RGSK', 'SDM Office']; // Static for now
//     editMode = false;
//     deleteBlock: any;

//     filteredBlocks: any[] = [];
//     searchText: string = '';
//     currentPage = 1;
//     pageSize = 10;

//     formData: any = {
//     District: '',
//     Unique_id: '',
//     Block: '',
//     POP_Code: '',
//     POP_Location: '',
//     Latitude: '',
//     Longitude: ''
    
//   };
// paginatedBlocks: any[] = [];
//   updatePaginatedBlocks: any;


//   constructor(private blocksService: BlocksService) {}

//   ngOnInit() {
//     this.blocksService.getBlocks().subscribe(data => {
//       console.log('API Data:', data);
//       this.blocks = data;
//       this.filterBlocks();
//       this.updatePaginatedBlocks();
//    },
   
//       error => {
//         console.error('Error fetching blocks:', error);
//       }
//     );
    
//   }

//   filterBlocks() {
//     const search = this.searchText.toLowerCase();
//     this.filteredBlocks = this.blocks.filter(block =>
//       Object.values(block).some(val =>
//         val?.toString().toLowerCase().includes(search)
//       )
//     );
//   }
  

//   saveBlock() {
//   const payload = {
//     District_name: this.formData.District,
//     Unique_id: this.formData.Unique_id,
//     Block_name: this.formData.Block,
//     Buildingcode: this.formData.POP_Code,
//     POP_Location: this.formData.POP_Location,
//     LAT: this.formData.Latitude,
//     Long: this.formData.Longitude
//   };

//   this.blocksService.addBlock(payload).subscribe(
//     () => {
//       alert('Block added successfully!');
//       this.formData = {}; // reset form
//       this.ngOnInit(); // reload table
//     },
//     error => {
//       console.error('Error adding block:', error);
//       alert('Error adding block. Check console.');
//     }
//   );
    
//   this.blocksService.addBlock(this.formData).subscribe(
//     () => {
//       alert('Block added successfully!');
//       this.ngOnInit(); // reload data
//     },
//     error => {
//       console.error('Error adding block:', error);
//       alert('Error adding block. Check console.');
//     }
//   );
// }
    
//   getpeginatedBlocks() {
//     const start = (this.currentPage =1) * this.pageSize;
//     return this.filteredBlocks.slice(start, start + this.pageSize);
//   }

//   totalPages() {
//     return Math.ceil(this.filteredBlocks.length / this.pageSize);
//   }

//   changePage(page: number) {
//     this.currentPage = page;
//   }
// }
//   loadDistricts() {
//     this.blocksService.getDistricts().subscribe(data => {
//       this.districts = data;
//     });
//   }

//   editBlock(block: any) {
//     this.editMode = true;
//     this.formData = { ...block };
//   }

//   onSubmit() {
//     if (!this.editMode) {
//       this.formData.Unique_id = 'V' + (this.blocks.length + 1); // auto ID
//     }

//     this.blocksService.addBlock(this.formData).subscribe(() => {
//       this.loadBlocks();
//       this.resetForm();
//     });
//   }

//   resetForm() {
//     this.formData = {
//       District_name: '',
//       Unique_id: '',
//       Block_name: '',
//       Buildingcode: '',
//       POP_Location: '',
//       LAT: '',
//       Long: ''
//     };
//     this.editMode = false;
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BlocksService } from '../services/blocks.service';

// @Component({
//   selector: 'app-blocks',
//   templateUrl: './blocks.component.html',
//   styleUrls: ['./blocks.component.css']
// })
// export class BlocksComponent implements OnInit {
//   blocks: any[] = [];
//   districts: string[] = [];
//   blockForm: FormGroup;
//   isLoading = false;
//   popLocation: string[] = [];
//   location: any;
//   editMode: boolean = false;
//   editingBlockId: number | null = null;


//   constructor(
//     private fb: FormBuilder,
//     private blocksService: BlocksService
//   ) {
//     this.blockForm = this.fb.group({
//       District_name: ['', Validators.required],
//       Unique_id: ['', Validators.required],
//       Block_name: ['', Validators.required],
//       Buildingcode: ['', Validators.required],
//       POP_Location: ['', Validators.required],
//       LAT: ['', Validators.required],
//       Long: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.getBlocks();
//     this.getDistricts();
//   }

//   getBlocks(): void {
//     this.isLoading = true;
//     this.blocksService.getBlocks().subscribe({
//       next: (data) => {
//         this.blocks = data;
//        console.log("Blocks Data:", data);
//         this.popLocation = [...new Set(data.map((location: any) => location.POP_Location))];
//          console.log("POP_Locations:", this.popLocation);
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error loading blocks:', err);
//         this.isLoading = false;
//       }
//     });
//   }

//   getDistricts(): void {
//     this.blocksService.getDistricts().subscribe({
//       next: (data) => this.districts = data,
//       error: (err) => console.error('Error loading districts:', err)
//     });
//   }

//   // onSubmit(): void {
//   //   if (this.blockForm.invalid) return;

//   //   this.blocksService.addBlock(this.blockForm.value).subscribe({
//   //     next: () => {
//   //       this.blockForm.reset();
//   //       this.getBlocks();
//   //       alert('Block added successfully.');
//   //     },
//   //     error: (err) => {
//   //       console.error('Error adding block:', err);
//   //       alert('Error adding block.');
//   //     }
//   //   });
//   // }

//   onEdit(block: any): void {
//   this.editMode = true;
//   this.editingBlockId = block.Id;

//   this.blockForm.patchValue({
//     District_name: block.District_name,
//     Unique_id: block.Unique_id,
//     Block_name: block.Block_name,
//     Buildingcode: block.Buildingcode,
//     POP_Location: block.POP_Location,
//     LAT: block.LAT,
//     Long: block.Long
//   });
// }
// onDelete(id: number): void {
//   if (confirm('Are you sure you want to delete this block?')) {
//     this.blocksService.deleteBlock(id).subscribe({
//       next: () => {
//         alert('Block deleted successfully.');
//         this.getBlocks();
//       },
//       error: (err) => {
//         console.error('Error deleting block:', err);
//         alert('Error deleting block.');
//       }
//     });
//   }
// }
// onSubmit(): void {
//   if (this.blockForm.invalid) return;

//   const formData = this.blockForm.value;

//   if (this.editMode && this.editingBlockId) {
//     // UPDATE mode
//     this.blocksService.updateBlock(this.editingBlockId, formData).subscribe({
//       next: () => {
//         alert('Block updated successfully.');
//         this.blockForm.reset();
//         this.editMode = false;
//         this.editingBlockId = null;
//         this.getBlocks();
//       },
//       error: (err) => {
//         console.error('Error updating block:', err);
//         alert('Error updating block.');
//       }
//     });
//   } else {
//     // ADD mode
//     this.blocksService.addBlock(formData).subscribe({
//       next: () => {
//         alert('Block added successfully.');
//         this.blockForm.reset();
//         this.getBlocks();
//       },
//       error: (err) => {
//         console.error('Error adding block:', err);
//         alert('Error adding block.');
//       }
//     });
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validator, FormControl, Validators } from '@angular/forms';
// import { BlocksService } from '../services/blocks.service';
// @Component({
//   selector: 'app-blocks',
//   templateUrl: './blocks.component.html',
//   styleUrls: ['./blocks.component.css']
// })
// export class BlocksComponent implements OnInit {
//   blocksForm: any;
//   FormGroup: any;  
//   block_name: string[] = [];
//  Buildingcode: any;
//  LAT: any;
//  Long: any;
//  districtName:string ="";
//  selectDistrict:any[] = [];
//  selectPOPLocation:any[]=[];
//  popLocation:string = "";

//  blockList:any[] =[];
//  editMode:boolean = false;
 


// currentDistrictName: string = '';
// currentPopLocation: string = '';

// constructor(private fb:FormBuilder,private blocksService: BlocksService) {}

//   ngOnInit(): void {
//     this.loadBlocks();

//     this.blocksForm = this.fb.group({
//       Block_name: new FormControl('', Validators.required),
//       Buildingcode: new FormControl(''),
//       District_name: new FormControl(false),
//       LAT: new FormControl(false),
//       Long: new FormControl(''),
//       POP_Location: new FormControl(''),
//       Unique_id: new FormControl('')
//     });  

//   }

//   loadBlocks() {
//     this.blocksService.getBlocks().subscribe(
//       (data: any[]) => {
//         this.blockList = data;
//         console.log('asdasd',data[0].District_name)
//       }
//     );
    
//   }


//  onSave() {
//   if (this.block_name) {
//     let blocks = JSON.parse(localStorage.getItem('blocks') || '[]');
//     blocks.push({ name: this.block_name });
//     localStorage.setItem('blocks', JSON.stringify(blocks));
//     this.block_name = [];
//     alert('Block Added Successfully');
//   } else {
//     alert('Please enter a block name');
//   }
//   }


//   deleteBlocks(index: number) {
//     if (confirm('Are you sure you want to delete this block?')) {
//       this.block_name.slice(index, 1);
//       localStorage.setItem('blocks', JSON.stringify(this.block_name));
//       alert('Block Deleted');
//     }
//   }

//   blocksEdit(index: number) {

//     let newName = prompt('Edit Block Name', this.block_name[index]);
//     if (newName) {
//       this.block_name[index] = newName;
//       localStorage.setItem('districts', JSON.stringify(this.block_name));
//       alert('Block Updated');
//     }
//   }

//   onUpdate() {
//     const post = this.blocksForm.getRawValue();
//     const updatePost = {
//       Id: post.Id,
//       districtName: post.District_name ? 1 : 0,
//       uniqueId: post.Unique_id,
//       blockName: post.Block_name ? 1 : 0,
//       popCode: post.Buildingcode ? 1 : 0,
//       POPLocation: post.POP_Location ? 1 : 0,
//       latitude: post.LAT ? 1 : 0, 
//       longitude: post.Long ? 1 : 0,
//     }
//   }
// };
      // id: this.currentId
    
    // this.blocksService.updateBlocks(updatePost).subscribe((res: any) => {

    // });
    // this.blocksForm = this.fb.group({
    //   District_name: [''],
    //   POP_Location: [''],
    // });
    
