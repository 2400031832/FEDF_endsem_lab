import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteInput.trim() === "") {
      alert("Please enter a note");
      return;
    }
    setNotes([...notes, noteInput]);
    setNoteInput("");
  };

  const deleteNote = (index) => {
    const copy = [...notes];
    copy.splice(index, 1);
    setNotes(copy);
  };

  const editNote = (index) => {
    const updated = prompt("Edit note:", notes[index]);
    if (updated !== null) {
      const copy = [...notes];
      copy[index] = updated;
      setNotes(copy);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Student Notes App (React + LocalStorage)</h2>

      <textarea
        rows="4"
        cols="50"
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        placeholder="Write your note here..."
      />

      <br />
      <br />

      <button onClick={addNote}>Add Note</button>

      <h3>Saved Notes:</h3>

      {notes.length === 0 && <p>No notes yet.</p>}

      {notes.map((note, index) => (
        <div
          key={index}
          style={{
            background: "#f2f2f2",
            padding: "10px",
            marginBottom: "8px",
            borderRadius: "5px",
          }}
        >
          <p>{note}</p>
          <button onClick={() => editNote(index)}>Edit</button>
          <button onClick={() => deleteNote(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
