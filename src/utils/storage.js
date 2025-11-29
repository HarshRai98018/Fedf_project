export const saveArtworks = (data) =>
  localStorage.setItem("artworks", JSON.stringify(data));

export const loadArtworks = () =>
  JSON.parse(localStorage.getItem("artworks") || "[]");
