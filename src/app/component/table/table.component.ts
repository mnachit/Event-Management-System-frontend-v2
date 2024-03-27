import { Component, NgModule } from '@angular/core';
import { Product, TopSelling, TableRows, Employee } from './table-data';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventResponse1 } from 'src/app/service/EventResponse1';
import { CreateNeweventService } from 'src/app/service/dash/create-newevent.service';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.service';
import { AllertService } from 'src/app/service/dash/allert.service';
import { EventResponse } from 'src/app/service/dash/event-response';
import { SlicePipe } from '../../slice.pipe';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    NgFor
  ],
  templateUrl: 'table.component.html'
})
export class TableComponent {

  EventByCode: EventResponse = new EventResponse();

  constructor(
    private CreateNeweventService: CreateNeweventService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getEventByCode(code: string): void {
    this.CreateNeweventService.getEventByCode(code).subscribe
      ({
        next: (data: { message: string; result: EventResponse }) => {
          this.EventByCode = {
            ...data.result,
            agenda: data.result.agenda || [] // Add the missing agenda property with a default value of an empty array
          };
          console.log(this.EventByCode);
        },
        error: (e: { errors: string; errorMap: string }) => {
          this.router.navigate(['/404']);
        }
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getEventByCode(params['code']);
    });
  }
}
