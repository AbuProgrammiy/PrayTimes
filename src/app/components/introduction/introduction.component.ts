import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { PraytimesService } from './../../services/praytimes/praytimes.service';
import { Component } from '@angular/core';
import { RequestsService } from '../../services/requests/requests.service';

@Component({
  selector: 'introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {

  constructor(private praytimesService: PraytimesService, private requestsServeice: RequestsService, private datePipe: DatePipe) {
    this.getDailyPrayTimes()
    this.getMonthlyPrayTimes()
    this.addSiteRequest()
    this.getSiteMonthlyRequests()
    this.getAPIMonthlyRequests()
  }

  baseUrl: string = environment.baseUrl
  DailyRegion: string = "Toshkent"
  MonthlyRegion: string = "Toshkent"
  DailyDate: string = new Date().toISOString().substring(0, 10);
  MonthlyDate: string = this.datePipe.transform(new Date(), "yyyy-MM")!
  dailyPrayTimes!: any
  monthlyPrayTimes!: any
  dailyPrayTimesRequestUrl!: string
  monthlyPrayTimesRequestUrl!: string

  dataSample = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
      }
    ]
  }

  siteRequests: any = this.dataSample
  apiRequests: any = this.dataSample

  isLoading: boolean = false

  getDailyPrayTimes() {
    this.isLoading = true

    this.praytimesService.getDailyPrayTimes(this.DailyRegion, this.DailyDate).subscribe({
      next: (response) => {
        this.dailyPrayTimes = response
        this.dailyPrayTimesRequestUrl = `${this.baseUrl}/GetDailyPrayTimes/${this.DailyRegion}/${this.DailyDate}`
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
      }
    })
  }

  getMonthlyPrayTimes() {
    this.isLoading = true

    this.praytimesService.getMonthlyPrayTimes(this.MonthlyRegion, this.MonthlyDate).subscribe({
      next: (response) => {
        this.monthlyPrayTimes = response
        this.monthlyPrayTimesRequestUrl = `${this.baseUrl}/GetMonthlyPrayTimes/${this.MonthlyRegion}/${this.MonthlyDate}`
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
      }
    })
  }

  addSiteRequest(){
    this.requestsServeice.addSiteRequests().subscribe({
      next: (response) => {
        console.log("Add Request vvv")
        console.log(response)
      },
      error: (err) => {
        
      }
    })
  }

  getSiteMonthlyRequests() {
    this.requestsServeice.getSiteMonthlyRequests().subscribe({
      next: (response) => {
        const counts = response.response.map((item: any) => item.count)
        const dates = response.response.map((item: any) => item.date.slice(5))

        this.siteRequests = {
          labels: dates,
          datasets: [
            {
              label: 'Saytga tashrif buyurganlar',
              data: counts,
              backgroundColor: this.generateColors(counts.length),
            }
          ]
        };
        console.log("Add Request vvv")
        console.log(response)
      },
      error: (err) => {

      }
    })
  }

  getAPIMonthlyRequests() {
    this.requestsServeice.getAPIMonthlyRequests().subscribe({
      next: (response) => {
        const counts = response.response.map((item: any) => item.count)
        const dates = response.response.map((item: any) => item.date.slice(5))

        this.apiRequests = {
          labels: dates,
          datasets: [
            {
              label: 'APIga bo\'lgan requestlar',
              data: counts,
              backgroundColor: this.generateColors(counts.length),
            }
          ]
        };
        console.log("Add Request vvv")
        console.log(response)
      },
      error: (err) => {

      }
    })
  }

  generateColors(count: number) {
    const colors: string[] = [];

    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 256);  // Random red value (0-255)
      const g = Math.floor(Math.random() * 256);  // Random green value (0-255)
      const b = Math.floor(Math.random() * 256);  // Random blue value (0-255)
      const alpha = 0.2;                          // Fixed alpha value (opacity)

      colors.push(`rgba(${r}, ${g}, ${b}, ${alpha})`);
    }

    return colors;
  }
}