import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DesignationService } from 'src/app/services/designation.service';
import { ActivatedRoute } from '@angular/router';
// import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {


  designationName: string = '';
  designation: any[] = [];
  // designationForm: any;
  // designationList: any[] = [];
  // designationId: string | null = null;
  // editMode: boolean = false;
  // designationName: any;

  constructor(private designationService: DesignationService,
    // private fb: FormBuilder, 
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.getDesignation();
    this.loadDesignation();

    // this.designationForm = this.fb.group({
    //   Designation_name: new FormControl('', Validators.required),
    // });

  }
  saveDesignation() {
    if (this.designationName) {
      // Logic to save the district, for now using localStorage or pass the data to backend API
      let designation = JSON.parse(localStorage.getItem('designation') || '[]');
      designation.push({ name: this.designationName });
      localStorage.setItem('designation', JSON.stringify(designation));
     
  
      this.designationName = '';
      alert('Designation Added Successfully');
    } else {
      alert('Please enter a designation name.');
    }
  }
  

  // getDesignation() {
  loadDesignation() {
        // this.designationService.getDesignation().subscribe(
        //   (data: any[]) => {
        // this.designationList = data;
        this.designationService.getDesignationData().subscribe(data => {
        this.designation = data;
      });
  }

  deleteDesignation(index: number) {
    if (confirm('Are you sure you want to delete this designation?')) {
      this.designation.splice(index, 1);
      localStorage.setItem('designation', JSON.stringify(this.designation));
      alert('Designation Deleted');
    }
  }
  
  editDesignation(index: number) {
    let newName = prompt('Edit Designation Name', this.designation[index].name);
    if (newName) {
      this.designation[index].name = newName;
      localStorage.setItem('designation', JSON.stringify(this.designation));
      alert('Designation Updated');
    }
  }
  // designationEdit(designationId: string): void {
  //   const designationToEdit = this.designationList.find(item => item.id === designationId);
  //   if (designationToEdit) {

  //     this.designationForm = { ...designationToEdit };
  //     console.log('Editing designation with ID:', designationId);

  //   } else {
  //     console.log('Designation not found');
  //   }
  // }
  // designationDelete(designationId: string): void {
  //   // Add your delete logic here. For example, removing the designation from the designationList:
  //   this.designationList = this.designationList.filter(item => item.id !== designationId);
  //   console.log('Designation deleted with ID:', designationId);
  // }

  // onSave() {
  //   const post = this.designationForm.getRawValue();
  //   const data = {
  //     Designation_name: post.Designation_name
  //   }

  //   this.designationService.createItems(data).subscribe((res: any) => {
  //     if (res) {
  //       const last_inserted_id = res.lastInsertedId;
  //       console.log('result items', res)
  //     }
  //   })
  // }
}
 