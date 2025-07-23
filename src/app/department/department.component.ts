import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departmentForm: any;
  departmentList: any[] = [];
  departmentId: string | null = null;
  // editMode: boolean = false;
  departmentName: any;
  saveDepartment: any;
  DepartmentName: any;

  constructor(private departmentService: DepartmentService,
    private fb: FormBuilder,

  ) {

  }



  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getDepartment();

    this.departmentForm = this.fb.group({
      Department_name: new FormControl('', Validators.required),
    });

  }

  getDepartment() {
    this.departmentService.getDepartment().subscribe(
      (data: any[]) => {
        this.departmentList = data;
      }
    );
  }

  departmentEdit(departmentId: string): void {
    const departmentToEdit = this.departmentList.find(item => item.id === departmentId);
    if (departmentToEdit) {

      this.departmentForm = { ...departmentToEdit };
      console.log('Editing department with ID:', departmentId);

    } else {
      console.log('Department not found');
    }
  }
  departmentDelete(departmentId: string): void {
    // Add your delete logic here. For example, removing the department from the departmentList:
    this.departmentList = this.departmentList.filter(item => item.id !== departmentId);
    console.log('Department deleted with ID:', departmentId);
  }

  onSave() {
    const post = this.departmentForm.getRawValue();
    const data = {
      Department_name: post.Department_name
    }

    this.departmentService.createItems(data).subscribe((res: any) => {
      if (res) {
        const last_inserted_id = res.lastInsertedId;
        console.log('result items', res)
      }
    })
  }
}
