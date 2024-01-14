import {Component, effect, inject, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Router} from "@angular/router";
import {BlockComponent} from "../UI/block/block.component";

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
    // @ts-ignore
    this._router.navigate(['blocks', this.companyControl.getRawValue()?.code, this.blockControl.getRawValue().path.split('/')[1], this.blockControl.getRawValue().order])
      .then(() => {
        this._router.navigate([BlockComponent])
      })
  }
}
