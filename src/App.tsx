import { Box, CssBaseline, Switch, ThemeProvider } from "@mui/material";
import { useThemeContext } from "./theme/ThemeContextProvider";
import './App.css';
import BasicTable from "./BasicTable/BasicTable";
import { useEffect, useMemo, useState } from "react";
import data from './api/data.json';
import { Data } from "./types/types";
import AddFormDialog from "./AddFormDialog/AddFormDialog";
import { editObjectById } from "./helpers/helpers";
import FilterByCategory from "./Filter/FilterByCategory";
import FilterByName from "./Filter/FilterByName";
import Pagination from "./Pagination/Pagination";

function App() {
  const [list, setList] = useState<Data[]>(data);
  const [filteredList, setFilteredList] = useState(list);
  const [filterByCategory, setFilterByCategory] = useState('All');
  const [filterByName, setFilterByName] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { theme, toggleColorMode } = useThemeContext();

  const filterData = () => {
    let filteredData = list;

    if (filterByCategory !== 'All') {
      filteredData = filteredData.filter((item) => item.category === filterByCategory);
    }

    if (filterByName.trim() !== '') {
      filteredData = filteredData.filter((item) => item.name.toLowerCase().includes(filterByName.toLowerCase()));
    }

    setFilteredList(filteredData);
  };

  useEffect(() => {
    filterData();
  }, [filterByCategory, filterByName, list]);

  useEffect(() => {
    setPage(0);
  }, [filterByName, filterByCategory])

  const handleDelete = (id: number) => {
    setList((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddItem = (newItem: Data) => {
    setList((prevItems) => [...prevItems, newItem]);
  };

  const handleEdit = (newItem: Data) => {
    setList((prevItems) => editObjectById(prevItems, newItem));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box mt={2} sx={{ display: 'flex', flexDirection:'row', justifyContent: 'space-around', alignItems: 'center' }} >   
        <FilterByCategory 
          filteredList={list} 
          setFilterByCategory={setFilterByCategory} 
          filterByCategory={filterByCategory} 
        />
        <FilterByName setFilterByName={setFilterByName} />
        <Switch onChange={toggleColorMode} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
      <Box mt={2} sx={{ width: '90%' }} >
        <BasicTable 
          list={filteredList.slice(page * rowsPerPage, (page + 1) * rowsPerPage)} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
        />
      </Box>
      </Box>
      <Box mt={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
        <AddFormDialog
          handleAddItem={handleAddItem} 
          list={filteredList} 
        />
        <Pagination 
          list={filteredList}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage} 
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
