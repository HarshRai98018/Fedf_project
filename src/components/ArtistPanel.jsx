import React, { useState } from "react";

export default function ArtistPanel({ artworks, setArtworks }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !image) return alert("Enter all details");

    const newArtwork = {
      id: Date.now().toString(),
      title,
      artist: "Harsh",
      price: parseInt(price),
      image,
      description,
      articles: [],
      sold: false,
    };

    const updatedArtworks = [...artworks, newArtwork];
    setArtworks(updatedArtworks);
    localStorage.setItem("artworks", JSON.stringify(updatedArtworks));

    alert(`Uploaded: ${title} for ₹${price}`);
    setTitle("");
    setPrice("");
    setImage("");
    setDescription("");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this artwork?");
    if (!confirmed) return;

    const updatedArtworks = artworks.filter((art) => art.id !== id);
    setArtworks(updatedArtworks);
    localStorage.setItem("artworks", JSON.stringify(updatedArtworks));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Artist Panel</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="grid gap-3 max-w-lg">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <label>Price (INR)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <label>Photo</label>
        <input type="file" onChange={handleFile} accept="image/*" />
        {image && <img src={image} className="w-48 h-32 object-cover rounded" />}
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="buy-btn">
          Upload
        </button>
      </form>

      <h3 className="mt-6 text-xl">Your Uploaded Artworks</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
  {artworks.map((art) => (
    <div
      key={art.id}
      style={{
        maxWidth: "320px",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={art.image}
        alt={art.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />
      <h4 style={{ marginTop: "12px", fontWeight: "600" }}>{art.title}</h4>
      <p>₹{art.price}</p>
      <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>{art.description}</p>
      <button
        type="button"
        onClick={() => handleDelete(art.id)}
        style={{
          marginTop: "10px",
          backgroundColor: "#e63946",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  ))}
</div>
    </div>
  );
}