import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItunesService } from '../../itunes/itunes.service';
import { PlayerService } from '../../player/player.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  
  constructor(public navCtrl: NavController, private itunesService: ItunesService, public playerService: PlayerService ) {
    this.playerService.getStream().subscribe(
                          (val) => { this.playerStateChanged();  },
                          (err) => { console.log("MusicListComponent.playerService..subscribe.error", err) },
                          ()    => { console.log("MusicListComponent.playerService..subscribe.complete") }
                          );
  }
  
  searchValue:any = "Depeche Mode";

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
       // this.errorMessage = null;
        //if( this.itunesService.hasSearchFilter() === true)
       // {
             let timeoutId = setTimeout(() => {  
                this.itunesService.getMusic( 
                    this.searchValue
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
