import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText = "";
  cities = [];
  constructor(
    private dataService: WeatherService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params.q) {
        this.spinner.show();
        this.searchText = params.q;
        this.dataService.httpGetCities(this.searchText).subscribe((cities: any) => {
          this.cities = cities.list;
          this.spinner.hide();
        }, err => {
          console.log(err);
          this.spinner.hide();
        });
      }
    })
  }
  searchCity() {
    // this.dataService.httpGetCities(this.searchText).subscribe((cities:any) =>{
    //   this.cities = cities.list
    //   console.log(cities)
    // }, err=> console.log(err))
    this.router.navigate(['/search'], { queryParams: { q: this.searchText } });

  }

  openDetails(id: any) {
    this.router.navigate(['/details/' + id]);

  }

}
