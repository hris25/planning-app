import useTaskStore from "../stores/useTaskStore";

export default function Calendar() {
  const { isCalendarOpen, newTask, setNewTask, addTask } = useTaskStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.title && newTask.date) {
      addTask({
        ...newTask,
        id: Date.now(),
        createdAt: new Date(),
      });
    }
  };

  if (!isCalendarOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Nouvelle Tâche</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Titre de la tâche"
            className="w-full mb-2 p-2 border rounded"
            value={newTask.title}
            onChange={(e) => setNewTask({ title: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full mb-2 p-2 border rounded"
            value={newTask.description}
            onChange={(e) => setNewTask({ description: e.target.value })}
          />

          <input
            type="date"
            className="w-full mb-2 p-2 border rounded"
            value={newTask.date || ""}
            onChange={(e) => setNewTask({ date: e.target.value })}
          />

          <input
            type="time"
            className="w-full mb-2 p-2 border rounded"
            value={newTask.time || ""}
            onChange={(e) => setNewTask({ time: e.target.value })}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => useTaskStore.getState().toggleCalendar()}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
