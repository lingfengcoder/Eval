import { Component } from '@angular/core';

import { AboutPage } from '../main/about/about'; 
import { ContactPage } from '../main/contact/contact';
import { HomePage } from '../main/home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
