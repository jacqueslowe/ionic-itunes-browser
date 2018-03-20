import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItunesService } from '../../itunes/itunes.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html'
})
export class MoviePage {
  
  constructor(public navCtrl: NavController, private itunesService: ItunesService, public loadingController: LoadingController) {
  }

  searchValue:any = "Marvel";
  movies:any[]=null;
  errorMessage:any=null;
  loader:any= null;
  selectedMovie=null;


    play(track:any)
    {
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
          content: "Fetching movies..."
        });
        this.loader.present();

        setTimeout(() => {  
          this.itunesService.getMovies( 
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
