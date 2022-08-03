import { Stack } from "react-bootstrap"
import StoreItems from '../data/items.json'
import { formatCurrency } from "../utils/currencyFormat"

type CartItemProps = {
    id: number
    quantity: number
}

export const CartItem = ({ id, quantity }: CartItemProps) => {
    const item = StoreItems.find(i => i.id === id)

    if (item === null) return null
    return (
        <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
            <img src={item?.imgUrl}
                style={{ width: '125px', height: "75px", objectFit: "cover" }}
                alt="something" />

            <div className="me-auto">
                <div>
                    {item?.name} {quantity > 1 && <span className="text-muted" style={{ fontSize: '.65rem' }}>x{quantity}</span>}
                </div>
                <div className="text-muted" style={{ fontSize: '.75rem' }}>
                    {item !== undefined ?
                        formatCurrency(item.price) : null}
                </div>
                <div>{item !== undefined ?
                    formatCurrency(item.price * quantity) : null}</div>
            </div>

        </Stack>
    )

}