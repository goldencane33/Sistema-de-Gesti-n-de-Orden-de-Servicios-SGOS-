package com.edu.pe.service.impl;

import com.edu.pe.models.DetalleOrden;
import com.edu.pe.models.Orden;
import com.edu.pe.repository.IOrdenRepository;
import com.edu.pe.service.IPDFService;
import com.edu.pe.utils.PDFResource;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lowagie.text.Document;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

@Service
public class PDFServiceImpl extends PDFResource implements IPDFService {

    @Autowired
    private IOrdenRepository ordenRepository;

    @Override
    public void ReporteOrdenPorCodigo(HttpServletResponse response, Integer id) throws Exception {
        Orden orden = ordenRepository.findById(id).orElse(null);

        Document documento = new Document();
        PdfWriter.getInstance(documento, response.getOutputStream());
        documento.open();

        documento.add(Logo("logo_principal.png", 80, 80));

        documento.add(Titulo("COMPROBANTE DE ORDEN"));
        documento.add(SubTitulo("Razon social cliente: ", orden.getCliente().getRazonSocial()));
        documento.add(SubTitulo("Técnico: ", orden.getTrabajador().getNombres() + " " + orden.getTrabajador().getApellidos()));
        documento.add(SubTitulo("Fecha Orden: ", orden.getFechaFormateada()));
        documento.add(SubTitulo("Estado: ", orden.getDescripcionEstado()));

        PdfPTable tabla = new PdfPTable(4);
        tabla.addCell(Cabecera("#"));
        tabla.addCell(Cabecera("Equipo"));
        tabla.addCell(Cabecera("Descripción"));
        tabla.addCell(Cabecera("Cantidad"));

        int index = 0;

        for (DetalleOrden obj : orden.getDetalles()) {
            index++;
            tabla.addCell(Celda(index,"" + index));
            tabla.addCell(Celda(index,obj.getEquipo().getNombre()));
            tabla.addCell(Celda(index,obj.getEquipo().getDescripcion()));
            tabla.addCell(Celda(index,"" + obj.getCantidad()));
        }

        documento.add(tabla);
        documento.close();

    }

}
