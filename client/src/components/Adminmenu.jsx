import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth } from '../context/Auth.js'
import Createcategory from '../pages/Createcategory.jsx';
import Createproduct from '../pages/Createproduct.jsx';
import Adminusers from '../pages/Adminusers.jsx';
import Allproducts from '../pages/Allproducts.jsx';
import Updateproduct from '../pages/Updateproduct.jsx';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Adminmenu() {
  const [value, setValue] = React.useState(0);
  const [auth,setAuth]=useAuth();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height:'auto',border:"0px solid black",margin:0 }}
    >
      <Tabs sx={{border:"0px solid black",width:"300px",minHeight:"80vh"}}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
       
      >
        <Tab label=" Create Category" {...a11yProps(0)}  sx={{
            "&.Mui-selected": {
              backgroundColor: 'lightblue',
            }
          }}/>
        <Tab label="Create Product" {...a11yProps(1)}sx={{
            "&.Mui-selected": {
              backgroundColor: 'lightblue',
            }
          }} />
        <Tab label="Product list" {...a11yProps(2)} sx={{
            "&.Mui-selected": {
              backgroundColor: 'lightblue',
            }
          }}/>
          <Tab label="Update product" {...a11yProps(3)} sx={{
            "&.Mui-selected": {
              backgroundColor: 'lightblue',
            }
          }}/>
      </Tabs>
      <Box sx={{width:'100%',border:'0px solid blue'}}>
      <TabPanel value={value} index={0}>
        <Createcategory/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Createproduct/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <Allproducts/>
      </TabPanel>
      <TabPanel value={value} index={3}>
       <Updateproduct setValue={setValue}/>
      </TabPanel>
      </Box>
      
 
    </Box>
  );
}