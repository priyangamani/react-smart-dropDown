import React, { useState, useEffect,Fragment } from 'react';
import { isEmpty } from 'lodash'; 
import { isEqual} from 'lodash'; 
import useDebounce from './debounce';
import {ListItem,InputAdornment,List,TextField,ListItemText,Typography} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import './App.css';



function App(props) {
    const [search, setSearch] = useState("");
    const [showMoreItem, setShowMoreItems] = useState(5);
    const [countryResponse, setCountryResponse] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [searchTxt,setSearchTxt]=useState('');
    const onchange = e => {
        setSearch(e.target.value);
    };
    
    useEffect(() => {
        setCountryResponse(props.data);
    }, [props.data]);
    const debouncedSearchTerm = useDebounce(search, 500);

    useEffect(() => {
        if (countryResponse) {
            const filteredCountries = countryResponse.filter(country => {
                return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
            let list = filteredCountries.slice(0, showMoreItem);
            setCountryList(list);
       
            if(isEmpty(list)){
                setSearchTxt(`"${search}" not Found`);
                setShowMore(false);
            }else{
                setSearchTxt(``);
                setShowMore(true);
            }
        }
      
    }, [countryResponse, debouncedSearchTerm, showMoreItem, search]);

    const addFunc = () => {
        const newItem = { name: search, code: search };
        const addlist = [...countryList, newItem];
        setCountryList(addlist);
        setSearchTxt(``);
        setShowMore(false);
    }

    const showMoreFunc = () => {
        const visibleItemsCount = countryList.length;
        setCountryList(countryResponse.slice(countryList, visibleItemsCount + 5));
        if(isEqual(visibleItemsCount,countryList)){
            setShowMore(false);
        }
    }

    return (
        <Fragment>
        <TextField
          label="Search ..."
          id="outlined-start-adornment"
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
          }}
          variant="outlined"
          onChange={onchange} 
        />

            <Typography variant="h6" component="h2">
            {searchTxt}
            </Typography>
            <List>
            {countryList.map((country, i) =>
              <ListItem key={i} >
              <ListItemText primary={country.name} />
            </ListItem>
            )}
     </List>
            {showMore && <div onClick={showMoreFunc}>{showMoreItem} more ...</div>}
            {!isEmpty(searchTxt) &&  <Button variant="contained" color="primary" onClick={addFunc}>Add&Search</Button>}
      </Fragment>

    );
}
export default App;

