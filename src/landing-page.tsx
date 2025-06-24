import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useParallax from './useParallax.ts';
import { useFadeInParallax } from './useFadeInParallax';
import { FaStar } from 'react-icons/fa';

const LandingPage = () => {
  // Restore parallax for stars
  const starsParallax = useParallax();

  // Parallax fade-in for How it works cards
  const howItWorksParallax = useParallax();
  // Fade logic: left card fades in from 0.1 to 0.4, right card from 0.4 to 0.7
  const leftCardOpacity = Math.min(1, Math.max(0, (howItWorksParallax.scrollProgress - 0.1) / 0.3));
  const rightCardOpacity = Math.min(1, Math.max(0, (howItWorksParallax.scrollProgress - 0.4) / 0.3));

  // Parallax fade-in for 'Why it can't wait' section
  const whyWaitStatements = [
    '• False promises became No.1 marketing tactic',
    '• Competition is over who lies bigger (not product quality)',
    '• This leads to financial and mental damage for consumers by creating unrealistic expectations',
  ];
  const whyWaitParallax = useParallax();

  // Helper to animate star fill based on scroll progress
  const getStarFill = (index: number, progress: number) => {
    const totalStars = 5;
    const starsToFill = Math.floor(progress * totalStars);
    const partialFill = (progress * totalStars) % 1;
    if (index < starsToFill) return '#D9D9D9'; // Fully filled
    if (index === starsToFill) return `rgba(217, 217, 217, ${partialFill})`;
    return 'rgba(217, 217, 217, 0.2)'; // Empty/transparent
  };

  return (
    <PageContainer>
      {/* Hero Section - Updated */}
      <HeroSection>
        <ContentWrapper>
          <MainHeading>
            Never trust a wrong person again
          </MainHeading>
          <HeroSubText>
            Join our verified trust network
          </HeroSubText>
        </ContentWrapper>
      </HeroSection>

      {/* Why it can't wait section with parallax fade-in */}
      {/* Why it can't wait section with working parallax fade-in */}
      <ParallaxTallContainer ref={whyWaitParallax.ref as React.RefObject<HTMLDivElement>}>
        <ParallaxStickyInner>
          <ContentWrapper style={{ maxWidth: '100vw' }}>
            <SubHeading>
              Why it can't wait
            </SubHeading>
            <div style={{ textAlign: 'left', margin: '32px auto', maxWidth: 950, padding: '0 24px' }}>
              {whyWaitStatements.map((text, i) => {
                // Fade in each statement at 0.15, 0.45, 0.75 progress
                const fadeStart = 0.15 + i * 0.3;
                const fade = Math.min(1, Math.max(0, (whyWaitParallax.scrollProgress - fadeStart) / 0.18));
                return (
                  <BodyText as="div" key={i} style={{ marginBottom: 16, opacity: fade, transition: 'opacity 0.5s' }}>{text}</BodyText>
                );
              })}
            </div>
          </ContentWrapper>
        </ParallaxStickyInner>
      </ParallaxTallContainer>



      {/* How did we solve it section - Parallax Sticky Stars */}
      <section
        ref={starsParallax.ref as React.RefObject<HTMLElement>}
        style={{ height: '300vh', position: 'relative', width: '100%' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            zIndex: 2,
          }}
        >
          <ContentWrapper>
            <SubHeading>
              Solution
            </SubHeading>
            <BodyText style={{ marginBottom: 32, fontWeight: 300 }}>
              Transparent trust scores for everyone<br />
              — creators, influencers, and soon, businesses
            </BodyText>

            <StarsContainer style={{ margin: '32px 0' }}>
              {[...Array(5)].map((_, index) => (
                <StarWrapper key={index}>
                  <FaStar size={40} color="#D9D9D9" style={{ opacity: 0.2 }} />
                  <FaStar
                    size={40}
                    color={getStarFill(index, starsParallax.scrollProgress)}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                </StarWrapper>
              ))}
            </StarsContainer>

            <BodyText style={{ marginTop: 32, fontWeight: 300 }}>
              Give your attention to those who earn it—<br />
              not those who exploit it
            </BodyText>
          </ContentWrapper>
        </div>
      </section>

      {/* How it works section with two columns */}
      {/* How it works section with parallax fade-in for cards */}
      <ParallaxTallContainer ref={howItWorksParallax.ref as React.RefObject<HTMLDivElement>}>
        <ParallaxStickyInner>
          <ContentWrapper>
            <SubHeading>How it works</SubHeading>
            <HowItWorksRow>
              <HowItWorksColumn left>
                <ColumnSubheading style={{ maxWidth: 440, textAlign: 'left', margin: '0 auto 32px auto', wordBreak: 'break-word', whiteSpace: 'normal' }}>
                  See ratings and analytics<br />for products and creators
                </ColumnSubheading>
                <HowItWorksImage style={{ opacity: leftCardOpacity, transition: 'opacity 0.6s' }}>
                  <img src="/HIW1.png" alt="AG1 Ratings Popup" />
                </HowItWorksImage>
              </HowItWorksColumn>
              <HowItWorksColumn>
                <ColumnSubheading>
                  Hide (or not) at your<br />desired trust level
                </ColumnSubheading>
                <HowItWorksImage style={{ opacity: rightCardOpacity, transition: 'opacity 0.6s' }}>
                  <img src="/HIW2.png" alt="Trust Filter Cards" />
                </HowItWorksImage>
              </HowItWorksColumn>
            </HowItWorksRow>
          </ContentWrapper>
        </ParallaxStickyInner>
      </ParallaxTallContainer>

      {/* Final Section - unchanged */}
      <FinalSection>
        <ContentWrapper>
          <BodyText as="div" style={{ margin: 0, fontWeight: 300, fontSize: 40, lineHeight: '60px' }}>
            We’ll keep every liar in check
          </BodyText>
          <JoinOfferBox
            as="a"
            href="https://neurolock.gumroad.com/l/fehbt?wanted=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <JoinTodayText>Join today</JoinTodayText>
            <JoinPrice>
              2 years for <OldPrice>11.98</OldPrice> 5.99
            </JoinPrice>
          </JoinOfferBox>
          <OfferSubText>
            Get 1 year free before November, 1<br />
            Support the movement towards a cleaner happier life!
          </OfferSubText>
        </ContentWrapper>
      </FinalSection>
    </PageContainer>
  );
};

