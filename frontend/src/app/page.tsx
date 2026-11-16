import { Box, Typography, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import { RegistrationPage } from './pages/registrationPage';
import { Background } from './components/backgroundComponet';
export default function Page() {
  return (
    <div className='flex'>
    <div className='w-xl'>
    <Background/>  
    </div>
    <div className='w-3xl'>
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center',  gap: 3,maxWidth:500, mx: 'auto', mt: 4 }}>
     <RegistrationPage/>
    </Box>
    </div>
    
    </div>
    
  );
}
