import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import DailyTip from "./components/DailyTip";
import FeatureGrid from "./components/FeatureGrid";
import { features } from "./components/features";
import Header from "./components/Header";
import QuickStats from "./components/QuickStats";
import TaskList from "./components/TaskList";
import useTaskStore from "./stores/useTaskStore";

function App() {
  const [user, setUser] = useState(null);
  const toggleCalendar = useTaskStore((state) => state.toggleCalendar);

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
      <div className="p-4 mt-4">
        <QuickStats />
        <FeatureGrid features={features} />
        <DailyTip />
        <TaskList />
      </div>
      <Calendar />
    </div>
  );
}

export default App;
