import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItunesService } from '../../itunes/itunes.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  constructor(public navCtrl: NavController, private itunesService: ItunesService,  ) {

  }
  searchValue:any = "Marvel";
  music:any[]=null;
  errorMessage:any=null;

    searchClicked(tab:any)
    {
        this.getData();
    }   
    getData()
    {
        this.music= null;
      
             let timeoutId = setTimeout(() => {  
                this.itunesService.getMovies( 
                    this.searchValue
                        ).subscribe(
                                    music => {this.processSucessResponse(music);},
                                    error =>  this.errorMessage = <any>error);
                        }, 1500);
    }
    processSucessResponse(music: any[] )
    {
        this.music = music; 
      //  this.spinnerService.hide();
     //   this.toastService.success("iTunes returned " + this.books.length + " books!" );
    }  
}
