import img from '../Images/favicon.png'

import { Link, useNavigate , useLocation} from 'react-router-dom';
const NewNavbar = () => {
  const location = useLocation();

  // Define an array of paths where you want to show the navbar
  const showNavbarPaths = [
    '/customer-dashboard','/vendor-dashboard','/admin-dashboard'
  ];

  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);


  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
    const navigate = useNavigate();

  const goToSavingsCalculator = () => {
    navigate('/calculator');
  };
  return (
    <div>
       {shouldShowNavbar && (
      <nav class="navbar mt-0 navbar-expand-lg bg-body-tertiary ">
     
        <div class="container-fluid">
        <img src={img} width="55px" alt="" />
          <a class="navbar-brand fs-4" href="#">
           <strong>Shashwatt</strong>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to='/'
                ><strong>Home</strong>
                  
                </Link>
              </li>
              {/* <li class="nav-item">
                
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to='/why-solar'
                ><strong>Why Solar?</strong>
                  
                </Link>
              </li>
              <li class="nav-item">
                
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to='/how-solarworks'
                ><strong>How Solar Works?</strong>
                  
                </Link>
              </li> */}
              <li class="nav-item">
                
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to='/aboutUs'
                ><strong>About Us</strong>
                  
                </Link>
              </li>
              <li class="nav-item">
                
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to='/vendor-map'
                ><strong>
                Vendors</strong>
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="pdf">
                  Pdf
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ><strong>Login</strong>
                  
                </a>
                <ul class="dropdown-menu">
                  <li>
                    
                    <Link to="/vendor-login" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'black' }}>
                    <a className="dropdown-item shadow" href="#">
                    Vendor Login
                    </a>
                    </Link>
                  </li>
                  <li>
                    
                    <Link to="/customer-login" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'black' }}>
                    <a className="dropdown-item shadow" href="#">
                    Customer Login
                    </a>
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    
                    <Link to="/admin-login" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'black' }}>
                    <a className="dropdown-item shadow" href="#">
                    Administrator Login
                    </a>
                    </Link>
                  </li>
                </ul>
                
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ><strong>Register</strong>
                  
                </a>
                <ul class="dropdown-menu">
                  <li>
                    
                    <Link to="/vendor-registration" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'black' }}>
                    <a className="dropdown-item shadow" href="#">
                    Vendor Registration
                    </a>
                    </Link>
                  </li>
                  <li>
                    
                    <Link to="/customer-registration" onClick={scrollToTop} style={{ textDecoration: 'none', color: 'black' }}>
                    <a className="dropdown-item shadow" href="#">
                    Customer Registration
                    </a>
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Administrator Registration
                    </a>
                  </li>
                </ul>
                
              </li>
            </ul>
            {/* <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
            <button className="btn btn-primary" onClick={goToSavingsCalculator}><strong>Savings Calculator</strong></button>
          </div>
        </div>
         
      </nav>
       
       )};
    </div>
  );
};

export default NewNavbar;
