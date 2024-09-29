package com.shaswatt.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.shaswatt.entity.Query;

public interface QueryRepository extends JpaRepository<Query,Integer>{

	Optional<Query> findById(Long id);
	
    Long countByQueryReplyIsNull();
    
    Long countByQueryReplyIsNotNull();
    
    List<Query> findByQueryReplyIsNull();

    List<Query> findByQueryReplyIsNotNull();

}