const HeroSubText = styled.div`
  font-family: 'Sofia Sans';
  font-weight: 300;
  font-size: 40px;
  line-height: 60px;
  color: #000;
  text-align: center;
  margin-bottom: 0;
  @media (max-width: 600px) {
    font-size: 25px;
    line-height: 34px;
  }
`;

// Styled Components (copied from original for consistency)
const PageContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  background: #fff;
`;

const Section = styled.section`
  width: 100%;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 96px 0 96px 0;
  background: #fff;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  text-align: center;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    max-width: 95vw;
    padding: 0 8px;
  }
`;

const MainHeading = styled.h1`
  font-family: 'Sofia Sans';
  font-weight: 200;
  font-size: 60px;
  line-height: 90px;
  color: #000;
  margin: 0 0 24px 0;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 30px;
    line-height: 38px;
  }
`;

const SectionHeading = styled.h2`
  font-family: 'Sofia Sans';
  font-weight: 200;
  line-height: 60px;
  color: #000;
  margin: 0 0 32px 0;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 30px;
    line-height: 38px;
  }
`;

const BodyText = styled.p`
  font-family: 'Sofia Sans';
  font-weight: 300;
  font-size: 40px;
  line-height: 60px;
  color: #000;
  margin: 0 0 24px 0;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 20px;
    line-height: 28px;
  }
