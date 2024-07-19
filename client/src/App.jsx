import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
  });
  const [update, setUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:8800/users');
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/users', formData);
      alert(res.data);
    } catch (error) {
      alert(err);
    }

    console.log('Form Data Submitted');
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:8800/users/${id}`);
      alert(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (e, user) => {
    e.preventDefault();
    setUpdate(true);
    setId(user.id);
    setFormData({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    if (id == null) alert('Please click on edit and select');
    try {
      const res = await axios.put(
        `http://localhost:8800/users/${id}`,
        formData
      );
      alert(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdate(false);
      setId(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type='text'
              name='firstname'
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type='text'
              name='lastname'
              value={formData.lastname}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Mobile:
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              name='address'
              value={formData.address}
              onChange={handleChange}
              maxLength={20}
              required
            />
          </label>
        </div>
        {update ? (
          <button onClick={(e) => handleUpdate(e, id)} type='button'>
            Update
          </button>
        ) : (
          <button type='submit'>Submit</button>
        )}
      </form>

      <div className='userInfo'>
        <div>All Employee</div>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email.slice(0, 15)}</td>
                    <td>{user.phone}</td>
                    <td>{user.address.slice(0, 15)}</td>
                    <td>
                      <div className='action'>
                        <div
                          onClick={(e) => {
                            handleDelete(e, user.id);
                          }}
                          className='delete'
                        >
                          Delete
                        </div>
                        <div
                          onClick={(e) => handleEdit(e, user)}
                          className='edit'
                        >
                          Edit
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
