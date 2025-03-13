package com.example.demo.userRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.userEntity.VacciniEntity;

@Repository
public interface VacciniRepository extends JpaRepository<VacciniEntity,Long>{

}
