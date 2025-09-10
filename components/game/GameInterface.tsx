"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Heart, Star } from "lucide-react";

interface WordClass {
  name: string;
  color: string;
  letter: string;
}

interface Word {
  text: string;
  class: string;
  highlighted: boolean;
}

interface Poem {
  id: number;
  verse: string;
  image: string;
  words: Word[];
}

// Sample data - in a real app this would come from the database
const wordClasses: WordClass[] = [
  { name: "nom commun", color: "bg-red-500", letter: "A" },
  { name: "verbe", color: "bg-blue-500", letter: "B" },
  { name: "adjectif", color: "bg-green-500", letter: "C" },
  { name: "adverbe", color: "bg-yellow-500", letter: "D" },
  { name: "déterminant défini", color: "bg-purple-500", letter: "E" },
  { name: "déterminant possessif", color: "bg-pink-500", letter: "F" },
  { name: "préposition", color: "bg-orange-500", letter: "G" },
  { name: "nom propre", color: "bg-indigo-500", letter: "H" },
];

const samplePoems: Poem[] = [
  {
    id: 1,
    verse: "Demain, l'hiver viendra poser sa main froide sur nos rêves.",
    image: "/api/placeholder/300/200",
    words: [
      { text: "Demain", class: "adverbe", highlighted: true },
      { text: "l'", class: "déterminant défini", highlighted: true },
      { text: "hiver", class: "nom commun", highlighted: false },
      { text: "viendra", class: "verbe", highlighted: true },
      { text: "poser", class: "verbe", highlighted: false },
      { text: "sa", class: "déterminant possessif", highlighted: true },
      { text: "main", class: "nom commun", highlighted: false },
      { text: "froide", class: "adjectif", highlighted: true },
      { text: "sur", class: "préposition", highlighted: true },
      { text: "nos", class: "déterminant possessif", highlighted: false },
      { text: "rêves", class: "nom commun", highlighted: true },
    ]
  },
  {
    id: 2,
    verse: "Les oiseaux chantent doucement dans le jardin fleuri.",
    image: "/api/placeholder/300/200",
    words: [
      { text: "Les", class: "déterminant défini", highlighted: true },
      { text: "oiseaux", class: "nom commun", highlighted: true },
      { text: "chantent", class: "verbe", highlighted: true },
      { text: "doucement", class: "adverbe", highlighted: true },
      { text: "dans", class: "préposition", highlighted: true },
      { text: "le", class: "déterminant défini", highlighted: false },
      { text: "jardin", class: "nom commun", highlighted: true },
      { text: "fleuri", class: "adjectif", highlighted: true },
    ]
  },
];

