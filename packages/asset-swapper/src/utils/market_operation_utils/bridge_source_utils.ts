import { ChainId } from '@0x/contract-addresses';
import { BigNumber, NULL_BYTES } from '@0x/utils';

import {
    ACRYPTOS_BSC_INFOS,
    APESWAP_ROUTER_BY_CHAIN_ID,
    BAKERYSWAP_ROUTER_BY_CHAIN_ID,
    BELT_BSC_INFOS,
    CAFESWAP_ROUTER_BY_CHAIN_ID,
    CHEESESWAP_ROUTER_BY_CHAIN_ID,
    COMETHSWAP_ROUTER_BY_CHAIN_ID,
    COMPONENT_POOLS_BY_CHAIN_ID,
    CRYPTO_COM_ROUTER_BY_CHAIN_ID,
    CURVE_AVALANCHE_INFOS,
    CURVE_FANTOM_INFOS,
    CURVE_MAINNET_INFOS,
    CURVE_POLYGON_INFOS,
    CURVE_V2_AVALANCHE_INFOS,
    CURVE_V2_FANTOM_INFOS,
    CURVE_V2_MAINNET_INFOS,
    CURVE_V2_POLYGON_INFOS,
    DFYN_ROUTER_BY_CHAIN_ID,
    ELLIPSIS_BSC_INFOS,
    FIREBIRDONESWAP_BSC_INFOS,
    FIREBIRDONESWAP_POLYGON_INFOS,
    IRONSWAP_POLYGON_INFOS,
    JETSWAP_ROUTER_BY_CHAIN_ID,
    JULSWAP_ROUTER_BY_CHAIN_ID,
    KYBER_BANNED_RESERVES,
    KYBER_BRIDGED_LIQUIDITY_PREFIX,
    MAX_DODOV2_POOLS_QUERIED,
    MAX_KYBER_RESERVES_QUERIED,
    MORPHEUSSWAP_ROUTER_BY_CHAIN_ID,
    MSTABLE_POOLS_BY_CHAIN_ID,
    NERVE_BSC_INFOS,
    NULL_ADDRESS,
    PANCAKESWAP_ROUTER_BY_CHAIN_ID,
    PANCAKESWAPV2_ROUTER_BY_CHAIN_ID,
    PANGOLIN_ROUTER_BY_CHAIN_ID,
    POLYDEX_ROUTER_BY_CHAIN_ID,
    QUICKSWAP_ROUTER_BY_CHAIN_ID,
    SADDLE_MAINNET_INFOS,
    SHELL_POOLS_BY_CHAIN_ID,
    SHIBASWAP_ROUTER_BY_CHAIN_ID,
    SMOOTHY_BSC_INFOS,
    SMOOTHY_MAINNET_INFOS,
    SNOWSWAP_MAINNET_INFOS,
    SPIRITSWAP_ROUTER_BY_CHAIN_ID,
    SPOOKYSWAP_ROUTER_BY_CHAIN_ID,
    SUSHISWAP_ROUTER_BY_CHAIN_ID,
    SWERVE_MAINNET_INFOS,
    TRADER_JOE_ROUTER_BY_CHAIN_ID,
    UBESWAP_ROUTER_BY_CHAIN_ID,
    UNISWAPV2_ROUTER_BY_CHAIN_ID,
    WAULTSWAP_ROUTER_BY_CHAIN_ID,
    XSIGMA_MAINNET_INFOS,
} from './constants';
import { CurveInfo, ERC20BridgeSource } from './types';

/**
 * Filter Kyber reserves which should not be used (0xbb bridged reserves)
 * @param reserveId Kyber reserveId
 */
export function isAllowedKyberReserveId(reserveId: string): boolean {
    return (
        reserveId !== NULL_BYTES &&
        !reserveId.startsWith(KYBER_BRIDGED_LIQUIDITY_PREFIX) &&
        !KYBER_BANNED_RESERVES.includes(reserveId)
    );
}

// tslint:disable-next-line: completed-docs ban-types
export function isValidAddress(address: string | String): address is string {
    return (typeof address === 'string' || address instanceof String) && address.toString() !== NULL_ADDRESS;
}

/**
 * Returns the offsets to be used to discover Kyber reserves
 */
export function getKyberOffsets(): BigNumber[] {
    return Array(MAX_KYBER_RESERVES_QUERIED)
        .fill(0)
        .map((_v, i) => new BigNumber(i));
}

