
export default function add( state=false, action: { type:"TOGGLE_ADD"; payload:boolean }){
    switch (action.type){
        case "TOGGLE_ADD":
            return action.payload
        default:
            return state
    }
}