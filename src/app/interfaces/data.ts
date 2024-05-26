export enum IndicatorMeasureType {
	ITEMS = 'ITEMS',
	MONEY = 'MONEY',
	NONE = 'NONE',
	PERCENT = 'PERCENT',
	RATIO = 'RATIO'
}

export interface IData {
	// Комментарий
	comment?: string;
	company: string;
	// Валюта в которой установлено значение
	currency?: string;
	// Уникальный код
	dataKey?: string;
	date: Date;
	indicator: string;
	period: string;
	// Значение
	value: number;
	// Значение за последние 12 месяцев на данный период
	value_ltm?: number;
	// Значение в валюте
	value_c: number;
	// Значение LTM в валюте
	value_ltm_c?: number;
	// Строковое значение
	value_string?: string;
	values?: Array<number>;
	year: number;
}

export interface IDataResult extends IData {
	title: string;
	value_scale: number;
	measure: IndicatorMeasureType;
	measure_string: string;
}
