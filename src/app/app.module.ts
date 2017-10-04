import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { DailyPage } from '../pages/daily/daily';
import { WeeklyPage } from '../pages/weekly/weekly';
import { TabsPage } from '../pages/tabs/tabs';

import { ChartModule } from 'angular2-chartjs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EnergyProvider } from '../providers/energy/energy';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    DailyPage,
    WeeklyPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    DailyPage,
    WeeklyPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EnergyProvider
  ]
})
export class AppModule {}
