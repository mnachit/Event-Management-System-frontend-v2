import { Component, NgModule, OnInit } from '@angular/core';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.service';
import { AllertService } from 'src/app/service/dash/allert.service';
import { CreateNeweventService } from 'src/app/service/dash/create-newevent.service';
import { EventResponse } from 'src/app/service/dash/event-response';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-event-detaits',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './event-detaits.component.html',
  styleUrl: './event-detaits.component.scss'
})
export class EventDetaitsComponent implements OnInit{

  EventById: EventResponse = new EventResponse();

  checkId: boolean = false;

  constructor(
    private CreateNeweventService: CreateNeweventService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  getEventById(id: string): void {
    this.CreateNeweventService.getEventById(id).subscribe
    ({
      next: (data: any) => {
        this.EventById = data;
        this.checkId = true;
        console.log(this.EventById.agenda.dateCreation);
        
      },
      error: (e) => 
      {
        this.router.navigate(['/404']);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getEventById(params['id']);
    });
    
  }

}
