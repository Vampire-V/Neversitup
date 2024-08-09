using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Xunit;

namespace API.Tests.Controllers
{
    public class NeversitupTestControllerTests
    {
        private readonly NeversitupTestController _controller;

        public NeversitupTestControllerTests()
        {
            _controller = new NeversitupTestController();
        }

        [Fact]
        public void Permutations_ReturnsOkResult_WithListOfPermutations()
        {
            // Arrange
            var input = "abc";
            var expected = new List<string> { "abc", "acb", "bac", "bca", "cab", "cba" }.OrderBy(x => x).ToList();

            // Act
            var result = _controller.Permutations(input);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<List<string>>(okResult.Value);
            Assert.Equal(expected.Count, returnValue.Count);
            Assert.Equal(expected, returnValue);
        }

        [Fact]
        public void CountSmileys_ReturnsOkResult_WithCount()
        {
            // Arrange
            var smileys = new string[] { ":)", ";(", ";}", ":-D" };
            var expected = 2;

            // Act
            var result = _controller.CountSmileys(smileys);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<int>(okResult.Value);
            Assert.Equal(expected, returnValue);
        }

        [Fact]
        public void FindOddInt_ReturnsOkResult_WithOddInt()
        {
            // Arrange
            var inputs = new int[] { 1, 1, 2 };
            var expected = 2;

            // Act
            var result = _controller.FindOddInt(inputs);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<int>(okResult.Value);
            Assert.Equal(expected, returnValue);
        }
    }
}
