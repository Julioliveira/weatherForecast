import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  httpGetCities = (city: string) => {
    return this.http.get(`https://api.openweathermap.org/data/2.5/find?q=${city}&appId=76d1b43ba3695cfae59aa9f7dc9b4877&units=metric`)
  }

  httpGetCityDetails = (id: any) => {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appId=76d1b43ba3695cfae59aa9f7dc9b4877&units=metric`)
  }
  httpGetCityForecast = (id: any) => {
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appId=76d1b43ba3695cfae59aa9f7dc9b4877&units=metric`)
  }
}
