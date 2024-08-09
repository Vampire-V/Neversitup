using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class TodoRequest
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
}