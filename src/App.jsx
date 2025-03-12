import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialisation de la Mini App
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // Indique que l'app est prête
      tg.expand(); // Étend la vue

      if (tg) {
        // Définir les couleurs du thème
        tg.setHeaderColor("#000000");
        tg.setBackgroundColor("#FFFFFF");

        tg.MainButton.setText("VALIDER");
        tg.MainButton.show();
        tg.MainButton.onClick(() => {
          // Action lors du clic
          console.log("Button clicked!");
        });
      }
      // Récupération des données utilisateur
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ma Mini App Telegram</h1>
      {user ? (
        <div>
          <p>Bonjour {user.first_name}!</p>
          <p>ID: {user.id}</p>
          {user.username && <p>Username: @{user.username}</p>}
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default App;
