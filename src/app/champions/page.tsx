"use client"

import style from "./page.module.css"

import Lottie from "lottie-react"
import rankingAnimation from "./ranking_animation.json"
import { Layout } from "antd"
import Nominee from "@/interfaces/nominee"
import { useEffect, useState } from "react"
import { getNominees } from "@/services/nominee"

export default function ChampionsByJduge() {

    const [nominees, setNominees] = useState<Nominee[]>([])

    useEffect(() => {
        getNominees()
            .then((data) => {
                setNominees(data.slice(0, 3))
            })
    }, [])

    const { Content } = Layout

    return (

        <Layout className={style.layout}>
            <Content >

                <div>
                    <Lottie animationData={rankingAnimation} loop={false}>
                    </Lottie>
                    <img className={style.third_place} src={`/profile_pics/${nominees[2]?.name.toLowerCase().split(' ')[0]}.jpeg`} alt="champion" />
                    <img className={style.first_place} src={`/profile_pics/${nominees[0]?.name.toLowerCase().split(' ')[0]}.jpeg`} alt="champion" />
                    <img className={style.second_place} src={`/profile_pics/${nominees[1]?.name.toLowerCase().split(' ')[0]}.jpeg`} alt="champion" />
                </div>
            </Content>
        </Layout>
    )
}