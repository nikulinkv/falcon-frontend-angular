import {Component, effect, inject, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  _appService = inject(AppService)
  _router = inject(Router)
  blockControl = new FormControl('')
  blockFilteredOptions!: Observable<any[]>
  blockOptions: any[] = []

  companyControl = new FormControl('')
  companyFilteredOptions!: Observable<any[]>
  companyOptions: any[] = []

  isLoading = false

  constructor(
  ) {
    effect(() => {this.blockOptions = this._appService.allBlocks()});
    effect(() => {this.companyOptions = this._appService.allCompanies()})
  }

  displayFn(block: any): string {
    return block && block.name ? block.name : '';
  }

  ngOnInit() {
    this.blockFilteredOptions = this.blockControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        // @ts-ignore
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.blockOptions) : this._appService.allBlocks().slice();
      }),
    );

    this.companyFilteredOptions = this.companyControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        // @ts-ignore
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.companyOptions) : this._appService.allCompanies().slice();
      }),
    );
  }

  private _filter(name: string, options: any[]) {
    const filterValue = name.toLowerCase();

    return options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  createBlock() {
    this._appService.activeBlock.set('')
    this.isLoading = true
    // @ts-ignore
    console.log(this.blockControl.value, this.companyControl.value!.code)
    // @ts-ignore
    this._appService.getActiveBlock(this.companyControl.value!.code, this.blockControl.value.path.split('/')[1], this.blockControl.value!.code).then(() => this.isLoading = false)
  }
}
