package Dto;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.userEntity.BambinoEntity;
import com.example.demo.userEntity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BambiniDto {
	
	private Long id;
	private String nome;
	private LocalDate  dataNascita;
	private int eta;
	

}
