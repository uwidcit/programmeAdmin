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
  errors: any;
  constructor(
    public data: DataLayerService,
    ) { }

  ngOnInit() {
    this.data.getErrors().subscribe((progs: any) => {
      console.log(progs);
      this.errors = progs;
      this.pendingRequest = false;
    }, (error: any) => { console.log(error); });
  }

}
