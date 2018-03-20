import { Component } from '@angular/core';

import { MusicPage } from '../music/music';
import { VideoPage } from '../video/video';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MusicPage;
  tab3Root = VideoPage;

  constructor() {

  }
}
