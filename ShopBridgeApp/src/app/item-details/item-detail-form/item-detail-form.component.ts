import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemDetails } from 'src/app/shared/item-detail.model';
import { ItemDetailService } from 'src/app/shared/item-detail.service';
import { ToastrService } from 'ngx-toastr';

import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YY',
  },
  display: {
    dateInput: 'MM/YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




@Component({
  selector: 'app-item-detail-form',
  templateUrl: './item-detail-form.component.html',
  styles: [
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ItemDetailFormComponent implements OnInit {

  constructor(public service: ItemDetailService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    console.log(ctrlValue)
    datepicker.close();
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.itemId == 0){
      this.insertRecord(form);
      //console.log(form)
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.InsertItemDetails().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'ShopBridge Item Detail Inventrory');
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.UpdateItemDetails().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'ShopBridge Item Detail Inventrory')
      },
      err => { console.log(err); }
    );
  }

  Clear(form: NgForm){
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new ItemDetails();
  }

}
