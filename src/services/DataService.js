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
    cust_number,
    buisness_year,
    pageNo,
    recordsPerPage
  ) => {
    return this.client.get(
      apiPath.advanceSearch +
        "?doc_id=" +
        doc_id +
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
  addRecord = (recordData) => {
    return this.client.post(
      apiPath.addRecord +
        "?sl_no=" +
        recordData.sl_no +
        "&business_code=" +
        recordData.business_code +
        "&cust_number=" +
        recordData.cust_number +
        "&name_customer=" +
        recordData.name_customer +
        "&clear_date=" +
        recordData.clear_date +
        "&buisness_year=" +
        recordData.buisness_year +
        "&doc_id=" +
        recordData.doc_id +
        "&posting_date=" +
        recordData.posting_date +
        "&due_in_date=" +
        recordData.due_in_date +
        "&baseline_create_date=" +
        recordData.baseline_create_date +
        "&cust_payment_terms=" +
        recordData.cust_payment_terms +
        "&converted_usd=" +
        recordData.converted_usd +
        "&Aging_Bucket=" +
        recordData.Aging_Bucket
    );
  };
  updateRecord = (sl_no, cust_payment_terms, invoice_currency) => {
    return this.client.post(
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
