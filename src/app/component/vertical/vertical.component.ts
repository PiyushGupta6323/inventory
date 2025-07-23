import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerticalService } from 'src/app/services/vertical.service';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.css']
})
export class VerticalComponent {
verticalLists: any;


constructor(private verticalService: VerticalService, 
  private route: ActivatedRoute,
) {

}
ngOnInit(): void {
    this.getVertical();
  }
  onUpdate() {

  }

  getVertical(): void {
    this.verticalService.getVerticalItems().subscribe(
      (data: any[]) => {
        console.log('vertical data', data);
        this.verticalLists = data;
        console.log('VERTICAL List:', this.verticalLists);

      }
    );
  }
}
  // editVerticalDetails(verticalId: number) {
  //   this.showEditForm = true;
  //   console.log(verticalId);
  //   this.verticalService.getVerticalById(verticalId).subscribe((res: any) => {
  //     if (res) {
  //       this.currentUnit = res["Unit"];
  //       this.verticalEditFormValues = {
  //         makeModel: res["Make / Model"],
  //         unit: res["Unit"],
  //         qty: res["Qty"],
  //         remark: res["Remark"],
  //         supplierMakeModel: res["Supplied Make / Model"],
  //         serialNoOrId: res["Serial No / Processor Board ID"],
  //         description: "",
  //       }

  //       this.verticalEditForm.setValue(this.verticalEditFormValues);
  //     }

  //   });

// ngOnInit(): void {
//   this.getVerticalItems();
// }
// getAllVertical();
//   this.VerticalService.getVerticalData().subscribe(
//     (data: any[]) -> {
//       console.log('vertical data', data);
//       this.verticalLists = data;
//       console.log('VERTICAL List:', this.verticalLists);

//     }
//   );
//   // this.VerticalService.getAllVertical().subscribe(
//   //   (data: any[] => {
//   //     this.verticalLists = data;
//   //   })
//   // )
// // }
// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }
