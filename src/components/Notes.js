import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from 'react-router';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getNotes();
    }
    else { Navigate("/login"); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currNote) => {
    ref.current.click();
    setNote({ id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag });
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success");
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <AddNote showAlert={props.showAlert} />

      <button ref={ref} type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"></button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="col-form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescripttion" className="col-form-label">Description</label>
                  <textarea className="form-control" id="edescripttion" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="col-form-label">Tag</label>
                  <textarea className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2 className="my-2">Your Notes</h2>
        {notes.length === 0 && "No notes to display"}
        {notes.map((note) => {
          return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
        })}
      </div>
    </div>
  )
}

export default Notes
