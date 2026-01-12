import type { Task } from '../types';

export interface NotificationData {
  type: 'task_assigned' | 'task_updated' | 'task_completed' | 'task_overdue';
  taskId: string;
  taskTitle: string;
  projectName?: string;
  assignedUsers: string[];
  createdBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
}

export interface Notification {
  type: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  userId: string;
  relatedId?: string;
}

export function generateTaskNotifications(
  data: NotificationData,
  currentUserId: string
): Notification[] {
  const notifications: Notification[] = [];

  switch (data.type) {
    case 'task_assigned':
      data.assignedUsers.forEach(userId => {
        if (userId !== currentUserId) {
          notifications.push({
            type: 'task_assigned',
            title: 'New Task Assigned',
            message: `You have been assigned to "${data.taskTitle}"${data.projectName ? ` in ${data.projectName}` : ''}`,
            priority: data.priority === 'urgent' ? 'high' : data.priority === 'high' ? 'medium' : 'low',
            userId,
            relatedId: data.taskId
          });
        }
      });
      break;

    case 'task_updated':
      data.assignedUsers.forEach(userId => {
        if (userId !== currentUserId) {
          notifications.push({
            type: 'task_updated',
            title: 'Task Updated',
            message: `"${data.taskTitle}" has been updated`,
            priority: 'low',
            userId,
            relatedId: data.taskId
          });
        }
      });
      break;

    case 'task_completed':
      if (data.createdBy !== currentUserId) {
        notifications.push({
          type: 'task_completed',
          title: 'Task Completed',
          message: `"${data.taskTitle}" has been marked as completed`,
          priority: 'low',
          userId: data.createdBy,
          relatedId: data.taskId
        });
      }
      break;

    case 'task_overdue':
      data.assignedUsers.forEach(userId => {
        notifications.push({
          type: 'task_overdue',
          title: 'Task Overdue',
          message: `"${data.taskTitle}" is now overdue`,
          priority: 'high',
          userId,
          relatedId: data.taskId
        });
      });
      break;
  }

  return notifications;
}

export function checkOverdueTasks(tasks: Task[]): NotificationData[] {
  const now = new Date();
  const overdueNotifications: NotificationData[] = [];

  tasks.forEach(task => {
    if (task.dueDate && task.status !== 'completed') {
      const dueDate = new Date(task.dueDate);
      if (dueDate < now) {
        overdueNotifications.push({
          type: 'task_overdue',
          taskId: task.id,
          taskTitle: task.title,
          projectName: task.projectName,
          assignedUsers: task.assignedTo,
          createdBy: task.createdBy,
          priority: task.priority,
          dueDate: task.dueDate
        });
      }
    }
  });

  return overdueNotifications;
}
