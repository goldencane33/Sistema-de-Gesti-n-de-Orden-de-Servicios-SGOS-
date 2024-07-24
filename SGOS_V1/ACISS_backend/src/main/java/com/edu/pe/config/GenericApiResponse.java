package com.edu.pe.config;

public class GenericApiResponse {
	private int status;
    private String msj;
    private Object data;

    public GenericApiResponse() {
        this.status = 200;
        this.msj = "OK";
    }

    public String getMsj() {
        return msj;
    }

    public void setMsj(String msj) {
        this.msj = msj;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
