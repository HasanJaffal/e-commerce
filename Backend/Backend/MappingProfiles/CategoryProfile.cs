﻿using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs.Category;

namespace Backend.MappingProfiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();
            CreateMap<Category, CategoryDto>();
        }
    }
}