import { useEffect, useState } from 'react';
import { usePools } from '@context/PoolContext';
import { SideEnum } from '@libs/constants';

type TokenRow = {
    side: SideEnum;
    leverage: number;
    pool: string;
    symbol: string;
};

type TokenMap = {
    [address: string]: TokenRow;
};

// const usePoolTokens
export default (() => {
    const { pools } = usePools();
    const [tokens, setTokens] = useState<TokenRow[]>([]);
    const [tokenMap, setTokenMap] = useState<TokenMap>({});

    useEffect(() => {
        if (pools && Object.values(pools).length) {
            const _tokens: TokenRow[] = [];
            const _tokenMap: TokenMap = {};
            Object.values(pools).forEach((pool) => {
                const shortToken = {
                    symbol: pool.shortToken.symbol,
                    side: SideEnum.short,
                    pool: pool.address,
                    leverage: pool.leverage,
                };

                const longToken = {
                    symbol: pool.longToken.symbol,
                    side: SideEnum.long,
                    pool: pool.address,
                    leverage: pool.leverage,
                };
                _tokens.push(shortToken, longToken);
                _tokenMap[pool.shortToken.address] = shortToken;
                _tokenMap[pool.longToken.address] = longToken;
            });

            setTokens(_tokens);
            setTokenMap(_tokenMap);
        }
    }, [pools]);

    return { tokens, tokenMap };
}) as () => { tokens: TokenRow[]; tokenMap: TokenMap };
