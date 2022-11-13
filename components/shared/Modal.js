
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "@emotion/styled";
import Button from '../shared/Button';
import breakpoint from '../utils/Breakpoints';

const CustomDialog = styled(Dialog)`
    .MuiDialog-paper{
        background-color: #F8F8F8;
        box-shadow: 0px 3px 20px #0000003C;
        border-radius: 20px;
    }
`
const StyledButton = styled(Button)`
    @media ${breakpoint.device.md}{
        padding: 0.5rem 1rem;
      }
`;
const Modal = ({isOpen,handleClose,handleSubmit,title,btnText,hasHeader,hasFooter,children}) => {
    return ( 
        <>
        <CustomDialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth = {true}
            maxWidth='xs'
        >
            {hasHeader===true ? 
                <DialogTitle id="alert-dialog-title" sx={{fontSize:'15px',color:'#525252',textAlign:'center',fontWeight:'bold'}}>
                    {title}
                </DialogTitle>
            : null }
            <DialogContent sx={{height:{xs:'10rem',md:'auto'}, display:'flex', alignItems:'top'}}>
            <DialogContentText id="alert-dialog-description" sx={{color:'#444', marginTop:'0.5rem', fontSize:{xs:'0.8rem',lg:'1.25rem', width:'100%'}}}>
                {children}
            </DialogContentText>
            </DialogContent>
            {hasFooter===true ? 
            <DialogActions sx={{alignSelf:'center',marginBottom:'2rem'}}>
                <StyledButton autoFocus type="submit" onClick={()=>handleSubmit()}>
                    {btnText ? btnText : 'SUBMIT'}
                </StyledButton>
            </DialogActions>
            : null }
        </CustomDialog>
        </>
     );
}
 
export default Modal;

