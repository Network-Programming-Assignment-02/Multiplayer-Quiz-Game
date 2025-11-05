import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UsersIcon, CheckCircle2, Clock, GamepadIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Player {
  id: string;
  name: string;
  status: "connected" | "ready";
}

const Lobby = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [roomCode, setRoomCode] = useState("");
  const playerName = localStorage.getItem("playerName") || "Player";

  useEffect(() => {
    const code = localStorage.getItem("roomCode") || "DEMO01";
    setRoomCode(code);

    // Simulate players joining
    const mockPlayers: Player[] = [
      { id: "1", name: playerName, status: "ready" },
      { id: "2", name: "Alex", status: "connected" },
      { id: "3", name: "Sarah", status: "ready" },
      { id: "4", name: "Mike", status: "connected" },
    ];
    setPlayers(mockPlayers);

    // Auto-start after 3 seconds (simulating game start)
    const timer = setTimeout(() => {
      navigate("/quiz");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, playerName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-4xl mx-auto py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center shadow-custom-lg">
              <GamepadIcon className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Waiting Room</h1>
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground">Room Code:</span>
              <Badge className="text-2xl font-mono px-4 py-2 bg-gradient-primary">
                {roomCode}
              </Badge>
            </div>
          </div>
        </div>

        <Card className="shadow-custom-lg border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-6 h-6 text-primary" />
                Connected Players
              </div>
              <Badge variant="secondary" className="text-lg">
                {players.length} Players
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border-2 border-border hover:border-primary transition-colors animate-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-lg">{player.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {player.status === "ready" ? (
                      <Badge className="bg-gradient-success">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Ready
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        Waiting
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-accent-foreground shadow-custom-accent border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold">Game Starting Soon!</h3>
                <p className="opacity-90">Waiting for all players to be ready...</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/")}
        >
          Leave Room
        </Button>
      </div>
    </div>
  );
};

export default Lobby;
