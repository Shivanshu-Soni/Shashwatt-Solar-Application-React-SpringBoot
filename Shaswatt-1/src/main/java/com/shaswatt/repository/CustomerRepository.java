package com.shaswatt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.shaswatt.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByLastName(String lastName);

    @Query("SELECT c FROM Customer c WHERE c.email = :email")
	Customer findByEmail(String email);
    
    List<Customer> findByInstallationDetailsVendorId(Long vendorId);

    boolean existsByEmail(String email);

}
