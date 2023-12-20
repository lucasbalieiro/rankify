'use client'
import { AuditOutlined, CommentOutlined, CrownOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Divider, Flex, List, Space } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from "next/link";

export default function Home() {

    return (
        <>
            <Flex gap="large" justify="center" style={{ margin: 15 }}>
                <Space direction="vertical">
                    <h1>Bem-vindo ao show de Torturas Auditivas</h1>

                    <h3>O que deseja fazer?</h3>
                    <Divider></Divider>
                    <List itemLayout="horizontal" size="large" >
                        <Link href="/scoreboard">
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<OrderedListOutlined />}
                                    title="Pontuação geral"
                                    description="Se você deseja ver a pontuacao de todos os candidatos, clique aqui"
                                />
                            </List.Item>
                        </Link>

                        <Link href="/judge">
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<AuditOutlined />}
                                    title="Painel de Jurados"
                                    description="Só entre aqui se você for um dos jurados, risco de demissão"
                                />
                            </List.Item>

                        </Link>
                        <Link href="/people">
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<CommentOutlined />}
                                    title="Voz do Povão"
                                    description="Se você tem um candidato favorito, pode votar nele quantas vezes quiser"
                                />
                            </List.Item>
                        </Link>
                        <Link href="/champions">
                            <List.Item >
                                <List.Item.Meta
                                    avatar={<CrownOutlined />}
                                    title="Chamada dos Campeões"
                                    description="Os campeões que serão premiados com um almoço no Restaurante Internacional Mosca-Frita"
                                />
                            </List.Item>
                        </Link>
                    </List>

                </Space>
            </Flex >
            <Footer
                style={{
                    width: "100%",
                    position: "absolute",
                    bottom: 0
                }}
            >
                <p style={{ textAlign: "center" }} >Este software não foi testado e foi feito na hora do almoço, por favor, não abuse</p>
            </Footer>
        </>
    )
}