export default function GameInterface() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [wordClassifications, setWordClassifications] = useState<{[key: string]: string}>({});
  const [discoveredWord, setDiscoveredWord] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectPoem = (poem: Poem) => {
    setSelectedPoem(poem);
    nextStep();
  };

  const classifyWord = (word: string, classification: string) => {
    setWordClassifications(prev => ({
      ...prev,
      [word]: classification
    }));
  };

  const calculateDiscoveredWord = () => {
    if (!selectedPoem) return;
    
    const highlightedWords = selectedPoem.words.filter(w => w.highlighted);
    let letters = "";
    
    highlightedWords.forEach(word => {
      const classification = wordClassifications[word.text];
      const wordClass = wordClasses.find(wc => wc.name === classification);
      if (wordClass) {
        letters += wordClass.letter;
      }
    });
    
    setDiscoveredWord(letters);
    nextStep();
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-white">Alphi</h1>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-white font-semibold">Étape {currentStep}/4</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(hearts)].map((_, i) => (
              <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
            ))}
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <span className="text-white font-semibold flex items-center">
              <Star className="w-5 h-5 mr-1" />
              {score}
            </span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto">
        {currentStep === 1 && <StepOne poems={samplePoems} onSelectPoem={selectPoem} />}
        {currentStep === 2 && selectedPoem && (
          <StepTwo 
            poem={selectedPoem} 
            wordClasses={wordClasses}
            wordClassifications={wordClassifications}
            onClassifyWord={classifyWord}
            onNext={nextStep}
          />
        )}
        {currentStep === 3 && (
          <StepThree 
            wordClassifications={wordClassifications}
            wordClasses={wordClasses}
            selectedPoem={selectedPoem}
            onCalculate={calculateDiscoveredWord}
          />
        )}
        {currentStep === 4 && (
          <StepFour 
            discoveredWord={discoveredWord}
            selectedGender={selectedGender}
            onSelectGender={setSelectedGender}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full flex items-center transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Précédent
          </button>
        )}
        {currentStep < 4 && currentStep !== 1 && (
          <button
            onClick={nextStep}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full flex items-center transition-all"
          >
            Suivant
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}

function StepOne({ poems, onSelectPoem }: { poems: Poem[], onSelectPoem: (poem: Poem) => void }) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white mb-4">Choisis une image</h2>
      <p className="text-xl text-white/80 mb-8">Chaque image représente un vers d'un poème</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {poems.map((poem) => (
          <button
            key={poem.id}
            onClick={() => onSelectPoem(poem)}
            className="bg-white rounded-2xl p-6 hover:scale-105 transition-transform shadow-lg"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-6xl">🌟</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">{poem.verse}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepTwo({ 
  poem, 
  wordClasses, 
  wordClassifications, 
  onClassifyWord, 
  onNext 
}: { 
  poem: Poem, 
  wordClasses: WordClass[], 
  wordClassifications: {[key: string]: string},
  onClassifyWord: (word: string, classification: string) => void,
  onNext: () => void
}) {
  const highlightedWords = poem.words.filter(w => w.highlighted);
  const allClassified = highlightedWords.every(word => wordClassifications[word.text]);

  return (
    <div>
      <h2 className="text-4xl font-bold text-white mb-4 text-center">Classe les mots</h2>
      <p className="text-xl text-white/80 mb-8 text-center">
        Attribue à chaque mot en gras la bonne classe de mot
      </p>

      <div className="bg-white rounded-2xl p-8 mb-8">
        <div className="text-2xl leading-relaxed">
          {poem.words.map((word, index) => (
            <span
              key={index}
              className={`${word.highlighted ? 'font-bold bg-yellow-200 px-1 rounded' : ''} mr-2`}
            >
              {word.text}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Mots à classer</h3>
          <div className="space-y-2">
            {highlightedWords.map((word, index) => (
              <div key={index} className="bg-white rounded-lg p-3 flex justify-between items-center">
                <span className="font-bold text-gray-800">{word.text}</span>
                <select
                  value={wordClassifications[word.text] || ""}
                  onChange={(e) => onClassifyWord(word.text, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Choisir...</option>
                  {wordClasses.map((wc, i) => (
                    <option key={i} value={wc.name}>{wc.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Classes de mots</h3>
          <div className="grid grid-cols-2 gap-2">
            {wordClasses.map((wc, index) => (
              <div key={index} className={`${wc.color} rounded-lg p-3 text-white text-center font-semibold`}>
                {wc.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {allClassified && (
        <div className="text-center mt-8">
          <button
            onClick={onNext}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-xl font-bold transition-all"
          >
            Continuer vers l'étape 3
          </button>
        </div>
      )}
    </div>
  );
}

function StepThree({ 
  wordClassifications, 
  wordClasses, 
  selectedPoem,
  onCalculate 
}: { 
  wordClassifications: {[key: string]: string},
  wordClasses: WordClass[],
  selectedPoem: Poem | null,
  onCalculate: () => void
}) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white mb-4">Trouve le mot secret</h2>
      <p className="text-xl text-white/80 mb-8">
        Trouve la lettre que représente chaque couleur des classes de mots
      </p>

      <div className="bg-white rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Alphabet des couleurs</h3>
        <div className="grid grid-cols-8 gap-2 mb-6">
          {wordClasses.map((wc, index) => (
            <div key={index} className="text-center">
              <div className={`${wc.color} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-2`}>
                {wc.letter}
              </div>
              <span className="text-sm text-gray-600">{wc.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 rounded-2xl p-6 mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Tes classifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(wordClassifications).map(([word, classification]) => {
            const wordClass = wordClasses.find(wc => wc.name === classification);
            return (
              <div key={word} className="bg-white rounded-lg p-3 text-center">
                <div className="font-bold text-gray-800">{word}</div>
                <div className={`${wordClass?.color} text-white font-bold rounded mt-2 p-2`}>
                  {classification} = {wordClass?.letter}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onCalculate}
        className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-bold transition-all"
      >
        Calculer le mot secret
      </button>
    </div>
  );
}

function StepFour({ 
  discoveredWord, 
  selectedGender, 
  onSelectGender 
}: { 
  discoveredWord: string,
  selectedGender: string,
  onSelectGender: (gender: string) => void
}) {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-white mb-4">Trouve le genre</h2>
      <p className="text-xl text-white/80 mb-8">
        Détermine le genre du mot que tu as trouvé
      </p>

      <div className="bg-white rounded-2xl p-8 mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Le mot découvert est :</h3>
        <div className="text-6xl font-bold text-purple-600 mb-8 tracking-widest">
          {discoveredWord}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
        <button
          onClick={() => onSelectGender("un")}
          className={`p-8 rounded-2xl text-2xl font-bold transition-all ${
            selectedGender === "un" 
              ? "bg-blue-500 text-white scale-105" 
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          UN {discoveredWord}
        </button>
        <button
          onClick={() => onSelectGender("une")}
          className={`p-8 rounded-2xl text-2xl font-bold transition-all ${
            selectedGender === "une" 
              ? "bg-pink-500 text-white scale-105" 
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          UNE {discoveredWord}
        </button>
      </div>

      {selectedGender && (
        <div className="mt-8">
          <div className="bg-green-500 text-white p-6 rounded-2xl inline-block">
            <h3 className="text-2xl font-bold mb-2">Félicitations ! 🎉</h3>
            <p className="text-xl">Tu as terminé l'activité avec succès !</p>
          </div>
        </div>
      )}
    </div>
  );
}