import { useConnect, useAccount, useWriteContract, useConfig } from 'wagmi'
import { Button,notification } from 'antd';
import { abi as marketAbi} from '../abi/marketplace.abi';
import { abi as tokenAbi} from '../abi/token.abi';
import { parseEther } from 'viem';
import styled from '@emotion/styled';
import { buyNft } from '../services/nft';
import { buyData } from '../types/buyData';

const nftAddress = process.env.REACT_APP_NFT_ADDRESS as `0x${string}`
const marketAddress = process.env.REACT_APP_MARKET_ADDRESS as `0x${string}`
const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS as `0x${string}`

const StyledButton = styled(Button)`
 margin: 11px;
 border-radius: 0.8em;
 border: none;
`
export const PayButton = ({ price, tokenId }: {price: string, tokenId: number, [property: string]: any }) => {

  const { connectors, connectAsync } = useConnect()
  const { address } = useAccount()
  const { data, isPending, isSuccess, writeContractAsync } = useWriteContract()
  const config = useConfig()
  const handlePayment = async () => {

    if(!address) {
      let connector = connectors.find((i) => i.type === "injected")
      connector = connector || connectors[0]
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
        description: `Thank you for your payment. Transaction Hash: ${data}`,
      })
      const buyData: buyData = {
        buyerAddress: address,
        nftAddress: nftAddress,
        tokenId: tokenId,
      }
      buyNft(buyData)
    }catch (e) {
      notification.error({
        message: e.name,
        description: e.message,
      });
    }

  }

  return (
    <>
      {!isSuccess && (
        <StyledButton 
          type="primary"
          disabled={isPending}
          onClick={handlePayment}
        >
          {isPending && !isSuccess ? "Confirming..." : "Buy"}
        </StyledButton>
      )}
    </>
  )
}