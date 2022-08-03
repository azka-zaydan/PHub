import { Container, Button, Row, Col } from "react-bootstrap"
import React, { FC, useState } from "react"
import { useGameLocalStorage } from "../hooks/useGameLocalStorage"

export const Game: FC = () => {
    const [count, setCount] = useState(0)
    const [score, setScore] = useGameLocalStorage<number>("game", 0)
    const [save, setSave] = useState(false)
    const [multiplier, setMultiplier] = useState(1)
    const handleButton = () => {
        setCount((prev) => prev + (1 * multiplier))
    }
    const saveGame = () => {
        setScore(prev => Number(prev) + count)
        setCount(0)
        setSave(true)
    }

    const multiply = () => {
        setMultiplier(prev => prev * 2)
    }



    const divide = () => {
        if (multiplier === 1) {
            alert('Cannot divide again')
        } else {
            setMultiplier(prev => prev / 2)
        }
    }

    return (
        <Container>
            <h1>Clicker Game</h1>
            <hr />
            <Row>
                <Button
                    onClick={handleButton}>
                    press me
                </Button>
                <Col>
                    <p className='my-3'>
                        your score: {count}
                        {count > 50 ? (
                            "🔥🔥🔥"
                        ) : null}
                    </p>
                </Col>
                {
                    count > 20 && score < 21 ? (
                        <p>Save To Get A Surprise!!</p>
                    ) : null
                }
            </Row>
            <Row>
                <Col>
                    <Button
                        variant='outline-info'
                        className='mx-auto'
                        onClick={saveGame} >
                        Save Score
                    </Button>
                    {save ? (
                        <p className='' style={{ position: 'absolute' }} >saved score: {score}</p>
                    ) : null}
                </Col>
                {
                    score > 20 ? (
                        <>
                            <Col>
                                <Button
                                    variant='outline-success'
                                    className='mx-auto'
                                    onClick={multiply}>
                                    Multiply by 2x
                                </Button>
                                <p className="mx-auto">Current multiplier: {multiplier}</p>
                            </Col>
                            {multiplier === 1 ?
                                <Col>

                                    <Button
                                        variant='outline-danger'
                                        className='mx-auto'
                                        onClick={divide}
                                        disabled
                                    >
                                        Divide by 2
                                    </Button>
                                </Col> : <Col>

                                    <Button
                                        variant='outline-danger'
                                        className='mx-auto'
                                        onClick={divide}
                                    >
                                        Divide by 2
                                    </Button>
                                </Col>}
                        </>
                    ) : null}
            </Row>
        </Container >
    )
}