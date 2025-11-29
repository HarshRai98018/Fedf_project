import React, { useState, useEffect } from "react";

export default function CuratorPanel({ artworks, setArtworks }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [exhibitionDate, setExhibitionDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("selectedExhibition")) || [];
    setSelectedIds(stored);
  }, []);

  const toggleSelection = (id) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];

    setSelectedIds(updated);
    localStorage.setItem("selectedExhibition", JSON.stringify(updated));
  };

  const handleSaveDetails = () => {
    if (!exhibitionDate || !ticketPrice) {
      alert("Please enter both date and price");
      return;
    }

    const details = {
      date: exhibitionDate,
      price: ticketPrice,
      artworks: selectedIds,
    };

    localStorage.setItem("exhibitionDetails", JSON.stringify(details));
    alert("Exhibition details saved!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Curator Panel</h2>
      <p className="mb-4">Select artworks and set exhibition details.</p>

      {/* Exhibition Settings */}
      <div className="mb-6 grid gap-4 max-w-md">
        <label>Exhibition Date & Time</label>
        <input
          type="datetime-local"
          value={exhibitionDate}
          onChange={(e) => setExhibitionDate(e.target.value)}
          className="border p-2 rounded"
        />

        <label>Ticket Price (INR)</label>
        <input
          type="number"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="button"
          onClick={handleSaveDetails}
          style={{
            backgroundColor: "#2a9d8f",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Exhibition Details
        </button>
      </div>

      {/* Artwork Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <p>By {art.artist}</p>
            <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>{art.description}</p>
            <button
              type="button"
              onClick={() => toggleSelection(art.id)}
              style={{
                marginTop: "10px",
                backgroundColor: selectedIds.includes(art.id) ? "#2a9d8f" : "#264653",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {selectedIds.includes(art.id) ? "Selected for Exhibition" : "Select for Exhibition"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}