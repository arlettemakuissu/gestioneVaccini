package Dto;

import com.example.demo.userEntity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	
	private Long id ;
	private String nome;
	private String email;
	private String password;
	private String role;

}
