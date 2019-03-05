import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  searchText = "";
  date = new Date()
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  daysNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dateString = `${this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours()}:${this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes()} ${this.monthNames[this.date.getMonth()]} ${this.date.getDay()}`;
  cityCurrent: any;
  cityForecast: any;

  constructor(
    private dataService: WeatherService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService) {
  };

  ngOnInit() {
    let promiseArray = [];
    this.spinner.show();
    promiseArray.push(new Promise((resolve, reject) => {
      this.dataService.httpGetCityDetails(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((response: any) => {
        this.searchText = response.name;
        this.cityCurrent = response;
        resolve(true);
      }, err => reject(err))
    }))
    promiseArray.push(new Promise((resolve, reject) => {
      this.dataService.httpGetCityForecast(this.activatedRoute.snapshot.paramMap.get('id')).subscribe((response: any) => {
        this.cityForecast = response.list;
        resolve(true);
      }, err => reject(err))
    }))
    Promise.all(promiseArray).then(succ => {
      this.spinner.hide();
    }).catch(err => {
      this.spinner.hide();
      console.log(err);
    })

  }

  searchCity() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchText } });
  }

  returnTimestampHours(timestamp: number) {
    let date = new Date(timestamp * 1000);
    return `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  }

  returnDateString(dt: number) {
    let date = new Date(dt * 1000);
    let weekday = this.daysNames[date.getDay()];
    let day = date.getDate();
    let month = this.monthNames[date.getMonth()];
    return `${weekday} ${day} ${month}`;
  }

  isToday(dt: number) {
    let date = new Date(dt * 1000);
    let today = new Date();
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
  }

}
