import ProductCard from '../../components/ProductCard'
import { abi as marketAbi } from '../../abi/marketplace.abi';
import { useReadContract } from 'wagmi';
import { useAccount } from 'wagmi'

export default function AssetList() {
  const account = useAccount()

  const { isLoading, data } = useReadContract({
    abi: marketAbi,
    address: '0x50E8B428cFe4daaBA8d1c3085d3Da9f901c8165f',
    functionName: 'listing',
    args: [account.address, BigInt(1)],
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



