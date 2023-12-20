import Nominee from '@/interfaces/nominee'
import PodiumStep from './PodiumStep'
import { Flex } from 'antd'

export default function Podium({ winners }: { winners: Nominee[] }) {

    return (
        <Flex vertical align='center' justify='center' gap="large" title='Tops da Balada'>
            <div style={{ textAlign: "center", margin:'10%' }}>
                <h1>Tops da Balada</h1>

            </div>
            <div style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '2rem',
                justifyContent: 'center',
                justifyItems: 'center',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                borderBottom: '1px solid #e5e7eb',


            }}>

                <PodiumStep winner={winners[2]} winner_position={2} />
                <PodiumStep winner={winners[0]} winner_position={0} />
                <PodiumStep winner={winners[1]} winner_position={1} />
            </div>
        </Flex>
    )
}
