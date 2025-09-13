import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SiteShiftedService } from 'src/app/services/site-shifted.service';

@Component({
  selector: 'app-site-shift-status',
  templateUrl: './site-shift-status.component.html',
  styleUrls: ['./site-shift-status.component.css']
})
export class SiteShiftStatusComponent {
  form: FormGroup;
  hoId!: number;
  loading = false;
  details: any;
  hodDetails: any = {};   // ✅ Non-editable HO + Location details
  statusDetails: any = {}; // ✅ Editable shifting status
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: SiteShiftedService
  ) {
    this.form = this.fb.group({
      BSNL_Feasiblity: [false],
      Govt_Order_Operator: [false],
      Govt_Order_BSNL: [false],
      Govt_Office_Shifted_To_New_Location: [false],
      Rack_Shifted_To_New_Location: [false],
      Earthing_done: [false],
      BSNL_Commission_at_New_Location: [false],
      Status: ['Under process'],
      Remark: ['']
    });
  }

  ngOnInit(): void {
    this.hoId = Number(this.route.snapshot.paramMap.get('hoId'));
    if (!this.hoId) return;
    this.loading = true;

     this.api.getHodDetails(this.hoId).subscribe(h => {
      this.hodDetails = h || {};
    });
    this.api.getStatusByHoId(this.hoId).subscribe(s => {
      this.loading = false;
      if (s) {
      this.statusDetails = s;
      this.form.patchValue(s);
    }
    });
  }

  save(): void {
    if (!this.hoId) return;
    this.loading = true;
    this.api.updateStatusByHoId(this.hoId, this.form.value).subscribe(() => {
      this.loading = false;
      alert('Status updated successfully ✅');
    });
  }
}



