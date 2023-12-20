'use client'

import { Input, Select, Button, Rate, notification, Form, Flex } from 'antd';
import { useEffect, useState } from 'react';
import Nominee from '@/interfaces/nominee';
import { getNominees, setPeopleScore } from '@/services/nominee';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationParams {
    type: NotificationType;
    title: string;
    description: string;
}

export default function People() {
    const [nominees, setNominees] = useState<Nominee[]>([]);
    const [loadingNominees, setLoadingNominees] = useState<boolean>(false);
    const [disableForm, setDisableForm] = useState<boolean>(false);
    const [captchaChallenge, setCaptchaChallenge] = useState<{ num1: number; num2: number; result: number }>({
        num1: 0,
        num2: 0,
        result: 0,
    });
    const [userInput, setUserInput] = useState<number | string>('');

    const [notificationApi, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();

    useEffect(() => {
        setLoadingNominees(true);

        const num1 = Math.floor(Math.random() * 100);
        const num2 = Math.floor(Math.random() * 100);

        setCaptchaChallenge({ num1, num2, result: num1 + num2 });

        getNominees()
            .then((data) => {
                setNominees(data);
            })
            .finally(() => {
                setLoadingNominees(false);
            });
    }, []);

    const handleVote = async (values: any) => {
        console.log(values)
        const securityAnswer = parseInt(values.captcha)
        if (securityAnswer != captchaChallenge.result) {
            handleNotification({
                description: "Como assim você errou essa conta de adição?",
                title: "Errou feio, errou rude!",
                type: "error"
            })
            return
        }

        setDisableForm(true)
        const response = await setPeopleScore({ nominee_id: values.nominee, score: values.score })
        if (response.error) {
            handleNotification({
                description: "Oops, chama o bombeiro",
                title: "Nada resolvido",
                type: "error"
            })
            setDisableForm(false)
            return
        }
        handleNotification({ description: "Voto computado com sucesso", title: "Tudo certo", type: "success" })

        const num1 = Math.floor(Math.random() * 100);
        const num2 = Math.floor(Math.random() * 100);
        const result = num1 + num2

        setCaptchaChallenge({ num1, num2, result })

        setDisableForm(false);
    };

    const handleNotification = (params: NotificationParams) => {
        notificationApi[params.type]({
            message: params.title,
            description: params.description,
        });
    };

    return (
        <>
            <Flex gap="large" align='center' justify='center' style={{ margin: 15 }} vertical>
                <h1>Voz do Povo</h1>
                <h4>Você pode votar quantas vezes quiser, desde que tenha paciência para isso</h4>
                {contextHolder}
                <Form
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                    disabled={disableForm}
                    name="vote-nominee"
                    onFinish={handleVote}
                    initialValues={{
                        score: 2.5,
                    }}
                    form={form}
                >
                    <Form.Item
                        label="Selecione um candidato"
                        name="nominee"
                        rules={[{ required: true, message: 'Selecione um bocó' }]}
                    >
                        <Select
                            size="large"
                            loading={loadingNominees}
                            showSearch={true}
                            filterOption={(input, option) =>
                                (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                            }
                            options={nominees.map((n) => {
                                return { value: n._id, label: n.name };
                            })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Qual a pontuação?"
                        name="score"
                        rules={[
                            {
                                required: true, message: 'Você precisa dar pelo menos uma estrela. Deixa de ser assim',
                            },
                        ]}
                    >
                        <Rate allowClear allowHalf style={{ fontSize: 60 }} />
                    </Form.Item>

                    <Form.Item
                        label={`Quanto é ${captchaChallenge.num1} + ${captchaChallenge.num2}?`}
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: 'Prove-me que você tem ensino fundamental',
                            }
                        ]}
                    >
                        <Input size="large" type='number' value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                            Votar
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    );
}
