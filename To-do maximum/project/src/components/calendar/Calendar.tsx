import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTodoStore } from '../../store/todoStore';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const todos = useTodoStore((state) => state.todos);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getTodosForDate = (date: Date) => {
    return todos.filter(
      (todo) => todo.dueDate && isSameDay(new Date(todo.dueDate), date)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={prevMonth}>
            <ChevronLeft size={20} />
          </Button>
          <Button variant="secondary" onClick={nextMonth}>
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-gray-500 text-sm py-2"
          >
            {day}
          </div>
        ))}

        {daysInMonth.map((date) => {
          const todosForDate = getTodosForDate(date);
          const isCurrentMonth = isSameMonth(date, currentDate);
          
          return (
            <div
              key={date.toString()}
              className={`
                min-h-[80px] p-2 border rounded-lg transition-colors
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                ${todosForDate.length > 0 ? 'border-blue-200' : 'border-gray-200'}
              `}
            >
              <div className="text-sm font-medium text-gray-600">
                {format(date, 'd')}
              </div>
              <div className="mt-1">
                {todosForDate.map((todo) => (
                  <div
                    key={todo.id}
                    className={`
                      text-xs p-1 mb-1 rounded
                      ${
                        todo.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }
                    `}
                  >
                    {todo.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}