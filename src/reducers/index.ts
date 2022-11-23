import {combineReducers} from 'redux'
import edit from './edit'
import add from './add'
import del from './del'
import caAdd from "./caAdd"
import caDelete from "./caDelete"
import caEdit from "./caEdit"
import category from "./category"
import cartContains from "./cartContains"


export default combineReducers({
    edit,
    add,
    del,
    caAdd,
    caDelete,
    caEdit,
    category,
    cartContains
})