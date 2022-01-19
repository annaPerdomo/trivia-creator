export type Question = {
  id: number;
  triviaId?: number;
  roundNum?: number;
  questionNum?: number;
  content?: string;
  type?: string;
  correctAnswer?: string;
};
