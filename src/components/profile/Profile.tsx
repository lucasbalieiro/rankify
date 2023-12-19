import Nominee from '@/interfaces/nominee'
import styles from './Profile.module.css'
import { Card } from 'antd'

export default function Profile({ nominee }: { nominee: Nominee }) {
    function calculateScores(nominee: Nominee){
        const computedScore = nominee.score.reduce(
            (previous, current) => previous + current.value, 0
        )
        return (computedScore / nominee.score.length)
    }

    const { Meta } = Card
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt={nominee.name} src={nominee.avatar} />}
        >
            <Meta title={nominee.name} description={nominee.averageScore} />
        </Card>
    )
}