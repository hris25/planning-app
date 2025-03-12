import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [debugInfo, setDebugInfo] = useState(""); // Stocker les logs

  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.expand(); // Étendre la mini-app

      let debugText = "Telegram WebApp trouvé ✅\n";

      if (tg.initDataUnsafe) {
        debugText += `initDataUnsafe : ${JSON.stringify(
          tg.initDataUnsafe,
          null,
          2
        )}\n`;

        if (tg.initDataUnsafe.user) {
          setUser(tg.initDataUnsafe.user);
        } else {
          debugText += "❌ Pas de données utilisateur !";
        }
      } else {
        debugText += "❌ initDataUnsafe est vide !";
      }

      setDebugInfo(debugText); // Afficher les logs sur la page
    } else {
      setDebugInfo("❌ window.Telegram non défini !");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
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

      <div className="mt-4 bg-gray-200 p-2 rounded">
        <h2 className="text-lg font-bold">Debug Info 🛠️</h2>
        <pre className="text-xs text-left">{debugInfo}</pre>
      </div>
    </div>
  );
}

export default App;
