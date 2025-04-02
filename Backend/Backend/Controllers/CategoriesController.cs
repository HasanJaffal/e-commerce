﻿using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs;
using Backend.Models.DTOs.Category;
using Backend.Models.DTOs.Item;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto createCategoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = _mapper.Map<Category>(createCategoryDto);
            var createdCategory = await _service.CreateCategoryAsync(category);
            var categoryDto = _mapper.Map<CategoryDto>(createdCategory);

            return Ok(categoryDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories([FromQuery] QueryRequest queryRequest)
        {
            var categoriesResponse = await _service.GetCategoriesAsync(queryRequest);
            var categories = categoriesResponse.Objects;
            var dtos = _mapper.Map<IEnumerable<CategoryDto>>(categories);

            var finalResponse = new QueryResponse<CategoryDto>
            {
                Objects = dtos,
                TotalCount = categoriesResponse.TotalCount,
                TotalPages = categoriesResponse.TotalPages,
                CurrentPage = categoriesResponse.CurrentPage,
                PageSize = categoriesResponse.PageSize
            };

            if (finalResponse.Objects.Count() == 0)
            {
                return NoContent();
            }

            return Ok(finalResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _service.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            var dto = _mapper.Map<CategoryDto>(category);
            return Ok(dto);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto updateCategoryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var category = _mapper.Map<Category>(updateCategoryDto);
            category.Id = id;
            var updatedCategory = await _service.UpdateCategoryAsync(category);
            var categoryDto = _mapper.Map<CategoryDto>(updatedCategory);
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
        public async Task<IActionResult> GetItemsByCategoryName(string name)
        {
            var items = await _service.GetItemsByCategoryName(name);
            var dtos = _mapper.Map<IEnumerable<ItemDto>>(items);
            if (dtos.Count() == 0)
            {
                return NoContent();
            }
            return Ok(dtos);
        }
    }
}
