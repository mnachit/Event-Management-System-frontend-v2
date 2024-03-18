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
        console.log(this.EventById);
        
      },
      error: (e) => console.error(e)
    });
  }

  EventById1: EventResponse[] = [];

  getEventById(id: string): void {
    this.CreateNeweventService.getEventById(id).subscribe
    ({
      next: (data: any) => {
        this.EventById1 = data;
        console.log(data);
        
      },
      error: (e) => console.error(e)
    });
  }

  openModal(eventId: number) { // Pass the event ID to the modal component
  }
  ngOnInit() {
    this.getEventByIdUser();
  }

  createNewEvent() {
    this.Event.createdBy = this.authorizedGuardService.getIdFromToken();
    this.CreateNeweventService.createNewEvent(this.Event).subscribe(
      (data: { message: string; result: string }) => {
        this.allert.showSuccess(data.message, 2000);
        this.getEventByIdUser();
      },
      (error: { errors: string; errorMap: string }) => {
        this.allert.showError("Please check the form ", 2000);
      }
    );
  }

  // Rest of the code...
}
