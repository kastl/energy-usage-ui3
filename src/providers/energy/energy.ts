import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EnergyProvider {

  constructor(public http: Http) {
    console.log('EnergyProvider constructor');
  }

  private getWeeklyChartStruct() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Energy',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(200, 223, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],

          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
          text: 'Daily Energy Usage for a week',
          fontSize: 30
        },
        legend: {
          display: false,
          position: 'right'
        },

        tooltips: {
          enabled: true
        },

        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'kWh'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: false,
              labelString: 'Day'
            }
          }]
        }
      }
    };
  }

  private getDailyChartStruct() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Energy',
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(200, 223, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],

          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: false,
          text: 'Today - ',
          fontSize: 30
        },
        legend: {
          display: false,
          position: 'right'
        },
        tooltips: {
          enabled: true
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'kWh'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: false,
              labelString: 'Hourly'
            }
          }]
        }
      }
    };
  }

  //running in emulator
  //http://10.0.2.2:8080/energy/resources/api/weekly
  
  // running on device
  //http://192.168.0.68:8080/energy/resources/api/weeklyaq  
  
  // running in server's browser
  //http://localhost:8080/energy/resources/api/weekly
  
  public fetchWeekly() {
    console.log ("fetchWeekly");
    return this.http.get('http://192.168.0.68:8080/energy/resources/api/weekly')
      .toPromise()
      .then((resp) => resp.json())
      .then((data) => this.extractWeekly(data))
      .catch((err) => console.log(err));
  }

  public fetchDaily() {
    console.log ("fetchDaily");
    return this.http.get('http://192.168.0.68:8080/energy/resources/api/daily')
      .toPromise()
      .then((resp) => resp.json())
      .then((data) => this.extractDaily(data))
      .catch((err) => console.log(err));
  }

  private extractWeekly(data) {

    let myState = this.getWeeklyChartStruct();

    // update labels
    let days = [];
    data.forEach(function (element) {
      days.push(element.start.substring(5));
    }, this);
    myState.chartData.labels = days;

    //update data
    let energies = [];
    data.forEach(function (element) {
      energies.push(element.energy);
    }, this);
    myState.chartData.datasets[0].data = energies; 

    console.log('Extract weekly');

    return myState;
  }

  private extractDaily(data) {

    let myState = this.getDailyChartStruct();

    // update title with date based on received data
    myState.chartOptions.title.text = myState.chartOptions.title.text + data[0].start;

    // update labels
    let hours = [];
    data.forEach(function (element) {
      hours.push(element.hour);
    }, this);
    myState.chartData.labels = hours;

    //update data
    let energies = [];
    data.forEach(function (element) {
      energies.push(element.energy);
    }, this);
    myState.chartData.datasets[0].data = energies;

    console.log('Extract weekly');
    
    return myState;
  }

}
