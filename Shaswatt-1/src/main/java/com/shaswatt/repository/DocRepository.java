package com.shaswatt.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.shaswatt.entity.Doc;

public interface DocRepository  extends JpaRepository<Doc,Integer>{

	Optional<Doc> findByCustomerId(Integer customerId);

}