import Link from "next/link";
import { BookOpen, Settings, Star, Heart } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 relative z-10">
      <div className="z-10 w-full max-w-4xl px-5 xl:px-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <span className="text-4xl">📚</span>
          </div>
          <h1
            className="animate-fade-up bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            Alphi
          </h1>
          <p
            className="mt-6 animate-fade-up text-center text-gray-600 opacity-0 [text-wrap:balance] md:text-xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Application éducative française pour les enfants du Québec
          </p>
          <p
            className="mt-3 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance]"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            Apprenez la classification des mots à travers la poésie
          </p>
        </div>
        
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 animate-fade-up opacity-0"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link 
            href="/jeu"
            className="group bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white transition-transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <Star className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Jouer</h2>
                <p className="text-blue-100">Interface enfant</p>
              </div>
            </div>
            <p className="text-blue-100 mb-4">
              Commence ton aventure avec les mots ! Explore la poésie et apprends 
              la grammaire de façon amusante.
            </p>
            <div className="flex items-center text-sm text-blue-100">
              <Heart className="w-4 h-4 mr-2" />
              4 étapes éducatives
            </div>
          </Link>

          <Link 
            href="/admin"
            className="group bg-gradient-to-br from-gray-700 to-gray-900 p-8 rounded-2xl text-white transition-transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <Settings className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Administration</h2>
                <p className="text-gray-300">Interface éducateur</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Gérez les utilisateurs, le contenu éducatif et suivez les progrès 
              des élèves dans leur apprentissage.
            </p>
            <div className="flex items-center text-sm text-gray-300">
              <BookOpen className="w-4 h-4 mr-2" />
              Tableau de bord complet
            </div>
          </Link>
        </div>
      </div>

      <div 
        className="my-16 w-full max-w-4xl animate-fade-up opacity-0"
        style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Comment ça marche ?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                {index + 1}
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      </main>
    </>
  );
}

const steps = [
  {
    title: "Choisis une image",
    description: "Sélectionne une image qui représente un vers de poème"
  },
  {
    title: "Classe les mots",
    description: "Attribue la bonne classe grammaticale à chaque mot en gras"
  },
  {
    title: "Trouve les lettres",
    description: "Découvre les lettres associées aux couleurs des classes"
  },
  {
    title: "Détermine le genre",
    description: "Trouve si le mot découvert est masculin ou féminin"
  }
];
