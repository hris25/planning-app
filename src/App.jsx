import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    if (window.Telegram) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Mini-App Telegram</h1>
      <p className="bg-blue-500 h-10 w-10 ">
        Bienvenue dans ton gestionnaire de tâches 📅
      </p>
    </div>
  );
};

export default App;
