export interface Question {
    id?: Number;
    description: string;
    type: string;
    state: Boolean;
    recommendation: Boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateQuestion {
    id?: Number;
    description: String;
    type: String;
    state: String;
}