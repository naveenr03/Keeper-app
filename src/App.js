import React, { useEffect,useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState(()=> {
    const localValue = localStorage.getItem("ITEM")
    if(localValue ===  null) return []

    return JSON.parse(localValue)
  });

  function addNote(note) {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  useEffect(() => {
    localStorage.setItem("ITEM",JSON.stringify((notes)))
  },[notes])
  

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter( (noteItem,index) => {
      return index !== id;
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem,index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
