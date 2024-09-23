const apiUrl = "https://localhost:5001";

export const getAllTags = () => {
    return fetch(`https://localhost:5001/api/Tag`)
    .then((res)=> res.json())
};
export const getById = (id) => {
  return fetch(`https://localhost:5001/api/Tag/${id}`)
  .then((res)=> res.json())
}