import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
