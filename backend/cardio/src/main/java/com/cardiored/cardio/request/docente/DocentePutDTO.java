package com.cardiored.cardio.request.docente;

import javax.persistence.PrimaryKeyJoinColumn;

import com.cardiored.cardio.domain.Titulation;

import com.cardiored.cardio.request.medico.MedicoPutDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name="medicoId")
public class DocentePutDTO extends MedicoPutDTO {
    private Titulation titulation;
}