import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthorizedGuardService } from 'src/app/guard/authorized-guard.service';
import { Response } from 'src/app/service/dash/Response';
import { AllertService } from 'src/app/service/dash/allert.service';
import { CreateNeweventService } from 'src/app/service/dash/create-newevent.service';
import { EventResponse } from 'src/app/service/dash/event-response';

@Component({
  selector: 'app-add-user-in-event',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-user-in-event.component.html',
  styleUrl: './add-user-in-event.component.scss'
})
export class AddUserInEventComponent {
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  phone: string = '';
  event_id: number = 0;
  constructor(
    private CreateNeweventService: CreateNeweventService,
    private authorizedGuardService: AuthorizedGuardService,
    private allert: AllertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  addUserInEvent() {
    this.CreateNeweventService.addUserInEvent(this.first_name,this.last_name,this.email,this.phone,this.event_id).subscribe(
      (data: { message: string; result: string }) => {
        this.allert.showSuccess(data.message, 2000);
        window.history.back();
      },
      (error: { errors: Response<string> }) => {
        this.allert.showError("the user already exists", 2000);
      }
    );
  }

  getEventByCode(code: string): void {
    this.CreateNeweventService.getEventByCode(code).subscribe
      ({
        next: (data: { message: string; result: EventResponse }) => {
          this.event_id = data.result.id as number;
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
