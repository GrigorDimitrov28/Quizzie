import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, AboutComponent],
  imports: [CoreModule, BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'en'
    // }
  ],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent],
})
export class AppModule { }
