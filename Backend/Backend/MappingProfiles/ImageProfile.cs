using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs.Category;
using Backend.Models.DTOs.Image;

namespace Backend.MappingProfiles
{
    public class ImageProfile : Profile
    {
        public ImageProfile()
        {
            CreateMap<Image, ImageDto>();
            CreateMap<InsertImageDto, Image>();
        }
    }
}
