import { useTranslation } from '@pancakeswap/localization'
import { ChainId, NATIVE } from '@pancakeswap/sdk'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  Button,
  Flex,
  InfoIcon,
  Text,
  UserMenu,
  UserMenuDivider,
  UserMenuItem,
  useTooltip,
} from '@pancakeswap/uikit'
import { useNetwork } from 'wagmi'
import { useActiveChainId, useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useNetworkConnectorUpdater } from 'hooks/useActiveWeb3React'
import { useHover } from 'hooks/useHover'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { chains } from 'utils/wagmi'
import Image from 'next/image'
import { ASSET_CDN } from 'config/constants/endpoints'

import { ChainLogo } from './Logo/ChainLogo'

// Commented out Solana wallet type declarations
/*
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      connect(): Promise<{ publicKey: { toString(): string } }>
      disconnect(): Promise<void>
      signTransaction(transaction: any): Promise<any>
    }
  }
}
*/

// Commented out Aptos and Solana chain definitions
/*
const AptosChain = {
  id: 1,
  name: 'Aptos',
}

const SolanaChain = {
  id: 101,
  name: 'Solana',
}
*/

const NetworkSelect = ({ switchNetwork, chainId }) => {
  const { t } = useTranslation()

  // Commented out Solana wallet connection function
  /*
  const handleSolanaConnect = async () => {
    try {
      if (window.solana && window.solana.isPhantom) {
        const response = await window.solana.connect()
        console.log('Solana wallet connected:', response.publicKey.toString())
        alert(`Solana wallet connected: ${response.publicKey.toString()}`)
      } else {
        window.open('https://phantom.app/', '_blank')
        alert('Phantom wallet required. Please install Phantom wallet.')
      }
    } catch (error) {
      console.error('Solana connection error:', error)
      alert('Error connecting Solana wallet.')
    }
  }
  */

  return (
    <>
      <Box px="16px" py="8px">
        <Text color="textSubtle">{t('Select a Network')}</Text>
      </Box>
      <UserMenuDivider />
      {chains
        .filter(
          (chain) =>
           !('testnet' in chain && chain.testnet) || chain.id === chainId,
        )  
        .map((chain) => (
          <UserMenuItem
            key={chain.id}
            style={{ justifyContent: 'flex-start' }}
            onClick={() => chain.id !== chainId && switchNetwork(chain.id)}
          >
            <ChainLogo chainId={chain.id} />
            <Text color={chain.id === chainId ? 'secondary' : 'text'} bold={chain.id === chainId} pl="12px">
              {chain.name}
            </Text>
          </UserMenuItem>
        ))}
      {/* Commented out Aptos and Solana menu items
      <UserMenuItem
        key={`aptos-${AptosChain.id}`}
        style={{ justifyContent: 'flex-start' }}
        as="a"
        target="_blank"
        href="https://aptos.pancakeswap.finance/swap"
      >
        <Image
          src="https://aptos.pancakeswap.finance/images/apt.png"
          width={24}
          height={24}
          unoptimized
          alt={`chain-aptos-${AptosChain.id}`}
        />{' '}
        <Text color="text" pl="12px">
          {AptosChain.name}
        </Text>
      </UserMenuItem>
      <UserMenuItem
        key={`solana-${SolanaChain.id}`}
        style={{ justifyContent: 'flex-start' }}
        onClick={handleSolanaConnect}
      >
        <Image
          src="/solana-logo.png"
          width={24}
          height={24}
          unoptimized
          alt={`chain-solana-${SolanaChain.id}`}
        />{' '}
        <Text color="text" pl="12px">
          {SolanaChain.name}
        </Text>
      </UserMenuItem>
      */}
    </>
  )
}