// tslint:disable completed-docs
export function getDodoV2Offsets(): BigNumber[] {
    return Array(MAX_DODOV2_POOLS_QUERIED)
        .fill(0)
        .map((_v, i) => new BigNumber(i));
}

// tslint:disable completed-docs
export function getShellsForPair(chainId: ChainId, takerToken: string, makerToken: string): string[] {
    if (chainId !== ChainId.Mainnet) {
        return [];
    }
    return Object.values(SHELL_POOLS_BY_CHAIN_ID[chainId])
        .filter(c => [makerToken, takerToken].every(t => c.tokens.includes(t)))
        .map(i => i.poolAddress);
}

// tslint:disable completed-docs
export function getComponentForPair(chainId: ChainId, takerToken: string, makerToken: string): string[] {
    if (chainId !== ChainId.Mainnet) {
        return [];
    }
    return Object.values(COMPONENT_POOLS_BY_CHAIN_ID[chainId])
        .filter(c => [makerToken, takerToken].every(t => c.tokens.includes(t)))
        .map(i => i.poolAddress);
}

// tslint:disable completed-docs
export function getMStableForPair(chainId: ChainId, takerToken: string, makerToken: string): string[] {
    if (chainId !== ChainId.Mainnet && chainId !== ChainId.Polygon) {
        return [];
    }
    return Object.values(MSTABLE_POOLS_BY_CHAIN_ID[chainId])
        .filter(c => [makerToken, takerToken].every(t => c.tokens.includes(t)))
        .map(i => i.poolAddress);
}

