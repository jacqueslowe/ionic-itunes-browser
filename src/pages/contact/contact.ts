import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItunesService } from '../../itunes/itunes.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  constructor(public navCtrl: NavController, private itunesService: ItunesService, public loadingController: LoadingController) {

  }

  searchValue:any = "Marvel";
  music:any[]=null;
  errorMessage:any=null;
  loader:any= null;

    searchClicked(tab:any)
    {
        this.getData();
    }   
    getData()
    {
        this.music= null;
        this.loader = this.loadingController.create({
          content: "Fetching movies..."
        });
        this.loader.present();

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
      this.loader.dismiss();
    }  
}
