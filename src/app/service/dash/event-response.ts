import { Time } from "@angular/common";

export class EventResponse {
    id?: number;
    nomEvenement?: string;
    localisation?: string;
    amount?: string;
    nombreMaxUser?: number;
    dateDebut?: string;
    dateFin?: string;
    descriptionAgenda?: string;
    createdAt?: Date;
    createdBy?: string;
}