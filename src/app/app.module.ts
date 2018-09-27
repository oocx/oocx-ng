import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OocxNgModule } from './../../projects/oocx-ng/src/lib/oocx-ng.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OocxNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
