import { Component, OnInit } from '@angular/core';
import {DataLayerService} from '../data-layer.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css'],
  providers: [HttpClient]
})
export class ErrorsComponent implements OnInit {

  pendingRequest = true;
  errors = [];
  constructor(
    public data: DataLayerService,
    ) { }

  ngOnInit() {
    this.data.getErrors().subscribe((progs: any) => {
      this.errors = progs;
      this.pendingRequest = false;
    });
  }

}
