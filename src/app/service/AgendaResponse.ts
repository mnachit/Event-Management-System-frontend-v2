export class AgendaResponse {
    id: number;
    descriptionAgenda: string;
    dateCreation: Date;

    constructor(data: any) {
        this.id = data.id;
        this.descriptionAgenda = data.descriptionAgenda;
        this.dateCreation = data.dateCreation;
    }
}
