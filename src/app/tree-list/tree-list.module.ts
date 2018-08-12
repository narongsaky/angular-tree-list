import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeListComponent } from './tree-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TreeListComponent],
  exports: [
    TreeListComponent 
  ]
})
export class TreeListModule { }
