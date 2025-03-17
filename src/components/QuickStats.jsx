import useTaskStore from "../stores/useTaskStore";

export default function QuickStats() {
  const tasks = useTaskStore((state) => state.tasks);
  const today = new Date().toDateString();

  const todayCount = tasks.filter(
    (task) => new Date(task.date).toDateString() === today
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const totalCount = tasks.length;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Aperçu rapide</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">Tâches aujourd&apos;hui</p>
          <p className="text-xl font-bold text-blue-900">{todayCount}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-800">Tâches complétées</p>
          <p className="text-xl font-bold text-green-900">{completedCount}</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm text-purple-800">Total des tâches</p>
          <p className="text-xl font-bold text-purple-900">{totalCount}</p>
        </div>
      </div>
    </div>
  );
}
