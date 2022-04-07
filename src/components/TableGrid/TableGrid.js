import React, { useState, useEffect, useReducer } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Input,
  ButtonGroup,
  StyledOption,
  CustomSelect,
} from "@material-ui/core";
import DataService from "../../services/DataService";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import AddButton from "../Button/AddButton";
import EditButton from "../Button/EditButton";
import DeleteButton from "../Button/DeleteButton";
import PredictButton from "../Button/PredictButton";
import AnalyticsButton from "../Button/AnalyticsButton";
import AdvanceSearchButton from "../Button/AdvanceSearchButton";
import SearchBar from "../Button/SearchBar";
import RefreshButton from "../Button/RefreshButton";
import style from "./TableGrid.module.css";
import PuffLoader from "react-spinners/PuffLoader";
import { TransitionGroup } from "react-transition-group";
import { useStyles } from "./tableGridStyle";
import { Scrollbars } from "react-custom-scrollbars-2";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sl_no",
    numeric: true,
    disablePadding: true,
    label: "Sl No.",
  },
  {
    id: "business_code",
    numeric: false,
    disablePadding: false,
    label: "Business Code",
  },
  // {
  //   id: "business_name",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Business Name",
  // },
  {
    id: "cust_number",
    numeric: false,
    disablePadding: false,
    label: "Customer Number",
  },
  // {
  //   id: "name_customer",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Customer Name",
  // },
  {
    id: "clear_date",
    numeric: false,
    disablePadding: false,
    label: "Clear Date",
  },
  {
    id: "business_year",
    numeric: false,
    disablePadding: false,
    label: "Business year",
  },
  { id: "doc_id", numeric: false, disablePadding: false, label: "Doc Id" },
  {
    id: "posting_date",
    numeric: false,
    disablePadding: false,
    label: "Posting Date",
  },
  {
    id: "document_create_date",
    numeric: false,
    disablePadding: false,
    label: "Document Create Date",
  },
  // {
  //   id: "document_create_date1",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Document Create Date 1",
  // },
  {
    id: "due_in_date",
    numeric: false,
    disablePadding: false,
    label: "Due in Date",
  },
  {
    id: "invoice_currency",
    numeric: false,
    disablePadding: false,
    label: "Invoice Currency",
  },
  {
    id: "document_type",
    numeric: false,
    disablePadding: false,
    label: "Document Type",
  },
  {
    id: "posting_id",
    numeric: false,
    disablePadding: false,
    label: "Posting Id",
  },
  // {
  //   id: "area_business",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Area Business",
  // },
  {
    id: "total_open_amount",
    numeric: false,
    disablePadding: false,
    label: "Total Open Amount",
  },
  {
    id: "baseline_create_date",
    numeric: false,
    disablePadding: false,
    label: "Baseline Create Date",
  },
  {
    id: "cust_payment_terms",
    numeric: false,
    disablePadding: false,
    label: "Customer Payment Terms",
  },
  {
    id: "invoice_id",
    numeric: false,
    disablePadding: false,
    label: "Invoice Id",
  },
  // { id: "isOpen", numeric: false, disablePadding: false, label: "Is Open" },
  // {
  //   id: "aging_Bucket",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Aging Bucket",
  // },
  // {
  //   id: "predicted",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Predicted",
  // },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const styles = useStyles();
  return (
    <TableHead>
      <TableRow
        className={styles.HeadTableRow}
        
      >
        <TableCell padding="checkbox" className={styles.HeadTableCell}  >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
            color="primary"
            className={styles.MuiCheckbox}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={styles.HeadTableCell}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className={styles.headCellLabel}
              style={{ color: "white" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableGrid({ advanceNotify, addNotify, updateNotify }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [records, setRecords] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [state, setState] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [tableContent, setTableContent] = useState("mainTable"); //mainTable or advanceTable
  const [advanceInput, setAdvanceInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      doc_id: "",
      cust_number: "",
      invoice_id: "",
      buisness_year: "",
    }
  );
  let [loading, setLoading] = useState(false);
  let api = new DataService();
  const styles = useStyles();

  //get main table data
  const getData = () => {
    recordPerPage.length === 0 && setRecordPerPage(10);
    api
      .recordsByPagination(pageNo, recordPerPage)
      .then((res) => {
        setRecords([...res.data.records]);
        setTotal(res.data.count.count);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get advance search and normal search data
  const getAdvanceSearchData = () => {
    api
      .advancedSearch(
        advanceInput.doc_id,
        advanceInput.invoice_id,
        advanceInput.cust_number,
        advanceInput.buisness_year,
        pageNo,
        recordPerPage
      )
      .then((res) => {
        setRecords(res.data.advanceSearch);
        setTotal(res.data.count.count);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete rows
  const deleteRows = () => {
    let removeIds = selected.toString();
    api.removeFromView(removeIds).then((res) => {
      setSelected([]);
      setState(state + 1);
      res.data.map((r, i) => {
        setTimeout(() => {
          addNotify(r.code, r.mssg);
        }, i * 800);
      });
    });
  };

  //update row
  const editRow = (sl_no, cust_payment_terms, invoice_currency) => {
    api
      .updateRecord(sl_no, cust_payment_terms, invoice_currency)
      .then((res) => {
        console.log("After updating data : ", res.data);
        setState(state + 1);
        updateNotify(sl_no);
      });
  };

  //add new row
  const addRow = (addInput) => {
    console.log(addInput);
    api.addRecord(addInput).then((res) => {
      console.log(res.data);
      addNotify(res.data.code, res.data.mssg);
      setState(state + 1);
    });
  };

  //useEffect
  useEffect(() => {
    var pdata = JSON.stringify({
      "data": [
        1930587884,
        1930762361,
        1929714798
      ]
    });
    api.getMlPredict(pdata).then((res) => {
      console.log(res.data);
    })
    setLoading(true);
    // tableContent === "mainTable" && getData();
    // tableContent === "advanceTable" && getAdvanceSearchData();
  }, [pageNo, state, recordPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = records.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  //handle next page
  const handleNextPage = () => {
    setPageNo(pageNo + 1);
    console.log(pageNo);
  };

  //handle previous page
  const handlePreviousPage = () => {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
    console.log(pageNo);
  };

  //handle record per page
  const handleRecordsPerPage = (e) => {
    // if (e.target.value !== "") setRecordPerPage(parseInt(e.target.value));
    e.preventDefault();
    setRecordPerPage(parseInt(e.target.value));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={styles.root}>
      <div className={styles.gridContainer}>
        <div>
          {/* <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          > */}
          <pre>
            <PredictButton selected={selected} />
            <AnalyticsButton />
            <AdvanceSearchButton
              setAdvanceInput={setAdvanceInput}
              advanceInput={advanceInput}
              setTableContent={setTableContent}
              state={state}
              setState={setState}
              setPageNo={setPageNo}
              setRecordPerPage={setRecordPerPage}
              advanceNotify={advanceNotify}
            />
          </pre>
          {/* </ButtonGroup> */}
        </div>
        <RefreshButton
          setTableContent={setTableContent}
          state={state}
          setState={setState}
          setPageNo={setPageNo}
          setRecordPerPage={setRecordPerPage}
          setAdvanceInput={setAdvanceInput}
        />
        <SearchBar
          setAdvanceInput={setAdvanceInput}
          advanceInput={advanceInput}
          setTableContent={setTableContent}
          state={state}
          setState={setState}
          setPageNo={setPageNo}
          setRecordPerPage={setRecordPerPage}
        />

        <div style={{ display: "flex", maxWidth: "100%" }}>
          {/* <ButtonGroup
            variant="outlined"
            color="primary"
            aria-label="contained primary button group"
          > */}
          {/* <pre> */}
          <AddButton addRow={addRow} addNotify={addNotify} />
          <EditButton editRow={editRow} selected={selected} />
          <DeleteButton deleteRows={deleteRows} selected={selected} />
          {/* </pre> */}
          {/* </ButtonGroup> */}
        </div>
      </div>
      <Paper className={classes.paper}>
        {!loading ? (
          <TableContainer
            className={styles.Table_Container}
            style={{ height: "77vh" }}
          >
            {records.length > 0 ? (
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                renderTrackHorizontal={({ style, ...props }) => (
                  <div
                    {...props}
                    className={styles.scrollTrackHorizontal}
                    style={{
                      ...style,
                    }}
                  />
                )}
                renderTrackVertical={({ style, ...props }) => (
                  <div
                    {...props}
                    className={styles.scrollTrackVertical}
                    style={{
                      ...style,
                    }}
                  />
                )}
                renderThumbHorizontal={({ style, ...props }) => (
                  <div
                    {...props}
                    className={styles.scrollThumbHorizontal}
                    style={{
                      ...style,
                    }}
                  />
                )}
                renderThumbVertical={({ style, ...props }) => (
                  <div
                    {...props}
                    className={styles.scrollThumbVertical}
                    style={{
                      ...style,
                    }}
                  />
                )}
              >
                <Table
                  className={styles.table}
                  aria-labelledby="tableTitle"
                  size={true ? "small" : "medium"} //dense = true
                  aria-label="enhanced table"
                  // stickyHeader
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={records.length}
                    style={{ align: "left" }}
                  />
                  <TableBody className={styles.TableBody}>
                    {stableSort(records, getComparator(order, orderBy)).map(
                      (row, index) => {
                        const isItemSelected = isSelected(row.sl_no);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.sl_no)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                            // style={{ height: "48px"}}
                            className={styles.MuiTableRow}
                          >
                            <TableCell
                              className={styles.TableCell}
                              padding="checkbox"
                            >
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                                color="primary"
                                className={styles.MuiCheckbox}
                              />
                            </TableCell>
                            {headCells.map((cell, idx) => (
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                align="center"
                                className={styles.TableCell}
                                key={idx}
                              >
                                {row[cell.id] !== "0000-00-00"
                                  ? row[cell.id]
                                  : "NA"}
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </Scrollbars>
            ) : (
              <div className={style.notFound}>
                <p>Records Not Found</p>
              </div>
            )}
          </TableContainer>
        ) : (
          <div className={style.notFound}>
            <PuffLoader
              color="#fff"
              loading={true}
              // css={override}
              size={45}
              // style={{position: "relative"}}
            />
            <br></br>
            <p>Data Loading... Please Wait...</p>
          </div>
        )}

        <div className={styles.tableTool}>
          <p style={{ margin: "auto 0" }}>Rows Per Page : </p>
          {/* <Input
            value={recordPerPage}
            inputProps={{
              "aria-label": "description",
              style: { color: "white" },
            }}
            style={{ width: "40px", fontSize: "13px", margin: "0 8px" }}
            onChange={(e) => {
              handleRecordsPerPage(e);
            }}
            className={styles.MuiInputBase_root}
          /> */}
          <select
            value={recordPerPage}
            onChange={handleRecordsPerPage}
            style={{ height: "16px", margin: "auto 4px" }}
          >
            <option defaultValue>10</option>
            <option value={5}>5</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          {pageNo > 0 && (
            <IconButton
              variant="contained"
              size="small"
              color="primary"
              className={styles.margin}
              onClick={() => handlePreviousPage()}
              style={{ marginRight: "5px" }}
            >
              <GrFormPrevious className={styles.footerIcon} />
            </IconButton>
          )}
          {records.length > 0 && (
            <p style={{ margin: "auto 25px" }}>
              {records[0].sl_no} - {records[records.length - 1].sl_no} of{" "}
              {Math.ceil(total / recordPerPage)}
            </p>
          )}
          {Math.ceil(total / recordPerPage) > pageNo + 1 && (
            <IconButton
              variant="contained"
              size="small"
              color="primary"
              className={styles.margin}
              onClick={() => handleNextPage()}
            >
              <GrFormNext className={styles.footerIcon} />
            </IconButton>
          )}
        </div>
      </Paper>
    </div>
  );
}
