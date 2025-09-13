import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentForm!: FormGroup;
  editMode: any;
  department: any[] = [];
  selectedId: number | null = null;
  departmentName: string = '';

  

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      Department_name: [''],
    });
    this.loadDepartment();
  }
  loadDepartment() {
    this.departmentService.getDepartment().subscribe(data => {
      this.department = data;
    });
  }
  onSubmit() {
    if (this.editMode) {
      this.departmentService.updateDepartment(this.selectedId!, this.departmentForm.value).subscribe(() => {
        this.loadDepartment();
        this.cancelEdit();
      });
    } else {
      this.departmentService.addDepartment(this.departmentForm.value).subscribe(() => {
        this.loadDepartment();
        this.departmentForm.reset();
      });
    }
  }
  editDepartment(department: any) {
    this.editMode = true;
    this.selectedId = department.Id;
    this.departmentForm.patchValue({
      Department_name: department.Department_name
    })
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedId = null;
    this.departmentForm.reset(); 
  }
   deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.loadDepartment();
    });
   }
}