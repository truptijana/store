import 'bulma/css/bulma.min.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BallotIcon from '@mui/icons-material/Ballot';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useState } from 'react';
import { border, fontSize } from '@mui/system';

export const NavBar = (
    {
        count,
        list,
        searchItem,
        togelCheckout,
        checkoutState,
        itemStore,
        setItems
    }
) => {

    const[serchState, setSerchState] = useState(false);
    const [searchWord, setSearchWord] = useState('');

    const searchAction = (e)=>{
        e.preventDefault();
        searchItem(searchWord);
        setSearchWord('');
    }

    return(
        <>
        <div className="navbar" style={{backgroundColor:'silver'}} role="navigation" aria-label="main navigation" >
        <div className="navbar-brand" style={{alignItems:'center', justifyContent:'space-between',width:'100%'}}>

            
            <h1 className="title" style={{color:'black',margin:'10px',fontSize:'20px'}}>
                <div> 
                    <strong>TeeRex Store</strong>
                    </div>
            </h1>      
            
            

            
            {!checkoutState && serchState && 
                    <form onSubmit={searchAction}> 
                        <div style={{width:'40vw', display:'flex'}}>
                            <input value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} className="input is-normal is-dark" type="text" placeholder="Search Heare ..."  />  
                            <button className="button is-dark ">
                                <SearchIcon fontSize="medium"/>
                            </button>
                        </div>
                    </form>
                }
            
            
                <div className="navbar-item">
                    <div className="buttons">
                    
                         {!checkoutState && <button style={{backgroundColor:"black",color:"white"}}className="button" onClick={() => {
                            if(serchState===true){
                                searchItem('all');
                            }
                            setSerchState(!serchState);}
                        }>
                        { !serchState &&   <SearchIcon fontSize="medium"/>}
                        { serchState &&   <SearchOffIcon fontSize="medium"/>}
                        </button>}
                    

                    

                        <button style={{backgroundColor:"silver",fontSize:"16px",border:"none",color:"black",marginRight:"38px",marginTop:"-9px"}}onClick={()=>togelCheckout(false)}>
                            <span style={{borderBottom:"1px solid black" }}>Products</span>
                        </button>
                    

                    
                        <button className="button" style={{backgroundColor:"silver",marginRight:"50px",border:"1px solid grey"}}onClick={
                            ()=>{
                                togelCheckout(true)
                                setItems(itemStore);
                            }
                        }>
                            <Badge badgeContent={count}  color="secondary">
                             
                            <ShoppingCartIcon fontSize="medium"/> 
                           <sup style={{marginTop:"-6px"}}>1</sup>
                            </Badge>
                        </button>
                    

                    </div>
                </div>      

            </div>
            </div>   
            </>
    )
}