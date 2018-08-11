import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCheckboxModule ,MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TreeListComponent
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
