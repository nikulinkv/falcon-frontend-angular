import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Company, Indicator} from "../test.interface";

@Injectable({
    providedIn: 'root',
  })
export class AppService {
  url = 'http://127.0.0.1:3000'
  _http = inject(HttpClient)

  allIndicator: WritableSignal<Indicator[] | null> = signal(null)
  allCompanies: WritableSignal<Company[] | null> = signal(null)
  activeBlock = signal('')

  async init() {
    this.allIndicator.set(await lastValueFrom(this.getAllIndicators()))
    this.allCompanies.set(await lastValueFrom(this.getAllCompanies()))
  }

  getAllBlocks() {
    return this._http.get<Indicator[]>(`${this.url}/api/blocks`)
  }

  getAllCompanies() {
    return this._http.get<Company[]>(`${this.url}/api/companies`)
  }

  getAllIndicators() {
    return this._http.get<Indicator[]>(`${this.url}/api/indicators`)
  }

  getActiveBlock(company: string, tab: string, order: number) {
    return this._http.get(`${this.url}/api/blocks/${company}/${tab}/${order}`)
  }
}
