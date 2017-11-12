import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {    MdInputModule,
            MdButtonModule,
            MdDatepickerModule,
            MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';

import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { PersonalDetailsRootComponent } from './components/personal-details/personal-details-root/personal-details-root.component';
import { PersonalTabComponent } from './components/personal-details/personal-tab/personal-tab.component';
import { LocationTabComponent } from './components/personal-details/location-tab/location-tab.component';
import { HelloComponent } from './components/hello/hello.component';

import { PersonalDetailsService } from './services/personal-details.service';
import { IpApiService } from './services/ip-api.service';

 
@NgModule({
    declarations: [
        AppComponent,
        PersonalTabComponent,
        LocationTabComponent,
        HelloComponent,
        PersonalDetailsRootComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,

        MdInputModule,
        MdButtonModule,
        MdDatepickerModule,
        MdNativeDateModule
    ],
    providers: [
        PersonalDetailsService,
        IpApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
