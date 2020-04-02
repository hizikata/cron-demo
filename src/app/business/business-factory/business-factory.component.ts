import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-factory',
  templateUrl: './business-factory.component.html',
  styleUrls: ['./business-factory.component.less']
})
export class BusinessFactoryComponent implements OnInit {

  constructor(
    public router: Router,
    public activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!this.activedRoute.firstChild) {
      this.router.navigate(['./cron'], { relativeTo: this.activedRoute });
    }
  }

}
