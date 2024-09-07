import { Component,  } from '@angular/core';
import { ShqService } from './services/shq.service'; // Adjust the path as needed
import { SystemitemService } from './services/systemitem.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'inventory_ui';
  shqLists: any;
  systemitemLists!: any[];
 
  constructor(private shqService: ShqService,
    private systemitemService: SystemitemService
  ) {
  }
  ngOnInit(): void {
    //this.getAllShq();
  }

   // Example to create a new item using POST
   addItem() {
    const newItem = {
      name: 'New Item',
      description: 'Description of the new item',
    };

    this.shqService.createItem(newItem).subscribe((response: any) => {
      console.log('Item created:', response);
    });
    
  }

  // Example to update an existing item using PUT
  updateItem() {
    const updatedItem = {
      name: 'Updated Item',
      description: 'Updated description of the item',
    };

    const itemId = '123'; // Replace with actual item ID

    this.shqService.updateItem(itemId, updatedItem).subscribe((response: any) => {
      console.log('Item updated:', response);
    });
    
  }

  getAllShq(): void {
    this.shqService.getShqData().subscribe(
      (data: any[]) => {
        console.log ('shq data',data);
        this.shqLists = data;
        console.log('SHQ List:', this.shqLists);
        
      }
    );
  }
  getAllSysteitem(): void {
    this.systemitemService.getSystemItemData().subscribe(
      (data: any[]) => {
        console.log ('systemitem data',data);
        this.systemitemLists = data;
        console.log('SYSTEMITEM List:', this.shqLists);
        
      }
    );
  }
}

