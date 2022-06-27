import { useState } from 'react'
import { CardComp } from './Card'
import {ShowTotal} from './ShowTotal';

export const CheckOut = ({purchessList, modifyItemToPurchessList, checkoutState, total}) => {
    
    return(
        <div style={{display:'flex', flexDirection:"row",alignItems: "center", justifyContent: "spaceEvenly" }}>
        <div style={{width:'60vw', height:'150vh', scrollBehavior:'smooth',margin:'2%' ,display:'flex', flexDirection:'row', justifyContent:'space-around', flexWrap:'wrap'}}  >
             {Object.keys(purchessList).filter((e)=>purchessList[e].inBag>0).map((entry)=>{
                 return(
                    <div key={purchessList[entry].id.toString()} style={{marginBottom:'10px'}}>
                        <CardComp 
                            itm={purchessList[entry]}
                            modifyItemToPurchessList={modifyItemToPurchessList}
                            purchessList={purchessList}
                            checkoutState={checkoutState}
                        />{
                            isAddToBag
                                &&
                            <CardActions style={cardActionStyle}>
                                {checkoutState && <span>Quantity</span>}
                                <Button onClick={()=>addMore(itm.id, itm)} disabled={itm.quantity===qty?true:false}>
                                    <AddCircleIcon/>
                                </Button>
                                <div>{qty}</div>
                                <Button style={{backgroundColor:"aqua",color:"white",fontWeight:"bold",fontSize:"16px"}} onClick={()=>removeAdded(itm.id, itm)}>
                                    DELETE
                                </Button>
                            </CardActions>
                        }
                    </div>
                 )
             })}
        </div>
        <div style={{width:'30vw', marginLeft:'2%'}}>
            <ShowTotal total={total} />
        </div>
        </div>
    )
}