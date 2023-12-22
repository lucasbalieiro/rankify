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

    const first_place = nominees[0]?.name.toLowerCase().split(' ')[0]
    const second_place = nominees[1]?.name.toLowerCase().split(' ')[0]
    const third_place = nominees[2]?.name.toLowerCase().split(' ')[0]
    return (

        <Layout className={style.layout}>
            <Content>
                <div>

                    <Lottie animationData={rankingAnimation} loop={false}>
                    </Lottie>
                    <img className={style.third_place} src={`/profile_pics/${third_place}.jpeg`} alt="champion" />
                    <img className={style.first_place} src={`/profile_pics/${first_place}.jpeg`} alt="champion" />
                    <img className={style.second_place} src={`/profile_pics/${second_place}.jpeg`} alt="champion" />

                </div>
            </Content>
        </Layout>
    )
}