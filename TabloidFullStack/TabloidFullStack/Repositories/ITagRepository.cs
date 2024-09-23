
using TabloidFullStack.Models;


namespace TabloidFullStack.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        Tag GetById(int id);
        
    }
}