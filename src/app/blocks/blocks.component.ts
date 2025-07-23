import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, FormControl, Validators } from '@angular/forms';
import { BlocksService } from '../services/blocks.service';
@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {
  blocksForm: any;
  FormGroup: any;  
  block_name: string[] = [];
 Buildingcode: any;
 LAT: any;
 Long: any;
 districtName:string ="";
 selectDistrict:any[] = [];
 selectPOPLocation:any[]=[];
 popLocation:string = "";

 blockList:any[] =[];
 editMode:boolean = false;
 

//  uniqueId: any;
// editMode: boolean = false;
currentDistrictName: string = '';
currentPopLocation: string = '';

constructor(private fb:FormBuilder,private blocksService: BlocksService) {}

  ngOnInit(): void {
    this.loadBlocks();

    this.blocksForm = this.fb.group({
      Block_name: new FormControl('', Validators.required),
      Buildingcode: new FormControl(''),
      District_name: new FormControl(false),
      LAT: new FormControl(false),
      Long: new FormControl(''),
      POP_Location: new FormControl(''),
      Unique_id: new FormControl('')
    });  

  }

  loadBlocks() {
    this.blocksService.getBlocks().subscribe(
      (data: any[]) => {
        this.blockList = data;
        console.log('asdasd',data[0].District_name)
      }
    );
    
  }


 onSave() {
  if (this.block_name) {
    let blocks = JSON.parse(localStorage.getItem('blocks') || '[]');
    blocks.push({ name: this.block_name });
    localStorage.setItem('blocks', JSON.stringify(blocks));
    this.block_name = [];
    alert('Block Added Successfully');
  } else {
    alert('Please enter a block name');
  }
  }


  deleteBlocks(index: number) {
    if (confirm('Are you sure you want to delete this block?')) {
      this.block_name.slice(index, 1);
      localStorage.setItem('blocks', JSON.stringify(this.block_name));
      alert('Block Deleted');
    }
  }

  blocksEdit(index: number) {

    let newName = prompt('Edit Block Name', this.block_name[index]);
    if (newName) {
      this.block_name[index] = newName;
      localStorage.setItem('districts', JSON.stringify(this.block_name));
      alert('Block Updated');
    }
  }

  onUpdate() {
    const post = this.blocksForm.getRawValue();
    const updatePost = {
      Id: post.Id,
      districtName: post.District_name ? 1 : 0,
      uniqueId: post.Unique_id,
      blockName: post.Block_name ? 1 : 0,
      popCode: post.Buildingcode ? 1 : 0,
      POPLocation: post.POP_Location ? 1 : 0,
      latitude: post.LAT ? 1 : 0, 
      longitude: post.Long ? 1 : 0,
      // id: this.currentId
    }
    // this.blocksService.updateBlocks(updatePost).subscribe((res: any) => {

    // });
    // this.blocksForm = this.fb.group({
    //   District_name: [''],
    //   POP_Location: [''],
    // });
    
  }
 }
