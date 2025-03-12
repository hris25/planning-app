import { create } from "zustand";
import prisma from "../lib/prisma";

const useTaskStore = create((set, get) => ({
  tasks: [],
  selectedDate: new Date(),
  isCalendarOpen: false,

  // Actions
  setSelectedDate: (date) => set({ selectedDate: date }),
  toggleCalendar: () =>
    set((state) => ({ isCalendarOpen: !state.isCalendarOpen })),

  // Gestion des utilisateurs
  createOrUpdateUser: async (telegramUser) => {
    const user = await prisma.user.upsert({
      where: { telegramId: telegramUser.id.toString() },
      update: {
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name || null,
        username: telegramUser.username || null,
      },
      create: {
        telegramId: telegramUser.id.toString(),
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name || null,
        username: telegramUser.username || null,
      },
    });
    return user;
  },

  // Gestion des tâches
  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }));
  },

  toggleTaskStatus: async (taskId) => {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
      },
    });
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? task : t)),
    }));
  },

  fetchUserTasks: async (userId) => {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { date: "asc" },
    });
    set({ tasks });
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
}));

export default useTaskStore;
