import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core";
import { Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core/";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
// import { TablePagination } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableSortLabel } from "@material-ui/core";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { Checkbox, IconButton, Input } from "@material-ui/core";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";
import DataService from "../../services/DataService";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import TableHeader from "../TableHeader/TableHeader";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [];
// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

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

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1)
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85)
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark
//         },
//   title: {
//     flex: "1 1 100%"
//   }
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           className={classes.title}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           className={classes.title}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired
// };

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
    fontSize: "13px"
  },
}));

export default function TableGrid() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [records, setRecords] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [state, setState] = useState(0);
  const [recordPerPage, setRecordPerPage] = useState(10);
  // const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let api = new DataService();
  const getData = () => {
    api.recordsByPagination(pageNo, recordPerPage).then((res) => {
      console.log("Records Per page : ", res.data);
      setRecords(res.data);
    });
  };
  const deleteRows = () => {
    let removeIds = selected.toString();
    api.removeFromView(removeIds).then((res) => {
      console.log(res.data);
      setState(state + 1);
    });
  };
  useEffect(() => {
    getData();
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
    // console.log(newSelected);
  };
  const handleNextPage = () => {
    setPageNo(pageNo + 1);
    console.log(pageNo);
  };
  const handlePreviousPage = () => {
    pageNo > 0 && setPageNo(pageNo - 1);
    console.log(pageNo);
  };
  const handleRecordsPerPage = (e) => {
    setRecordPerPage(e.target.value);
    e.preventDefault();
  }
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <TableHeader deleteRows={deleteRows} />
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
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
              {stableSort(records, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
                        <pre>{row.clear_date != "0000-00-00" ? row.clear_date : "NA"}</pre>
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
                        {row.area_business.length > 0 ? row.area_business.length : "NA"}
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
                        {row.aging_Bucket.length > 0 ? row.aging_Bucket.length : "NA"}
                      </TableCell>
                      <TableCell className={classes.TableCell} align="center">
                        {row.predicted}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        <div className={classes.tableTool}>
          {/* <form noValidate autoComplete="off" style={{display: "flex", fontSize: "13px"}}> */}
            <p style={{margin: "auto 0"}}>Rows Per Page : </p>
            <Input
              defaultValue={recordPerPage}
              inputProps={{ "aria-label": "description" }}
              style={{width: "40px", fontSize: "13px", margin: "0 8px"}}
              onChange={(e) => {handleRecordsPerPage(e)}}
            />
          {/* </form> */}
          {pageNo > 0 && (
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

      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}
