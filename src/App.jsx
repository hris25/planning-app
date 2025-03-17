import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import DailyTip from "./components/DailyTip";
import FeatureGrid from "./components/FeatureGrid";
import { features } from "./components/features";
import Header from "./components/Header";
import QuickStats from "./components/QuickStats";
import TaskList from "./components/TaskList";
import useTaskStore from "./stores/useTaskStore";

function HomeView() {
  const setView = useTaskStore((state) => state.setView);

  return (
    <div className="p-4 mt-4">
      <QuickStats />
      <button
        onClick={() => setView("tasks")}
        className="w-full mb-6 bg-blue-500 text-white py-3 px-4 rounded-xl shadow-sm hover:bg-blue-600 transition-colors"
      >
        Voir la liste des tâches
      </button>
      <FeatureGrid features={features} />
      <DailyTip />
    </div>
  );
}

function TasksView() {
  const setView = useTaskStore((state) => state.setView);

  return (
    <div className="p-4 mt-4">
      <button
        onClick={() => setView("home")}
        className="mb-4 flex items-center text-blue-500"
      >
        <span className="mr-2">←</span> Retour
      </button>
      <TaskList />
    </div>
  );
}

function App() {
  const currentView = useTaskStore((state) => state.currentView);
  const toggleCalendar = useTaskStore((state) => state.toggleCalendar);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      // Configuration du bouton principal
      tg.MainButton.setText("NOUVELLE TÂCHE");
      tg.MainButton.show();
      tg.MainButton.onClick(toggleCalendar);

      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }

    // Nettoyage
    return () => {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.MainButton.offClick(toggleCalendar);
      }
    };
  }, [toggleCalendar]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      {currentView === "home" ? <HomeView /> : <TasksView />}
      <Calendar />
    </div>
  );
}

export default App;
