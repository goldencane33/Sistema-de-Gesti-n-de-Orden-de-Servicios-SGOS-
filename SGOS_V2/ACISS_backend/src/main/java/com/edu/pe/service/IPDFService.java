package com.edu.pe.service;

import jakarta.servlet.http.HttpServletResponse;

public interface IPDFService {

    public void ReporteOrdenPorCodigo(HttpServletResponse response, Integer id) throws Exception;
}
