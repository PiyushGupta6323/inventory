import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DesignationService } from 'src/app/services/designation.service';
import { ActivatedRoute } from '@angular/router';
// import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  designationForm!: FormGroup;
  designation: any[] = [];
  editMode: any;
  selectedId: number | null = null;

  constructor(private fb: FormBuilder, private designationService: DesignationService) {}

  ngOnInit(): void {
    this.designationForm = this.fb.group({
      Designation_name: [''],
    });
    this.loadDesignation();
  }
  loadDesignation() {
    this.designationService.getDesignation().subscribe(data => {
      this.designation = data;
    });
  }
  onSubmit() {
    if (this.editMode) {
      this.designationService.updateDesignation(this.selectedId!, this.designationForm.value).subscribe(() => {
        this.loadDesignation();
        this.cancelEdit();
      }); 
    } else {
      this.designationService.addDesignation(this.designationForm.value).subscribe(() => {
        this.loadDesignation();
        this.designationForm.reset();
      });
    }
  }
  editDesignation(designation: any) {
    this.editMode = true;
    this.selectedId = designation.Id;
    this.designationForm.patchValue({
      Designation_name: designation.Designation_name
    })
  }
  cancelEdit() {
    this.editMode = false;
    this.selectedId = null;
    this.designationForm.reset();
  }
  deleteDesignation(id: number) {
    this.designationService.deleteDesignation(id).subscribe(() => {
      this.loadDesignation();
    });
  }
}