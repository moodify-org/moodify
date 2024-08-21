import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddPlaylistPage.module.scss"
import axios from "axios";

export default function AddPlaylistPage({ playlistList, callbackToCreate }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const playlistDetails = {
    title: title,
    description: description,
    alias: "",
    genre: [],
    songs: []
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios.post("https://json-moodify.adaptable.app/playlists", playlistDetails)
      .then(({ data }) => {
        callbackToCreate(data); 
        setTitle("");
        setDescription("");
        navigate(`/playlist/${data.id}`); 
      })
      .catch(e => console.log(e));
  };

  return (
    <section className={styles.AddPlaylistPage}>
      <div className={styles.div}>
        <h2>Create your own playlist: </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Title: <br></br>
            <input
              type="text"
              name="title"
              required
              placeholder="Favourites"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </label>
          <label>
            Description:  <br></br>
            <input
              type="text"
              name="description"
              placeholder="Songs that I love"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <p>
            <button>Create</button>
          </p>
        </form>
      </div>
    </section>
  )
}
