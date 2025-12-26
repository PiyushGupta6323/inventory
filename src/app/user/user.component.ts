import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DesignationService } from '../services/designation.service';
import { BlocksService } from '../services/blocks.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
getFilteredUsers() {
throw new Error('Method not implemented.');
}
  userForm!: FormGroup;
  users: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  designations: any[] = [];
  editMode = false;
  selectedId: number | null = null;
  searchText: string = '';
  pageSize: number = 10;
  currentPage: number = 1;
  filteredUsers: any[] = [];
  Math = Math; 

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
    this.loadDistricts();
    this.loadDesignations();

     // auto-load blocks when district changes
    this.userForm.get('Dist_id')!.valueChanges.subscribe((districtId) => {
      if (districtId) {
        this.loadBlocks(districtId);
      } else {
        this.blocks = [];
        this.userForm.patchValue({ Block_id: null });
      }
    });
  }
  initForm() {
    this.userForm = this.fb.group({
      Dist_id: [null, [Validators.required]],
      Block_id: [null, [Validators.required]],
      Designation_Id: [null, [Validators.required]],
      User_name: ['', [Validators.required, Validators.minLength(3)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Isactive: [true, [Validators.required]]
    });
    
    console.log('Form initialized:', this.userForm.value);
    console.log('Form controls:', this.userForm.controls);
  }
    // this.userForm.get('Dist_id')!.valueChanges.subscribe((distId) => {
    //   if (distId) {
    //     this.loadBlocks(distId as number);
    //   } else {
    //     this.blocks = [];
    //     this.userForm.patchValue({ Block_id: null });
    //   }
    // });
  

   // Loaders
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log('Users loaded from API:', data);
        this.users = data || [];
        this.filteredUsers = this.users.slice();
        console.log('First user sample:', this.users[0]);
        console.log('First user keys:', Object.keys(this.users[0] || {}));
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  // ✅ Load Districts
  loadDistricts() {
    this.userService.getAllDistricts().subscribe({
      next: (data) => {
        console.log('Districts loaded from API:', data);
        this.districts = data;
      },
      error: (err) => {
        console.error('Error loading districts:', err);
      }
    });
  }

  // ✅ Load Blocks by District
  loadBlocks(districtId: number) {
  console.log('loadBlocks called with districtId:', districtId);
  if (!districtId) {
    this.blocks = [];
    this.userForm.patchValue({ Block_id: null });
    return;
  }

  this.userService.getBlocksByDistrictId(districtId).subscribe({
    next: (data) => {
      console.log('Blocks API response:', data);
      this.blocks = data || [];
      console.log('Blocks Loaded:', this.blocks);
    },
    error: (err) => {
      console.error('Error loading blocks:', err);
      this.blocks = [];
    }
  });
}


  loadDesignations() {
    this.userService.getDesignation().subscribe({
      next: (data) => { 
        console.log('Designations loaded from API:', data);
        this.designations = data || [];
      },
      error: (err) => console.error('Error loading designations:', err)
    });
  }

   // Search filter
  applyFilter() {
    const s = (this.searchText || '').trim().toLowerCase();
    if (!s) {
      this.filteredUsers = this.users.slice();
      this.currentPage = 1;
      return;
    }

    this.filteredUsers = this.users.filter(u => {
      return (
        (u.User_name || '').toString().toLowerCase().includes(s) ||
        (u.District_name || '').toString().toLowerCase().includes(s) ||
        (u.Block_name || '').toString().toLowerCase().includes(s) ||
        (u.Unique_id || '').toString().toLowerCase().includes(s) ||
        (u.Designation_name || '').toString().toLowerCase().includes(s)
      );
    });
    this.currentPage = 1;
  }

  // Submit (Add or Update)
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      
      // Show specific validation errors
      const errors = this.getFormValidationErrors();
      if (errors.length > 0) {
        alert('Please fix the following errors:\n' + errors.join('\n'));
      }
      return;
    }

    const payload = {
      Dist_id: Number(this.userForm.value.Dist_id),
      Block_id: Number(this.userForm.value.Block_id),
      Designation_Id: Number(this.userForm.value.Designation_Id),
      User_name: this.userForm.value.User_name,
      Password: this.userForm.value.Password,
      Isactive: this.userForm.value.Isactive ? 1 : 0
    };

    if (this.editMode && this.selectedId !== null) {
      this.userService.updateUser(this.selectedId, payload).subscribe({
        next: () => {
          alert('User updated successfully');
          this.resetForm();
          this.loadUsers();
        },
        error: (err) => console.error('Update error:', err)
      });
    } else {
      this.userService.addUser(payload).subscribe({
        next: () => {
          alert('User added successfully');
          this.resetForm();
          this.loadUsers();
        },
        error: (err) => console.error('Add error:', err)
      });
    }
  }

  // Edit
  editUser(row: any) {
    console.log('=== EDIT USER DEBUG ===');
    console.log('Row data:', row);
    //console.log('Current form value before edit:', this.userForm.value);
    
    this.editMode = true;
    this.selectedId = row.Id;
   
    // Find matching IDs based on display names
    const districtId = this.findDistrictIdByName(row.District_name);
    const designationId = this.findDesignationIdByName(row.Designation_name);
    
    console.log('Mapped IDs:', { districtId, designationId });
    
    // Set basic form values first (excluding dependent fields)
    this.userForm.patchValue({
      Dist_id: districtId,
      User_name: row.User_name,
      Password: row.Password,
      Isactive: row.Isactive === 1 || row.Isactive === true
    });

    //console.log('Form value after basic patch:', this.userForm.value);

    // Load blocks for the selected district
    if (districtId) {
      console.log('Loading blocks for district ID:', districtId);
      this.userService.getBlocksByDistrictId(districtId).subscribe({
        next: (data) => {
          console.log('Blocks loaded for edit:', data);
          this.blocks = data || [];

          // 🟢 Wait until blocks are fully populated before setting value
        setTimeout(() => {
          const blockId = this.findBlockIdByName(row.Block_name, districtId);
          console.log('Found block ID:', blockId);

          if (blockId) {
            this.userForm.patchValue({ Block_id: Number(blockId) });
            console.log('Block patched successfully');
          } else {
            console.warn('No matching block found for name:', row.Block_name);
            this.userForm.patchValue({ Block_id: null });
          }

          console.log('Form value after block patch:', this.userForm.value);
        }, 0);
      },
      error: (err) => {
        console.error('Error loading blocks for edit:', err);
        this.blocks = [];
      }
    });
  } else {
    console.warn('No district ID found for user');
    this.blocks = [];
    this.userForm.patchValue({ Block_id: null });
  }

        // 🟢 Load or assign designation
  if (this.designations.length === 0) {
    this.userService.getDesignation().subscribe({
      next: (data) => {
        this.designations = data || [];
        this.userForm.patchValue({ Designation_Id: designationId });
        console.log('Designation patched after loading');
      },
      error: (err) => console.error('Error loading designations:', err)
    });
  } else {
    this.userForm.patchValue({ Designation_Id: designationId });
    console.log('Designation patched directly');
  }

  console.log('=== END EDIT USER DEBUG ===');
}

  // Test method to manually populate form
  testFormPopulation() {
    console.log('=== TESTING FORM POPULATION ===');
    console.log('Current form value:', this.userForm.value);
    console.log('Form valid:', this.userForm.valid);
    console.log('Form touched:', this.userForm.touched);
    console.log('Form dirty:', this.userForm.dirty);
    
    // Test setting values manually
    this.userForm.patchValue({
      Dist_id: 1,
      Block_id: 1,
      Designation_Id: 1,
      User_name: 'Test User',
      Password: 'TestPass123',
      Isactive: true
    });
    
    console.log('Form value after manual patch:', this.userForm.value);
    console.log('Form valid after patch:', this.userForm.valid);
    console.log('=== END TESTING FORM POPULATION ===');
  }

  // Method to check form state
  checkFormState() {
    console.log('=== FORM STATE CHECK ===');
    console.log('Form value:', this.userForm.value);
    console.log('Form valid:', this.userForm.valid);
    console.log('Form touched:', this.userForm.touched);
    console.log('Form dirty:', this.userForm.dirty);
    console.log('Form errors:', this.userForm.errors);
    
    // Check individual controls
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      console.log(`Control ${key}:`, {
        value: control?.value,
        valid: control?.valid,
        touched: control?.touched,
        dirty: control?.dirty,
        errors: control?.errors
      });
    });
    console.log('=== END FORM STATE CHECK ===');
  }

  // Method to test database structure
  testDatabase() {
    console.log('=== TESTING DATABASE ===');
    this.userService.testDatabase().subscribe({
      next: (data) => {
        console.log('Database test result:', data);
      },
      error: (err) => console.error('Database test error:', err)
    });
  }

  // Method to test block loading
  testBlockLoading() {
    console.log('=== TESTING BLOCK LOADING ===');
    console.log('Current districts:', this.districts);
    console.log('Current blocks:', this.blocks);
    
    if (this.districts.length > 0) {
      const testDistrictId = this.districts[0].Dist_id;
      console.log('Testing block loading for district ID:', testDistrictId);
      
      this.userService.getBlocksByDistrictId(testDistrictId).subscribe({
        next: (data) => {
          console.log('Block loading test result:', data);
        },
        error: (err) => console.error('Block loading test error:', err)
      });
    }
  }

  // Helper methods to find IDs by display names
  findDistrictIdByName(districtName: string): number | null {
    if (!districtName || !this.districts.length) return null;
    
    const district = this.districts.find(d => d.District_name === districtName);
    console.log('Finding district ID for:', districtName, 'Found:', district);
    return district ? district.Dist_id : null;
  }

  findBlockIdByName(blockName: string, districtId: number | null): number | null {
    console.log('findBlockIdByName called with:', { blockName, districtId, blocksLength: this.blocks.length });
    console.log('Available blocks:', this.blocks);
    
    if (!blockName || !this.blocks.length) {
      console.log('No block name or blocks array is empty');
      return null;
    }
    
    const block = this.blocks.find(b => b.Block_name === blockName);
    console.log('Finding block ID for:', blockName, 'Found:', block);
    return block ? block.Block_id : null;
  }

  findDesignationIdByName(designationName: string): number | null {
    if (!designationName || !this.designations.length) return null;
    
    const designation = this.designations.find(d => d.Designation_name === designationName);
    console.log('Finding designation ID for:', designationName, 'Found:', designation);
    return designation ? designation.Id : null;
  }

