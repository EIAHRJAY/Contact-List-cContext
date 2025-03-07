import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsGeoAltFill } from "react-icons/bs";
import { BsEnvelopeAtFill } from "react-icons/bs";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    actions.getContacts();
  }, []);

  const handleDeleteClick = (contactId) => {
    setSelectedContact(contactId);
  };
  //console.log("aqui esta el valor de id:", setSelectedContact);

  const handleDeleteConfirm = () => {
    if (selectedContact) {
      actions.deleteContact(selectedContact);
      setSelectedContact(null);
    }
  };

  return (
    <div className="container">
      {store.contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        <ul className="list-group">
          {store.contacts.map((contact) => (
            <li
              key={contact.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div className="d-flex">
                <img
                  src="https://i.pinimg.com/564x/f3/f7/d1/f3f7d1a93907c3892ce16e906929c3ed.jpg"
                  className="rounded-circle"
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                ></img>
              </div>

              <div>
                <p>
                  <BsFillPersonFill /> {contact.name}
                </p>
                <p>
                  <BsFillTelephoneFill /> {contact.phone}
                </p>
                <p>
                  <BsEnvelopeAtFill /> {contact.email}
                </p>
                <p>
                  <BsGeoAltFill /> {contact.address}
                </p>
              </div>

              <div>
                <Link to={`/editContact/${contact.id}`} state={{ contact }}>
                  <button className="btn btn-success mr-2 me-2">Edit</button>
                </Link>

                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteModal-${contact.id}`}
                  onClick={() => handleDeleteClick(contact.id)}
                >
                  Delete
                </button>

                <div
                  className="modal fade"
                  id={`deleteModal-${contact.id}`}
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-body">
                        <p>Why delete this contact?</p>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          No
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={handleDeleteConfirm}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
