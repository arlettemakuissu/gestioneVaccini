package com.example.demo.userEntity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class VaccinazioneEntity {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @ManyToOne
    @JoinColumn(name = "bambino_id")
  
    private BambinoEntity bambino;
   
    @ManyToOne
    @JoinColumn(name = "vaccino_id")
    private VacciniEntity vaccini;
    
   private String etaSomministrazione;
	
   private String statoVaccinazione;
	
 
   private LocalDate inizioIntervalloSomministrazione;
   

   private LocalDate fineIntervalloSomministrazione;
}
