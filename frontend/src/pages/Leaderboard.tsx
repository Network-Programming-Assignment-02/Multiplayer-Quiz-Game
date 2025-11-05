import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Crown, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

interface PlayerScore {
  id: string;
  name: string;
  score: number;
  rank: number;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<PlayerScore[]>([]);
  const playerName = localStorage.getItem("playerName") || "Player";
  const finalScore = parseInt(localStorage.getItem("finalScore") || "0");

  useEffect(() => {
    // Mock leaderboard data
    const mockPlayers: PlayerScore[] = [
      { id: "1", name: playerName, score: finalScore, rank: 0 },
      { id: "2", name: "Alex", score: 250, rank: 0 },
      { id: "3", name: "Sarah", score: 200, rank: 0 },
      { id: "4", name: "Mike", score: 150, rank: 0 },
      { id: "5", name: "Emma", score: 100, rank: 0 },
    ];

    // Sort by score and assign ranks
    const sorted = mockPlayers.sort((a, b) => b.score - a.score);
    sorted.forEach((player, index) => {
      player.rank = index + 1;
    });

    setPlayers(sorted);
  }, [playerName, finalScore]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Medal className="w-8 h-8 text-amber-700" />;
      default:
        return <Trophy className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500 to-amber-500";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-700 to-amber-800";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-4xl mx-auto py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-custom-lg">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Final Leaderboard
          </h1>
          <p className="text-muted-foreground text-lg">See how you ranked against other players</p>
        </div>

        <Card className="shadow-custom-lg border-2">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-left",
                  player.name === playerName && "ring-4 ring-primary",
                  player.rank <= 3 ? getRankBg(player.rank) + " text-white border-transparent" : "bg-card border-border"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(player.rank)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl">{player.name}</span>
                      {player.name === playerName && (
                        <Badge variant="secondary" className="text-xs">You</Badge>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm",
                      player.rank <= 3 ? "text-white/80" : "text-muted-foreground"
                    )}>
                      Rank #{player.rank}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{player.score}</div>
                  <div className={cn(
                    "text-sm",
                    player.rank <= 3 ? "text-white/80" : "text-muted-foreground"
                  )}>
                    points
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/")}
            className="flex-1 h-12 bg-gradient-primary hover:opacity-90 transition-opacity shadow-custom-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <Button
            onClick={() => navigate("/quiz")}
            variant="outline"
            className="flex-1 h-12"
          >
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
