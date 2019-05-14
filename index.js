import {app} from "./server";
import './cron';


 function init () {
    app.listen(9002);
}

init();