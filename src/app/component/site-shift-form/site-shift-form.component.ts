import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteShiftedService } from 'src/app/services/site-shifted.service';

@Component({
  selector: 'app-site-shift-form',
  templateUrl: './site-shift-form.component.html',
  styleUrls: ['./site-shift-form.component.css']
})
export class SiteShiftFormComponent {
  form: FormGroup;
  districts: any[] = [];
  blocks: any[] = [];
  hods: any[] = [];
  hodDetails: any = null;
  uploadingFile?: File | null;

  constructor(private fb: FormBuilder, private api: SiteShiftedService) {
    this.form = this.fb.group({
      districtId: [null, Validators.required],
      blockId: [null, Validators.required],
      hodId: [null, Validators.required],
      oldAddress: [''],
      newAddress: ['', Validators.required],
      letter: [null]
    });
  }

  ngOnInit(): void {
    this.api.getAllDistrict().subscribe({
      next: d => {
        console.log('Districts loaded:', d);
        this.districts = d;
      },
      error: err => console.error('Error loading districts:', err)
    });
  }

  onDistrictChange(districtId: number): void {
    if (!districtId) { this.blocks = []; this.hods = []; return; }
    console.log('Loading blocks for district:', districtId);
    this.api.getBlocksByDistrictId(districtId).subscribe({
      next: b => {
        console.log('Blocks loaded:', b);
        this.blocks = b;
      },
      error: err => console.error('Error loading blocks:', err)
    });
  }

  onBlockChange(blockId: number): void {
    if (!blockId) { this.hods = []; this.hodDetails = null; return; }
    console.log('Loading HODs for block:', blockId);
    this.api.getHodsByBlockId(blockId).subscribe({
      next: h => {
        console.log('HODs loaded:', h);
        this.hods = h;
      },
      error: err => console.error('Error loading HODs:', err)
    });
  }

  onHodChange(hodId: number): void {
    if (!hodId) { this.hodDetails = null; return; }
    console.log('Loading HO details for HOD:', hodId);
    this.api.getHodsListByHodId(hodId).subscribe({
      next: details => {
        console.log('HO details loaded:', details);
        this.hodDetails = details;
      },
      error: err => console.error('Error loading HO details:', err)
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.uploadingFile = input.files && input.files.length ? input.files[0] : null;
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const formData = new FormData();
    const raw = this.form.value;
    formData.append('districtId', String(raw.districtId));
    formData.append('blockId', String(raw.blockId));
    formData.append('hodId', String(raw.hodId));
    formData.append('oldAddress', raw.oldAddress || '');
    formData.append('newAddress', raw.newAddress);
    if (this.uploadingFile) formData.append('letter', this.uploadingFile);
    this.api.insertSiteShift(formData).subscribe();
  }
}


