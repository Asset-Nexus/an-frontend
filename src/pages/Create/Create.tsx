import { useState } from 'react';
import { Button } from 'antd';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useConnect,
  useAccount 
} from 'wagmi'
import { injected, metaMask } from 'wagmi/connectors'
import { abi as nftAbi } from '../../abi/nft.abi';
import { abi as marketAbi } from '../../abi/marketplace.abi';
import axios from 'axios';
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkNTY3ZDRkOS1jOTIyLTQ1NjctOWFmYy05YTZlOWU1MGZhNGQiLCJlbWFpbCI6IjE1MDM4Njk1QHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiNmNiZDQ3YmZmNjA0ODBkOGZhZCIsInNjb3BlZEtleVNlY3JldCI6ImU4MTdlOGRjNDRkNjRiODA0ZWU3MjhkZDc0Yjk3NzFjYTQwMWEzZjkxZDFmYjRhZWVmYjhmOGQ5NWZiMWMzOTciLCJpYXQiOjE3MTQ3MjIwNDB9.NYkGaOlyhO7fOsPF_1VfNU6J-heBVtwAjU0mHKNcoLM"

const ifpsGateWay = "teal-cheap-mink-107.mypinata.cloud"


function NFTUploadPage() {
  const [image, setImage] = useState('');
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const { connect } = useConnect()
  const {
    data: hash,
    error,
    isPending,
    writeContract
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

    const account = useAccount()
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const pinFileToIPFS = async () => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append('file', file)
    const pinataMetadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
      setImage(`https://${ifpsGateWay}/ipfs/${res.data.IpfsHash}`)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget)
      // console.log();
      // return
      // console.log(e.target)
      // connect({ connector: injected() })
      if (!account.isConnected) {
        alert("please connect wallet first!")
        return
      }
      writeContract({
        address: '0xAaB3bC8F30192660CD3e1d3c9b6Ff527c6C3433f',
        abi: nftAbi,
        functionName: 'mintItem',
        args: [formData.get("tokenUri")],
      })

    } catch (error) {
      console.log('ipfs image upload error: ', error);
    }
  };

  return (
    <>
      <h1>NFT Upload</h1>
      {image && <img src={image} alt='' width={300}/>}
      <input type="file" accept=".jpg,.png" onChange={handleFileChange} />

      <Button
        disabled={isPending || !file || isLoading}
        onClick={pinFileToIPFS}
      >
        {'Upload'}
      </Button>

      <form onSubmit={submit}>
        <input name="tokenUri" defaultValue={image} required />
        {/* <input name="address" placeholder="0xA0Cf…251e" required /> */}
        <input name="value" placeholder="0.05" required />
        <Button
        htmlType="submit"
          disabled={isPending }
        >
          {isPending ? 'Confirming...' : 'Mint'}
        </Button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </form>
    </>

  );
}

export default NFTUploadPage;


