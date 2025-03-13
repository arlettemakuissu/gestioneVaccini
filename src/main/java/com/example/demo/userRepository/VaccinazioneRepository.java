package com.example.demo.userRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.userEntity.BambinoEntity;
import com.example.demo.userEntity.VaccinazioneEntity;
import com.example.demo.userEntity.VacciniEntity;

public interface VaccinazioneRepository extends JpaRepository<VaccinazioneEntity,Long> {
	
	VacciniEntity  findByVacciniId(Long id);
	BambinoEntity  findByBambinoId(Long id);
	boolean existsByBambinoAndVaccini(BambinoEntity bambino, VacciniEntity vaccino);
    List<VaccinazioneEntity> findBybambinoId (Long bambino_id);
    Optional<VaccinazioneEntity> findByBambino_IdAndVaccini_Id(Long bambinoId, Long vaccinoId);
    List<VaccinazioneEntity> findByBambino(BambinoEntity bambino);
}
