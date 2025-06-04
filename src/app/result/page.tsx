// Results page using Material UI
"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

function getResultMessage(percentage: number) {
  if (percentage >= 90) return { msg: "Outstanding! 🎓", color: "#1976d2" };
  if (percentage >= 80) return { msg: "Excellent work! 🚀", color: "#388e3c" };
  if (percentage >= 65) return { msg: "Great job! 👍", color: "#fbc02d" };
  if (percentage >= 50) return { msg: "Good effort! 💪", color: "#fb8c00" };
  if (percentage >= 35) return { msg: "Keep practicing! ✨", color: "#e57373" };
  return { msg: "Don't give up! Try again! 🌱", color: "#c62828" };
}

function getBadgeEmoji(percentage: number) {
  if (percentage >= 90) return "🥇";
  if (percentage >= 80) return "🏅";
  if (percentage >= 65) return "🎉";
  if (percentage >= 50) return "👏";
  if (percentage >= 35) return "⭐";
  return "💡";
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score") || "0";
  const total = searchParams.get("total") || "0";
  const numericScore = parseInt(score);
  const numericTotal = parseInt(total);
  const percentage =
    numericTotal > 0 ? Math.round((numericScore / numericTotal) * 100) : 0;
  const { msg, color } = getResultMessage(percentage);
  const badge = getBadgeEmoji(percentage);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ background: "linear-gradient(135deg, #e3f2fd 0%, #fafafa 100%)" }}
    >
      <Card
        sx={{
          borderRadius: 3,
          maxWidth: 400,
          width: "100%",
          px: 3,
          py: 5,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Stack alignItems="center" spacing={1}>
            <Typography
              component="div"
              fontSize="64px"
              sx={{
                filter: "drop-shadow(0 2px 6px #1976d266)",
                animation: "pop 0.8s cubic-bezier(.34,1.56,.64,1) 1",
              }}
            >
              {badge}
            </Typography>
            <Typography
              variant="h4"
              fontWeight={700}
              color="primary"
              gutterBottom
            >
              Quiz Results
            </Typography>
            <Typography fontSize="1.2rem" color="text.secondary" gutterBottom>
              <Box
                component="span"
                fontWeight={600}
                fontSize="2rem"
                color="primary.main"
              >
                {score}
              </Box>
              <Box
                component="span"
                fontWeight={500}
                fontSize="1.2rem"
                color="#b0b7c3"
              >
                / {total}
              </Box>
            </Typography>
            <Typography
              fontSize="2.6rem"
              fontWeight={700}
              gutterBottom
              sx={{ color, textShadow: "0 2px 12px #1976d22a" }}
            >
              {percentage}%
            </Typography>
            <Typography
              fontSize="1.1rem"
              fontWeight={500}
              sx={{ color }}
              gutterBottom
            >
              {msg}
            </Typography>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                fontWeight: 700,
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                color: "white",
                borderRadius: 2,
                boxShadow: 2,
                textTransform: "none",
              }}
              onClick={() => (window.location.href = "/quiz/category")}
            >
              Take Another Quiz
            </Button>
          </Stack>
        </CardContent>
        {/* Pop animation keyframes */}
        <style>{`
          @keyframes pop {
            0% { transform: scale(0.7);}
            60% { transform: scale(1.15);}
            100% { transform: scale(1);}
          }
        `}</style>
      </Card>
    </Box>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <Box
          minHeight="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            background: "linear-gradient(135deg, #e3f2fd 0%, #fafafa 100%)",
          }}
        >
          <Card sx={{ px: 5, py: 4, minWidth: 320, borderRadius: 3 }}>
            <Typography color="primary" variant="h6" fontWeight={500}>
              Loading results...
            </Typography>
          </Card>
        </Box>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
