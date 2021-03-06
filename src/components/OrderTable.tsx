
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from "@material-ui/core";
import React, { useMemo } from "react";


// Typescript permet de typer avec des enums, interfaces, etc. pour que le JS soit plus facile à écrire
// c'est une surcouche qui permet d'anticiper les erreurs de typage et se les prendre à la compilation plutôt qu'au runtime
export enum OrderAction {
    BUYTOCOVER = 'BuyToCover'
}

export enum OrderState {
    WORKING = 'working',
    ACCEPTED = 'accepted'
}

export interface Order {
    id: string | number
    account: string
    instrument: string
    action: OrderAction
    quantity: number
    LMT: number
    STP: number
    state: OrderState
    orderId: string
    date: number
}

const generateRandomOrder = () => {

    return {
        id: 'Client912',
        account: 'Sim101',
        instrument: 'ES 12-20',
        action: OrderAction.BUYTOCOVER,
        quantity: Math.floor(Math.random()*1000),
        LMT: Math.floor(Math.random()*1000),
        STP: Math.floor(Math.random()*1000),
        state: Math.round(Math.random()) === 1 ? OrderState.WORKING : OrderState.ACCEPTED,
        orderId: parseInt(Math.random()*10000000000 + '', 16) + '',
        date: Date.now()
    }
}

const useStyles = makeStyles((theme: Theme) => ({
    accepted: {
        backgroundColor: theme.palette.success.light
    },
    working: {
        backgroundColor: theme.palette.error.light
    }
  }))

const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
    const classes = useStyles()


    // normalement on peut supprimer ce bloc fake orders et utiliser "orders", qui provient du composant parent (Home)
    const fakeOrders = useMemo((): Order[] => {
        const fakes = []
        for (let i = 0; i < 10; i++) {
            fakes.push(generateRandomOrder())
        }
        return fakes
    }, [])
    

    return (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Instrument</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>LMT</TableCell>
                <TableCell>STP</TableCell>
                <TableCell>State</TableCell>
                <TableCell>OrderId</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {/* TODO remplacer fakeOrders par orders */}
              {fakeOrders.map((order) => (
                <TableRow key={order.orderId} className={order.state === OrderState.ACCEPTED ? classes.accepted : classes.working}>
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.account}</TableCell>
                  <TableCell>{order.instrument}</TableCell>
                  <TableCell>{order.action}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.LMT}</TableCell>
                  <TableCell>{order.STP}</TableCell>
                  <TableCell>{order.state}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );

}
export default OrderTable