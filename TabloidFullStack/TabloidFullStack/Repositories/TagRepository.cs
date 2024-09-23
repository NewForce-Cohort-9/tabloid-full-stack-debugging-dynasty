using Azure;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT * FROM Tag
                                        ORDER BY Name"
                    ;

                    List<Tag> tags = [];

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        });
                    }

                    reader.Close();
                    return tags;

                }
            }
        }

        public Tag GetById(int id)
        {
            using (var conn = Connection)
            {

                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT * FROM Tag
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Tag tag = null;

                    if (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();
                    return tag;
                }

            }
        }
    }
}
    
        