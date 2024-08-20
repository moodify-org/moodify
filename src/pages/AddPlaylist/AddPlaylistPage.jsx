import { useState } from "react";

export default function AddPlaylistPage ({callbackToCreate}) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = e => {
        e.preventDefault();

        const songDetails = {
          title: title,
          description: description
        }

        callbackToCreate(songDetails);

        setTitle("");
        setDescription("");
    
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
                Year:
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