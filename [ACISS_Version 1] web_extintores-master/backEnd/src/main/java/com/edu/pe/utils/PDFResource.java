package com.edu.pe.utils;

import com.lowagie.text.Chunk;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import java.awt.Color;

public class PDFResource {

    public Image Logo(String imagen, int ancho, int alto) {
        Image header = null;
        try {
            String rutaIMG = ConstantesApp.RUTA_IMG + imagen;
            header = Image.getInstance(rutaIMG);
            header.scaleToFit(ancho, alto);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return header;
    }

    public Paragraph Parrafo(String parrafo) {
        Paragraph paragraph = new Paragraph(parrafo);
        paragraph.setAlignment(Element.ALIGN_RIGHT);
        paragraph.setIndentationLeft(-90);
        paragraph.setSpacingAfter(20);
        return paragraph;
    }

    public PdfPTable Titulo(String titulo) {
        Font fuenteTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, Font.BOLD, Color.BLACK);
        PdfPTable tablaTitulo = new PdfPTable(1);
        PdfPCell celda = null;

        celda = new PdfPCell(new Phrase(titulo, fuenteTitulo));
        celda.setBorder(0);
        celda.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
        celda.setVerticalAlignment(PdfPCell.ALIGN_CENTER);
        tablaTitulo.addCell(celda);
        tablaTitulo.setSpacingAfter(20);
        return tablaTitulo;
    }

    public PdfPTable SubTitulo(String titulo, String descripcion) {
        Font fuenteTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, Color.BLACK);
        Font fuenteDescripcion = FontFactory.getFont(FontFactory.HELVETICA, 12, Color.BLACK);
        PdfPTable tablaTitulo = new PdfPTable(1);

        Phrase phrase = new Phrase();
        phrase.add(new Chunk(titulo + " ", fuenteTitulo));
        phrase.add(new Chunk(descripcion, fuenteDescripcion));

        PdfPCell celda = new PdfPCell(phrase);
        celda.setBorder(0);
        celda.setHorizontalAlignment(Element.ALIGN_LEFT);
        celda.setVerticalAlignment(Element.ALIGN_LEFT);
        tablaTitulo.addCell(celda);
        tablaTitulo.setSpacingAfter(7);

        return tablaTitulo;
    }

    public PdfPTable SubTitulo(String titulo) {
        Font fuenteTitulo = FontFactory.getFont(FontFactory.HELVETICA, 12, Font.BOLD, Color.BLACK); // ESCRITORIO
        PdfPTable tablaTitulo = new PdfPTable(1);
        PdfPCell celda = null;

        celda = new PdfPCell(new Phrase(titulo, fuenteTitulo));
        celda.setBorder(0);
        celda.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
        celda.setVerticalAlignment(PdfPCell.ALIGN_LEFT);
        tablaTitulo.addCell(celda);
        tablaTitulo.setSpacingAfter(7);
        return tablaTitulo;
    }

    public PdfPCell Cabecera(String data) {
        Font fuenteTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, new Color(247, 247, 249));
        PdfPCell celda = new PdfPCell(new Phrase(data, fuenteTitulo));
        celda.setBackgroundColor(new Color(76, 120, 212));
        celda.setHorizontalAlignment(Element.ALIGN_CENTER);
        celda.setVerticalAlignment(Element.ALIGN_CENTER);
        celda.setPadding(5);
        return celda;
    }

    public PdfPCell Celda(int col, String data) {

        Font fuenteTitulo = FontFactory.getFont(FontFactory.HELVETICA, 10, new Color(5, 2, 22));
        PdfPCell celda = new PdfPCell(new Phrase(data, fuenteTitulo));
        celda.setHorizontalAlignment(Element.ALIGN_CENTER);
        celda.setVerticalAlignment(Element.ALIGN_CENTER);
        celda.setPadding(5);

        if (col % 2 == 0) {
            celda.setBackgroundColor(new Color(230, 230, 230)); 
        }
        return celda;
    }

    public PdfPCell CeldaColspan(int col, String data) {
        Font fuenteTitulo = FontFactory.getFont(FontFactory.HELVETICA, 10, new Color(5, 2, 22));
        PdfPCell celda = new PdfPCell(new Phrase(data, fuenteTitulo));
        celda.setHorizontalAlignment(Element.ALIGN_RIGHT);
        celda.setVerticalAlignment(Element.ALIGN_RIGHT);
        celda.setColspan(col);
        celda.setPadding(5);
        celda.setBorder(0);
        return celda;
    }

}
