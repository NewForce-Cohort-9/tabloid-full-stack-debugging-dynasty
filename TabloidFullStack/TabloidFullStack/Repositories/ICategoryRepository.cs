﻿using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetById(int id);
        void UpdateCategory(Category category);
        void AddCategory(Category category);
        void DeleteCategory(int id);
    }
}