import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import ListItem from "./components/ListItem";

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function App() {
  const [isLoading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/photos?_limit=20"
        );
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    loadData();
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.title.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) return <h1>Loading ...</h1>;
  return (
    <div>
      <input
        className="search-input"
        value={query}
        onChange={onSearch}
        type="text"
        placeholder="Search ..."
      />
      <div className="list">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo, index) => {
            return <ListItem key={index} {...photo} />;
          })
        ) : (
          <h1>Sorry we found no images with that title</h1>
        )}
      </div>
    </div>
  );
}

export default App;
