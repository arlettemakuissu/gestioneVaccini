package Dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VaccinazioneDto {
	
	private Long vaccinoId;
	
	private Long bambinoId;
	private String nomeVaccino;
	private String etaSomministrazione;
	private String statoSomministrazione;
	private LocalDate setInizioIntervalloSomministrazione;
	private LocalDate setFineIntervalloSomministrazione;
	private String intervalloSomministrazione;
}
