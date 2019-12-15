export const updatePurchasable =(updatedIngrediantState)=>
    {
        const ingredients ={...updatedIngrediantState}
     console.log(ingredients +"totalItemsCounttotalItemsCount....")
      const totalItemsCount=  Object.keys(ingredients).map(item=>ingredients[item])
        .reduce((sum,count)=>sum+count,0);
        console.log(totalItemsCount + "totalItemsCount")
     
          return   totalItemsCount>0
            
        
    }
