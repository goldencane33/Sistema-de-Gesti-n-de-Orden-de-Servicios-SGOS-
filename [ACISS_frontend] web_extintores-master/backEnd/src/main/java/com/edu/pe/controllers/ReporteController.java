package com.edu.pe.controllers;

import com.edu.pe.models.Cliente;
import com.edu.pe.service.IClienteService;
import com.edu.pe.service.IEquipoService;
import com.edu.pe.service.IPDFService;
import jakarta.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.edu.pe.utils.*;

@RestController
@RequestMapping("/api/reporte")
@CrossOrigin
public class ReporteController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private IClienteService clienteService;
    @Autowired
    private IEquipoService equipoService;
    @Autowired
    private IPDFService pdfService;

    @Autowired
    private UtilsResource utils;

    @GetMapping("/obtener")
    public ResponseEntity<Map<String, Integer>> listarReportes() {
        int cantClientes = clienteService.CantidadClientes();
        int cantEquipos = equipoService.CantidadEquipos();

        Map<String, Integer> response = new HashMap<>();
        response.put("cantidad_clientes", cantClientes);
        response.put("cantidad_equipos", cantEquipos);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/descargarOrdenPDF/{id}")
    public void descargarOrdenPDF(HttpServletResponse response,
            @PathVariable("id") Integer id) throws Exception {
        response.setContentType("application/pdf");

        String cabecera = "Content-Disposition";
        String valor = "attachment; filename=reporte_" + utils.dateToStringFormarReport() + ".pdf";
        response.setHeader(cabecera, valor);
        pdfService.ReporteOrdenPorCodigo(response, id);
    } 

    @GetMapping("/verOrdenPDF/{id}")
    public void verPDFOrden(HttpServletResponse response,
            @PathVariable("id") Integer id) throws Exception {
        response.setContentType("application/pdf");

        String cabecera = "Content-Disposition";
        String valor = "inline; filename=reporte_" + utils.dateToStringFormarReport() + ".pdf";
        response.setHeader(cabecera, valor);
        pdfService.ReporteOrdenPorCodigo(response, id);
    }
}
