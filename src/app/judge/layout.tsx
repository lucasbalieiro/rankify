'use client'

import styles from './layout.module.css'

import { Layout, Flex } from "antd";

const { Header, Content, Footer } = Layout

export default function JudgeLayout ({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <Flex gap="middle" wrap="wrap" justify='center'>
            <Layout>
                <Header><span className={styles.header_title} >Painel de Jurados</span></Header>
                <Content className={styles.content}>{children}</Content>
                <Footer className={styles.footer}>Se você não for um jurado, se saia. por favor</Footer>
            </Layout>
        </Flex>
    )
}