import React, { useEffect } from 'react';
import NavBar from '@components/Nav/Navbar';
import Footer from '@components/Footer';
import Portfolio, { TradePortfolioPage } from '@archetypes/Portfolio';
import { PoolStore } from '@context/PoolContext';
import { useRouter } from 'next/router';
import PendingCommits from '@components/PendingCommits';
import UnsupportedNetworkPopup from '@components/General/UnsupportedNetworkPopup';
import { WarningBanners } from '@components/WarningBanner';

export default (() => {
    const router = useRouter();

    useEffect(() => {
        router.prefetch('/');
    }, []);

    return (
        <div className={`page relative matrix:bg-matrix-bg`}>
            <PoolStore>
                <NavBar />
                <WarningBanners banners={['decayWarning']} />
                <Portfolio page={TradePortfolioPage.Overview} />
                <PendingCommits />
                <UnsupportedNetworkPopup />
            </PoolStore>
            <Footer />
        </div>
    );
}) as React.FC;
