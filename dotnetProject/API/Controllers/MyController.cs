using API.Models;
using BusinessLayer.Services;
using DataLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class MyController : ControllerBase
{
    private readonly ITodoService _todoService;
    public MyController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet("get", Name = nameof(Get))]
    [ProducesResponseType(typeof(IEnumerable<Todo>), StatusCodes.Status200OK)]
    public IActionResult Get()
    {
        IEnumerable<Todo> items = _todoService.GetTodo();
        return Ok(items);
    }

    [HttpPost("add", Name = nameof(Add))]
    [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
    public IActionResult Add([FromBody] TodoRequest item)
    {
        var data = _todoService.AddTodo(item.Name, item.Description);
        return Ok(data);
    }

    [HttpPut("update/{id}", Name = nameof(Update))]
    [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
    public IActionResult Update(Guid id, [FromBody] TodoRequest item)
    {
        var data = _todoService.UpdateTodo(id, item.Name, item.Description);
        return Ok(data);
    }

    [HttpDelete("delete/{id}", Name = nameof(Delete))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult Delete(Guid id)
    {
        _todoService.RemoveTodo(id);
        return Ok();
    }

    [HttpGet("get/{id}", Name = nameof(GetById))]
    [ProducesResponseType(typeof(Todo), StatusCodes.Status200OK)]
    public IActionResult GetById(Guid id)
    {
        var data = _todoService.GetTodo(id);
        return Ok(data);
    }

}
