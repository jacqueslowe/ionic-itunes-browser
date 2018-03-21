import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Constants } from '../constants';
import { MyApp } from './app.component';
import { ItunesService } from '../itunes/itunes.service';
import { PlayerService } from '../player/player.service';
import { MusicPage } from '../pages/music/music';
import { MoviePage } from '../pages/movie/movie';
import { BookPage } from '../pages/book/book';
import { HomePage } from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MusicPage,
    MoviePage,
    BookPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MusicPage,
    MoviePage,
    BookPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Constants,
    ItunesService,
    PlayerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
