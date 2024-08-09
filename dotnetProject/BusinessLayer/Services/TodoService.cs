using DataLayer;
using DataLayer.Models;

namespace BusinessLayer.Services
{
    public class TodoService : ITodoService
    {
        private readonly DataContext _dataContext;
        public TodoService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public Todo AddTodo(string name, string description)
        {
            var entity = new Todo(name, description);
            _dataContext.Todos.Add(entity);
            _dataContext.SaveChanges();
            return entity;
        }

        public IEnumerable<Todo> GetTodo()
        {
            return _dataContext.Todos.ToList();
        }

        public Todo GetTodo(Guid id)
        {
            var todo = _dataContext.Todos.Find(id);
            return todo ?? throw new KeyNotFoundException($"Todo with id {id} not found");

        }

        public void RemoveTodo(Guid id)
        {
            var todo = _dataContext.Todos.Find(id);
            if (todo != null)
            {
                _dataContext.Todos.Remove(todo);
                _dataContext.SaveChanges();
            }
        }

        public Todo UpdateTodo(Guid id, string name, string description)
        {
            var todo = _dataContext.Todos.Find(id);
            if (todo != null)
            {
                todo.Name = name;
                todo.Description = description;
                _dataContext.SaveChanges();
                return todo;
            }
            throw new KeyNotFoundException($"Todo with id {id} not found");
        }
    }
}