import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItunesService } from '../../itunes/itunes.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  constructor(public navCtrl: NavController, private itunesService: ItunesService,  ) {

  }
  
  items:any[] =[
      {name:'Frank Sinatra'},
      {name: 'Elvis Presely'},
      {name: 'Chet Baker'} ];

  music:any[]=null;
  errorMessage:any=null;

    searchClicked(tab:any)
    {
        this.getMusic();
    }   
    getMusic()
    {
       
        this.music= null;
       // this.errorMessage = null;
        //if( this.itunesService.hasSearchFilter() === true)
       // {
             let timeoutId = setTimeout(() => {  
                this.itunesService.getMusic( 
                   //" this.searchService.getSearch()"
                   "depeche mode"
                        ).subscribe(
                                    music => {this.processSucessResponse(music);},
                                    error =>  this.errorMessage = <any>error);
                        }, 1500);
       // }
    }
    processSucessResponse(music: any[] )
    {
        this.music = music; 
      //  this.spinnerService.hide();
     //   this.toastService.success("iTunes returned " + this.books.length + " books!" );
    }  
}
