using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.DTOs.Item;
using Backend.Services.Domain;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : Controller
    {
        private readonly IItemService _service;
        private readonly IMapper _mapper;

        public ItemsController(IItemService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateItem([FromForm] CreateItemDto createItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createdItem = await _service.CreateItemAsync(createItemDto);
            var itemDto = _mapper.Map<ItemDto>(createdItem);

            return Ok(itemDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            var item = await _service.GetItemByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            var dto = _mapper.Map<ItemDto>(item);
            return Ok(dto);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromForm] UpdateItemDto updateItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _mapper.Map<Item>(updateItemDto);
            item.Id = id;
            var updatedItem = await _service.UpdateItemAsync(id, updateItemDto);
            var itemDto = _mapper.Map<ItemDto>(updatedItem);
            return Ok(itemDto);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var result = await _service.DeleteItemAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}
