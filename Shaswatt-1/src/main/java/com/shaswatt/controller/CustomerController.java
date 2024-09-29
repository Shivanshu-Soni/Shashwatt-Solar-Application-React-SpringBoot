package com.shaswatt.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.shaswatt.Service.CustomerService;
import com.shaswatt.Service.InstallationDetailsService;
import com.shaswatt.entity.Customer;
import com.shaswatt.entity.InstallationDetails;

@RestController
@CrossOrigin
public class CustomerController {

	@Autowired
    private CustomerService customerService;

    @Autowired
    private InstallationDetailsService installationDetailsService;
    
    @PostMapping("/add-customer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) {
        if (customerService.doesCustomerExistByEmail(customer.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Customer with this email already exists.");
        }
        Customer addedCustomer = customerService.addCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedCustomer);
    }
   
    @GetMapping("/customers-list")
    public List<Customer> getAllVendors() {
        return customerService.getAllCustomers();
    }
 
    @PostMapping("/customer-login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Customer customer = customerService.getCustomer(email);

        if (customer != null && customer.getPassword().equals(password)) {
            Long installationId = installationDetailsService.getInstallationIdByCustomerId(customer.getId());
            if (installationId != null) {
                return ResponseEntity.ok("Login successful. Customer lastName: " + customer.getLastName() + ", Installation ID: " + installationId);
            } else {
            	return ResponseEntity.ok("Login successful. Customer lastName: " + customer.getLastName() + ", No installation found.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
        }
    }
    
    @PostMapping("installation/{customerEmail}/installation-details")
    public Customer createOrUpdateInstallationDetailsByEmail(
            @PathVariable String customerEmail,
            @RequestBody InstallationDetails request) {
        return customerService.createOrUpdateInstallationDetailsByEmail(customerEmail, request);
    }

    
    @GetMapping("/customer/count")
    public Long getCustomerCount() {
        return customerService.getCustomerCount();
    }
    
    @GetMapping("/customers-listByVendor")
    public List<Customer> getCustomersByVendorId(@RequestParam Long vendorId) {
        return customerService.getCustomersByVendorId(vendorId);
    }
    
    @GetMapping("/customer/{customerId}")
    public Customer getCustomerById(@PathVariable Long customerId) {
        return customerService.getCustomerById(customerId);
    }
}
