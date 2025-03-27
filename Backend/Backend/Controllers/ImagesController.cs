using AutoMapper;
using Backend.Models.DTOs.Image;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _service;
        private readonly IMapper _mapper;

        public ImagesController(IImageService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpPost("Upload")]
        public async Task<IActionResult> UploadImage([FromForm] UploadImageDto uploadImageDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var image = await _service.UploadImageAsync(uploadImageDto);
            return Ok(image);
        }

    }
}
