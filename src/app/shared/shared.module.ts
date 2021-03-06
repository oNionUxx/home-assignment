import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, ReactiveFormsModule, ButtonModule, CarouselModule, RadioButtonModule],
})
export class SharedModule {}
