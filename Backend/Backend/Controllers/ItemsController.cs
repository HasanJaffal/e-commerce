using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.DTOs.Item;

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
        public async Task<IActionResult> CreateItem([FromBody] CreateItemDto createItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var item = _mapper.Map<Item>(createItemDto);
            var createdItem = await _service.CreateItemAsync(item);
            var itemDto = _mapper.Map<ItemDto>(createdItem);

            return Ok(itemDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetItems([FromQuery] QueryRequest queryRequest)
        {
            var itemsResponse = await _service.GetItemsAsync(queryRequest);
            var items = itemsResponse.Objects;
            var dtos = _mapper.Map<IEnumerable<ItemDto>>(items);

            var finalResponse = new QueryResponse<ItemDto>
            {
                Objects = dtos,
                TotalCount = itemsResponse.TotalCount,
                TotalPages = itemsResponse.TotalPages,
                CurrentPage = itemsResponse.CurrentPage,
                PageSize = itemsResponse.PageSize
            };

            return Ok(finalResponse);
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
        public async Task<IActionResult> UpdateItem(int id, [FromBody] UpdateItemDto updateItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = _mapper.Map<Item>(updateItemDto);
            item.Id = id;
            var updatedItem = await _service.UpdateItemAsync(item);
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
