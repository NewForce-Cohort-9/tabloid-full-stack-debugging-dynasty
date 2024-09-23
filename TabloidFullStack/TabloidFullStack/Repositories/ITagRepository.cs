using Azure;
using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
        Tag GetTagById(int id);
 
    }
}