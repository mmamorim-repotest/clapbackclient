
import { Clapback } from "../dist/index.js"

let cb = new Clapback("http://localhost:3030")

cb.ready.then((entities) =>{
    console.log("running",entities);

    cb.entity("Pessoa").model().getAll().then((data) => {
        console.log(data);
    })
})