import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddPlaylistPage.module.scss"

export default function AddPlaylistPage({ playlistList, callbackToCreate }) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

<<<<<<< HEAD
    const songDetails = {
      title: title,
      description: description,
      genre: [],
      songs: []
    }

    callbackToCreate(songDetails);

    setTitle("");
    setDescription("");

    navigate(`/playlist/${playlistList.length - 5}`);
  }

  return (
    <section className="AddMovie box">
      <h2>Create your own playlist:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
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
          Description:
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
    </section>
  )
}
=======
        const songDetails = {
            title: title,
            description: description,
            genre: [],
            songs: []
        }

        callbackToCreate(songDetails);

        setTitle("");
        setDescription("");

        navigate(`/playlist/${playlistList.length - 5}`);
    }

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
>>>>>>> 898730b1f6004ec0916586699547c6c5e86ca193
