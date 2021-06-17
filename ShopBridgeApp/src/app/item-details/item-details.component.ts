import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemDetails } from '../shared/item-detail.model';
import { ItemDetailService } from '../shared/item-detail.service';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styles: [
  ]
})
export class ItemDetailsComponent implements OnInit {

  constructor(public service: ItemDetailService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: ItemDetails) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteItemDetail(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully", 'ShopBridge Item Detail Inventrory');
          },
          err => { console.log(err) }
        )
    }
  }


}
