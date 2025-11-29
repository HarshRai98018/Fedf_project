import React, { useEffect, useState } from "react";
import "./VisitorGallery.css";

export default function VisitorGallery({ artworks = [] }) {
  const [gallery, setGallery] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  useEffect(() => {
    // Load artworks from localStorage or from props
    const storedArtworks = JSON.parse(localStorage.getItem("artworks")) || [];
    if (storedArtworks.length > 0) {
      setGallery(storedArtworks);
    } else if (artworks.length > 0) {
      setGallery(artworks);
    }
  }, [artworks]);

  return (
    <div className="visitor-container">
      <h2 className="visitor-title">🎨 Visitor Gallery</h2>

      {gallery.length === 0 ? (
        <p className="no-art-msg">No artworks available yet.</p>
      ) : (
        <div className="art-grid">
          {gallery.map((a) => (
            <div key={a.id} className="art-card">
  <img src={a.image} alt={a.title} className="art-img" />
  <div className="art-info">
    <h3>{a.title}</h3>
    <p>By {a.artist}</p>
    <span>₹{a.price}</span>
    <button
      className="know-more-btn"
      onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
    >
      {expandedId === a.id ? "Hide Info" : "Know More"}
    </button>
    {expandedId === a.id && a.description && (
      <p className="art-desc">{a.description}</p>
    )}
  </div>
</div>
          ))}
        </div>
      )}
    </div>
  );
}
