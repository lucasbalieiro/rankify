"use client"

import { Flex } from "antd"

import style from './peopleChampion.module.css'
import { useEffect, useState } from "react"
import { getNominees } from "@/services/nominee"
import Nominee from "@/interfaces/nominee"
import Lottie from "lottie-react"
import fireworkAnimation from './fireworks.json'


export default function PeopleChampion() {

    const [loading, setLoading] = useState<boolean>(false)
    const [winner, setWinner] = useState<Nominee>({
        name: "Calma ai que eu tô contando os votos",
        totalPeopleScore: 0,
        avatar: "/congrats.gif",
        score: [{ judge_id: '0', value: 0 }],
        section: "Loading",
        _id: "loading",
        totalScore: 0

    })

    function compare(a: Nominee, b: Nominee) {
        if (a.totalPeopleScore < b.totalPeopleScore) {
            return 1;
        }
        if (a.totalPeopleScore > b.totalPeopleScore) {
            return -1;
        }
        return 0;
    }

    useEffect(() => {
        setLoading(true)
        let nominee: Nominee;
        getNominees()
            .then((data): void => {
                nominee = (data as Nominee[])
                    .sort(compare)
                [0]

            })

        setTimeout(() => {
            setWinner(nominee)
            setLoading(false)
        }, 5000)

    }, [])
    return (

        <Flex className={style.container} gap="large" vertical justify="center" align="center">

            <h1>Fofolete da Galera</h1>

            <img className={style.winner} src={`${!loading ? "/profile_pics/" + winner?.name.toLowerCase().split(" ")[0].concat(".jpeg") : "/congrats.gif"}`} alt="winner" />
            <h1>{winner?.name}</h1>
            <h3>{`${winner?.totalPeopleScore} pontos`}</h3>
            {loading ? '' : <Lottie className={style.fireworks} animationData={fireworkAnimation} />}


        </Flex>
    )
}