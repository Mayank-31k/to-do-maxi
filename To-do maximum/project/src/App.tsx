import { useAuthStore } from './store/authStore';
import { AuthForm } from './components/auth/AuthForm';
import { TodoList } from './components/todo/TodoList';
import { Button } from './components/ui/Button';
import { LogOut, CheckCircle2 } from 'lucide-react';

function App() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        {isAuthenticated && user ? (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    Welcome to Your Todos
                  </h1>
                  <p className="text-gray-600">
                    Hello, {user.name}! Ready to be productive today?
                  </p>
                </div>
                <Button variant="secondary" onClick={logout}>
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
            <TodoList />
          </div>
        ) : (
          <div className="max-w-md mx-auto mt-20">
            <div className="text-center mb-8 space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 size={48} className="text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to manage your tasks and stay organized
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <AuthForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;