import useTaskStore from "../stores/useTaskStore";

export default function QuickStats() {
  const todayTasks = useTaskStore((state) => state.getTodayTasks());
  const completedTasks = useTaskStore((state) => state.getCompletedTasks());

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Aperçu rapide</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">Tâches aujourd'hui</p>
          <p className="text-xl font-bold text-blue-900">{todayTasks.length}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-800">Tâches complétées</p>
          <p className="text-xl font-bold text-green-900">
            {completedTasks.length}
          </p>
        </div>
      </div>
    </div>
  );
}
