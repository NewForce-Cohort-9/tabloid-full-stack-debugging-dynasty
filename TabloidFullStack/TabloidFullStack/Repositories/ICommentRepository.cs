﻿using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {
       
        List<Comment> GetCommentsByPostId(int postId);
        void Add(Comment comment);
        Comment GetCommentById(int commentId); //for DELETE
        void Delete(int commentId);
        void Edit(int id, Comment comment);
    }
}