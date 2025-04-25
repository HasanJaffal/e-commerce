using AutoMapper;
using Backend.Models.DTOs;
using Backend.Models.DTOs.Category;
using Backend.Models.DTOs.Item;
using Backend.Services.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoriesController(ICategoryService service, IMapper mapper)
        {
            _service = service;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto createCategoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdCategory = await _service.CreateCategoryAsync(createCategoryDto);
            return Ok(createdCategory);
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categoryDtos = await _service.GetCategoriesAsync();

            return Ok(categoryDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var categoryDto = await _service.GetCategoryByIdAsync(id);
            if (categoryDto == null)
            {
                return NotFound();
            }
            return Ok(categoryDto);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto updateCategoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var categoryDto = await _service.UpdateCategoryAsync(id, updateCategoryDto);
            return Ok(categoryDto);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _service.DeleteCategoryAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("{name}/Items")]
        public async Task<IActionResult> GetItemsByCategoryName([FromRoute] string name, [FromQuery] QueryRequest queryRequest)
        {
            var itemsResponse = await _service.GetItemsByCategoryName(name, queryRequest);
            var itemDtos = itemsResponse.Objects;

            var finalResponse = new QueryResponse<ItemDto>
            {
                Objects = itemDtos,
                TotalCount = itemsResponse.TotalCount,
                TotalPages = itemsResponse.TotalPages,
                CurrentPage = itemsResponse.CurrentPage,
                PageSize = itemsResponse.PageSize
            };

            return Ok(finalResponse);
        }
    }
}