import { Component } from '@angular/core';
import { ShowSiteShiftedService } from 'src/app/services/show-site-shifted.service';

@Component({
  selector: 'app-show-site-shifted',
  templateUrl: './show-site-shifted.component.html',
  styleUrls: ['./show-site-shifted.component.css']
})
export class ShowSiteShiftedComponent {

  /*showSiteShiftedList: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  paginatedData: any[] = [];*/

  allItems: any[] = [];

  paginatedItems: any[] = [];

  currentPage: number = 1;

  itemsPerPage: number = 10;

  totalPages: number = 0;

  constructor(private showsiteshiftedService: ShowSiteShiftedService,
    ) { }
 
    ngOnInit(): void {

        this.showsiteshiftedService.getShowSiteShifted().subscribe((data) => {

            this.allItems = data;

            this.totalPages = Math.ceil(this.allItems.length / this.itemsPerPage);

            this.updatePaginatedItems();

        });

    }
 
    updatePaginatedItems(): void {

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;

        const endIndex = startIndex + this.itemsPerPage;

        this.paginatedItems = this.allItems.slice(startIndex, endIndex);

    }
 
    nextPage(): void {

        if (this.currentPage < this.totalPages) {

            this.currentPage++;

            this.updatePaginatedItems();

        }

    }
 
    previousPage(): void {

        if (this.currentPage > 1) {

            this.currentPage--;

            this.updatePaginatedItems();

        }

    }

  
  /*ngOnInit(): void{
    this.loadUser();
   
     // throw new Error('Method not implemented.');
       
  }
  
  loadUser() {
      this.showsiteshiftedService.getShowSiteShifted().subscribe(
        (data: any[]) => {
          this.showSiteShiftedList = data;
          this.updatePagination();
          console.log('asdasd', data)
        }
      );
  }


 

 

  updatePagination(): void {
    this.totalPages = Math.ceil(this.showSiteShiftedList.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.showSiteShiftedList.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    
    
    }
  }

  */
}


