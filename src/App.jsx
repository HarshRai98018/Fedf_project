import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import VisitorGallery from "./components/VisitorGallery";
import ArtistPanel from "./components/ArtistPanel";
import CuratorPanel from "./components/CuratorPanel";
import AdminPanel from "./components/AdminPanel";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";
import { loadArtworks, saveArtworks } from "./utils/storage";

export default function App() {
  const [artworks, setArtworks] = useState([]);
  const location = useLocation(); // detect current route

  const sampleArtworks = [
    {
      id: "a1",
      title: "Starry Night",
      artist: "Vincent van Gogh",
      price: 1500000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      description:
        "A masterpiece of post-impressionist art depicting a night sky filled with swirling stars.",
      articles: ["https://en.wikipedia.org/wiki/The_Starry_Night"],
      sold: false,
    },
    {
      id: "a2",
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      price: 2000000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
      description:
        "The world's most famous portrait, known for its mysterious smile.",
      articles: ["https://en.wikipedia.org/wiki/Mona_Lisa"],
      sold: false,
    },
    {
      id: "a3",
      title: "The Persistence of Memory",
      artist: "Salvador Dalí",
      price: 1200000,
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
      description:
        "A surreal painting exploring time and dreams, famous for its melting clocks.",
      articles: ["https://en.wikipedia.org/wiki/The_Persistence_of_Memory"],
      sold: false,
    },
  ];

  useEffect(() => {
    const stored = loadArtworks();
    if (stored && stored.length > 0) {
      setArtworks(stored);
    } else {
      setArtworks(sampleArtworks);
      saveArtworks(sampleArtworks);
    }
  }, []);

  useEffect(() => {
    saveArtworks(artworks);
  }, [artworks]);

  // Hide navbar and footer on login/register pages
  const hideLayout = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar username="Gallery" />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/visitor" element={<VisitorGallery artworks={artworks} />} />
        <Route
          path="/artist"
          element={<ArtistPanel artworks={artworks} setArtworks={setArtworks} />}
        />
        <Route
          path="/curator"
          element={<CuratorPanel artworks={artworks} setArtworks={setArtworks} />}
        />
        <Route
          path="/admin"
          element={<AdminPanel artworks={artworks} setArtworks={setArtworks} />}
        />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}
