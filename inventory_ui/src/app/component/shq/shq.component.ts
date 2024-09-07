import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShqService } from 'src/app/services/shq.service';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-shq',
  templateUrl: './shq.component.html',
  styleUrls: ['./shq.component.css']
})
export class ShqComponent {
  @ViewChild('shqEditModal') shqEditModal!: ElementRef;

  shqLists: any;
  showEditForm: boolean = false;
  shqId: string | null = null;
  units = ["Nos", "Pair", "Mtrs"];
  shqEditFormValues: any = {};
  shqEditForm!: FormGroup<any>;
  currentUnit: any;


  constructor(private shqService: ShqService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAllShq();

    this.shqEditForm = this.fb.group({
      description: new FormControl(''),
      qty: new FormControl(''),
      unit: new FormControl(''),
      serialNoOrId: new FormControl(''),
      remark: new FormControl(''),
    });
    
  }
  onUpdate(){
  }


  getAllShq(): void {
    this.shqService.getShqData().subscribe(
      (data: any[]) => {
        console.log('shq data', data);
        this.shqLists = data;
        console.log('SHQ List:', this.shqLists);

      }
    );
  }




  editShqDetails(shqId: number) {
    /*this.id = this.route.snapshot.paramMap.get('shqId');
    console.log('ID from URL:',shqId);

    // Alternatively, using the params observable
    this.route.params.subscribe(params => {
      this.shqId = params['id'];
      console.log('ID from URL:', this.shqId);
    });*/

    this.showEditForm = true;
    console.log(shqId);

   /* {
      "S No": 1,
        "Item Name": "Core Router",
          "RFP Tech Spec Item": "1.1",
            "Make / Model": "CISCO WS-C6509-E",
              "Unit": "Nos.",
                "Qty": 1,
                  "IP Address 1": "IP Address",
                    "IP Address Provided": "10.69.0.1",
                      "Supplied Qty": 1,
                        "Supplied Make / Model": "CISCO WS-C6509-E",
                          "Serial No / Processor Board ID": "SMC16020078",
                            "Remark": "x",
                              "User Name": "admin",
                                "User No": 366,
                                  "Date": "2014-11-17T18:39:06.000Z",
                                    "Ip Address": "ServerIp: 10.25.5.26, ClientIp: 127.0.0.1                                                           "
    }*/

    this.shqService.getShqById(shqId).subscribe((res:any) => {
      if (res) {
        this.currentUnit = res["Unit"];
        this.shqEditFormValues = {
          makeModel: res["Make / Model"],
          unit: res["Unit"],
          qty: res["Qty"],
          remark: res["Remark"],
          supplierMakeModel: res["Supplied Make / Model"],
          serialNoOrId: res["Serial No / Processor Board ID"],
          description: "",
        }

        this.shqEditForm.setValue(this.shqEditFormValues);



        
      }

    });
    this.showPopup();

  }

  showPopup() {
    const modalElement = this.shqEditModal.nativeElement as HTMLElement;
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    const backdropElement = document.createElement('div');
    backdropElement.classList.add('modal-backdrop', 'fade', 'show');
    document.body.appendChild(backdropElement);
  }

  closeEditPopup() {
    const modalElement = this.shqEditModal.nativeElement as HTMLElement;
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      document.body.removeChild(backdropElement);
    }
  }
}
