package com.openfirma.springhateoas.domain.services;

public class StorageException extends RuntimeException {

	/**
	 * Serializa la clase
	 */
	private static final long serialVersionUID = -5502351264978098291L;

	/**
	 * Método que recoge un mensaje de la clase superior para gestionar su excepción
	 * @param message
	 */
	public StorageException(String message) {
		super(message);
	}

	/**
	 * Metodo que recoge unmensaje de la clase superior y su casusa y lanza una excepción
	 * @param message
	 * @param cause
	 */
	public StorageException(String message, Throwable cause) {
		super(message, cause);
	}

}