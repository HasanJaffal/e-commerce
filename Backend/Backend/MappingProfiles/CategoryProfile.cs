using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs;

namespace Backend.MappingProfiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<Category, CategoryDto>();
            CreateMap<UpdateCategoryDto, Category>();
        }
    }
}