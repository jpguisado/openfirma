/**
 * Las proyecciones son una interfaz que ofrece
 * Spring Framework que permite reducir el número de datos
 * enviados a través de nuestros endpoint
 */

package com.openfirma.springhateoas.domain.entities.projections;

import com.openfirma.springhateoas.domain.entities.Positions;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "positionInfo", types = {Positions.class})
/**
 * Devuelve solo id del cargo y denominación en el endpoint /projections/cargo
 *
 */
public interface PositionsInfo {

    Long getId();

    String getDenomination();
}
