const apiUrl = "https://localhost:5001";

//fetch to get list of Tags
export const getAllTags = () => {
    return fetch(`${apiUrl}/api/Tag`)
    .then((res) => res.json())
};

