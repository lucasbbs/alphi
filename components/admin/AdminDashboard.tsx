"use client";

import { useState } from "react";
import { UserIcon, BookOpenIcon, ChartBarIcon, CogIcon } from "lucide-react";

interface TabProps {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabProps[] = [
  {
    id: "users",
    label: "Utilisateurs",
    icon: <UserIcon className="w-5 h-5" />
  },
  {
    id: "content",
    label: "Contenu",
    icon: <BookOpenIcon className="w-5 h-5" />
  },
  {
    id: "progress",
    label: "Progrès",
    icon: <ChartBarIcon className="w-5 h-5" />
  },
  {
    id: "settings",
    label: "Paramètres",
    icon: <CogIcon className="w-5 h-5" />
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Alphi Admin</h1>
          <p className="text-sm text-gray-600">Administration éducative</p>
        </div>
        
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === tab.id 
                  ? "bg-blue-50 border-r-2 border-blue-500 text-blue-600" 
                  : "text-gray-700"
              }`}
            >
              {tab.icon}
              <span className="ml-3">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "users" && <UsersManagement />}
        {activeTab === "content" && <ContentManagement />}
        {activeTab === "progress" && <ProgressTracking />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
}

function UsersManagement() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Gestion des Utilisateurs</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Ajouter un utilisateur
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  École
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Marie Tremblay
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Enseignante
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  École Primaire Sainte-Anne
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Modifier</button>
                  <button className="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ContentManagement() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Gestion du Contenu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Poèmes</h3>
          <p className="text-gray-600 mb-4">Gérer les poèmes et leurs vers</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Ajouter un poème
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Images</h3>
          <p className="text-gray-600 mb-4">Gérer les images associées aux vers</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Ajouter une image
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Classes de Mots</h3>
          <p className="text-gray-600 mb-4">Configurer les catégories grammaticales</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Modifier les classes
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Couleurs & Lettres</h3>
          <p className="text-gray-600 mb-4">Associer couleurs et lettres aux classes</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Configurer les associations
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressTracking() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Suivi des Progrès</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Élèves Actifs</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">247</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Activités Complétées</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">1,429</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900">Taux de Réussite</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">87%</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Progrès par Classe</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">3e année - Groupe A</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <span className="text-sm text-gray-600">75%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">4e année - Groupe B</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
              <span className="text-sm text-gray-600">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Paramètres</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Configuration Générale</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de l'école
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
              placeholder="École Primaire..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Région
            </label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
              <option>Québec</option>
              <option>Montréal</option>
              <option>Outaouais</option>
              <option>Mauricie</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Activer le mode québécois
              </span>
            </label>
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}