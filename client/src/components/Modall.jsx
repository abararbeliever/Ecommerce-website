import { Dialog,DialogContent,DialogTitle,DialogActions, DialogContentText, Button, TextField } from "@mui/material"
import { useState } from "react"


const Modall = ({value,setValue,cname,setcname,updatecategory}) => {

  

  return (
    <>
            
        <Dialog open={value}>
        <form onSubmit={updatecategory}>
            <DialogTitle>Below your text</DialogTitle>
            <DialogContent>
                <DialogContentText>
                   <TextField value={cname} onChange={(e)=>setcname(e.target.value)} required/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button  type="submit"  >Submit</Button>
                <Button onClick={()=>setValue(!value)}>Disagree</Button>

            </DialogActions>
            </form>
        </Dialog>
       
    </>
  )
}

export default Modall