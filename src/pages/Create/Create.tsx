import { useState } from 'react';
import { Button, Input, Form, Typography, Flex } from 'antd';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
  useWatchContractEvent,
} from 'wagmi'
import {parseEther} from 'viem'

import { abi as nftAbi } from '../../abi/nft.abi';
import { abi as marketAbi } from '../../abi/marketplace.abi';
import axios from 'axios';
import { createNft } from '../../services/nft';
import { MintData } from '../../types/mintData';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkNTY3ZDRkOS1jOTIyLTQ1NjctOWFmYy05YTZlOWU1MGZhNGQiLCJlbWFpbCI6IjE1MDM4Njk1QHFxLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiNmNiZDQ3YmZmNjA0ODBkOGZhZCIsInNjb3BlZEtleVNlY3JldCI6ImU4MTdlOGRjNDRkNjRiODA0ZWU3MjhkZDc0Yjk3NzFjYTQwMWEzZjkxZDFmYjRhZWVmYjhmOGQ5NWZiMWMzOTciLCJpYXQiOjE3MTQ3MjIwNDB9.NYkGaOlyhO7fOsPF_1VfNU6J-heBVtwAjU0mHKNcoLM"

const ifpsGateWay = "teal-cheap-mink-107.mypinata.cloud"
const { useForm } = Form;

// const nftAddress = process.env.NFTADDRESS as `0x${string}`
const nftAddress = "0xeC8aCa83fa696c57e58218e0F38698787c217320"
// const marketAddress = '0xF393253cDbfbd7c147A35928e874016c873Fb723'
const marketAddress = "0x0Bb6B8F062D41B2A0aa4384705329bD60f7f618A"
interface ListFormData {
  tokenId: string;
  price: string;
}

function NFTUploadPage() {
  const [image, setImage] = useState('');
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [mintForm] = useForm();
  const [listForm] = useForm();
  const account = useAccount()

  const {
    data: hash,
    error,
    isPending,
    writeContract
  } = useWriteContract()

  useWatchContractEvent({
    address: nftAddress,
    abi: nftAbi,
    eventName: 'NewNFTMinted',
    onLogs(logs) {
      console.log('New logs!', logs)
      const tokenId = logs[0].args.tokenId
      listForm.setFieldsValue({tokenId: String(tokenId)})
      const formValues = mintForm.getFieldsValue();
      formValues["id"] = String(tokenId);
      formValues["contractAddr"] = nftAddress;
      formValues["fromAddress"] = account.address;
      //hardcode
      formValues["price"] = 0;
      formValues["tag"] = "aa";
      console.log("ajax send create nft", formValues)
      createNft(formValues)
    },
  })

  console.log(process.env)

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

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
      mintForm.setFieldsValue({ fileUrl: `https://${ifpsGateWay}/ipfs/${res.data.IpfsHash}` });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


  const submitMint = async (formData: MintData) => {
    if (!account.isConnected) {
      alert("please connect wallet first!")
      return
    }
    writeContract({
      address: nftAddress,
      abi: nftAbi,
      functionName: 'mintItem',
      args: [formData.fileUrl],
    })
  };
  const submitListing = async (formData: ListFormData) => {
    if (!account.isConnected) {
      alert("please connect wallet first!")
      return
    }
    writeContract({
      address: marketAddress,
      abi: marketAbi,
      functionName: 'listItem',
      args: [nftAddress, BigInt(formData.tokenId), parseEther(formData.price)],
    })
  };
  const submitApprove = async () => {
    if (!account.isConnected) {
      alert("please connect wallet first!")
      return
    }
    writeContract({
      address: nftAddress,
      abi: nftAbi,
      functionName: 'approve',
      args: [marketAddress, BigInt(listForm.getFieldValue("tokenId"))],
    })
  };

  const isDisable = () => {
    return isPending || isLoading || isConfirming
  }

  return (
    <>
      <Typography.Title level={2}>NFT Listing</Typography.Title>
      <Typography.Title level={5}>step 1. upload to ipfs</Typography.Title>
      {image && <img src={image} alt='' width={200} />}
      <input type="file" accept=".jpg,.png" onChange={handleFileChange} />
      <Flex gap="small">
      <Button
        type='primary'
        disabled={isDisable() || !file}
        onClick={pinFileToIPFS}
      >
        {'Upload'}
      </Button>
      </Flex>

      <Form onFinish={submitMint} form={mintForm}>
        <Typography.Title level={5}>step 2. mint nft</Typography.Title>
        <Form.Item
          label="Token uri"
          name="fileUrl"
          rules={[{ required: true, message: 'Please input token uri' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: 'Please input author' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="desc"
          rules={[{ required: true, message: 'Please input author' }]}
        >
          <Input />
        </Form.Item>


        <Button
          type='primary'
          htmlType="submit"
          disabled={isDisable()}
        >
          {isDisable() ? 'Confirming...' : 'Mint'}
        </Button>
      </Form>
      <Form onFinish={submitListing} form={listForm}>
        <Typography.Title level={5}>final step.</Typography.Title>
        <Form.Item
          label="Token ID"
          name="tokenId"
          rules={[{ required: true, message: 'Please input token id' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input price' }]}
        >
          <Input />
        </Form.Item>

        <Button
          type='primary'
          onClick={submitApprove}
          disabled={isDisable()}
          style={{marginRight: 20}}
        >
          {isDisable() ? 'Confirming...' : 'Approve to marketplace'}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isDisable()}
        >
          {isDisable() ? 'Confirming...' : 'List in marketplace'}
        </Button>
      </Form>
      <Typography.Title level={5}>message: </Typography.Title>
      
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </>

  );
}

export default NFTUploadPage;


