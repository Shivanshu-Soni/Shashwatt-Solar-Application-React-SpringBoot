package com.shaswatt.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.shaswatt.entity.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long> {

	@Query("SELECT v FROM Vendor v WHERE v.address.city = ?1")
    List<Vendor> findByCity(String city);
	
	@Query("SELECT v FROM Vendor v WHERE v.address.postalCode = ?1")
    List<Vendor> findByPostalCode(String postalCode);
	
	@Query("SELECT v FROM Vendor v WHERE v.email = :email")
	Vendor findByEmail(String email);
	 
	List<Vendor> findByIsAuthenticated(boolean isAuthenticated);
	 
	long countByIsAuthenticated(boolean isAuthenticated);

	Vendor findByIdAndIsAuthenticated(Long id, boolean isAuthenticated);

	boolean existsByEmail(String email);
  
}
