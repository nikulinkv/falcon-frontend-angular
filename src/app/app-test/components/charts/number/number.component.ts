import {Component, Input, OnInit} from '@angular/core';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NumberComponent implements OnInit{
@Input() activeComponent: any
  ngOnInit() {
  }
}
