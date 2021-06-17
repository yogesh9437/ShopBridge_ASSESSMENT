import { Injectable } from '@angular/core';
import { ItemDetails } from './item-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {

  constructor(private http: HttpClient) { }

formData: ItemDetails=new ItemDetails();
readonly baseURL = 'http://localhost:24071/api/ItemDetail'
list: ItemDetails[];

  InsertItemDetails() {
    return this.http.post(this.baseURL, this.formData);
  }

  UpdateItemDetails() {
    return this.http.put(`${this.baseURL}/${this.formData.itemId}`, this.formData);
  }

  deleteItemDetail(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as ItemDetails[]);
  }

}
