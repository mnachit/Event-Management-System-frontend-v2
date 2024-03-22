import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CreateNeweventService } from '../service/dash/create-newevent.service';
import { EventResponse } from '../service/dash/event-response';
import { AuthorizedGuardService } from '../guard/authorized-guard.service';
import { AllertService } from '../service/dash/allert.service';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @ViewChild('modal_event') modalEvent: any; // Reference to the modal window
  Event: EventResponse = new EventResponse();

  constructor(
    private CreateNeweventService: CreateNeweventService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService
  ) {}

  EventById: EventResponse[] = [];

  getEventByIdUser(): void {
    this.CreateNeweventService.getEventByIdUser(this.authorizedGuardService.getIdFromToken()).subscribe
    ({
      next: (data: any) => {
        this.EventById = data;
        console.log(data);
        
      },
      error: (e) => console.error(e)
    });
  }

  deleteEvent(id: number | undefined): void {
    this.CreateNeweventService.deleteEvent(id!  ).subscribe
    ({
      next: (data: any) => {
        this.getEventByIdUser();
        this.allert.showSuccess(data.message, 2000);
      },
      error: (e) => {
        console.error(e)
        this.allert.showError("The event was not found", 2000);
      }
    });
  }

  ngOnInit() {
    this.getEventByIdUser();
  }

  // createNewEvent() {
  //   this.Event.createdBy1 = this.authorizedGuardService.getIdFromToken();
  //   this.CreateNeweventService.createNewEvent(this.Event).subscribe(
  //     (data: { message: string; result: string }) => {
  //       this.allert.showSuccess(data.message, 2000);
  //       this.getEventByIdUser();
  //     },
  //     (error: { errors: string; errorMap: string }) => {
  //       this.allert.showError("Please check the form ", 2000);
  //       console.log(this.Event);
        
  //     }
  //   );
  // }
}
