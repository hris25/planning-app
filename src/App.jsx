import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const tg = window.Telegram?.WebApp;

  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      if (tg) {
        tg.setHeaderColor("#1a237e"); // Bleu foncé professionnel
        tg.setBackgroundColor("#f5f5f5"); // Gris très clair pour le fond

        // Configuration du bouton principal
        tg.MainButton.setText("NOUVELLE TÂCHE");
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
          // Action pour ajouter une nouvelle tâche
          tg.showPopup({
            title: "Bientôt disponible",
            message: "La création de tâches sera disponible prochainement!",
            buttons: [{ text: "OK" }],
          });
        });
      }

      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  const features = [
    {
      icon: "📅",
      title: "Emploi du temps",
      description: "Gérez votre planning quotidien",
    },
    {
      icon: "⏰",
      title: "Rappels",
      description: "Ne manquez plus vos rendez-vous",
    },
    {
      icon: "✅",
      title: "Tâches",
      description: "Organisez vos tâches facilement",
    },
    {
      icon: "🎯",
      title: "Objectifs",
      description: "Suivez vos objectifs personnels",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête avec accueil personnalisé */}
      <div className="bg-blue-900 text-white p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2">
          {user ? `Bonjour ${user.first_name} 👋` : "Bienvenue !"}
        </h1>
        <p className="text-blue-100 text-sm">
          Votre assistant personnel pour une meilleure organisation
        </p>
      </div>

      {/* Section des statistiques rapides */}
      <div className="p-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3">Aperçu rapide</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">Tâches aujourd'hui</p>
              <p className="text-xl font-bold text-blue-900">0</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">Tâches complétées</p>
              <p className="text-xl font-bold text-green-900">0</p>
            </div>
          </div>
        </div>

        {/* Grille des fonctionnalités */}
        <h2 className="text-lg font-semibold mb-3">Fonctionnalités</h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Section d'aide rapide */}
        <div className="mt-6 bg-blue-50 p-4 rounded-xl">
          <h2 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Conseil du jour
          </h2>
          <p className="text-sm text-blue-800">
            Commencez par ajouter votre première tâche en utilisant le bouton
            ci-dessous !
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
