import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  _appService = inject(AppService)
  _activatedRoute = inject(ActivatedRoute)

  isLoading = false
  indicator = ''
  activeBlock!: any
  constructor() {
    effect(() => {
      this.activeBlock = this._appService.activeBlock()
    });
  }
  ngOnInit() {
    // this._activatedRoute.paramMap.subscribe(params => {
    //   console.log(params)
    //   this.indicator = params.get('indicator') as string
    //   this._appService.activeBlock.set('')
    //   this.isLoading = true
    //   this._appService.getActiveBlock(params.get('company') as string, params.get('tab') as string).then(r => this.isLoading = false)
    // })
  }

  // activeBlock() {
  //   return (this._appService.activeBlock() as Array<any>).filter(item => item.code == this.indicator)
  // }
}
