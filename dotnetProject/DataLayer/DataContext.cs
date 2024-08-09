using DataLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataLayer;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }

    public DbSet<Todo> Todos { get; set; }
}
