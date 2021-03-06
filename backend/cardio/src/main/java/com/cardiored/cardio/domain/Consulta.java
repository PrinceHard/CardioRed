package com.cardiored.cardio.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Builder;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Builder
public class Consulta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy - HH:mm")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTime;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ExamType examType;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ConsultaStatus status;

    @NotNull
    @ManyToOne
    private Disease diagnosticAssumption;

    @NotNull
    @ManyToOne
    private Medico medico;

    @NotNull
    @ManyToOne
    private Paciente paciente;
}
