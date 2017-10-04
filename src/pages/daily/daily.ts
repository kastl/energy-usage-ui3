import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EnergyProvider } from '../../providers/energy/energy';


@Component({
  selector: 'page-daily',
  templateUrl: 'daily.html'
})
export class DailyPage {

  type = '';
  data = {};
  options = {};

  constructor(public navCtrl: NavController, private energyProvider: EnergyProvider) {
    alert('DailyPage.constructor called');
  }

  ngOnInit() {
    alert('DailyPage.onInit called');

    this.energyProvider.fetchDaily().then(data => {
      let a:any = data;
      this.type = 'line';
      this.data = a.chartData;
      this.options = a.chartOptions;
    });
  }

}
