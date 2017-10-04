import { Component } from '@angular/core';

import { WeeklyPage } from '../weekly/weekly';
import { DailyPage } from '../daily/daily';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WeeklyPage;
  tab2Root = DailyPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
