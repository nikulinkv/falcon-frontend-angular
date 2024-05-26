import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JsonPipe, NgIf} from '@angular/common';
import {AppService} from '../../../services/app.service';
import {ChartBaseComponent} from '../chart.base';
import {FusionChartsModule} from 'angular-fusioncharts';
import {IDataResult} from '../../../../interfaces/data';

@Component({
	selector: 'app-gauge',
	standalone: true,
	imports: [NgIf, JsonPipe, FusionChartsModule],
	templateUrl: './gauge.component.html',
	styleUrl: './gauge.component.scss'
})
export class GaugeChartComponent extends ChartBaseComponent implements OnInit, OnChanges {
	appService = inject(AppService);
	@Input() activeComponent: any;

	constructor() {
		super();
	}

	dataSource: any;

	prepareData(): void {
		let data = this.activeComponent['data'][0] as IDataResult;
		this.dataSource = {
			'chart': {
				'baseFont': 'Arial',
				'caption': '',
				'subcaption': '',
				'plotToolText': '',
				'theme': 'fusion',
				'chartBottomMargin': '100',
				'showValue': '1',
				'gaugeOuterRadius': '100',
				'gaugeInnerRadius': '90'
			},
			'colorRange': {
				'color': [
					/*{
						"minValue": "0",
						"maxValue": data.values && data.values.length > 0 ? data.values[0] : "0",
						"code": "#0A428E"
					},*/
					{
						'minValue': '0',
						'maxValue': data.values && data.values.length > 0 ? data.values[1] : '0',
						'code': '#50CFB2'
					},
					{
						'minValue': '0',
						'maxValue': data.values && data.values.length > 0 ? data.values[2] : '0',
						'code': '#E33D70'
					}
				]
			},
			'dials': {
				'dial': [
					{
						'value': data.values && data.values.length > 0 ? data.values[0] : '0'
					}
				]
			},
			'annotations': {
				'origw': '450',
				'origh': '300',
				'autoscale': '1',
				'showBelow': '0',
				'groups': [
					{
						'id': 'arcs',
						'items': [
							{
								'id': 'national-cs-text',
								'type': 'Text',
								'color': '#0A428E',
								'label': (data.values && data.values.length > 0 ? Math.round(data.values[0] * 10) / 10 : '0') + '% - Компания',
								'fontSize': '18',
								'align': 'left',
								'x': '$chartCenterX - 60',
								'y': '$chartEndY - 50'
							},
							{
								'id': 'state-cs-text',
								'type': 'Text',
								'color': '#50CFB2',
								'label': (data.values && data.values.length > 0 ? Math.round(data.values[1] * 10) / 10 : '0') + '% - Рынок',
								'fontSize': '18',
								'align': 'left',
								'x': '$chartCenterX - 60',
								'y': '$chartEndY - 30'
							},
							{
								'id': 'state-cs-text',
								'type': 'Text',
								'color': '#E33D70',
								'label': (data.values && data.values.length > 0 ? Math.round(data.values[2] * 10) / 10 : '0') + '% - Отрасль',
								'fontSize': '18',
								'align': 'left',
								'x': '$chartCenterX - 60',
								'y': '$chartEndY - 10'
							}
						]
					}
				]
			}
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['activeComponent'] != null && changes['activeComponent'] != this.activeComponent) {
			this.prepareData();
		}
	}

	ngOnInit() {
		console.log(this.activeComponent);
	}
}
