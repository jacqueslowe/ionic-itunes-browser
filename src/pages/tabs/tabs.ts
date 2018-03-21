import { Component } from '@angular/core';

import { MusicPage } from '../music/music';
import { MoviePage } from '../movie/movie';
import { HomePage } from '../home/home';
import { BookPage } from '../book/book';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MusicPage;
  tab3Root = MoviePage;
  tab4Root = BookPage;

  constructor() {

  }
}
