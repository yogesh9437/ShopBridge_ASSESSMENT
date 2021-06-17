import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule  } from '@angular/material/input';
import { MatFormFieldModule  } from '@angular/material/form-field';

import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";

import { AppComponent } from './app.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemDetailFormComponent } from './item-details/item-detail-form/item-detail-form.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemDetailsComponent,
    ItemDetailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
