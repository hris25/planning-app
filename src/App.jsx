import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.expand(); // Étend la mini-app en plein écran

      // Récupérer les infos de l'utilisateur
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Mini-App Telegram</h1>
      {user ? (
        <div className="mt-4 text-center">
          <p>
            👋 Bonjour, {user.first_name} {user.last_name || ""} !
          </p>
          <p>Votre ID Telegram : {user.id}</p>
          {user.username && <p>🔹 Pseudo : @{user.username}</p>}
        </div>
      ) : (
        <p>Chargement des données utilisateur...</p>
      )}
    </div>
  );
}

export default App;
