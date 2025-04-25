using AutoMapper;
using Backend.Models.Domain;
using Backend.Models.DTOs.Item;

namespace Backend.MappingProfiles
{
    public class ItemProfile : Profile
    {
        public ItemProfile()
        {
            CreateMap<Item, ItemDto>().ReverseMap();
        }
    }
}
