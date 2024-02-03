
import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditingUser({ id: '', name: '', age: '' }); // Reset editing user state
  };
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({ name: "", age: "" }); // Updated initial state for user
  const [editingUser, setEditingUser] = useState({ id: '', name: '', age: '' }); // Added state for editing user

  const userCollectionRef = collection(db, "users");


  const createUser = async () => {
    const newUser = { name: user.name, age: user.age }; // Create a new user object with entered name and age
    await addDoc(userCollectionRef, newUser);
    setUser({ name: "", age: "" }); // Empty the input fields
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc);
  }


  const updateUser = async () => {
    const userDoc = doc(db, 'users', editingUser.id);
    const updatedUser = { name: editingUser.name, age: editingUser.age };
    await updateDoc(userDoc, updatedUser);
    handleClose();
  };

  const handleEdit = (user) => {
    setEditingUser({ id: user.id, name: user.name, age: user.age });
    handleShow();
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      console.log(users);
    }
    getUsers()

  }, [users])
  return (
    <div className="App">

      <div className='d-flex m-5 p-5 flex-column justify-content-center align-items-center '>
        <input type="text" className='form-control m-3 w-25' placeholder="Name" onChange={(e) => setUser({ ...user, name: e.target.value })} value={user.name} />
        <input type="text" className='form-control m-3 w-25' placeholder="Age" onChange={(e) => setUser({ ...user, age: e.target.value })} value={user.age} />
        <button className='btn btn-success m-3' onClick={createUser}>Create User</button>
      </div>


      <div className='d-flex flex-wrap justify-content-center align-items-center'>
        {
          users.length === 0 ? <h2 style={{ color: "gray" }}>No Users Found...</h2> :

            users.map((user) => (
              <div key={user.id} className='card p-5 m-5' >
                <h2>{user.name}</h2>
                <h2>{user.age}</h2>
                <div className='d-flex gap-3'>
                  <button className='btn btn-warning' onClick={() => handleEdit(user)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => { deleteUser(user.id) }}>Delete</button>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit the details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input
                        type='text'
                        className='form-control'
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      />
                      <input
                        type='text'
                        className='form-control'
                        value={editingUser.age}
                        onChange={(e) => setEditingUser({ ...editingUser, age: e.target.value })}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={updateUser}>Update</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
}
export default App;
