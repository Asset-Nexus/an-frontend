import { Button } from 'antd';
import { useConnect, useAccount, useDisconnect } from 'wagmi'

export default function ConnectWallet() {
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { isConnected } = useAccount()
  return connectors.map((connector) => (
    <Button type="primary" key={connector.uid} onClick={() => connect({ connector })}>
      {isConnected ? (<div onClick={() => disconnect()}>Disconnect</div>) : connector.name}
    </Button>
  ))
}
