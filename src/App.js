import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router-dom'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Dashboard from "./pages/Dashboard";
import Login from './pages/Login';
import LoginAPI from './pages/LoginAPI';
import Register from './pages/Register';
import QrcodeGenetor from './pages/QrcodeGenetor';
import AdminSettings from './pages/AdminSettings';
import AdminProfile from './pages/AdminProfile';
import AdminProfileAPI from './pages/AdminProfileAPI';
import AdminAdd from './pages/AdminAdd';
import AdminUpdate from './pages/AdminUpdate';
import UserInfomation from './pages/UserInfomation';
import UserUpdate from './pages/UserUpdate';
import UserAdd from './pages/UserAdd';


function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
   
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />  
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/useradd" element={<UserAdd />} />
              <Route path="/userinfomation" element={<UserInfomation />} />
              <Route path="/userupdate/:id" element={<UserUpdate />} />
              <Route path="/qrcodegenetor" element={<QrcodeGenetor />} />
              <Route path="/adminsettings" element={<AdminSettings />} />
              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path="/adminadd" element={<AdminAdd />} />
              <Route path="/adminupdate/:id" element={<AdminUpdate />} />      
            </Routes>         
        </ThemeProvider>
      </ColorModeContext.Provider>
    
    </>
  );
}

export default App;

