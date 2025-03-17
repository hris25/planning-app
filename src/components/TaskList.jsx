import { useState } from "react";
import useTaskStore from "../stores/useTaskStore";

export default function TaskList() {
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, deleteTask, updateTask, toggleTaskStatus } = useTaskStore();

  const handleEdit = (task) => {
    setEditingTask({
      ...task,
      date: task.date.split("T")[0], // Formatage de la date pour l'input
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(editingTask.id, editingTask);
    setEditingTask(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Liste des tâches</h2>

      {/* Formulaire d'édition */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Modifier la tâche</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                className="w-full mb-2 p-2 border rounded"
              />
              <textarea
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="date"
                value={editingTask.date}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, date: e.target.value })
                }
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="time"
                value={editingTask.time}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, time: e.target.value })
                }
                className="w-full mb-2 p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Liste des tâches */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.status === "COMPLETED"}
                onChange={() => toggleTaskStatus(task.id)}
                className="w-5 h-5 rounded"
              />
              <div
                className={
                  task.status === "COMPLETED"
                    ? "line-through text-gray-500"
                    : ""
                }
              >
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(task.date).toLocaleDateString()} à {task.time}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(task)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                ✏️
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
