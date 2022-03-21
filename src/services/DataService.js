import axios from "axios";
import { baseUrl, apiPath } from "../constant";

export default class DataService {
  constructor() {
    this.client = null;
    this.init();
  }
  init = () => {
    this.client = axios.create({
      baseURL: baseUrl,
    });
  };
  getRecordById = (sl_no) => {
    return this.client.get(apiPath.getRecordById + "?sl_no=" + sl_no);
  };
  getRecordByCustNumber = (cust_number, pageNo, recordsPerPage) => {
    return this.client.get(
      apiPath.getRecordsByCustNumber +
        "?search_by_cust_number=1&cust_number=" +
        cust_number +
        "&pageNo=" +
        pageNo +
        "&recordsPerPage=" +
        recordsPerPage
    );
  };
  advancedSearch = (
    doc_id,
    invoice_id,
    cust_number,
    buisness_year,
    pageNo,
    recordsPerPage
  ) => {
    return this.client.get(
      apiPath.advanceSearch +
        "?doc_id=" +
        doc_id +
        "&invoice_id=" +
        invoice_id +
        "&cust_number=" +
        cust_number +
        "&buisness_year=" +
        buisness_year +
        "&pageNo=" +
        pageNo +
        "&recordsPerPage=" +
        recordsPerPage
    );
  };
  deleteRecords = (sl_nos) => {
    return this.client.get(apiPath.deleteRecord + "?sl_nos=" + sl_nos);
  };
  removeFromView = (sl_nos) => {
    return this.client.get(apiPath.removeFromView + "?sl_nos=" + sl_nos);
  };
  recordsByPagination = (pageNo, recordsPerPage) => {
    return this.client.get(
      apiPath.recordsByPagination +
        "?pageNo=" +
        pageNo +
        "&recordsPerPage=" +
        recordsPerPage
    );
  };
  addRecord = (addData) => {
    return this.client.get(
      apiPath.addRecord +
        "?business_code=" +
        addData.business_code +
        "&cust_number=" +
        addData.cust_number +
        "&clear_date=" +
        addData.clear_date +
        "&buisness_year=" +
        addData.buisness_year +
        "&doc_id=" +
        addData.doc_id +
        "&posting_date=" +
        addData.posting_date +
        "&document_create_date=" +
        addData.document_create_date +
        "&due_in_date=" +
        addData.due_in_date +
        "&invoice_currency=" +
        addData.invoice_currency +
        "&document_type=" +
        addData.document_type +
        "&posting_id=" +
        addData.posting_id +
        "&total_open_amount=" +
        addData.total_open_amount +
        "&baseline_create_date=" +
        addData.baseline_create_date +
        "&cust_payment_terms=" +
        addData.cust_payment_terms +
        "&invoice_id=" +
        addData.invoice_id +
        ""
    );
  };
  updateRecord = (sl_no, cust_payment_terms, invoice_currency) => {
    return this.client.get(
      apiPath.updateRecord +
        "?sl_no=" +
        sl_no +
        "&invoice_currency=" +
        invoice_currency +
        "&cust_payment_terms=" +
        cust_payment_terms
    );
  };
  countRecord = () => {
    return this.client.get(apiPath.countRecord);
  };
}
