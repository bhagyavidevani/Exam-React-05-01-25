import { useEffect, useState } from "react";
import Header from "../Component/Header";
import { useNavigate } from "react-router";
import { Card, Button } from "react-bootstrap";
import {FaEdit,  FaEye, FaTrash } from "react-icons/fa";

function CrudWithRouting() {  // Changed name from Rounting to Routing

  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let data = localStorage.getItem('blogData');
    if (data) {
      setBlogData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const goToSinglePage = (id) => {
    // Ensure the route is correctly named
    navigate(`/ShowBlog/${id}`);
    // console.log(id);
 };

   const handelDelete =(id)=>{
    let updateData =blogData.filter((blog)=>blog.id != id);
    setBlogData(updateData);
   }

   const handelEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Header background="#f1cfc6" />
      <div className="banner">
        <div className="blog-display">
          <h2 className="text-center py-3 fs-1 fw-bold">Blogs</h2>
          <div className="container d-flex">
            {blogData.map((v) => {
              return (
                <div key={v.id} className="ms-3">
                  <Card style={{ width: '18rem' }} className="border-0 p-2">
                    <img
                      src={v.imageUrl}
                      alt="Blog Image"
                      style={{ width: '260px', height: '260px', objectFit: 'cover' }} // Corrected typo: "centain" to "contain"
                      className="rounded m-1"
                    />
                    <Card.Body>
                      <p className="fs-3 fw-bold text-black mb-0">{v.titlename}</p>
                      <p className="my-2">{v.describe}</p>
                      <p className="mb-0 text-black fw-bold"><strong>Name:</strong> {v.fname}</p>
                      <p className="mb-0 text-black" style={{ fontSize: "15px" }}>{v.DOB}</p>
                      <p className="text-black" style={{ fontSize: "13px" }}>{v.Time}</p>
                      <Button onClick={() => goToSinglePage(v.id)}><FaEye /></Button>
                      <Button className="mx-4" onClick={() => handelEdit(v.id)}><FaEdit/></Button>
                      <Button onClick={() => handelDelete(v.id)}><FaTrash/></Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CrudWithRouting;
