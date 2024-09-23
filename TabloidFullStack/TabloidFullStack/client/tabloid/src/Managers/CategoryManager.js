const apiUrl = "https://localhost:5001";

export const GetAllCategories = () => {
    return fetch(`${apiUrl}/api/category/${id}`).then(res => res.json());
}