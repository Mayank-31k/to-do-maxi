export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}