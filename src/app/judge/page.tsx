'use client'
import { Input, Button, Form } from "antd"
import { ValidateStatus } from "antd/es/form/FormItem"
import { UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import { authenticateJudge } from "@/services/judge"
import { useRouter } from "next/navigation"


export default function Judges() {

    const router = useRouter()
    const [disableForm, setDisableForm] = useState<boolean>(false)
    const [accessCodeStatus, setAccessCodeStatus] = useState<ValidateStatus>("success")
    const [helpMessage, setHelpMessage] = useState<string>("")

    const handleCodeValidation = async (values: any) => {
        localStorage.removeItem("accessToken")
        setDisableForm(true)

        const authenticatedJudge= await authenticateJudge(values)

        if(authenticatedJudge.error){
            setHelpMessage("Codigo invalido")
            setAccessCodeStatus("error")
            setDisableForm(false)

            return
        }

        localStorage.setItem("accessToken", authenticatedJudge.token)

        router.replace("/judge/logged")
    }

    return (
        <Form 
            disabled={disableForm}
            name="judge-auth"
            onFinish={handleCodeValidation}
        >
            <Form.Item
                validateStatus={accessCodeStatus}
                help={helpMessage}
                label="Código de acesso"
                name="accessCode"
                rules={[{ required: true, message: 'Insira seu código de acesso' }]}
            >
                <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Acessar
                </Button>
            </Form.Item>
        </Form>
    )
}