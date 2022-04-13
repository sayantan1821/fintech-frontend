import axios from "axios";
import { baseUrl, mlBaseUrl, apiPath } from "../constant";

export default class DataService {
  constructor() {
    this.client = null;
    this.mlClient = null;
    this.init();
  }
  init = () => {
    this.client = axios.create({
      baseURL: baseUrl,
    });
    this.mlClient = axios.create({
      baseURL: mlBaseUrl,
    });
  };

  convertDate = (date) => {
    // console.log(date);
    let convertedDate = null;

    if (date !== null && typeof date === "object") {
      let month = String(date.getMonth() + 1);
      let day = String(date.getDate());
      const year = String(date.getFullYear());

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      convertedDate = `${year}-${month}-${day}`;
    } else convertedDate = date;
    return convertedDate;
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
    recordsPerPage,
    orderBy,
    order,
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
        recordsPerPage+
        "&orderBy=" +
        orderBy +
        "&order=" +
        order
    );
  };
  deleteRecords = (sl_nos) => {
    return this.client.get(apiPath.deleteRecord + "?sl_nos=" + sl_nos);
  };
  removeFromView = (sl_nos) => {
    return this.client.get(apiPath.removeFromView + "?sl_nos=" + sl_nos);
  };
  recordsByPagination = (pageNo, recordsPerPage, orderBy, order) => {
    return this.client.get(
      apiPath.recordsByPagination +
        "?pageNo=" +
        pageNo +
        "&recordsPerPage=" +
        recordsPerPage +
        "&orderBy=" +
        orderBy +
        "&order=" +
        order
    );
  };
  addRecord = (addData) => {
    var converted_posting_date = this.convertDate(addData.posting_date),
      converted_baseline_create_date = this.convertDate(
        addData.baseline_create_date
      ),
      converted_clear_date = this.convertDate(addData.clear_date),
      converted_document_create_date = this.convertDate(
        addData.document_create_date
      ),
      converted_due_in_date = this.convertDate(addData.due_in_date);

    return this.client.get(
      apiPath.addRecord +
        "?business_code=" +
        addData.business_code +
        "&cust_number=" +
        addData.cust_number +
        "&clear_date=" +
        converted_clear_date +
        "&buisness_year=" +
        addData.buisness_year +
        "&doc_id=" +
        addData.doc_id +
        "&posting_date=" +
        converted_posting_date +
        "&document_create_date=" +
        converted_document_create_date +
        "&due_in_date=" +
        converted_due_in_date +
        "&invoice_currency=" +
        addData.invoice_currency +
        "&document_type=" +
        addData.document_type +
        "&posting_id=" +
        addData.posting_id +
        "&total_open_amount=" +
        addData.total_open_amount +
        "&baseline_create_date=" +
        converted_baseline_create_date +
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
  getAnalytics = (analyticsData) => {
    let con_clear_date_start = this.convertDate(analyticsData.clear_date_start),
      con_clear_date_end = this.convertDate(analyticsData.clear_date_end),
      con_due_in_date_start = this.convertDate(analyticsData.due_in_date_start),
      con_due_in_date_end = this.convertDate(analyticsData.due_in_date_end),
      con_baseline_create_date_start = this.convertDate(
        analyticsData.baseline_create_date_start
      ),
      con_baseline_create_date_end = this.convertDate(
        analyticsData.baseline_create_date_end
      );

    return this.client.get(
      apiPath.analytics +
        "?clear_date_start=" +
        con_clear_date_start +
        "&clear_date_end=" +
        con_clear_date_end +
        "&due_in_date_start=" +
        con_due_in_date_start +
        "&due_in_date_end=" +
        con_due_in_date_end +
        "&baseline_create_date_start=" +
        con_baseline_create_date_start +
        "&baseline_create_date_end=" +
        con_baseline_create_date_end +
        "&invoice_currency=" +
        analyticsData.invoice_currency
    );
  };
  getMlPredict = (data) => {
    return this.mlClient.post(
      apiPath.mlPredict,
      {
        data: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  updatePredict = (doc_id, aging_bucket) => {
    return this.client.get(
      apiPath.updatePredict +
        "?doc_id=" +
        doc_id +
        "&aging_bucket=" +
        aging_bucket
    );
  };
}