// Delete
  deleteUser(id: number) {
    if (!confirm('Delete this user?')) return;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        alert('Deleted successfully');
        this.loadUsers();
      },
      error: (err) => console.error('Delete error:', err)
    });
  }

  resetForm() {
    this.userForm.reset({
      Dist_id: null,
      Block_id: null,
      Designation_Id: null,
      User_name: '',
      Password: '',
      Isactive: true
    });
    this.blocks = [];
    this.editMode = false;
    this.selectedId = null;
    // Mark form as pristine and untouched
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
  }
  onPageChange(page: number) {
  this.currentPage = Number(page); // ensures it's a number
}

  // Helper method to get form validation errors
  getFormValidationErrors(): string[] {
    const errors: string[] = [];
    
    if (this.userForm.get('Dist_id')?.errors?.['required']) {
      errors.push('• District is required');
    }
    if (this.userForm.get('Block_id')?.errors?.['required']) {
      errors.push('• Block is required');
    }
    if (this.userForm.get('Designation_Id')?.errors?.['required']) {
      errors.push('• Designation is required');
    }
    if (this.userForm.get('User_name')?.errors?.['required']) {
      errors.push('• User name is required');
    } else if (this.userForm.get('User_name')?.errors?.['minlength']) {
      errors.push('• User name must be at least 3 characters');
    }
    if (this.userForm.get('Password')?.errors?.['required']) {
      errors.push('• Password is required');
    } else if (this.userForm.get('Password')?.errors?.['minlength']) {
      errors.push('• Password must be at least 6 characters');
    }
    if (this.userForm.get('Isactive')?.errors?.['required']) {
      errors.push('• Active status is required');
    }
    
    return errors;
  }
}
