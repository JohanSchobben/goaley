export interface DailyTask {
    id?: number;
    name: string;
    occurrences: number;
    startingDate: Date;
    done: boolean;
}
