// Quiz page with score tracking and navigation (Material UI version)
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchQuestion } from '@/lib/triviaApi';
import QuestionCard from '@/component/questionCard';
import QuizTimer from '@/component/timer';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack,
} from '@mui/material';

// Define the Question type
interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

export default function TriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    async function loadQuestions() {
      const result = await fetchQuestion(10, 9, 'medium');
      setQuestions(result);
      setLoading(false);
    }
    loadQuestions();
  }, []);

  const handleSelectOption = (selectedOption: string): void => {
    setSelectedAnswer(selectedOption);
  };

  const handleSubmit = (): void => {
    if (selectedAnswer) {
      const currentQuestion = questions[currentQuestionIndex];
      if (
        currentQuestion.correct_answer &&
        selectedAnswer === currentQuestion.correct_answer
      ) {
        setScore(score + 1);
      }
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
      } else {
        const finalScore =
          currentQuestion.correct_answer &&
          selectedAnswer === currentQuestion.correct_answer
            ? score + 1
            : score;
        router.push(`/result?score=${finalScore}&total=${questions.length}`);
      }
    } else {
      alert('Please select an answer first!');
    }
  };

  if (loading)
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #fafafa 100%)' }}
      >
        <Card sx={{ px: 5, py: 4, minWidth: 320, borderRadius: 3 }}>
          <Typography color="primary" variant="h6" fontWeight={500}>
            Loading Quiz...
          </Typography>
          <Box mt={3}>
            <LinearProgress color="primary" />
          </Box>
        </Card>
      </Box>
    );
  if (!questions.length)
    return (
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #fafafa 100%)' }}
      >
        <Card sx={{ px: 5, py: 4, minWidth: 320, borderRadius: 3 }}>
          <Typography color="error" variant="h6" fontWeight={600}>
            No questions available.
          </Typography>
        </Card>
      </Box>
    );

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fafafa 100%)',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          maxWidth: 540,
          width: '100%',
          px: { xs: 1, sm: 3 },
          py: 4,
          boxShadow: 4,
          mt: { xs: 2, md: 5 },
        }}
      >
        <CardContent>
          <Typography
            textAlign="center"
            color="primary"
            fontWeight={800}
            variant="h4"
            gutterBottom
          >
            Trivia Quiz
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
            spacing={2}
          >
            <Typography color="text.secondary" fontWeight={500}>
              Question{' '}
              <Typography component="span" color="primary" fontWeight={700}>
                {currentQuestionIndex + 1}
              </Typography>{' '}
              of {questions.length}
            </Typography>
            <Typography color="success.main" fontWeight={700}>
              Score: {score}
            </Typography>
          </Stack>
          <QuizTimer
            seconds={60}
            onTimeout={() => {
              alert('Time is up! Redirecting to results.');
              router.push(`/result?score=${score}&total=${questions.length}`);
            }}
          />
          <Box my={3}>
            <QuestionCard
              question={questions[currentQuestionIndex]?.question}
              options={questions[currentQuestionIndex]?.options}
              onSelect={handleSelectOption}
              selectedAnswer={selectedAnswer}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            sx={{
              mt: 2,
              fontWeight: 700,
              background:
                selectedAnswer &&
                'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              color: selectedAnswer ? 'white' : '#888',
              boxShadow: selectedAnswer ? 2 : 'none',
              transition: 'background 0.2s, transform 0.2s',
            }}
            disabled={!selectedAnswer}
          >
            {currentQuestionIndex < questions.length - 1
              ? 'Next Question'
              : 'Finish Quiz'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}