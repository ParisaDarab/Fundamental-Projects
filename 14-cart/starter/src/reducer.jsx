import{LOADING,
    INCREASE,
    DECREASE,
    DISPLAY_ITEMS,
    REMOVE,
    CLEAR_CART} from './actions'

export default function reducer(state,action){
    switch (action.type) {
        case CLEAR_CART:
            return {...state,cart: new Map()}
            break;
            case REMOVE:
                const newArray=new Map(state.cart)
                newArray.delete(action.payload.id)
                return {...state,cart: newArray }
                break;
                case INCREASE:
                    const newCart=new Map(state.cart)
                   const item= newCart.get(action.payload.id)
                   newCart.set(item.id,{...item,amount:item.amount+1})
                   return {...state,cart:newCart}
                   
                    break;
                    case DECREASE:
                      const cartItem=new Map(state.cart)
                      const itemId=action.payload.id
                     const newItem= cartItem.get(itemId)
                      if(newItem.amount==1){
                        cartItem.delete(itemId)
                        return{...state, cart:cartItem}
                      }
                        cartItem.set(itemId,{...newItem, amount:newItem.amount-1})
                        return{...state, cart:cartItem}
                        break;
                        case LOADING:
                          return {...state,loading:true}
                          break;
                          case DISPLAY_ITEMS:
                            const items=new Map(action.payload.cart.map((item)=>[item.id,item]))
                            return {...state,loading:false,cart:items}
                            break;
        
        default:
            break;
    }
    return state
   }