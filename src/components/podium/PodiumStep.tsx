'use client'
import Nominee from '@/interfaces/nominee'
import { motion } from 'framer-motion'

export default function PodiumStep({ winner, winner_position }: { winner: Nominee, winner_position: number }) {
    const offset = 6 - (winner_position * 2)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'center',
            }}
        >
            <motion.div
                style={{
                    alignSelf: 'center',
                    marginBottom: '.25rem'
                }}
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        opacity: 1,
                        transition: {
                            delay: 1 + (offset + 2),
                            duration: 0.75
                        }
                    },
                    hidden: { opacity: 0 }
                }}
            >
                <img
                    src={`/profile_pics/${winner?.name.split(" ")[0].toLowerCase()}.jpeg`}
                    alt=""
                    style={{
                        width: '10rem',
                        overflow: 'hidden',
                        height: '10rem',
                        borderRadius: 9999
                    }}
                />
            </motion.div>

            <motion.div
                style={{
                    width: '10rem',
                    placeContent: 'center',
                    display: 'flex',
                    borderTopLeftRadius: '.5rem',
                    borderTopRightRadius: '.5rem',
                    borderColor: 'rgba(37, 150, 190, 0.7)',
                    backgroundColor: 'rgba(37, 150, 190, 0.7)',
                    marginBottom: -1,
                    filter: `opacity(${0.1 + offset / 3})`
                }}
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        height: 200 * (offset / 3),
                        opacity: 1,
                        transition: {
                            delay: 1 + offset,
                            duration: 2,
                            ease: 'backInOut'
                        }
                    },
                    hidden: { opacity: 0, height: 0 }
                }}
            >
                <span style={{ color: 'white', alignSelf: 'flex-start', fontSize: '90px' }}>
                    {winner_position + 1}
                </span>
            </motion.div>
        </div>
    )
}
