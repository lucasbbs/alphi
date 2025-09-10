import { Suspense } from "react";
import GameInterface from "@/components/game/GameInterface";

export const metadata = {
  title: "Alphi - Jeu Éducatif",
  description: "Jeu éducatif de classification des mots pour enfants du Québec",
};

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen text-white text-2xl">
          Chargement du jeu...
        </div>
      }>
        <GameInterface />
      </Suspense>
    </div>
  );
}