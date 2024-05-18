import {AfterViewInit, Component, effect, inject, Input, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {JsonPipe, NgIf} from "@angular/common";
import {AppService} from "../../../services/app.service";
import {Chart} from "chart.js";

@Component({
  selector: 'app-speed-chart',
  standalone: true,
  imports: [
    MatIconModule,
    NgIf,
    JsonPipe
  ],
  templateUrl: './speed-chart.component.html',
  styleUrl: './speed-chart.component.scss'
})
export class SpeedChartComponent implements OnInit {
  _appService = inject(AppService)

  leftChart: any
  rightChart: any
  @Input() activeComponent: any

  constructor() {
    // effect(() => {
    //   this.activeComponent = this._appService.activeComponent()
    // })
  }

  ngOnInit() {
    // setTimeout(() => this.createSpeedChart(), 100)
    console.log(this.activeComponent)
  }

  createSpeedChart() {
    const firstNeedle = {
      id: 'firstNeedle',
      afterDatasetDraw(chart: Chart<any>, args: any, options: any) {
        const {ctx, config, data, chartArea: {top, bottom, left, right, width, height}} = chart

        ctx.save()

        const needleValue = data.datasets[1].firstNeedle
        const dataTotal = data.datasets[1].data.reduce((a: any, b: any) => a + b, 0)
        const angle = Math.PI + (1 / dataTotal * needleValue * Math.PI)

        const cx = width / 2
        // @ts-ignore
        const cy = chart._metasets[0].data[0].y

        ctx.translate(cx, cy)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(0, -5)
        ctx.lineTo(height - (ctx.canvas.offsetTop + 40), 0)
        ctx.lineTo(0, 5)
        ctx.fillStyle = '#004d95'
        ctx.fill()

        ctx.translate(-cx, -cy)
        ctx.beginPath()
        ctx.arc(cx, cy, 5, 0, 10)
        ctx.fill()
        ctx.restore()
      }
    }

    const secondNeedle = {
      id: 'secondNeedle',
      afterDatasetDraw(chart: Chart<any>, args: any, options: any) {
        const {ctx, config, data, chartArea: {top, bottom, left, right, width, height}} = chart

        ctx.save()

        const needleValue = data.datasets[2].secondNeedle
        const dataTotal = data.datasets[2].data.reduce((a: any, b: any) => a + b, 0)
        const angle = Math.PI + (1 / dataTotal * needleValue * Math.PI)

        const cx = width / 2
        // @ts-ignore
        const cy = chart._metasets[0].data[0].y

        ctx.translate(cx, cy)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(0, -5)
        ctx.lineTo(height - (ctx.canvas.offsetTop + 40), 0)
        ctx.lineTo(0, 5)
        ctx.fillStyle = '#5dd6c0'
        ctx.fill()

        ctx.translate(-cx, -cy)
        ctx.beginPath()
        ctx.arc(cx, cy, 5, 0, 10)
        ctx.fill()
        ctx.restore()
      }
    }

    const thirdNeedle = {
      id: 'thirdNeedle',
      afterDatasetDraw(chart: Chart<any>, args: any, options: any) {
        const {ctx, config, data, chartArea: {top, bottom, left, right, width, height}} = chart

        ctx.save()

        const needleValue = data.datasets[3].thirdNeedle
        const dataTotal = data.datasets[3].data.reduce((a: any, b: any) => a + b, 0)
        const angle = Math.PI + (1 / dataTotal * needleValue * Math.PI)

        const cx = width / 2
        // @ts-ignore
        const cy = chart._metasets[0].data[0].y

        ctx.translate(cx, cy)
        ctx.rotate(angle)
        ctx.beginPath()
        ctx.moveTo(0, -5)
        ctx.lineTo(height - (ctx.canvas.offsetTop + 40), 0)
        ctx.lineTo(0, 5)
        ctx.fillStyle = '#eb5783'
        ctx.fill()

        ctx.translate(-cx, -cy)
        ctx.beginPath()
        ctx.arc(cx, cy, 5, 0, 10)
        ctx.fill()
        ctx.restore()
      }
    }

    // @ts-ignore
    this.leftChart = new Chart('LeftChart', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [25, 25, 25, 25],
            backgroundColor: [
              'rgba(232, 110, 68, 1)',
            ],
            borderWidth: 1,
            // @ts-ignore
            cutout: '85%',
            circumference: 180,
            rotation: 270,

          },
          {
            data: [(this.activeComponent.data[0].values[0] * 10), (100 - (this.activeComponent.data[0].values[0] * 10))],
            backgroundColor: [
              'rgba(6, 86, 159, 1)',
              'rgba(54, 162, 235, 0)',
            ],
            borderWidth: 1,
            // @ts-ignore
            cutout: '85%',
            circumference: 180,
            rotation: 270,
            firstNeedle: (this.activeComponent.data[0].values[0] * 10)
          },
          {
            data: [(this.activeComponent.data[0].values[1] * 10), (100 - (this.activeComponent.data[0].values[1] * 10))],
            backgroundColor: [
              'rgba(93, 214, 192, 1)',
              'rgba(54, 162, 235, 0)',
              'rgba(255, 205, 86, 0)'
            ],
            borderWidth: 1,
            // @ts-ignore
            cutout: '85%',
            circumference: 180,
            rotation: 270,
            secondNeedle: (this.activeComponent.data[0].values[1] * 10)
          },
          {
            data: [(this.activeComponent.data[0].values[2] * 10), (100 - (this.activeComponent.data[0].values[2] * 10))],
            backgroundColor: [
              'rgba(235, 87, 131, 1)',
              'rgba(54, 162, 235, 0)',
              'rgba(255, 205, 86, 0)'
            ],
            borderWidth: 1,
            // @ts-ignore
            cutout: '85%',
            circumference: 180,
            rotation: 270,
            thirdNeedle: (this.activeComponent.data[0].values[2] * 10)
          }
        ]
      },
      options: {},
      plugins: [firstNeedle, secondNeedle, thirdNeedle]
    })

    this.rightChart = new Chart('RightChart', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [37.5, 37.5, 37.5, 37.5, 37.5, 37.5],
            backgroundColor: [
              'rgba(232, 110, 68, 1)',
              'rgba(246, 184, 36, 1)',
              'rgba(210, 226, 65, 1)',
              'rgba(146, 220, 135, 1)'
            ],
            borderWidth: 1,
            // @ts-ignore
            cutout: '85%',
            circumference: 270,
            rotation: 225,
          },
          {
            data: [150, 15, 15],
            backgroundColor: [
              'rgba(6, 86, 159, 1)',
              'rgba(54, 162, 235, 0)',
              'rgba(255, 205, 86, 0)'
            ],
            borderWidth: 1,
            // @ts-ignore
            cutout: '85%',
            circumference: 180,
            rotation: 270,
            firstNeedle: 150
          },
          {
            data: [80, 50, 50],
            backgroundColor: [
              'rgba(93, 214, 192, 1)',
              'rgba(54, 162, 235, 0)',
              'rgba(255, 205, 86, 0)'
            ],
            borderWidth: 1,
            // @ts-ignore
            cutout: '85%',
            circumference: 180,
            rotation: 270,
            secondNeedle: 80
          },
          {
            data: [50, 65, 65],
            backgroundColor: [
              'rgba(235, 87, 131, 1)',
              'rgba(54, 162, 235, 0)',
              'rgba(255, 205, 86, 0)'
            ],
            borderWidth: 1,
            // @ts-ignore
            cutout: '85%',
            circumference: 180,
            rotation: 270,
            thirdNeedle: 50
          }
        ]
      },
      options: {},
      plugins: [firstNeedle, secondNeedle, thirdNeedle]
    })
  }
}
