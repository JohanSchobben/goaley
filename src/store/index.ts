import {createStore} from "vuex";
import {dailyModule} from "./daily";

export default createStore({
    modules: {
        daily: dailyModule
    }
})
