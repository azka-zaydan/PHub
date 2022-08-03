import { Card, Button, Row, Col } from 'react-bootstrap'
import { formatCurrency } from '../utils/currencyFormat'
import { useState } from 'react'
import { useShoppingCart } from '../context/ShoppingCart'
import { useCurrency } from '../context/Currency'
export type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {

    const { getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
    const [truePrice, setTruePrice] = useState(price)
    const { convertIntoUSD, convertIntoIDR, idr } = useCurrency()
    console.log(idr)
    const convert = () => {
        if (idr === false) {
            convertIntoIDR()
            setTruePrice(prev => prev * 15_000)
        } else {
            convertIntoUSD()
            setTruePrice(price)
        }
    }
    console.log(truePrice)
    return (
        <Card className='h-100' >
            <Card.Img variant='top' src={imgUrl} height='200px' style={{ objectFit: 'cover' }} />
            <Row>
                <Card.Body className='d-flex flex-column' >
                    <Col>
                        <Card.Title className='d-flex justify-content-between align-items-baseline
                mb-4' >
                            <span className='fs-2 mx-1' >
                                {name}
                            </span>
                        </Card.Title>
                    </Col>
                    <div className=''>

                        {idr ?
                            (
                                <Col className='mx-3 my-2'>
                                    <Button variant='info' style={{ gap: '1rem' }} onClick={convert}>IDR</Button>
                                    <span className='ms-2 text-muted'>{(formatCurrency(truePrice))}</span>

                                </Col>
                            )
                            : (
                                <Col className='mx-3 my-2'>
                                    <Button variant='info' style={{ gap: '1rem' }} onClick={convert}>USD</Button>
                                    <span className='ms-2 text-muted'>{(formatCurrency(truePrice))}</span>
                                </Col>
                            )}
                        {quantity < 1 ? (
                            <Button className='mx-3' onClick={() => increaseCartQuantity(id)} >Add to Cart</Button>
                        ) :
                            <Col>
                                <div className='d-flex align-items-center
                        flex-column' style={{ gap: '1rem' }}>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <Button className='mx-1' onClick={() => decreaseCartQuantity(id)}>-</Button>
                                        <span className='fs-3'>{quantity} in cart</span>
                                        <Button className='mx-1' onClick={() => increaseCartQuantity(id)}>+</Button>
                                    </div>
                                    <Button variant='danger' onClick={() => removeFromCart(id)} >Remove</Button>
                                </div>
                            </Col>
                        }
                    </div>
                </Card.Body>
            </Row>
        </Card >
    )
}

