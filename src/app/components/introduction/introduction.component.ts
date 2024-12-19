import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { PraytimesService } from './../../services/praytimes/praytimes.service';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {

  constructor(private praytimesService: PraytimesService, private datePipe:DatePipe) {
    this.getDailyPrayTimes()
    this.getMonthlyPrayTimes()
  }

  baseUrl: string = environment.baseUrl
  DailyRegion: string = "Toshkent"
  MonthlyRegion: string = "Toshkent"
  DailyDate: string = new Date().toISOString().substring(0, 10);
  MonthlyDate: string = this.datePipe.transform(new Date(),"yyyy-MM")!
  dailyPrayTimes!: any
  monthlyPrayTimes!: any
  dailyPrayTimesRequestUrl!: string
  monthlyPrayTimesRequestUrl!: string

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
}
