package Dto;

import java.time.LocalDate;

import com.example.demo.userEntity.VacciniEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VacciniDto {
	
	private Long id;
	private String nome;
	private String  etaSomministrazione;
	private String descrizione;
	private int intervalloCalcolazione;
   
	
	
	

}
