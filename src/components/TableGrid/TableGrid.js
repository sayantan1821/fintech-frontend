import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core/";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableSortLabel } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Checkbox, IconButton, Input } from "@material-ui/core";
import DataService from "../../services/DataService";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import TableHeader from "../TableHeader/TableHeader";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Button,
  ButtonGroup,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AddButton from "../Button/AddButton";

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
  {
    id: "business_name",
    numeric: false,
    disablePadding: false,
    label: "Business Name",
  },
  {
    id: "cust_number",
    numeric: false,
    disablePadding: false,
    label: "Customer Number",
  },
  {
    id: "name_customer",
    numeric: false,
    disablePadding: false,
    label: "Customer Name",
  },
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
  {
    id: "document_create_date1",
    numeric: false,
    disablePadding: false,
    label: "Document Create Date 1",
  },
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
  {
    id: "area_business",
    numeric: false,
    disablePadding: false,
    label: "Area Business",
  },
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
  { id: "isOpen", numeric: false, disablePadding: false, label: "Is Open" },
  {
    id: "aging_Bucket",
    numeric: false,
    disablePadding: false,
    label: "Aging Bucket",
  },
  {
    id: "predicted",
    numeric: false,
    disablePadding: false,
    label: "Predicted",
  },
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

  return (
    <TableHead style={{ height: "40px", padding: "0" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
            style={{
              color: "blue",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
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

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontSize: "20pt",
  },
  paper: {
    width: "100%",
    marginBottom: 50,
  },
  table: {
    minWidth: 750,
    fontSize: "200000pt",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableRow: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "purple",
      "& > .MuiTableCell-root": {
        color: "yellow",
      },
    },
  },
  TableCell: {
    fontSize: "13px",
    padding: "5px",
    height: "5px",
  },
  tableTool: {
    margin: "0 15px",
    display: "flex",
    justifyContent: "end",
    fontSize: "13px",
  },
}));

export default function TableGrid({ advanceNotify, addNotify, updateNotify }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [records, setRecords] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [state, setState] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  const [tableState, setTableState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      active: true,
      pageNo: 0,
      recordPerPage: 10,
      stateCount: 0,
    }
  );
  const [advanceState, setAdvanceState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      active: false,
      pageNo: 0,
      recordPerPage: 10,
      stateCount: 0,
    }
  );
  let api = new DataService();
  const getData = () => {
    recordPerPage.length === 0 && setRecordPerPage(0);
    api
      .recordsByPagination(tableState.pageNo, tableState.recordPerPage)
      .then((res) => {
        console.log("Records Per page : ", res.data);
        setRecords([...res.data]);
      });
  };
  const deleteRows = () => {
    let removeIds = selected.toString();
    api.removeFromView(removeIds).then((res) => {
      console.log(res.data);
      tableState.active &&
        setTableState({
          ...tableState,
          stateCount: tableState.stateCount + 1,
        });
      advanceState.active &&
        setAdvanceState({
          ...advanceState,
          stateCount: advanceState.stateCount,
        });
    });
  };
  useEffect(() => {
    console.log(state);
    tableState.active && getData();
  }, [pageNo, state, recordPerPage, advanceState, tableState]);
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
  const handleNextPage = () => {
    if (!advanceState.active)
      setTableState({
        ...tableState,
        pageNo: tableState.pageNo + 1,
      });
    else
      setAdvanceState({
        ...advanceState,
        pageNo: advanceState.pageNo + 1,
      });
    console.log(pageNo);
  };
  const handlePreviousPage = () => {
    if (tableState.pageNo > 0 || advanceState.pageNo > 0) {
      if (!advanceState.active)
        setTableState({
          ...tableState,
          pageNo: tableState.pageNo - 1,
        });
      else
        setAdvanceState({
          ...advanceState,
          pageNo: advanceState.pageNo - 1,
        });
    }
    console.log(pageNo);
  };
  const handleRecordsPerPage = (e) => {
    if (!advanceState.active)
      setTableState({
        ...tableState,
        recordPerPage: e.target.value,
      });
    else
      setAdvanceState({
        ...advanceState,
        recordPerPage: e.target.value,
      });
    e.preventDefault();
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      {/* <TableHeader
        deleteRows={deleteRows}
        selected={selected}
        setRecords={setRecords}
        setTableState={setTableState}
        tableState={tableState}
        setAdvanceState={setAdvanceState}
        advanceState={advanceState}
        advanceNotify={advanceNotify}
        addNotify={addNotify}
        updateNotify={updateNotify}
      /> */}
      <div
        style={{
          height: "8vh",
          display: "flex",
          justifyContent: "space-between",
          margin: "0 30px",
          alignItems: "center",
        }}
      >
        <div>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>PREDICT</Button>
            <Button>
              <pre>ANALYTICS VIEW</pre>
            </Button>
            <Button
              // onClick={(e) => {
              //   openAdvanceModal();
              // }}
            >
              <pre>ADVANCE SEARCH</pre>
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup
            variant="outlined"
            color="primary"
            aria-label="contained primary button group"
          >
            <AddButton />
            <Button
              // onClick={openEditModal}
              // disabled={selected.length == 1 ? false : true}
            >
              EDIT
            </Button>
            <Button
              // disabled={selected.length > 0 ? false : true}
              // onClick={(e) => {
              //   deletec(e);
              // }}
            >
              DELETE
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Paper className={classes.paper}>
        <TableContainer style={{ height: "77vh" }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={true ? "small" : "medium"} //dense = true
            aria-label="enhanced table"
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
            <TableBody>
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
                      style={{ height: "48px", background: "white" }}
                    >
                      <TableCell
                        className={classes.TableCell}
                        padding="checkbox"
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          style={{
                            color: "blue",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                        className={classes.TableCell}
                      >
                        {row.sl_no}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.business_code}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.business_name}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.cust_number}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.name_customer}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        <pre>
                          {row.clear_date != "0000-00-00"
                            ? row.clear_date
                            : "NA"}
                        </pre>
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.business_year}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.doc_id}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.posting_date}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.document_create_date}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.document_create_date1}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        <pre>{row.due_in_date}</pre>
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.invoice_currency}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.document_type}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.posting_id}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.area_business && row.area_business.length > 0
                          ? row.area_business.length
                          : "NA"}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.total_open_amount}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.baseline_create_date}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.cust_payment_terms}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.invoice_id}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.isOpen}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.aging_Bucket.length > 0
                          ? row.aging_Bucket.length
                          : "NA"}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.predicted}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <div className={classes.tableTool}>
          <p style={{ margin: "auto 0" }}>Rows Per Page : </p>
          <Input
            defaultValue={recordPerPage}
            inputProps={{ "aria-label": "description" }}
            style={{ width: "40px", fontSize: "13px", margin: "0 8px" }}
            onChange={(e) => {
              handleRecordsPerPage(e);
            }}
          />
          {(tableState.pageNo > 0 || advanceState.pageNo > 0) && (
            <IconButton
              variant="contained"
              size="small"
              color="primary"
              className={classes.margin}
              onClick={() => handlePreviousPage()}
              style={{ marginRight: "5px" }}
            >
              <GrFormPrevious />
            </IconButton>
          )}
          <IconButton
            variant="contained"
            size="small"
            color="primary"
            className={classes.margin}
            onClick={() => handleNextPage()}
          >
            <GrFormNext />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}
