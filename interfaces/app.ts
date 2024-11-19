export interface IQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  answer?: string | null;
}

export interface IApiResponse {
  id: number;
  userId: number;
  title: string;
  body: string;
}
