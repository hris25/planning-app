import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      selectedDate: new Date(),
      isCalendarOpen: false,

      // Actions
      setSelectedDate: (date) => set({ selectedDate: date }),
      toggleCalendar: () =>
        set((state) => ({ isCalendarOpen: !state.isCalendarOpen })),

      addTask: (task) => {
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now(),
              status: "PENDING",
            },
          ],
        }));
      },

      toggleTaskStatus: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
                }
              : task
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },

      // Statistiques
      getTodayTasks: () => {
        const state = get();
        const today = new Date().toDateString();
        return state.tasks.filter(
          (task) => new Date(task.date).toDateString() === today
        );
      },

      getCompletedTasks: () => {
        return get().tasks.filter((task) => task.status === "COMPLETED");
      },
    }),
    {
      name: "task-storage", // nom unique pour le localStorage
    }
  )
);

export default useTaskStore;
