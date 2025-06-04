
'use client';
import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

interface QuestionCardProps {
  question: string;
  options: string[];
  onSelect: (answer: string) => void;
  selectedAnswer?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  options, 
  onSelect, 
  selectedAnswer 
}) => {
  if (!question || !options) {
    return <div>Loading question...</div>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {question}
        </Typography>
        <Stack spacing={2}>
          {options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option ? 'contained' : 'outlined'}
              onClick={() => onSelect(option)}
              fullWidth
            >
              {option}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;