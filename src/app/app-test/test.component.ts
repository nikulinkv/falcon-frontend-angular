import {AfterViewInit, Component, effect, inject, OnInit, Signal, Type} from '@angular/core';
import {AsyncPipe, NgComponentOutlet, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {ActivatedRoute, Params, Router, RouterOutlet} from "@angular/router";
import {AppService} from "./services/app.service";
import {lastValueFrom, map, Observable, startWith, switchMap} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {SpeedChartComponent} from "./components/charts/speed-chart/speed-chart.component";
import {NumberComponent} from "./components/charts/number/number.component";
import {Company, Indicator} from "./test.interface";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatCardModule,
    NgIf,
    NgComponentOutlet,
    MatProgressSpinnerModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  _appService = inject(AppService)
  _router = inject(Router)
  _route = inject(ActivatedRoute)

  isLoading = false

  activeComponent: any
  activeComponentTemplate: Type<any> | null = null

  blockFilteredOptions!: Observable<(Company | Indicator)[] | null | undefined>
  blockOptions: (Company | Indicator)[] | null = []

  companyFilteredOptions!: Observable<(Company | Indicator)[] | null | undefined>
  companyOptions: (Company | Indicator)[] | null = []

  searchForm = new FormGroup({
    company: new FormControl<Company | null>(null),
    indicator: new FormControl<Indicator | null>(null)
  })

  constructor() {
    effect(() => {
      this.blockOptions = this._appService.allIndicator()
    });
    effect(() => {
      this.companyOptions = this._appService.allCompanies()
    })
  }

  displayFn(option: Company | Indicator): string {
    return option && option.name ? option.name : '';
  }

  ngOnInit() {

    this._route.paramMap.subscribe(params => this.onChangeQueryParams(params))

    this.blockFilteredOptions = this.searchForm.controls.indicator.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.blockOptions) : this._appService.allIndicator()?.slice();
      }),
    );

    this.companyFilteredOptions = this.searchForm.controls.company.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.companyOptions) : this._appService.allCompanies()?.slice();
      }),
    );
  }

  private _filter(name: string, options: (Company | Indicator)[] | null) {
    const filterValue = name.toLowerCase();
    return options && options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getIndicatorData() {
    const company = this.searchForm.get('company')!.value as unknown as Company
    const indicator = this.searchForm.get('indicator')!.value as unknown as Indicator
    this._router.navigate(['/test', {company: company.code, indicator: indicator.code}])
  }

  getActiveBlock(component: any) {
    switch(component.type) {
      case 'Speed':
        this.activeComponentTemplate = SpeedChartComponent
        break

      case 'Number\r':
        this.activeComponentTemplate = NumberComponent
        break

      default:
        this.activeComponentTemplate = NumberComponent
        break

    }
  }

  async onChangeQueryParams(params: Params) {
    console.log(params)
    if (!params['params'].company || !params['params'].indicator) {
      this.activeComponentTemplate = null
      this.searchForm.reset({})
      return
    }
    this.isLoading = true
    this.activeComponentTemplate = null
    this.searchForm.patchValue({
      company: this._appService.allCompanies()?.find((c: any) => c.code == this._route.snapshot.paramMap.get('company')) || null,
      indicator: this._appService.allIndicator()?.find((i: any) => i.code == this._route.snapshot.paramMap.get('indicator')) || null
    })
    console.log(this.searchForm.getRawValue())
    const response = {
      company: this.searchForm.get('company')!.value!.code,
      tab: this.searchForm.get('indicator')!.value!.path.split('/')[1],
      order: this.searchForm.get('indicator')!.value!.order
    }

    this.activeComponent = await lastValueFrom(this._appService.getActiveBlock(response.company, response.tab, response.order))
    this.getActiveBlock(this.activeComponent[0])
    this.isLoading = false
  }
}
