"use client";
import Link from 'next/link';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

export default function Page() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fafafa 100%)',
      }}
    >
      <Card sx={{ borderRadius: 3, px: 5, py: 6, minWidth: 350, boxShadow: 6 }}>
        <CardContent>
          <Typography
            variant="h3"
            fontWeight={800}
            color="primary"
            textAlign="center"
            gutterBottom
          >
            Welcome
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Link href="/quiz/category" passHref legacyBehavior>
              <Button
                variant="contained"
                size="large"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 4,
                  py: 1.2,
                  boxShadow: 2,
                  fontSize: '1.15rem',
                }}
              >
                Start Quiz
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}