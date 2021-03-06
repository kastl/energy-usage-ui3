import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnergyProvider } from '../../providers/energy/energy';

@Component({
  selector: 'page-weekly',
  templateUrl: 'weekly.html'
})
export class WeeklyPage {

  type = '';
  data = {};
  options = {};

  constructor(public navCtrl: NavController, private energyProvider: EnergyProvider) {
    console.log('WeeklyPage.constructor called');
  }

  ngOnInit() {
    console.log('WeeklyPage.onInit called');

    this.energyProvider.fetchWeekly().then(data => {
      let a:any = data;
      this.type = 'bar';
      this.data = a.chartData;
      this.options = a.chartOptions;
    });
  }

}
