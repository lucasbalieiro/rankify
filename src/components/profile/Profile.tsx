"use client"
import Nominee from '@/interfaces/nominee'
import styles from './Profile.module.css'
import { Button, Card, Modal, Badge } from 'antd'
import { useState } from 'react';

export default function Profile({ nominee, position }: { nominee: Nominee, position?: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function generateColor(): string {
        const caracteresHex = '0123456789ABCDEF';
        let color = '#';
    
        for (let i = 0; i < 6; i++) {
            color += caracteresHex[Math.floor(Math.random() * 16)];
        }
    
        return color;
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Badge count={position} color={generateColor()}  >
                <Card
                    onClick={showModal}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt={nominee.name} src={nominee.avatar} />
                    }
                >
                    <div style={{ textAlign: "center" }}>
                        <h2>{nominee.name}</h2>
                        <h4>Pontuação Média: {nominee.averageScore}</h4>
                    </div>
                </Card>
            </Badge>
            <Modal title={`Pontuacões de ${nominee.name}`} open={isModalOpen} onOk={handleOk}

                footer={[
                    <Button  key="noice"onClick={handleOk} type='primary'>
                        OK
                    </Button>,

                ]}
            >
                <div style={{ textAlign: "center", margin: 10, fontSize: 20 }}>
                    <h3>Pontuação por Jurado</h3>
                    {nominee.score.map((score, index) => {
                        return <p key={score.judge_id}>Jurado {index + 1}: {score.value}</p>
                    })}
                </div>
            </Modal>

        </>
    )
}