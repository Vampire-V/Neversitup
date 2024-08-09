namespace DataLayer.Models;

public class Todo
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public Todo(string name, string description)
    {
        Name = name;
        Description = description;
    }
}