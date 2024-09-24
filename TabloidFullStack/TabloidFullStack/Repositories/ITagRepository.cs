
using TabloidFullStack.Models;


namespace TabloidFullStack.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        List<Tag> GetAllTags();
        Tag GetById(int id);
        void Update(Tag tag);
        void Delete(int tagId);
    }
}