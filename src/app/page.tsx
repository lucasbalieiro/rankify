"use client"
import { Flex, Divider } from 'antd'

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
    <>
      <Flex vertical gap="large" wrap="wrap" justify='center' align='center'>
        <Divider plain>
          <h1 style={{ textAlign: 'center' }}>Até que cantam bem</h1>
        </Divider>
        <Flex gap="large" wrap="wrap" justify='center' align='center'>
          {nominees.slice(0, 3).map((nominee, index) => <Profile key={index} nominee={nominee} position={index + 1} />)}
        </Flex>
      </Flex>
      <Flex vertical gap="large" wrap="wrap" justify='center' align='center'>
        <Divider>
          <h1 style={{ textAlign: 'center' }}>Inimigos do Ritmo</h1>
        </Divider>
        <Flex gap="large" wrap="wrap" justify='center' align='center'>
          {nominees.slice(3).map((nominee, index) => <Profile key={index+99} nominee={nominee} position={index + 4} />)}
        </Flex>
      </Flex>
    </>
  )
}
