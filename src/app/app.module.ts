import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PageNotFound404Component } from './shared/pages/page-not-found404/page-not-found404.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';

// ! remember that to inject interceptors you have to do it in providers!
@NgModule({
  declarations: [AppComponent, PageNotFound404Component, HomePageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      // * we must register a new provider and it is an HTTP_INTERCEPTOR:
      provide: HTTP_INTERCEPTORS,
      // * the service:
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
