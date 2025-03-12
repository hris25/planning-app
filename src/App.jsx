import { useEffect, useState } from "react";
import useTaskStore from "./stores/useTaskStore";

function App() {
  const [user, setUser] = useState(null);
  const toggleCalendar = useTaskStore((state) => state.toggleCalendar);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      // Configuration basique
      tg.MainButton.setText("NOUVELLE TÂCHE");
      tg.MainButton.show();

      // Récupération de l'utilisateur
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-blue-600">
        {user ? `Bonjour ${user.first_name}!` : "Chargement..."}
      </h1>
      <p className="mt-4">Votre application de planning personnel</p>
    </div>
  );
}

export default App;
