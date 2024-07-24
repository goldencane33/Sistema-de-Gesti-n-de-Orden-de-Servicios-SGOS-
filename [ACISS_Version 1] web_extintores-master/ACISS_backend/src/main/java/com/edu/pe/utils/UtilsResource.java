package com.edu.pe.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class UtilsResource {

    public String dateToStringFormarReport() {
        String result = "";
        DateFormat fechaHora = new SimpleDateFormat("yyyy-MM-dd_hh_mm_ss");
        result = fechaHora.format(new Date());
        return result;
    }
}
