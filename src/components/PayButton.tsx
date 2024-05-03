import { useConnect, useAccount, useWriteContract } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { useState } from 'react';
import { bscTestnet } from 'wagmi/chains';
import { Button } from 'antd';


export const PayButton = ({ price }: { price: number }) => {
  const { connectAsync } = useConnect()
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [started, setStarted] = useState(false)
  const [errors, setErrors] = useState("")
  const [completed, setCompleted] = useState(false)

  const handlePayment = async () => {
    try {
      setErrors('')
      setStarted(true)
      if(!address) {
        await connectAsync({ chainId: bscTestnet.id, connector: injected()})
      }

      const data = await writeContractAsync({
        chainId: bscTestnet.id,
        address: '0x50E8B428cFe4daaBA8d1c3085d3Da9f901c8165f', // change to receipient address
        functionName: 'transfer',
        abi: [{ "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }],
        args: [
          '0x64498163f2b3E5AA871d335F4CBA6d5b5DcdD6BA',
          price * 1000000,
        ],
      })
      setCompleted(true)
      console.log(data)
    } catch(err) {
      console.log(err)
      setStarted(false)
      setErrors("Payment failed. Please try again.")
    }
  }

  return (
    <>
      {!completed && (
        <Button 
          disabled={started}
          onClick={handlePayment}
        >
          {started ? "Confirming..." : "Pay Now"}
        </Button>
      )}
      {completed && <p>Thank you for your payment.</p>}
      {errors && <p>{errors}</p>}
    </>
  )
}