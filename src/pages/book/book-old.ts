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
    books:any[]=null;
    errorMessage:any=null;
    loader:any= null;
    selectedBook=null;

    play(item:any)
    {
      if( this.selectedBook && this.selectedBook.trackId === item.trackId)
      {
        this.selectedBook=null;
        return;   
      }
      this.selectedBook=item;
    }

    searchClicked(tab:any)
    {
        this.getData();
    }   

    getData()
    {
        this.books= null;
        this.loader = this.loadingController.create({
          content: "Fetching books..."
        });
        this.loader.present();

        setTimeout(() => {  
          this.itunesService.getBooks( 
              this.searchValue
                  ).subscribe(
                              data => {this.processSucessResponse(data);},
                              error =>  this.errorMessage = <any>error);
                  }, 1500);
    }

    processSucessResponse(data: any[] )
    {
      this.books = data; 
      this.loader.dismiss();
    }  
}
