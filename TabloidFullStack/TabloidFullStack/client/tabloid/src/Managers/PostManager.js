const apiUrl = "https://localhost:5001";

export const GetApprovedPosts = () => {
    return fetch(`${apiUrl}/api/post`)
        .then((res) => res.json());
};

export const getPostById = (id) => {
    return fetch(`${apiUrl}/api/post/${id}`).then(res => res.json());
};
