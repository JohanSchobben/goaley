import {Module} from "vuex";
import {DailyTask} from "../models/daily-task";
import {DailyTaskDto} from "../models/dto/daily-task-dto";
import {addEntity, deleteEntity, getAllEntity} from "../utils/database";

interface DailyModuleState {
    dailies: DailyTask[];

}

export const dailyModule: Module<DailyModuleState, any> = {
    state: {
        dailies: []
    },
    getters: {
        activeDailies: state => state.dailies.filter(d => !d.done),
        dailies: state => state.dailies
    },
    mutations: {
        setDailies: (state, payload) => {
            state.dailies = payload
        },
        addDaily: (state, payload) => {
            state.dailies.push(payload)
        },
        removeDaily: (state, payload) => {
            state.dailies = state.dailies.filter(d => d.id !== payload)
        }
    },
    actions: {
        getDailies: async ({commit}) => {
            const dailies = await getAllEntity("dailyExecution");
            commit("setDailies", dailies);
        },
        addDaily: async ({commit}, daily: DailyTask) => {
            const dto: DailyTaskDto = {
                done: daily.done,
                startingDate: daily.startingDate,
                occurrences: daily.occurrences,
                name: daily.name
            };
            daily.id = await addEntity("daily", dto);
            commit("addDaily", daily);
        },
        removeDaily: async ({commit}, id: number) => {
            await deleteEntity("daily", id);
            commit("removeDaily", id);
        }
    }

}
