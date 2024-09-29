import { useEffect, useState } from "react";
import ReactPaginate from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function ViewCompletedInstallations() {
    const id = sessionStorage.getItem("id");
  const [userList, setUserList] = useState([]);
  const [activePage, setActivePage] = useState(1); // Active page for pagination
  const itemsPerPage = 12; // Number of items to display per page
  const navigate = useNavigate();
  useEffect(() => {
    getAllUserAction();
  }, []);

  const getAllUserAction = async () => {
    let url = `http://localhost:8181/${id}/installations/completed`;
    axios.get(url).then((response) => {
      setUserList(response.data);
    });
  };

  const handleEdit = (id) => {
    // Save the ID in localStorage
    sessionStorage.setItem("installationId", id);
    // console.log(empId);
    // Navigate to the Add Employee page
    navigate("/completed-request");

  };

  const handleDelete = (userId) => {
    let url = `http://localhost:8181/delete?empId=${userId}`;
    axios.get(url).then((response) => {
      getAllUserAction();
    });
  };

  // Calculate the total number of pages based on the number of items and itemsPerPage
  const totalItemsCount = userList.length;
  const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage);

  // Get the current page's items based on the activePage and itemsPerPage
  const getPageItems = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return userList.slice(startIndex, endIndex);
  };

  // Handle page change event
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <div className="row background-image p-2 justify-content-center">
        <div className="col-sm-12 col-md-11">
          <div className="row justify-content-between">
            <input
              type="button"
              value="New Requests"
              className="w-100 btn btn-lg btn-primary mb-3 shadow"
            />
            <div className="table-responsive">
              <table className="table table-light shadow">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">City</th>
                    <th scope="col">Address</th> 
                    {/* <th scope="col">Gender</th> */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getPageItems().map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td className="text-capitalize">{item.customer.firstName} {item.customer.lastName}</td>

                      <td>{item.customer.email}</td>
                      <td>{item.customer.phone}</td>
                      <td>{item.customer.address.city}</td>
                      <td>{item.customer.address.streetAddress}</td>
                      
                      {/* <td>{item.address.city}</td> */}
                      <td className="fs-5">
                        <FaEdit
                          className="me-2 text-primary"
                          title="Edit"
                          onClick={() => handleEdit(item.id)}
                        />
                        <FaTrash
                          className="text-danger"
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
      <ReactPaginate
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="Previous"
                nextPageText="Next"
                firstPageText="First"
                lastPageText="Last"
                innerClass="pagination justify-content-center"
                activeClass="active"
              />
      </div>
    </>
  );
}

export default ViewCompletedInstallations;
