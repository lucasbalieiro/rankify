'use client'
import Nominee from "@/app/interfaces/nominee"
import { validateToken } from "@/app/services/judge"
import { getNominees, setScore } from "@/app/services/nominee"
import { Form } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Select, Button, Rate, notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationParams {
    type: NotificationType,
    title: string,
    description: string
}
export default function LoggedJudge() {

    const [nominees, setNominees] = useState<Nominee[]>([])
    const [loadingNominees, setLoadingNominees] = useState<boolean>(false)
    const [disableForm, setDisableForm] = useState<boolean>(false)

    const [notificationApi, contextHolder] = notification.useNotification();

    const router = useRouter()
    async function validateAuthentication() {
        const token = localStorage.getItem("accessToken")

        if (token == null) {
            router.replace("/judge")
        }
        const judge = await validateToken(token)
        if (judge.error) {
            localStorage.removeItem("accessToken")
            router.replace("/judge")
        }
    }
    useEffect(() => {
        validateAuthentication().finally();
    }, [])


    useEffect(() => {
        setLoadingNominees(true)
        getNominees().then((data) => {
            setNominees(data)
        })
            .finally(() => {
                setLoadingNominees(false)
            })
    }, [])
    const handleVote = async (values: any) => {
        const accessToken = localStorage.getItem("accessToken") ?? ''
        setDisableForm(true)
        const response = await setScore({ nominee_id: values.nominee, score: values.score, token: accessToken })
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

        setDisableForm(false)

    }

    const handleNotification = (params: NotificationParams) => {
        notificationApi[params.type]({
            message: params.title,
            description: params.description
        });
    };

    return (
        <>
            {contextHolder}
            <Form
            style={
                {
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                }
            }
                disabled={disableForm}
                name="vote-nominee"
                onFinish={handleVote}
                initialValues={
                    { score: 2.5 }
                }
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
                        filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                        options={nominees.map((n) => {
                            return { value: n._id, label: n.name }
                        })}
                    />
                </Form.Item>

                <Form.Item
                    label="Qual a pontuação?"
                    name="score"
                    rules={[{ required: true, message: "Você precisa dar pelo menos uma estrela. Deixa de ser assim" }]}
                >
                    <Rate allowClear allowHalf
                        style={{ fontSize: 60 }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large">
                        Votar
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}