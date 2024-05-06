import ProductCard from '../../components/ProductCard'
import { abi as marketAbi } from '../../abi/marketplace.abi';
import { useReadContract } from 'wagmi';
import { useAccount } from 'wagmi'

const marketAddress = '0xF393253cDbfbd7c147A35928e874016c873Fb723'

export default function AssetList() {
  const account = useAccount()

  const { isLoading, data } = useReadContract({
    abi: marketAbi,
    address: marketAddress,
    functionName: 'getMyListing',
    args: [account.address],
  })

  console.log(data)

  return (
    <>
      {isLoading ? "loading" : (
        <ProductCard product={{
          image: "/headset-photo.png",
          name: "Futuristic VR Headset",
          price: 19
        }}
        />
      )
      }
    </>
  )
}



