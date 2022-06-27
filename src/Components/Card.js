import { useState } from "react"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

import 'bulma/css/bulma.min.css';

export const CardComp = ({
    itm,
    modifyItemToPurchessList,
    purchessList,
    checkoutState
}) =>{

    let q = typeof purchessList[itm.id]?.inBag === 'number'? purchessList[itm.id].inBag : 0;
    const[isAddToBag, setIsAddedToBag] = useState((purchessList[itm.id]?.inBag>0&&true));
    const[qty,setQty] = useState(q);

    const addToCart = (id, itm) => {
        setQty(1);
        setIsAddedToBag(true)
        modifyItemToPurchessList(id,'add', itm)
    }

    const addMore = (id, itm) => {
        if(itm.quantity>=qty+1){
            setQty(qty+1);
            modifyItemToPurchessList(id,'add', itm)
        }
    }

    const removeAdded = (id, itm) => {
        if(qty-1>=0){
            if(qty-1===0){
                setIsAddedToBag(false)
            }
            setQty(qty-1);
            modifyItemToPurchessList(id,'sub', itm)
        }
    }

    let styleImage = checkoutState ===false ? {
        width:120, 
        borderRadius:10
    }:{
        width:70, 
        borderRadius:2
    }

    let cardStyle = checkoutState === false ?{
        sx:{width:320, height:270, boxShadow: 8},
        normal:{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:"flex-end", backgroundColor:'white', color:'black', borderRadius:'7px'}
    }
    :{
        sx:{maxWidth:300, minWidth:350 , height:20,boxShadow: 8 },
        normal:{display:'flex',  flexDirection:"column",alignItems:'center', justifyContent:"space-around", backgroundColor:'white', color:'black', borderRadius:'7px'}
    }

    let cardActionStyle = checkoutState===true ? {padding:"0px"} : {};

    return(
        <>
            
            <Card sx={cardStyle.sx} style={cardStyle.normal}>
                
                
                {!checkoutState && <CardHeader
                    title={itm.name}
                />}
                
                <CardMedia
                    component="img"
                    image={`${itm.imageURL}`}
                    alt={itm.name}
                    sx={styleImage}
                />
                
                <CardContent style={{display:'flex', flexDirection:'row'}}>
                    <div style={{fontSize:"16px",fontWeight:"bold",marginTop:"10px"}}>Rs{itm.price}</div>
                    
                    {checkoutState &&
                     <>
                        <div>Type: {itm.type}</div>
                        <div>Color: {itm.color}</div>
                        <div>Total Cost: {itm.price * qty}</div>
                    </>}
                
                {
                    !isAddToBag &&
                    <CardActions>
                    <Button 
                        size="medium"
                        className="button" 
                        style={{backgroundColor:"black", border:"2px solid black",color:"white",marginLeft:"70px"}}
                        disabled={itm.quantity===qty?true:false}
                        onClick={()=>addToCart(itm.id,itm)}
                    >
                        {
                            itm.quantity!==qty?'ADD TO CART ':'Out Of Stock'
                        }
                    </Button>
                    </CardActions>
                }
                    
                {
                    isAddToBag
                        &&
                    <CardActions style={cardActionStyle}>
                        {checkoutState && <span>Quantity</span>}
                        <Button onClick={()=>addMore(itm.id, itm)} disabled={itm.quantity===qty?true:false}>
                            +
                        </Button>
                        <div>{qty}</div>
                        <Button onClick={()=>removeAdded(itm.id, itm)}>
                            -
                        </Button>
                    </CardActions>
                }
               
               </CardContent>
                
            </Card>
        </>
    )
}