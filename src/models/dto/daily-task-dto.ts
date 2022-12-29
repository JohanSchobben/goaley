export interface DailyTaskDto {
    id?: number;
    name: string;
    occurrences: number;
    done: boolean;
    startingDate: Date;
}
