import { useEffect, useState } from "react";
import DailyTip from "./components/DailyTip";
import FeatureGrid from "./components/FeatureGrid";
import { features } from "./components/features";
import Header from "./components/Header";
import QuickStats from "./components/QuickStats";
import { useTelegramButton } from "./hooks/useTelegramButton";
import useTaskStore from "./stores/useTaskStore";

function App() {
  const [user, setUser] = useState(null);

  // Utilisation du hook personnalisé
  useTelegramButton({
    text: "NOUVELLE TÂCHE",
    onClick: () => {
      useTaskStore.getState().toggleCalendar();
    },
    color: "#1a237e",
  });

  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      if (tg) {
        tg.setHeaderColor("#1a237e"); // Bleu foncé professionnel
        tg.setBackgroundColor("#f5f5f5"); // Gris très clair pour le fond
      }

      if (tg.initDataUnsafe?.user) {
        const telegramUser = tg.initDataUnsafe.user;
        // Créer ou mettre à jour l'utilisateur dans la base de données
        useTaskStore
          .getState()
          .createOrUpdateUser(telegramUser)
          .then((dbUser) => {
            setUser(dbUser);
            // Charger les tâches de l'utilisateur
            useTaskStore.getState().fetchUserTasks(dbUser.id);
          });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <div className="p-4 mt-4">
        <QuickStats />
        <FeatureGrid features={features} />
        <DailyTip />
      </div>
    </div>
  );
}

export default App;
