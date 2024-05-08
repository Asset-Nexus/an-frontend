import { useConnect, useAccount, useWriteContract, useConfig } from 'wagmi'
import { Button,notification } from 'antd';
import { abi } from '../abi/marketplace.abi';
import { useEffect } from 'react';

const nftAddress = process.env.REACT_APP_NFT_ADDRESS as `0x${string}`
const marketAddress = process.env.REACT_APP_MARKET_ADDRESS as `0x${string}`

export const PayButton = ({ tokenId }: { tokenId: number }) => {

  const { connectors, connectAsync } = useConnect()
  const { address } = useAccount()
  const { data, error, isPending, isSuccess, writeContract } = useWriteContract()
  const config = useConfig()
  const handlePayment = async () => {

    if(!address) {
      let connector = connectors.find((i) => i.type === "injected")
      connector = connector || connectors[0]
      console.log(connector)
      await connectAsync({ chainId: config.chains[0].id, connector: connector})
    }
    writeContract({
      address: marketAddress,
      functionName: 'buyItem',
      abi: abi,
      args: [
        nftAddress,
        tokenId,
      ],
    })
  }

  useEffect(() => {
    if (error) {
      notification.error({
        message: error.name,
        description: error.message,
      });
    }
    if (isSuccess) {
      notification.success({
        message: 'success',
        description: 'Thank you for your payment.',
      });
    }
  }, [error, isSuccess]);

  return (
    <>
      {!isSuccess && (
        <Button 
          disabled={isPending}
          onClick={handlePayment}
        >
          {isPending && !isSuccess ? "Confirming..." : "Pay Now"}
        </Button>
      )}
      {data && <div>Transaction Hash: {data}</div>}
    </>
  )
}