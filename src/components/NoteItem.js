import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {

  const { note, updateNote, showAlert } = props;
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card " >
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div><i role="button" className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); showAlert("Deleted Successfully", "success") }} ></i>
              <i role="button" onClick={() => { updateNote(note) }} className="fa-regular fa-pen-to-square"></i></div>
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">{note.description}</h6>
        </div>
      </div>

    </div>
  )
}

export default NoteItem;
