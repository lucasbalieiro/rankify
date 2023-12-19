"use client"
import { Flex } from 'antd'

import './page.module.css'
import Profile from '@/components/profile/Profile'
import { useEffect, useState } from 'react'
import { getNominees } from '@/services/nominee'
import Nominee from '@/interfaces/nominee'

export default function Home() {

  const [nominees, setNominees] = useState<Nominee[]>([])

  useEffect(() => {
    getNominees()
      .then((data) => {
        setNominees(data)
      })
  }, [])

  return (
    <Flex gap="middle" wrap="wrap" justify='center' align='center'>
      {nominees.map((nominee) => <Profile nominee={nominee}/>)}
    </Flex>
  )
}
