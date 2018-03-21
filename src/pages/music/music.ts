import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItunesService } from '../../itunes/itunes.service';
import { PlayerService } from '../../player/player.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-music',
  templateUrl: 'music.html'
})
export class MusicPage {
  constructor(public navCtrl: NavController, private itunesService: ItunesService, public playerService: PlayerService, public loadingController: LoadingController ) {
   
    this.playerService.getStream().subscribe(
                          (val) => { this.playerStateChanged();  },
                          (err) => { console.log("MusicListComponent.playerService..subscribe.error", err) },
                          ()    => { console.log("MusicListComponent.playerService..subscribe.complete") }
                          );
  }
  
  searchValue:any = "";
  loader:any= null;
  music:any[]=null;
  selectedTrack:any=null;
  errorMessage:any=null;

    searchClicked()
    {
        this.getData();
    }   
    play(track:any)
    {
      this.selectedTrack=track;
      this.playerService.play(track);
    }
    playerStateChanged()
    {
        if( this.playerService.playerState === "ended" )
        {
            this.nextTrack();
        } 
    }
    nextTrack()
    {
        for(var i=0; i<this.music.length; ++i)
        {
            if( this.music[i].trackId === this.playerService.selectedTrack.trackId )
            {
                this.playerService.play(this.music[(i<this.music.length-1 ) ? ++i: 0]); 
            }
        }
    }

    getData()
    {
        this.music= null;
        this.loader = this.loadingController.create({
          content: "Fetching music..."
        });
        this.loader.present();

        setTimeout(() => {  
          this.itunesService.getMusic( 
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
