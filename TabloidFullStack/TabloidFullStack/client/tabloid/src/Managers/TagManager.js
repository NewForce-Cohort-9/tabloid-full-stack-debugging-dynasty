const apiUrl = "https://localhost:5001/api/Tag";

export const getAllTags = () => {
    return fetch(apiUrl)
    .then((res) => res.json())
};


export const getTagById = (id) => {
    return fetch(`${apiUrl}/${id}`)
    .then((res) => res.json());
};

export const addTag = (tag) => {
    return fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag)
    });
};
export const editTag = (tag) => {
    return fetch(`${apiUrl}/${tag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    })
    .then(getAllTags)
}
export const deleteTag = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
}