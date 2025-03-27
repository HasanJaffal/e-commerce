﻿using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs;

namespace Backend.MappingProfiles
{
    public class ItemProfile : Profile
    {
        public ItemProfile()
        {
            CreateMap<CreateItemDto, Item>();
            CreateMap<UpdateItemDto, Item>();
            CreateMap<Item, ItemDto>();
        }
    }
}
