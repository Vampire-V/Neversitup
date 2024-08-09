using DataLayer.Models;

namespace BusinessLayer.Services
{
    public interface ITodoService
    {
        public IEnumerable<Todo> GetTodo();
        public Todo GetTodo(Guid id);
        public Todo AddTodo(string name, string description);
        public void RemoveTodo(Guid id);
        public Todo UpdateTodo(Guid id, string name, string description);
    }
}