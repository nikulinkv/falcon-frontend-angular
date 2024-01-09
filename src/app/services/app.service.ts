import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'http://127.0.0.1:3000'
  _http = inject(HttpClient)

  allBlocks: WritableSignal<any> = signal('')
  allCompanies: WritableSignal<any> = signal('')
  activeBlock: WritableSignal<any> = signal('')

  constructor() { }
  async init() {
    this.allBlocks.set(await lastValueFrom(this.getAllBlocks()))
    this.allCompanies.set(await lastValueFrom(this.getAllCompanies()))
  }

  getAllBlocks() {
    return this._http.get(`${this.url}/api/blocks`)
  }

  getAllCompanies() {
    return this._http.get(`${this.url}/api/companies`)
  }

  async getActiveBlock(company: string, tab: string, indicator: string) {
    let blocks = await lastValueFrom(this._http.get(`${this.url}/api/blocks/${company}/${tab}`)) as Array<any>

    this.activeBlock.set(blocks.filter(block => block.code == indicator)[0])
  }
}
