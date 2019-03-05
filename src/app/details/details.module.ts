import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ],
  declarations: [DetailsComponent]
})
export class DetailsModule { }
