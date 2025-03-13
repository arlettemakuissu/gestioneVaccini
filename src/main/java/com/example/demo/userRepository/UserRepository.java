package com.example.demo.userRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.userEntity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
	
	
	Optional<UserEntity> findUserByEmail(String email);
  
	Optional<UserEntity> findById(Long id);
}
