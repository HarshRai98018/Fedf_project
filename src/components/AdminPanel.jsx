import React, { useState, useEffect } from "react";

export default function AdminPanel({ artworks, setArtworks }) {
  const [users, setUsers] = useState([]);
  const [roles] = useState(["Visitor", "Artist", "Curator", "Admin"]);
  const [editingArtId, setEditingArtId] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [exhibitionDate, setExhibitionDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");

  // Load users and exhibition details
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("platformUsers")) || [
      { id: "u1", name: "Harsh", role: "Artist" },
      { id: "u2", name: "Isha", role: "Visitor" },
      { id: "u3", name: "Rohan", role: "Curator" },
    ];
    setUsers(storedUsers);

    const exhibition = JSON.parse(localStorage.getItem("exhibitionDetails")) || {};
    setExhibitionDate(exhibition.date || "");
    setTicketPrice(exhibition.price || "");
  }, []);

  const updateRole = (id, newRole) => {
    const updated = users.map((u) => (u.id === id ? { ...u, role: newRole } : u));
    setUsers(updated);
    localStorage.setItem("platformUsers", JSON.stringify(updated));
  };

  const removeUser = (id) => {
    const confirmed = window.confirm("Remove this user?");
    if (!confirmed) return;
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    localStorage.setItem("platformUsers", JSON.stringify(updated));
  };

  const handleNewImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const updateArtwork = (id) => {
    const updated = artworks.map((art) =>
      art.id === id
        ? {
            ...art,
            price: newPrice ? parseInt(newPrice) : art.price,
            image: newImage || art.image,
          }
        : art
    );
    setArtworks(updated);
    localStorage.setItem("artworks", JSON.stringify(updated));
    setEditingArtId(null);
    setNewPrice("");
    setNewImage("");
  };

  const updateExhibitionDetails = () => {
    if (!exhibitionDate || !ticketPrice) {
      alert("Please enter both date and price");
      return;
    }
    const details = {
      date: exhibitionDate,
      price: ticketPrice,
    };
    localStorage.setItem("exhibitionDetails", JSON.stringify(details));
    alert("Exhibition details updated!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <p className="mb-4">Manage platform users, artworks, and exhibition settings.</p>

      {/* User Management */}
      <h3 className="text-xl mt-6 mb-2">Users</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} style={{ maxWidth: "320px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "8px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p>Role: {user.role}</p>
            <label className="block mt-2">Change Role</label>
            <select value={user.role} onChange={(e) => updateRole(user.id, e.target.value)} className="border p-2 rounded w-full">
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button type="button" onClick={() => removeUser(user.id)} style={{ marginTop: "10px", backgroundColor: "#e63946", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Remove User
            </button>
          </div>
        ))}
      </div>

      {/* Artwork Management */}
      <h3 className="text-xl mt-8 mb-2">Artworks</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <div key={art.id} style={{ maxWidth: "320px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "8px", padding: "16px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
            <img src={art.image} alt={art.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px" }} />
            <h4 style={{ marginTop: "12px", fontWeight: "600" }}>{art.title}</h4>
            <p>By {art.artist}</p>
            <p>₹{art.price}</p>
            <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>{art.description}</p>

            {editingArtId === art.id ? (
              <>
                <input type="number" placeholder="New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="border p-2 rounded w-full mt-2" />
                <input type="file" accept="image/*" onChange={handleNewImage} className="mt-2" />
                {newImage && <img src={newImage} alt="Preview" className="w-full h-32 object-cover rounded mt-2" />}
                <button onClick={() => updateArtwork(art.id)} style={{ marginTop: "10px", backgroundColor: "#2a9d8f", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setEditingArtId(art.id)} style={{ marginTop: "10px", backgroundColor: "#264653", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Edit Artwork
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Exhibition Settings */}
      <h3 className="text-xl mt-8 mb-2">Exhibition Settings</h3>
      <div className="grid gap-4 max-w-md">
        <label>Date & Time</label>
        <input type="datetime-local" value={exhibitionDate} onChange={(e) => setExhibitionDate(e.target.value)} className="border p-2 rounded" />
        <label>Ticket Price (INR)</label>
        <input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} className="border p-2 rounded" />
        <button type="button" onClick={updateExhibitionDetails} style={{ backgroundColor: "#2a9d8f", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Save Exhibition Details
        </button>
      </div>
    </div>
  );
}