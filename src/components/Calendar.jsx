import { useState } from "react";
import useTaskStore from "../stores/useTaskStore";

export default function Calendar() {
  const { isCalendarOpen, selectedDate, toggleCalendar, addTask } =
    useTaskStore();

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    time: "",
    date: selectedDate,
  });

  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("Utilisateur non trouvé");
      return;
    }

    try {
      await addTask({
        ...newTask,
        userId: user.id,
      });

      setNewTask({
        title: "",
        description: "",
        time: "",
        date: selectedDate,
      });

      toggleCalendar();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche:", error);
    }
  };

  const handleClose = () => {
    toggleCalendar();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 ${
        isCalendarOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-4 max-w-md mx-auto mt-20">
        <button
          onClick={handleClose}
          className="float-right text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Nouvelle tâche</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titre
            </label>
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full mb-2 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Heure
            </label>
            <input
              type="time"
              value={newTask.time}
              onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Ajouter la tâche
          </button>
        </form>
      </div>
    </div>
  );
}
