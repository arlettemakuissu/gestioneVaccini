package com.example.demo.userRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.userEntity.BambinoEntity;

@Repository
public interface BambinoRepository extends JpaRepository<BambinoEntity,Long>{
	
 Optional  <BambinoEntity> findById(Long id);

}
