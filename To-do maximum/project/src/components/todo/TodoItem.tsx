import { useState } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, Check, X, Calendar as CalendarIcon } from 'lucide-react';
import { Todo } from '../../types/todo';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (title: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const handleUpdate = () => {
    if (editValue.trim()) {
      onUpdate(editValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="group flex items-center gap-2 p-4 bg-white rounded-lg shadow-md transition-all hover:shadow-lg">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUpdate();
              if (e.key === 'Escape') handleCancel();
            }}
            className="flex-1"
          />
          <Button onClick={handleUpdate} variant="secondary">
            <Check size={16} />
          </Button>
          <Button onClick={handleCancel} variant="danger">
            <X size={16} />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-1">
            <span
              className={`block transition-all ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-700'
              }`}
            >
              {todo.title}
            </span>
            {todo.dueDate && (
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon size={14} className="mr-1" />
                {format(new Date(todo.dueDate), 'MMM d, yyyy')}
              </div>
            )}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <Pencil size={16} />
            </Button>
            <Button variant="danger" onClick={onDelete}>
              <Trash2 size={16} />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}