`;

const SmallLabel = styled.span`
  font-family: 'Sofia Sans';
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #000;
`;

const SubHeading = styled.h2`
  font-family: 'Sofia Sans';
  font-weight: 200;
  font-size: 50px;
  line-height: 60px;
  text-align: center;
  color: #000000;
  max-width: 653px;
  margin: 0 auto 40px;
  @media (max-width: 600px) {
    font-size: 30px;
    line-height: 38px;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 0;
`;

const StarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const FinalHeading = styled.h2`
  font-family: 'Sofia Sans';
  font-weight: 200;
  font-size: 50px;
  line-height: 60px;
  text-align: center;
  color: #000000;
  max-width: 609px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 25px; // Mobile-specific font size
    line-height: 30px; // Mobile-specific line height
  }
`;

const InterestedText = styled.div`
  font-family: 'Sofia Sans';
  font-weight: 200;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
  color: #000000;
  margin-top: 64px;

  @media (max-width: 600px) {
    font-size: 25px;
    line-height: 34px;
    margin-top: 32px;
  }
`;

const EmailText = styled.div`
  font-family: 'Sofia Sans';
  font-weight: 200;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
  color: #000000;

  @media (max-width: 600px) {
    font-size: 20px;
    line-height: 28px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

// How it works section layout
const HowItWorksRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 80px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 48px 0 0 0;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 48px;
    align-items: center;
  }
`;

const HowItWorksColumn = styled.div<{ left?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: ${({ left }) => (left ? '55%' : '45%')};
  max-width: ${({ left }) => (left ? '550px' : '450px')};
  min-width: 220px;
  @media (max-width: 900px) {
    flex-basis: 100%;
    max-width: 100vw;
  }
`;

const ColumnSubheading = styled.div`
  font-family: 'Sofia Sans';
  font-weight: 300;
  font-size: 40px;
  line-height: 60px;
  color: #000;
  text-align: center;
  margin-bottom: 32px;
  @media (max-width: 600px) {
    font-size: 25px;
    line-height: 34px;
  }
`;

const HowItWorksImage = styled.div`
  width: 340px;
  height: 220px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px #00000010;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  overflow: hidden;
  @media (max-width: 900px) {
    width: 90vw;
    max-width: 340px;
    height: 160px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 18px;
    display: block;
  }
`;

// Parallax tall and sticky containers for fade-in section
const ParallaxTallContainer = styled.div`
  height: 250vh;
  position: relative;
  width: 100%;
`;

const ParallaxStickyInner = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: transparent;
`;

const JoinOfferBox = styled.button`
  background: #fff;
  color: #222;
  font-family: 'Sofia Sans';
  font-weight: 300;
  font-size: 48px;
  padding: 24px 48px 8px 48px;
  border-radius: 18px;
  margin: 48px 0 32px 0;
  border: 4px solid transparent;
  background-clip: padding-box;
  position: relative;
  z-index: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: box-shadow 0.2s;
  box-shadow: 0 4px 24px #0002;
  min-width: 340px;
  overflow: hidden;

  /* Liquid metal gradient border */
  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    border-radius: 18px;
    padding: 0;
    background: linear-gradient(120deg, #e0e0e0 0%, #b0b0b0 20%, #fafafa 50%, #b0b0b0 80%, #e0e0e0 100%);
    /* Simulate metallic shine */
    box-shadow: 0 2px 16px #b0b0b044 inset;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  @media (max-width: 600px) {
    font-size: 28px;
    min-width: 0;
    padding: 18px 8vw 4px 8vw;
  }
`;


const JoinTodayText = styled.div`
  font-size: 48px;
  font-weight: 300;
  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

const JoinPrice = styled.div`
  font-size: 28px;
  font-weight: 300;
  margin-top: 8px;
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  margin: 0 8px 0 4px;
`;

const OfferSubText = styled.div`
  font-family: 'Sofia Sans', sans-serif;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
  margin-top: 40px;
  color: #222;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 20px;
    line-height: 28px;
    margin-top: 24px;
  }
`;

const HeroSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const FinalSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

export default LandingPage;





