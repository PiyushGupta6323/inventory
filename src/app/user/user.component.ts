import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: any;
  FormGroup: any;
  User_name: string[] = [];
  designationName: any[]=[];
  selectDesignation: any[]=[];
  currentDesignationName: string = '';
  blockName: string[] = [];
  selectBlock: any[]=[];
  currentBlockName: string = '';
  districtName:string ="";
  selectDistrict: any[] = [];
  currentDistrictName: string = '';
  editMode: boolean = false;
  userList: any[] = [];

  constructor(private fb:FormBuilder,private userService: UserService) {}


  ngOnInit(): void {
    this.loadUser();
    // throw new Error('Method not implemented.');
    this.userForm = this.fb.group({
      User_name: new FormControl('', Validators.required),
      Dist_id: new FormControl(false),
      Block_id: new FormControl(''),
      Unique_Id: new FormControl(''),
      Designation_Id: new FormControl(''),
      Password: new FormControl(''),
      Isactive: new FormControl(''),
      Isdelete: new FormControl('')
    });
  }
  loadUser() {
    this.userService.getUser().subscribe(
      (data: any[]) => {
        this.userList = data;
        console.log('asdasd',data[0].District_name)
      }
    );
    
  }

  onSave() {
    if (this.User_name) {
      let user = JSON.parse(localStorage.getItem('user') || '[]');
      user.push({ name: this.User_name});
      localStorage.setItem('úser', JSON.stringify(user));
      this.User_name = [];
      alert('User Added Successfully');
    } else {
      alert('Please enter a user name');
    }
    }


  userDelete(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.User_name.slice(index, 1);
      localStorage.setItem('user', JSON.stringify(this.User_name));
      alert('User Deleted');
    }
  }

  userEdit(index: number) {

    let newName = prompt('Edit User Name', this.User_name[index]);
    if (newName) {
      this.User_name[index] = newName;
      localStorage.setItem('districts', JSON.stringify(this.User_name));
      alert('User Updated');
    }
  }

  onUpdate() {
    const post = this.userForm.getRawValue();
    const updatePost = {
      Id: post.Id,
      district: post.Dist_id ? 1 : 0,
      blockName: post.Block_id ? 1 : 0,
      uniqueId: post.Unique_id ? 1 : 0,
      designationName: post.Designation_id ? 1 : 0,
      UserName: post.User_name ? 1 : 0,
      Password: post.Password ? 1 : 0,
      IsActive: post.Isactive ? 1 : 0, 
      Action: post.Action ? 1 : 0,
}
  }
}
