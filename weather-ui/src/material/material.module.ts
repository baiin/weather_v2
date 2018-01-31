import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatButtonModule, 
          MatToolbarModule, 
          MatFormFieldModule, 
          MatInputModule,
          MatCardModule, 
          MatGridListModule  } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatGridListModule],
  exports: [MatButtonModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCardModule, MatGridListModule],
})
export class MaterialModule { }