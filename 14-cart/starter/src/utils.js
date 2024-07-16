export const getTotal=(cart)=>{
    let totalAmount=0
    let totalCost=0
    console.log(cart.values());
    for (const{ amount,price} of cart.values()) {
        totalAmount+=amount
        totalCost = amount*price
    }
return {totalAmount,totalCost}
}