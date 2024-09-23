const apiUrl = "https://localhost:5001/api/Category";

export const getAllCategories = () => {
    return fetch(apiUrl)
    .then((res) => res.json())
};


export const getCategoryById = (id) => {
    return fetch(`${apiUrl}/${id}`)
    .then((res) => res.json());
};

//fetch to add new Category to database
export const addCategory = (categories) => {
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(categories)
    });
};