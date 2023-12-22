export default interface Nominee {
    _id: string;
    name: string;
    section: string;
    score: NomineeScore[];
    avatar: string;
    totalScore?: number
    totalPeopleScore?: number
}

interface NomineeScore {
    judge_id: string
    value: number
}