// tslint:disable completed-docs
export function getCurveInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    switch (chainId) {
        case ChainId.Mainnet:
            return Object.values(CURVE_MAINNET_INFOS).filter(c =>
                [makerToken, takerToken].every(
                    t =>
                        (c.tokens.includes(t) && c.metaTokens === undefined) ||
                        (c.tokens.includes(t) &&
                            [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
                ),
            );
        case ChainId.Polygon:
            return Object.values(CURVE_POLYGON_INFOS).filter(c =>
                [makerToken, takerToken].every(
                    t =>
                        (c.tokens.includes(t) && c.metaTokens === undefined) ||
                        (c.tokens.includes(t) &&
                            [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
                ),
            );
        case ChainId.Fantom:
            return Object.values(CURVE_FANTOM_INFOS).filter(c =>
                [makerToken, takerToken].every(
                    t =>
                        (c.tokens.includes(t) && c.metaTokens === undefined) ||
                        (c.tokens.includes(t) &&
                            [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
                ),
            );
        case ChainId.Avalanche:
            return Object.values(CURVE_AVALANCHE_INFOS).filter(c =>
                [makerToken, takerToken].every(
                    t =>
                        (c.tokens.includes(t) && c.metaTokens === undefined) ||
                        (c.tokens.includes(t) &&
                            [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
                ),
            );
        default:
            return [];
    }
}

// tslint:disable completed-docs
export function getCurveV2InfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    switch (chainId) {
        case ChainId.Mainnet:
            return Object.values(CURVE_V2_MAINNET_INFOS).filter(c =>
                [makerToken, takerToken].every(
                    t =>
                        (c.tokens.includes(t) && c.metaTokens === undefined) ||
                        (c.tokens.includes(t) &&
                            [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
                ),
            );
        case ChainId.Polygon:
            return Object.values(CURVE_V2_POLYGON_INFOS).filter(c =>
                [makerToken, takerToken].every(
                    t =>
                        (c.tokens.includes(t) && c.metaTokens === undefined) ||
                        (c.tokens.includes(t) &&
                            [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
                ),
            );
        case ChainId.Fantom:
            return Object.values(CURVE_V2_FANTOM_INFOS).filter(c =>
                [makerToken, takerToken].every(
                    t =>
                        (c.tokens.includes(t) && c.metaTokens === undefined) ||
                        (c.tokens.includes(t) &&
                            [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
                ),
            );
        case ChainId.Avalanche:
            return Object.values(CURVE_V2_AVALANCHE_INFOS).filter(c =>
                [makerToken, takerToken].every(
                    t =>
                        (c.tokens.includes(t) && c.metaTokens === undefined) ||
                        (c.tokens.includes(t) &&
                            [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
                ),
            );
        default:
            return [];
    }
}

export function getSwerveInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.Mainnet) {
        return [];
    }
    return Object.values(SWERVE_MAINNET_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getSnowSwapInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.Mainnet) {
        return [];
    }
    return Object.values(SNOWSWAP_MAINNET_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getNerveInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.BSC) {
        return [];
    }
    return Object.values(NERVE_BSC_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getFirebirdOneSwapInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId === ChainId.BSC) {
        return Object.values(FIREBIRDONESWAP_BSC_INFOS).filter(c =>
            [makerToken, takerToken].every(
                t =>
                    (c.tokens.includes(t) && c.metaTokens === undefined) ||
                    (c.tokens.includes(t) &&
                        [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
            ),
        );
    } else if (chainId === ChainId.Polygon) {
        return Object.values(FIREBIRDONESWAP_POLYGON_INFOS).filter(c =>
            [makerToken, takerToken].every(
                t =>
                    (c.tokens.includes(t) && c.metaTokens === undefined) ||
                    (c.tokens.includes(t) &&
                        [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
            ),
        );
    } else {
        return [];
    }
}

export function getBeltInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.BSC) {
        return [];
    }
    return Object.values(BELT_BSC_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getEllipsisInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.BSC) {
        return [];
    }
    return Object.values(ELLIPSIS_BSC_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getSmoothyInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId === ChainId.BSC) {
        return Object.values(SMOOTHY_BSC_INFOS).filter(c =>
            [makerToken, takerToken].every(
                t =>
                    (c.tokens.includes(t) && c.metaTokens === undefined) ||
                    (c.tokens.includes(t) &&
                        [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
            ),
        );
    } else if (chainId === ChainId.Mainnet) {
        return Object.values(SMOOTHY_MAINNET_INFOS).filter(c =>
            [makerToken, takerToken].every(
                t =>
                    (c.tokens.includes(t) && c.metaTokens === undefined) ||
                    (c.tokens.includes(t) &&
                        [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
            ),
        );
    } else {
        return [];
    }
}

export function getSaddleInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.Mainnet) {
        return [];
    }
    return Object.values(SADDLE_MAINNET_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getIronSwapInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.Polygon) {
        return [];
    }
    return Object.values(IRONSWAP_POLYGON_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getXSigmaInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.Mainnet) {
        return [];
    }
    return Object.values(XSIGMA_MAINNET_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getAcryptosInfosForPair(chainId: ChainId, takerToken: string, makerToken: string): CurveInfo[] {
    if (chainId !== ChainId.BSC) {
        return [];
    }
    return Object.values(ACRYPTOS_BSC_INFOS).filter(c =>
        [makerToken, takerToken].every(
            t =>
                (c.tokens.includes(t) && c.metaTokens === undefined) ||
                (c.tokens.includes(t) && [makerToken, takerToken].filter(v => c.metaTokens?.includes(v)).length > 0),
        ),
    );
}

export function getShellLikeInfosForPair(
    chainId: ChainId,
    takerToken: string,
    makerToken: string,
    source: ERC20BridgeSource.Shell | ERC20BridgeSource.Component | ERC20BridgeSource.MStable,
): string[] {
    switch (source) {
        case ERC20BridgeSource.Shell:
            return getShellsForPair(chainId, takerToken, makerToken);
        case ERC20BridgeSource.Component:
            return getComponentForPair(chainId, takerToken, makerToken);
        case ERC20BridgeSource.MStable:
            return getMStableForPair(chainId, takerToken, makerToken);
        default:
            throw new Error(`Unknown Shell like source ${source}`);
    }
}

export interface CurveDetailedInfo extends CurveInfo {
    makerTokenIdx: number;
    takerTokenIdx: number;
}

export function getCurveLikeInfosForPair(
    chainId: ChainId,
    takerToken: string,
    makerToken: string,
    source:
        | ERC20BridgeSource.Curve
        | ERC20BridgeSource.CurveV2
        | ERC20BridgeSource.Swerve
        | ERC20BridgeSource.SnowSwap
        | ERC20BridgeSource.Nerve
        | ERC20BridgeSource.Belt
        | ERC20BridgeSource.Ellipsis
        | ERC20BridgeSource.Smoothy
        | ERC20BridgeSource.Saddle
        | ERC20BridgeSource.IronSwap
        | ERC20BridgeSource.XSigma
        | ERC20BridgeSource.FirebirdOneSwap
        | ERC20BridgeSource.ACryptos,
): CurveDetailedInfo[] {
    let pools: CurveInfo[] = [];
    switch (source) {
        case ERC20BridgeSource.Curve:
            pools = getCurveInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.CurveV2:
            pools = getCurveV2InfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.Swerve:
            pools = getSwerveInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.SnowSwap:
            pools = getSnowSwapInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.Nerve:
            pools = getNerveInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.Belt:
            pools = getBeltInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.Ellipsis:
            pools = getEllipsisInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.Smoothy:
            pools = getSmoothyInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.Saddle:
            pools = getSaddleInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.XSigma:
            pools = getXSigmaInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.FirebirdOneSwap:
            pools = getFirebirdOneSwapInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.IronSwap:
            pools = getIronSwapInfosForPair(chainId, takerToken, makerToken);
            break;
        case ERC20BridgeSource.ACryptos:
            pools = getAcryptosInfosForPair(chainId, takerToken, makerToken);
            break;
        default:
            throw new Error(`Unknown Curve like source ${source}`);
    }
    return pools.map(pool => ({
        ...pool,
        makerTokenIdx: pool.tokens.indexOf(makerToken),
        takerTokenIdx: pool.tokens.indexOf(takerToken),
    }));
}

export function uniswapV2LikeRouterAddress(
    chainId: ChainId,
    source:
        | ERC20BridgeSource.UniswapV2
        | ERC20BridgeSource.SushiSwap
        | ERC20BridgeSource.CryptoCom
        | ERC20BridgeSource.PancakeSwap
        | ERC20BridgeSource.PancakeSwapV2
        | ERC20BridgeSource.BakerySwap
        | ERC20BridgeSource.ApeSwap
        | ERC20BridgeSource.CafeSwap
        | ERC20BridgeSource.CheeseSwap
        | ERC20BridgeSource.JulSwap
        | ERC20BridgeSource.QuickSwap
        | ERC20BridgeSource.ComethSwap
        | ERC20BridgeSource.Dfyn
        | ERC20BridgeSource.WaultSwap
        | ERC20BridgeSource.Polydex
        | ERC20BridgeSource.ShibaSwap
        | ERC20BridgeSource.JetSwap
        | ERC20BridgeSource.TraderJoe
        | ERC20BridgeSource.Pangolin
        | ERC20BridgeSource.UbeSwap
        | ERC20BridgeSource.MorpheusSwap
        | ERC20BridgeSource.SpookySwap
        | ERC20BridgeSource.SpiritSwap,
): string {
    switch (source) {
        case ERC20BridgeSource.UniswapV2:
            return UNISWAPV2_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.SushiSwap:
            return SUSHISWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.CryptoCom:
            return CRYPTO_COM_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.PancakeSwap:
            return PANCAKESWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.PancakeSwapV2:
            return PANCAKESWAPV2_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.BakerySwap:
            return BAKERYSWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.ApeSwap:
            return APESWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.CafeSwap:
            return CAFESWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.CheeseSwap:
            return CHEESESWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.JulSwap:
            return JULSWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.QuickSwap:
            return QUICKSWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.ComethSwap:
            return COMETHSWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.Dfyn:
            return DFYN_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.WaultSwap:
            return WAULTSWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.Polydex:
            return POLYDEX_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.ShibaSwap:
            return SHIBASWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.JetSwap:
            return JETSWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.Pangolin:
            return PANGOLIN_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.TraderJoe:
            return TRADER_JOE_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.UbeSwap:
            return UBESWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.MorpheusSwap:
            return MORPHEUSSWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.SpookySwap:
            return SPOOKYSWAP_ROUTER_BY_CHAIN_ID[chainId];
        case ERC20BridgeSource.SpiritSwap:
            return SPIRITSWAP_ROUTER_BY_CHAIN_ID[chainId];
        default:
            throw new Error(`Unknown UniswapV2 like source ${source}`);
    }
}

const BAD_TOKENS_BY_SOURCE: Partial<{ [key in ERC20BridgeSource]: string[] }> = {
    [ERC20BridgeSource.Uniswap]: [
        '0xb8c77482e45f1f44de1745f52c74426c631bdd52', // BNB
    ],
};

export function isBadTokenForSource(token: string, source: ERC20BridgeSource): boolean {
    return (BAD_TOKENS_BY_SOURCE[source] || []).includes(token.toLowerCase());
}
