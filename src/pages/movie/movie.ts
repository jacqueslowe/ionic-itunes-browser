import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ItunesService } from '../../itunes/itunes.service';
import { TabService } from '../../app/tab.service';

@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html'
})
export class MoviePage {
  
  searchValue:any = "";
  movies:any[]=null;
  errorMessage:any=null;
  loader:any= null;
  selectedMovie=null;

  constructor(public navCtrl: NavController, 
    private itunesService: ItunesService, 
    public loadingController: LoadingController,
    private tabService: TabService ) {
           this.tabService.getTabStream().subscribe(
            (val) => { 
                    console.log("movie.TabService new tab=", val);
                    this.selectedMovie=null;
                    },
            (err) => { console.log("movie.TabService.error()", err) },
            ()    => { console.log("movie.TabService.completed") }
            );
        }

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
