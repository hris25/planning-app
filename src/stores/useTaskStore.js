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
  addTask: async (taskData) => {
    const newTask = await prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        date: new Date(taskData.date),
        time: new Date(taskData.time),
        userId: taskData.userId,
      },
    });
    set((state) => ({ tasks: [...state.tasks, newTask] }));
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
    const { tasks } = get();
    const today = new Date();
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === today.toDateString();
    });
  },

  getCompletedTasks: () => {
    const { tasks } = get();
    return tasks.filter((task) => task.status === "COMPLETED");
  },
}));

export default useTaskStore;