const WrongNetworkSelect = ({ switchNetwork, chainId }) => {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(
      'The URL you are accessing (Chain id: %chainId%) belongs to %network%; mismatching your wallet\'s network. Please switch the network to continue.',
      {
        chainId,
        network: chains.find((c) => c.id === chainId)?.name ?? 'Unknown network',
      },
    ),
    {
      placement: 'auto-start',
      hideTimeout: 0,
    },
  )
  const { chain } = useNetwork()
  const localChainId = useLocalNetworkChain() || ChainId.BSC
  const [, setSessionChainId] = useSessionChainId()

  const localChainName = chains.find((c) => c.id === localChainId)?.name ?? 'BSC'

  const [ref1, isHover] = useHover<HTMLButtonElement>()

  return (
    <>
      <Flex ref={targetRef} alignItems="center" px="16px" py="8px">
        <InfoIcon color="textSubtle" />
        <Text color="textSubtle" pl="6px">
          {t('Please switch network')}
        </Text>
      </Flex>
      {tooltipVisible && tooltip}
      <UserMenuDivider />
      {chain && (
        <UserMenuItem ref={ref1} onClick={() => setSessionChainId(chain.id)} style={{ justifyContent: 'flex-start' }}>
          <ChainLogo chainId={chain.id} />
          <Text color="secondary" bold pl="12px">
            {chain.name}
          </Text>
        </UserMenuItem>
      )}
      <Box px="16px" pt="8px">
        {isHover ? <ArrowUpIcon color="text" /> : <ArrowDownIcon color="text" />}
      </Box>
      <UserMenuItem onClick={() => switchNetwork(localChainId)} style={{ justifyContent: 'flex-start' }}>
        <ChainLogo chainId={localChainId} />
        <Text pl="12px">{localChainName}</Text>
      </UserMenuItem>
      <Button mx="16px" my="8px" scale="sm" onClick={() => switchNetwork(localChainId)}>
        {t('Switch network in wallet')}
      </Button>
    </>
  )
}

const SHORT_SYMBOL = {
  [ChainId.ETHEREUM]: 'ETH',
  [ChainId.BSC]: 'BNB',
  [ChainId.BSC_TESTNET]: 'tBNB',
  [ChainId.GOERLI]: 'GOR',
  [ChainId.ARBITRUM_ONE]: 'ARB',
  [ChainId.ARBITRUM_GOERLI]: 'tARB',
  [ChainId.POLYGON_ZKEVM]: 'Polygon zkEVM',
  [ChainId.POLYGON_ZKEVM_TESTNET]: 'tZkEVM',
  [ChainId.ZKSYNC]: 'zkSync',
  [ChainId.ZKSYNC_TESTNET]: 'tZkSync',
  [ChainId.LINEA_TESTNET]: 'tLinea',
} as const satisfies Record<ChainId, string>

export const NetworkSwitcher = () => {
  const { t } = useTranslation()
  const { chainId, isWrongNetwork, isNotMatched } = useActiveChainId()
  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()
  const router = useRouter()

  useNetworkConnectorUpdater()

  const foundChain = useMemo(
    () => chains.find((c) => c.id === (isLoading ? pendingChainId || chainId : chainId)),
    [isLoading, pendingChainId, chainId],
  )
  const symbol = SHORT_SYMBOL[foundChain?.id] ?? NATIVE[foundChain?.id]?.symbol ?? foundChain?.nativeCurrency?.symbol
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Unable to switch network. Please try it on your wallet'),
    { placement: 'bottom' },
  )

  const cannotChangeNetwork = !canSwitch

  if (!chainId || router.pathname.includes('/info')) {
    return null
  }

  return (
    <Box ref={cannotChangeNetwork ? targetRef : null} height="100%">
      {cannotChangeNetwork && tooltipVisible && tooltip}
      <UserMenu
        mr="8px"
        placement="bottom"
        variant={isLoading ? 'pending' : isWrongNetwork ? 'danger' : 'default'}
        avatarSrc={`${ASSET_CDN}/web/chains/${chainId}.png`}
        disabled={cannotChangeNetwork}
        text={
          isLoading ? (
            t('Requesting')
          ) : isWrongNetwork ? (
            t('Network')
          ) : foundChain ? (
            <>
              <Box display={['none', null, null, null, null, 'block']}>{foundChain.name}</Box>
              <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box>
            </>
          ) : (
            t('Select a Network')
          )
        }
      >
        {() =>
          isNotMatched ? (
            <WrongNetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />
          ) : (
            <NetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />
          )
        }
      </UserMenu>
    </Box>
  )
}