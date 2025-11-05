import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GamepadIcon, UsersIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Join = () => {
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (playerName.trim() && roomCode.trim()) {
      localStorage.setItem("playerName", playerName);
      localStorage.setItem("roomCode", roomCode);
      navigate("/lobby");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-custom-lg">
              <GamepadIcon className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            QuizMaster
          </h1>
          <p className="text-muted-foreground text-lg">Join the ultimate multiplayer quiz experience</p>
        </div>

        <Card className="shadow-custom-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UsersIcon className="w-6 h-6 text-primary" />
              Join Game
            </CardTitle>
            <CardDescription>Enter your details to start playing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="playerName" className="text-sm font-medium">
                Your Name
              </label>
              <Input
                id="playerName"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="h-12 text-lg"
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="roomCode" className="text-sm font-medium">
                Room Code
              </label>
              <Input
                id="roomCode"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="h-12 text-lg font-mono"
                maxLength={6}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
              />
            </div>
            <Button
              onClick={handleJoin}
              className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90 transition-opacity shadow-custom-lg"
              disabled={!playerName.trim() || !roomCode.trim()}
            >
              Join Game
            </Button>
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/admin")}
              >
                Admin Panel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Join;
