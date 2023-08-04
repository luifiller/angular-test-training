import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from './shared/services/unique-id/unique-id.service';
import { LikeWidgetModule } from './shared/components/like-widget/like-widget.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LikeWidgetModule,
  ],
  providers: [
    FontAwesomeModule,
    UniqueIdService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
