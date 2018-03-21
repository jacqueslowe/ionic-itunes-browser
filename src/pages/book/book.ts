import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItunesService } from '../../itunes/itunes.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-book',
  templateUrl: 'book.html'
})
export class BookPage {
  
  constructor(public navCtrl: NavController, private itunesService: ItunesService, public loadingController: LoadingController) {
  }

  searchValue:any = "";
  movies:any[]=null;
  errorMessage:any=null;
  loader:any= null;
  selectedMovie=null;


    play(track:any)
    {
      if( this.selectedMovie && this.selectedMovie.trackId === track.trackId)
      {
        this.selectedMovie=null;   
      }
      this.selectedMovie=track;
    }

    searchClicked(tab:any)
    {
        this.getData();
    }   
    getData()
    {
        this.movies= null;
        this.loader = this.loadingController.create({
          content: "Fetching books..."
        });
        this.loader.present();

        setTimeout(() => {  
          this.itunesService.getBooks( 
              this.searchValue
                  ).subscribe(
                              music => {this.processSucessResponse(music);},
                              error =>  this.errorMessage = <any>error);
                  }, 1500);
    }
    processSucessResponse(music: any[] )
    {
      this.movies = music; 
      this.loader.dismiss();
    }  
}
