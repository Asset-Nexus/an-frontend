import React from 'react'
import { Button } from 'antd';


import {  useConnect } from 'wagmi'


export default function ConnectWallet() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <Button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </Button>
  ))
}
