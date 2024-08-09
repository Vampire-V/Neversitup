using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class NeversitupTestController : ControllerBase
{
    public NeversitupTestController()
    {

    }
    [HttpGet("permutations", Name = nameof(Permutations))]
    [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)]
    public IActionResult Permutations(string input)
    {
        List<string> response = new List<string>() { input };

        int start = input.Count() - 1;
        int max = input.Count();
        for (int i = start; i > 0; i--)
        {
            max = max * i;
        }
        char[] s = input.ToCharArray();
        int count = s.Count();
        char temp;
        for (int a = 0; a < max; a++)
        {
            for (int i = 0; i < count; i++)
            {
                temp = s[i];
                s[i] = s[count - 1];
                s[count - 1] = temp;
                string strToCheck = string.Join("", s);
                if (!response.Exists(t => t == strToCheck))
                {
                    response.Add(strToCheck);
                }
            }
        }


        return Ok(response.OrderBy(x => x).ToList());
    }

    [HttpGet("countSmileys", Name = nameof(CountSmileys))]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    public IActionResult CountSmileys([FromQuery] string[] smileys)
    {
        int result = smileys.Count(smiley => smiley.Contains(")") || smiley.Contains("D"));
        return Ok(result);
    }

    [HttpGet("find-odd-int", Name = nameof(FindOddInt))]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    public IActionResult FindOddInt([FromQuery] int[] inputs)
    {
        int result = inputs.GroupBy(x => x).Where(x => x.Count() % 2 != 0).Select(x => x.Key).FirstOrDefault();
        return Ok(result);
    }
}