export default interface Nominee {
    _id: string;
    name: string;
    section: string;
    score: NomineeScore[];
    avatar: string;
    averageScore?: number
    totalPeopleScore?: number
    weightedAverage?: number
}

interface NomineeScore {
    judge_id: string
    value: number
}