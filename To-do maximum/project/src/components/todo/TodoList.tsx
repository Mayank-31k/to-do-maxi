import { useState } from 'react';
import { Plus, ListTodo, CheckCircle2, Calendar as CalendarIcon } from 'lucide-react';
import { useTodoStore } from '../../store/todoStore';
import { useAuthStore } from '../../store/authStore';
import { TodoItem } from './TodoItem';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Calendar } from '../calendar/Calendar';

export function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const { todos, addTodo, removeTodo, toggleTodo, updateTodo } = useTodoStore();
  const user = useAuthStore((state) => state.user);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && user) {
      addTodo({
        id: Date.now().toString(),
        title: newTodo,
        completed: false,
        createdAt: new Date(),
        dueDate: dueDate ? new Date(dueDate) : undefined,
        userId: user.id,
      });
      setNewTodo('');
      setDueDate('');
    }
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleAddTodo} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1"
            />
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-40"
            />
            <Button type="submit">
              <Plus size={20} className="mr-2" />
              Add Task
            </Button>
          </div>
        </form>
      </div>

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() => setShowCalendar(!showCalendar)}
          className="mb-4"
        >
          <CalendarIcon size={20} className="mr-2" />
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </Button>
      </div>

      {showCalendar && <Calendar />}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <ListTodo size={20} />
            <h2 className="text-lg font-semibold">Pending Tasks ({pendingTodos.length})</h2>
          </div>
          <div className="space-y-2">
            {pendingTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => removeTodo(todo.id)}
                onUpdate={(title) => updateTodo(todo.id, title)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle2 size={20} />
            <h2 className="text-lg font-semibold">Completed Tasks ({completedTodos.length})</h2>
          </div>
          <div className="space-y-2">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => removeTodo(todo.id)}
                onUpdate={(title) => updateTodo(todo.id, title)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}