import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdatePostForm = () => {
  // State variables to store form data
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}`);
        const post = response.data.post;
        setTopic(post.topic);
        setDescription(post.description);
        setPostCategory(post.postCategory);
        console.log(post);
      } catch (err) {
        console.error('Error fetching post data:', err);
        setError('Error fetching post data');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      topic,
      description,
      postCategory
    };

    console.log('Updated post data:', postData);

    try {
      const response = await axios.put(`http://localhost:8000/post/update/${id}`, postData);
      console.log('Server response:', response.data);

      setSuccess('Post updated successfully!');
      setError('');
      // Redirect to posts list or another page after successful update
      navigate('/');
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Error updating post');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Update Post</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="topic" className="form-label">Topic</label>
          <input
            type="text"
            className="form-control"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="postCategory" className="form-label">Post Category</label>
          <input
            type="text"
            className="form-control"
            id="postCategory"
            value={postCategory}
            onChange={(e) => setPostCategory(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
