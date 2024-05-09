import { useConnect, useAccount, useWriteContract, useConfig } from 'wagmi'
import { Button,notification } from 'antd';
import { abi as marketAbi} from '../abi/marketplace.abi';
import { abi as tokenAbi} from '../abi/token.abi';
import { parseEther } from 'viem';

const nftAddress = process.env.REACT_APP_NFT_ADDRESS as `0x${string}`
const marketAddress = process.env.REACT_APP_MARKET_ADDRESS as `0x${string}`
const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS as `0x${string}`

export const PayButton = ({ price, tokenId }: {price: string, tokenId: number, [property: string]: any }) => {

  const { connectors, connectAsync } = useConnect()
  const { address } = useAccount()
  const { data, isPending, isSuccess, writeContractAsync } = useWriteContract()
  const config = useConfig()
  const handlePayment = async () => {

    if(!address) {
      let connector = connectors.find((i) => i.type === "injected")
      connector = connector || connectors[0]
      console.log(connector)
      await connectAsync({ chainId: config.chains[0].id, connector: connector})
    }
    try {
      await writeContractAsync({
        abi: tokenAbi,
        address: tokenAddress,
        functionName: 'approve',
        args: [marketAddress, parseEther(price)]
      })
      await writeContractAsync({
        address: marketAddress,
        functionName: 'buyItem',
        abi: marketAbi,
        args: [
          nftAddress,
          tokenId,
        ],
      })
      notification.success({
        message: 'success',
        description: 'Thank you for your payment.',
      })
    }catch (e) {
      // console.log(e)
      notification.error({
        message: e.name,
        description: e.message,
      });
    }

  }

  return (
    <>
      {!isSuccess && (
        <Button 
          disabled={isPending}
          onClick={handlePayment}
          style={{background: "#FF5733", color: "white"}}
        >
          {isPending && !isSuccess ? "Confirming..." : "Buy"}
        </Button>
      )}
      {data && <div>Transaction Hash: {data}</div>}
    </>
  )
}