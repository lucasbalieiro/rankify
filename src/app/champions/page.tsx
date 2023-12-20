'use client'

import Podium from "@/components/podium/Podium"
import Nominee from "@/interfaces/nominee"
import { getNominees } from "@/services/nominee"
import { Flex } from "antd"
import { useEffect, useState } from "react"


export default function Champions() {
    const [nominees, setNominees] = useState<Nominee[]>([])

    useEffect(() => {
        getNominees()
            .then((data) => {
                setNominees(data.slice(0, 3))
            })
    }, [])
    return (
        <Flex align="center" justify="center"
          >
            <Podium winners={nominees} />
        </Flex>
    )
}