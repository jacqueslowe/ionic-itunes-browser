import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  constructor(public navCtrl: NavController) {

  }
  items:any[] =[
      {name:'Frank Sinatra'},
      {name: 'Elvis Presely'},
      {name: 'Chet Baker'} ];
}
