import { Component, NgModule, OnInit } from '@angular/core';
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
import { User } from 'src/app/model/user';



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
export class TableComponent implements OnInit{

  EventByCode: EventResponse = new EventResponse();
  users?: User[] = [];
  code_event: string = '';

  constructor(
    private CreateNeweventService: CreateNeweventService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService,
    private route: ActivatedRoute,
    private router: Router,
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
      this.showAllUserInEvent(params['code']);
      this.code_event = params['code'];
    });
  }

  showAllUserInEvent(code: string): void {
    this.CreateNeweventService.showAllUserInEvent(code).subscribe
      ({
        next: (data: { result: User[] }) => {
          this.users = data.result;
          console.log(this.users);
        },
        error: (e: { errors: string; errorMap: string }) => {
          this.router.navigate(['/404']);
        }
      });
  }

  deleteUserInEvent(id: number): void {
    this.CreateNeweventService.deleteUserInEvent(this.code_event, id).subscribe
      ({
        next: (data: any) => {
          window.location.reload();
          this.allert.showSuccess(data.message, 2000);
        },
        error: (e: { errors: string; errorMap: string }) => {
          console.log(e.errors);
          
          this.allert.showError("The event was not found", 2000);
        }
      });
  }
}
