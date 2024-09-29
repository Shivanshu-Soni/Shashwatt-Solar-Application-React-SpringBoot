import { useEffect, useState } from "react";
import ReactPaginate from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

function ViewOldQueries() {
  const [userList, setUserList] = useState([]);
  const [activePage, setActivePage] = useState(1); // Active page for pagination
  const itemsPerPage = 12; // Number of items to display per page
  const navigate = useNavigate();
  useEffect(() => {
    getAllUserAction();
  }, []);

  const getAllUserAction = async () => {
    let url = "http://localhost:8181/query/list/notnull";
    axios.get(url).then((response) => {
      setUserList(response.data);
    });
  };

  const handleEdit = (id) => {
    // Save the ID in localStorage
    localStorage.setItem("id", id);
    // console.log(empId);
    // Navigate to the Add Employee page
    navigate("/view-old-query");
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
              value="Old Queries"
              className="w-100 btn btn-lg btn-primary mb-3 shadow"
            />
            <div className="table-responsive">
              <table className="table table-light shadow">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    {/* <th scope="col">Last Name</th> */}
                    <th scope="col">Contact No</th>
                    <th scope="col">Email</th>
                    <th scope="col">Query</th>
                    <th scope="col">Reply</th>
                    {/* <th scope="col">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {getPageItems().map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td className="text-capitalize">{item.firstName} {item.lastName}</td>
                      {/* <td></td> */}
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.query}</td>
                      <td>{item.queryReply}</td>
                      {/* <td className="fs-5">
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
                      </td> */}
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

export default ViewOldQueries;
