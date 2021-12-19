export interface Question {
  category: string;
  correct_answer: string;
  difficulty: difficulty;
  incorrect_answers: string[];
  question: string;
  type: type;
}

type type = 'multiple' | 'true / false';
type difficulty = 'easy' | 'medium' | 'hard';
