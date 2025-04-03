using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.DTOs.Item;
using Backend.Models.DTOs.Image;

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

        [HttpGet("{itemId}/image")]
        public async Task<IActionResult> GetImageByItemId(int itemId)
        {
            var image = await _service.GetImageByItemIdAsync(itemId);
            if (image == null)
            {
                return Ok(new ImageDto()
                {
                    Id = 0,
                    Url = "https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/box_white_surprise.png",
                    ItemId = itemId
                });
            }

            var dto = _mapper.Map<ImageDto>(image);
            return Ok(dto);
        }

    }
}
