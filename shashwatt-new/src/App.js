import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import CustomerRegistration from './Pages/Customer/CustomerRegistration';
import VendorRegistration from './Pages/Vendor/VendorRegistration';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from './Components/Map';
import ReceiptPDF from './Components/ReceiptPDF';
import Calculator from './Components/Calculator';
import CustomerLogin from './Pages/Customer/CustomerLogin';
import VendorLogin from './Pages/Vendor/VendorLogin';
import HomePage from './Pages/HomePage';
import AdminLogin from './Pages/Admin/AdminLogin';
import HowSolarWorks from './Pages/HowSolarWorks';
import WhySolar from './Pages/WhySolar';
import ElectricitySavingsCalculator from './Components/Calci';
import AboutUs from './Pages/AboutUs';
import FileUploadComponent from './Components/FileUploadComponent';
import FileDownloadComponent from './Components/FileDownloadComponent';
import Generator from './Components/generator';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import VendorDashboard from './Pages/Vendor/VendorDashboard';
import CustomerDashboard from './Pages/Customer/CustomerDashboard';
import ViewPendingApprovals from './Pages/Admin/ViewPendingApprovals';
import VendorAuthentication from './Pages/Admin/VendorAuthentication';
import ViewVendors from './Pages/Admin/ViewVendors';
import ViewCustomers from './Pages/Admin/ViewCustomers';
import ViewInstallationRequestsList from './Pages/Vendor/ViewInstallationRequestsList';
import NewNavbar from './Components/NewNavbar';
import ContactUs from './Pages/ContactUs';
import ViewQueries from './Pages/Admin/ViewQueries';
import ReplyQuery from './Pages/Admin/ReplyQuery';
import ViewOldQueries from './Pages/Admin/ViewOldQueries';
import ViewOldQuery from './Pages/Admin/ViewOldQuery';
import Protected from './Components/Protected';
import Quotation from './Components/Quotation';
import VendorInformation from './Pages/Admin/VendorInformation';
import InstallationDetails from './Pages/Vendor/InstallationRequest';
import ViewAcceptedRequestsList from './Pages/Vendor/ViewAcceptedRequests';
import AcceptedRequest from './Pages/Vendor/AcceptedRequest';
import ViewCompletedInstallations from './Pages/Vendor/ViewCompletedInstallations';
import CompletedRequest from './Pages/Vendor/CompletedRequest';
import InstallationInvoice from './Pages/Customer/InstallationInvoice';

function App() {
  const customerInfo = {
    name: 'John Doe',
    address: '123 Main Street, City',
    email: 'john@example.com',
    phone: '555-123-4567'
  };

  const paymentInfo = {
    receiptNumber: '123456',
    date: '2023-08-21',
    paymentMethod: 'Credit Card',
    totalAmount: 1000.00
  };

  const installationInfo = {
    expectedDate: '2023-09-15',
    process: 'Our team will visit your location...'
  };

  
  return (
   
    <BrowserRouter>
    
    <Navbar />
    
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/customer-registration" element={<Protected Component={CustomerRegistration} />} />
      <Route path="/vendor-registration" element={<Protected Component={VendorRegistration} />} />
      <Route path="/vendor-map" element={<Map/>} />
      <Route path="/pdf" element={<ReceiptPDF customerInfo={customerInfo} paymentInfo={paymentInfo} installationInfo={installationInfo}/>} />
      <Route path="/calculator" element={<Calculator/>} />
      <Route path="/customer-login" element={<Protected Component={CustomerLogin}/>} />
      <Route path="/vendor-login" element={<Protected Component={VendorLogin}/>} />
      <Route path="/admin-login" element={<Protected Component={AdminLogin}/>} />
      <Route path="/how-solarworks" element={<HowSolarWorks/>} />
      <Route path="/why-solar" element={<WhySolar/>} />
      <Route path="/calci" element={<ElectricitySavingsCalculator/>} />
            
      <Route path="/aboutUs" element={<AboutUs/>} />
      <Route path="/upload" element={<FileUploadComponent/>} />
      <Route path="/download" element={<FileDownloadComponent/>} />
      <Route path="/generator" element={<Generator/>} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      <Route path="/vendor-dashboard" element={<VendorDashboard/>} />
      {/* <Route path="/customer-dashboard" element={<CustomerDashboard/>} /> */}
      <Route path="/pending-vendors" element={<ViewPendingApprovals/>} />
      <Route path="/authenticate-vendor" element={<VendorAuthentication/>} />
      <Route path="/view-vendor" element={<ViewVendors/>} />
      <Route path="/view-customer" element={<ViewCustomers/>} />
      <Route path="/view-installation-requests" element={<ViewInstallationRequestsList/>} />
      <Route path="/contact-us" element={<ContactUs/>} />
      <Route path="/view-queries" element={<ViewQueries/>} />
      <Route path="/reply-query" element={<ReplyQuery/>} />
      <Route path="/view-old-queries" element={<ViewOldQueries/>} />
      <Route path="/view-old-query" element={<ViewOldQuery/>} />
      <Route path="/quotation" element={<Quotation/>} />
      <Route path="/vendor-info" element={<VendorInformation/>} />
      <Route path="/installation-request" element={<InstallationDetails/>} />
      <Route path="/installation-accepted-request" element={<ViewAcceptedRequestsList/>} />
      <Route path="/accepted-request" element={<AcceptedRequest/>} />
      <Route path="/completed-requests" element={<ViewCompletedInstallations/>} />
      <Route path="/completed-request" element={<CompletedRequest/>} />
      <Route path="/customer-dashboard" element={<CustomerDashboard/>} />
      <Route path="/customer-invoice" element={<InstallationInvoice/>} />
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
