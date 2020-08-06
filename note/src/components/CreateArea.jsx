import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpansion] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function expand() {
    setExpansion(true);
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onClick={expand}
          onChange={handleChange}
          value={note.title}
          autoComplete="off"
          placeholder="Title"
        />
        {isExpanded ? (
          <textarea
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />
        ) : null}

        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>+</Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
