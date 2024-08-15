export interface SettingsTypes {
   name : string;
   llmModel : string;
   embedModel : string;
   region : string;
}

export interface AssessmentCriteria {
   id: string;
   title: string;
   desc: string;
   score: number;
}