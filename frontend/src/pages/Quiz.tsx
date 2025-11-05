import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Timer, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const question = mockQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  useEffect(() => {
    if (hasAnswered || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, hasAnswered]);

  const handleAutoSubmit = () => {
    setHasAnswered(true);
    setTimeout(handleNext, 2000);
  };

  const handleAnswerClick = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || hasAnswered) return;
    
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 100);
    }
    
    setHasAnswered(true);
    setTimeout(handleNext, 2000);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      localStorage.setItem("finalScore", score.toString());
      navigate("/leaderboard");
    }
  };

  const getButtonVariant = (index: number) => {
    if (!hasAnswered) return "outline";
    if (index === question.correctAnswer) return "default";
    if (index === selectedAnswer && index !== question.correctAnswer) return "destructive";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-primary/10 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-4xl mx-auto py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Question {currentQuestion + 1} of {mockQuestions.length}
          </Badge>
          <Badge className="text-lg px-4 py-2 bg-gradient-success">
            <Trophy className="w-4 h-4 mr-1" />
            {score} points
          </Badge>
        </div>

        <Progress value={progress} className="h-2" />

        <Card className="border-4 border-primary/20 shadow-custom-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300",
                  timeLeft <= 5
                    ? "bg-destructive text-destructive-foreground animate-pulse"
                    : "bg-gradient-primary text-primary-foreground"
                )}
              >
                <Timer className="w-8 h-8 absolute" />
                <span className="relative z-10">{timeLeft}</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-8">{question.question}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={getButtonVariant(index)}
                  onClick={() => handleAnswerClick(index)}
                  disabled={hasAnswered}
                  className={cn(
                    "h-20 text-lg font-medium transition-all duration-300",
                    selectedAnswer === index && !hasAnswered && "ring-4 ring-primary",
                    hasAnswered && index === question.correctAnswer && "bg-gradient-success hover:bg-gradient-success",
                    hasAnswered && selectedAnswer === index && index !== question.correctAnswer && "bg-destructive hover:bg-destructive"
                  )}
                >
                  <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>

            {!hasAnswered && selectedAnswer !== null && (
              <Button
                onClick={handleSubmit}
                className="w-full mt-6 h-14 text-xl bg-gradient-accent hover:opacity-90 transition-opacity shadow-custom-accent animate-in fade-in slide-in-from-bottom-2"
              >
                Submit Answer
              </Button>
            )}

            {hasAnswered && (
              <div className="mt-6 p-4 rounded-lg bg-muted text-center animate-in fade-in slide-in-from-bottom-2">
                <p className="text-lg font-medium">
                  {selectedAnswer === question.correctAnswer
                    ? "🎉 Correct! Great job!"
                    : "❌ Incorrect. The correct answer was: " + question.options[question.correctAnswer]}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
