import { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigation
import Header from '../Component/Header';

function AddBlog() {
  const initialState = {
    fname: '',
    titlename: '',
    DOB: '',
    Time: '',
    describe: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  // Handle image URL change
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Combine form data and image URL into a new entry
    let id = Math.floor(100000 + Math.random() * 100000)
    const newEntry = { ...formData, imageUrl,id };
  
    // Retrieve existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem('blogData')) || [];
  
    // Add the new entry to the array
    const updatedData = [...existingData, newEntry];
  
    // Save the updated array back to localStorage
    localStorage.setItem('blogData', JSON.stringify(updatedData));
  
  
    // Reset the form fields
    setFormData(initialState);
    setImageUrl('');
  
    // Redirect to the display page
    navigate('/');
  };
  

  return (
    <>
      <Header background="#BF97C5" />
      <div className="addblog position-relative">
        <div className="addblogContent mt-5">
          <h2 className="text-center mb-3 fs-1 fw-bold">Add Blog</h2>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row}>
                <Col className="mb-3">
                  <Form.Label className="fw-semibold fs-5">Author Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="Author Name"
                    value={formData.fname}
                    onChange={handleChange}
                  />
                </Col>

                <Col>
                  <Form.Label className="fw-semibold fs-5">Blog Title:</Form.Label>
                  <Form.Control
                    type="text"
                    name="titlename"
                    placeholder="Blog Title"
                    value={formData.titlename}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col className="mb-3">
                  <Form.Label className="fw-semibold fs-5">DOB:</Form.Label>
                  <Form.Control
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Label className="fw-semibold fs-5">Time:</Form.Label>
                  <Form.Control
                    type="time"
                    name="Time"
                    value={formData.Time}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col>
                  <Form.Label className="fw-semibold fs-5">Describe Box:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="describe"
                    rows="5"
                    placeholder="Write your description here..."
                    className="mb-3"
                    value={formData.describe}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col className="mb-3">
                  <Form.Label className="fw-semibold fs-5">Enter Image URL:</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Paste an image URL"
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                  />
                </Col>
              </Form.Group>

              <div className="text-center">
                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </div>
            </Form>
          </Row>
        </div>
      </div>
    </>
  );
}

export default AddBlog;
