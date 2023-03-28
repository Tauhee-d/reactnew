import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import getUsers from '../../Firebase/firebaseControllers/Users';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Modal from '@mui/material/Modal';
import  Button  from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { db } from '../../Firebase/firebase';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddDoc from './AddDoc';
import EditDoc from './EditDoc';
import firebase from '@firebase/app';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const rows = [
 

];

export default function DocList() {


    

    


  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);
  const [rows, setRows] =useState([]);
  const [open, setOpen] =useState(false);
  const [editOpen, setEditOpen] =useState(false);
  const [formId, setFormId] =useState('');
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  useEffect(() => {
    const fetchData = async () => {
        const data = await getUsers()
        const UserTypes = {
          doctor: "doctor",
          admin: "admin",
          nurse:'nurse'
        };
        const DocData = data.filter(user => user.role === UserTypes.doctor)
        setRows(DocData)
        console.log("DOctor",rows)
    }
    fetchData()
}, []) 
console.log("object",rows)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //edit user Data
  

const editUser = (row)=>{
  setFormId({
    id: row.id,
    hospitalID: row.hospitalID,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    role: row.role
  });
    handleEditOpen()
}

console.log("setFormid11111",formId)



//delete users
  const deleteUser = async(userDt) => {
    Swal.fire({
        title: `Do you want to delete ${userDt.firstName}'s record ?`,
        text:"you won't be able to revert this",
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:"blue",
        cancelButtonColor:'red',
        confirmButtonText:'Yes,delete it!'
    }).then(async(result) => {
        if(result.isConfirmed){
            console.log("objectdelete",userDt.id);
            const user = firebase.auth().currentUser;
            await user.delete();
            const docRef = db.collection('users').doc(userDt.id);
            docRef.delete().then(() => {
                Swal.fire("SUCCESS", "Deleted Successfully", "success");
                console.log("objectdelete",userDt.id);

            }).catch((error) => {
                console.error('Error removing document: ', error);
              });
            const userData = rows.filter((stud) => userDt.id !== stud.id);
        setRows(userData);
        // dispatch(deleteStudentAction(studentDt._id));
        }
    })
  }
  
  
 
  return (
    <div style={{padding:"10px"}}>
         <div>
     
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <AddDoc closeEvent={handleClose}/>
         
        </Box>
      </Modal>
      <Modal
        open={editOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <EditDoc closeEvent={handleEditClose} fId={formId}/>
        </Box>
      </Modal>
    </div>
        <div style={{ display:'flex',justifyContent:'space-between'}} >
            <Typography style={{fontWeight:'bold'}}>Doctor List</Typography>
            <Typography style={{border:"1px solid blue",borderRadius:"5px",backgroundColor:'blue'}}>
                <Button style={{color:'white'}} endIcon={<AddCircleIcon />} onClick={handleOpen}>Add</Button>
            </Typography>
        </div>

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align='left' style={{ minWidth: '100px ' }} > ID </TableCell>
                <TableCell align='left' style={{ minWidth: '100px ' }} > Name </TableCell>
                <TableCell align='left' style={{ minWidth: '100px ' }} > Email </TableCell>
                <TableCell align='left' style={{ minWidth: '100px ' }} > Role </TableCell>
                <TableCell align='left' style={{ minWidth: '100px ' }} > Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows

              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log("rowsssssss",row.id)
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                   
                        <TableCell  align='left'> {row.id} </TableCell>
                        <TableCell  align='left'> {row.firstName} {row.lastName} </TableCell>
                        <TableCell  align='left'> {row.email} </TableCell>
                        <TableCell  align='left'> {row.role} </TableCell>
                        <TableCell  align='left'> 
                        <Stack spacing={2} direction='row'>
                            <EditIcon style={{fontSize:'20px',color:'blue',cursor:'pointer'}}onClick={()=> {editUser(row)}} />
                            {/* <EditIcon style={{fontSize:'20px',color:'blue',cursor:'pointer'}}onClick={()=> {editUser(row.id,row.hospitalID,row.firstName,row.lastname,row.email,row.role)}} /> */}
                            <DeleteIcon style={{fontSize:'20px',color:'red',cursor:'pointer'}} onClick={()=> {deleteUser(row)}} />
                        </Stack>
                         </TableCell>
                     
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}
