import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.service';
import { EventResponse1 } from 'src/app/service/EventResponse1';
import { AllertService } from 'src/app/service/dash/allert.service';
import { CreateNeweventService } from 'src/app/service/dash/create-newevent.service';
import { EventResponse } from 'src/app/service/dash/event-response';
import { Time } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {

  Event: EventResponse1 = new EventResponse1();

  constructor(
    private CreateNeweventService: CreateNeweventService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService,
    private router: Router
  ) {}

  createNewEvent() {
    this.Event.createdBy = this.authorizedGuardService.getIdFromToken();
    if (this.Event.dateFin) {
      let timeString = this.Event.dateFin.toString(); // Convert Time to string
      if (timeString.length === 5) {
        // Append ":00" to include seconds if they're missing
        timeString += ":00";
        this.Event.dateFin = timeString;
      }
    }
    
    if (this.Event.dateDebut) {
      let timeString = this.Event.dateDebut.toString(); // Convert Time to string
      if (timeString.length === 5) {
        // Append ":00" to include seconds if they're missing
        timeString += ":00";
        this.Event.dateDebut = timeString;
      }
    }
    this.CreateNeweventService.createNewEvent(this.Event).subscribe(
      (data: { message: string; result: string }) => {
        this.allert.showSuccess(data.message, 2000);
        this.router.navigate(['/dashboard']);
      },
      (error: { errors: string; errorMap: string }) => {
        this.allert.showError("Please check the form ", 2000);
        console.log(this.Event.createdBy);
      }
    );
  }
}
