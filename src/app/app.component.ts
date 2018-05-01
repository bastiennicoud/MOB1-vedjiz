import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NavController } from 'ionic-angular'
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // Import navigation controller
  @ViewChild(Nav) nav: Nav

  // Sets the root page
  rootPage:any = HomePage

  // Array to declare all the app pages
  pages: Array<{title: string, component: any}>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Initialize all the pages
    this.pages = [
      { title: 'Search', component: SearchPage }
    ]
  }

  /**
   * Change the app page
   *
   * @param page 
   */
  openPage(page) {
    this.nav.setRoot(page.component)
  }
}

