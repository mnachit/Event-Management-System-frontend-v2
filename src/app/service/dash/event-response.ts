import { Time } from "@angular/common";
import { UserResponse } from "../UserResponse";
import { AgendaResponse } from "../AgendaResponse";

export class EventResponse {
    id?: number;
    nomEvenement?: string;
    localisation?: string;
    amount?: string;
    nombreMaxUser?: number;
    dateDebut?: string;
    dateFin?: string;
    codeEvenement?: string;
    descriptionAgenda?: string;
    createdAt?: Date;
    dateCreation?: Date;
    createdBy1?: string;
    createdBy?: UserResponse;
    agenda!: AgendaResponse;
}