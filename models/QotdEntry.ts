export interface QotdEntry {
    app_id: string;
    date: string;
    v3_flashcard_id: string;
    category_id: string;
    override: string;
    P: string;
    Pb: string;
    Stem: string;
  }

  export interface QuestionData {
    question: string;
    answers: string[];
  }

  export enum SocialPlatform {
    Instagram = 'instagram',
    Facebook = 'facebook',
    Twitter = 'twitter'
  }

  export interface TemplateOptions {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    borderColor: string;
    platform: SocialPlatform;
  }