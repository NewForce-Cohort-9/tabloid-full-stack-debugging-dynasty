const apiUrl = "https://localhost:5001";
const tagBase = `${apiUrl}/api/tag`;

export const getAllTags = async () => {
  const response = await fetch(tagBase);
  if (response.ok) return await response.json();
};

export const getById = async (tagId) => {
  const response = await fetch(`${tagBase}/${tagId}`);
  if (response.ok) return await response.json();
};

