import { Question } from '@/types/quiz';

export async function fetchQuestion(
  amount: number,
  category: number,
  difficulty: string
): Promise<Question[]> {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const res = await fetch(url);
  
  const data = await res.json();

  if (data.response_code !== 0) {
    throw new Error('Failed to fetch quiz questions');
  }

  const questions: Question[] = data.results.map((q: any) => ({
    question: q.question,
    correct_answer: q.correct_answer,
    incorrect_answers: q.incorrect_answers,
    options: shuffle([...q.incorrect_answers, q.correct_answer]),
  }));

  return questions;

  function shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
