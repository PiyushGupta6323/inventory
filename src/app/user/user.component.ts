import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DesignationService } from '../services/designation.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  users: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  designations: any[] = [];
  editMode = false;
  selectedId: number | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private designationService: DesignationService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      Dist_id: new FormControl<number | null>(null, Validators.required),
      Block_id: new FormControl<number | null>(null, Validators.required),
      Designation_Id: new FormControl<number | null>(null, Validators.required),
      User_name: new FormControl<string>('', Validators.required),
      Password: new FormControl<string>('', Validators.required),
      Isactive: new FormControl<boolean>(true)
    });

    this.loadUsers();
    this.loadDistricts();
    this.loadDesignations();

    this.userForm.get('Dist_id')!.valueChanges.subscribe((distId) => {
      if (distId) {
        this.loadBlocks(distId as number);
      } else {
        this.blocks = [];
        this.userForm.patchValue({ Block_id: null });
      }
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  loadDistricts() {
    this.userService.getAllDistricts().subscribe((data) => (this.districts = data));
  }

  loadBlocks(distId: number) {
    this.userService.getBlocksByDistrict(distId).subscribe((data) => (this.blocks = data));
  }

  loadDesignations() {
    this.designationService.getDesignation().subscribe((data) => (this.designations = data));
  }

  onSubmit() {
    const payload = this.userForm.value;
    if (this.editMode && this.selectedId !== null) {
      this.userService.updateUser(this.selectedId, payload).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    } else {
      this.userService.addUser(payload).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    }
  }

  editUser(row: any) {
    this.editMode = true;
    this.selectedId = row.Id;
    this.userForm.patchValue({
      Dist_id: row.Dist_id,
      Block_id: row.Block_id,
      Designation_Id: row.Designation_Id,
      User_name: row.User_name,
      Password: row.Password,
      Isactive: row.Isactive
    });
  }

  deleteUser(id: number) {
    if (!confirm('Delete this user?')) return;
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  resetForm() {
    this.userForm.reset({ Isactive: true, Dist_id: null, Block_id: null, Designation_Id: null });
    this.blocks = [];
    this.selectedId = null;
    this.editMode = false;
  }
}
