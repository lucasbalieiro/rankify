'use client'
import { Avatar, Card, Divider, Flex, List, Space } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from "next/link";

export default function Home() {

    return (
        <>
            <Flex gap="large" justify="center">
                <Space direction="vertical">
                    <h1>Bem-vindo ao show de Torturas Auditivas</h1>

                    <h3>O que deseja fazer?</h3>
                    <Divider></Divider>
                    <List itemLayout="horizontal">
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random() * 10}`} />}
                                title={<Link href="/scoreboard">Pontuação geral</Link>}
                                description="Se você deseja ver a pontuacao de todos os candidatos, clique aqui"
                            />
                        </List.Item>

                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random() * 10}`} />}
                                title={<Link href="/judge">Painel de Jurados</Link>}
                                description="Só entre aqui se você for um dos jurados, risco de demissão"
                            />
                        </List.Item>

                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random() * 10}`} />}
                                title={<Link href="#">Voz do Povão</Link>}
                                description="Se você tem um candidato favorito, pode votar nele quantas vezes quiser"
                            />
                        </List.Item>
                        <List.Item >
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random() * 10}`} />}
                                title={<Link href="#">Chamada dos Campeões</Link>}
                                description="Resultado final dos 3 primeiros colocados para a premiação de um frango assado"
                            />
                        </List.Item>
                    </List>

                </Space>
            </Flex>
            <Footer
            style={{
                width: "100%",
                position: "absolute",
                bottom: 0
            }}
            >
                <p style={{textAlign:"center"}} >Este software não foi testado e foi feito na hora do almoço, por favor, não abuse</p>
                </Footer>
        </>
    )
}