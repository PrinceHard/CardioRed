package com.cardiored.cardio.mapper;

import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.request.MedicoPostDTO;
import com.cardiored.cardio.request.MedicoPutDTO;
import com.cardiored.cardio.request.MedicoResponsePostDTO;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public abstract class MedicoMapper {
    public static final MedicoMapper INSTANCE = Mappers.getMapper(MedicoMapper.class);

    public abstract Medico toMedico(MedicoPostDTO medicoPostDTO);
    public abstract MedicoResponsePostDTO toMedicoResponsePostDTO(Medico medico);

    public abstract Medico toMedico(MedicoPutDTO medicoPutDTO);
}