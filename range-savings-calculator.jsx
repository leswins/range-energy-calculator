import React, { useState, useMemo } from 'react';
import rangeEnergyLogo from './Rangeenergylogo.svg';

// Range Energy Brand Colors
const colors = {
  warmWhite: '#ffffff',
  lightGray: '#f3f3f3',
  darkOlive: '#353831',
  deepTeal: '#0f262d',
  mint: '#86e3a6',
  softBlue: '#758fa3',
  sage: '#5eaa98',
  forest: '#21543b',
  tealAccent: '#758fa3',
  coral: '#d1624b',
  gold: '#e2a347',
  lime: '#ede76e',
  mutedSage: '#7b896f',
  gray900: '#191919',
  gray700: '#353831',
  gray600: '#646464',
  gray400: '#969696',
  gray200: '#d9e1e7',
};

const formatCurrency = (val) => {
  const rounded = Math.round(val);
  return rounded < 0 
    ? '-$' + Math.abs(rounded).toLocaleString() 
    : '$' + rounded.toLocaleString();
};

const formatNumber = (val, decimals = 0) => {
  return Number(val.toFixed(decimals)).toLocaleString();
};

// Slider Component
const Slider = ({ label, value, onChange, min, max, step, unit, prefix = '' }) => (
  <div style={{ marginBottom: '13px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
      <label style={{ 
        fontFamily: "'Barlow', Arial, sans-serif", 
        fontSize: '14px', 
        fontWeight: 500,
        color: colors.darkOlive 
      }}>
        {label}
      </label>
      <span style={{ 
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '16px', 
        fontWeight: 500, 
        color: colors.gray900
      }}>
        {prefix}{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}{unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      style={{
        width: '100%',
        height: '6px',
        borderRadius: '4px',
        background: `linear-gradient(to right, ${colors.softBlue} 0%, ${colors.softBlue} ${((value - min) / (max - min)) * 100}%, rgba(117, 143, 163, 0.1) ${((value - min) / (max - min)) * 100}%, rgba(117, 143, 163, 0.1) 100%)`,
        outline: 'none',
        cursor: 'pointer',
        WebkitAppearance: 'none',
      }}
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
      <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', color: colors.darkOlive }}>{prefix}{min}{unit}</span>
      <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '11px', color: colors.darkOlive }}>{prefix}{max}{unit}</span>
    </div>
  </div>
);

// Toggle Switch Component
const Toggle = ({ label, checked, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <span style={{ 
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '14px', 
      color: colors.darkOlive,
    }}>
      {label}
    </span>
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '48px',
        height: '25px',
        borderRadius: '13px',
        border: 'none',
        background: checked ? colors.mint : colors.gray200,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s ease',
      }}
    >
      <div style={{
        width: '22px',
        height: '22px',
        borderRadius: '12px',
        background: 'white',
        position: 'absolute',
        top: '1.5px',
        left: checked ? '24px' : '2px',
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  </div>
);

// Metric Card Component
const MetricCard = ({ label, value, subtext, highlight = false, icon, divider = false }) => (
  <div
    className={`metric-card${highlight ? ' metric-card--highlight' : ''}${divider ? ' metric-card--divider' : ''}`}
    style={{
      background: highlight ? colors.mint : 'transparent',
      borderRadius: '0',
      padding: '25px',
      flex: 1,
      minWidth: 0,
    }}
  >
    {icon && <div style={{ marginBottom: '8px', fontSize: '24px' }}>{icon}</div>}
    <div style={{ 
      fontFamily: "'Barlow', Arial, sans-serif",
      fontSize: '16px', 
      fontWeight: 400,
      color: highlight ? colors.gray900 : colors.darkOlive,
      marginBottom: '10px',
    }}>
      {label}
    </div>
    <div style={{ 
      fontFamily: "'Barlow', Arial, sans-serif",
      fontSize: '26px', 
      fontWeight: 600, 
      color: colors.gray900,
      lineHeight: 1.1,
    }}>
      {value}
    </div>
    {subtext && (
      <div style={{ 
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '12px', 
        color: highlight ? colors.darkOlive : colors.softBlue,
        marginTop: '8px',
        lineHeight: 1.25,
      }}>
        {subtext}
      </div>
    )}
  </div>
);

// Bar Chart Component
const BarChart = ({ data, maxValue }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {data.map((item, i) => (
      <div key={i}>
        <div className="bar-chart-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ 
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '14px', 
            color: colors.darkOlive 
          }}>
            {item.label}
          </span>
          <span style={{ 
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '14px', 
            fontWeight: 400,
            color: colors.darkOlive 
          }}>
            {formatCurrency(item.value)}
          </span>
        </div>
        <div style={{ 
          height: '5px', 
          background: 'rgba(134, 227, 166, 0.1)', 
          borderRadius: '0',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${Math.max(0, (item.value / maxValue) * 100)}%`,
            background: colors.mint,
            borderRadius: '0',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>
    ))}
  </div>
);

// Comparison Bar Component
const ComparisonBar = ({ label, baseline, withRange, maxValue }) => {
  const savings = baseline - withRange;
  const savingsPercent = baseline > 0 ? (savings / baseline) * 100 : 0;
  
  return (
    <div className="comparison-bar" style={{ marginBottom: '30px' }}>
      <div className="comparison-bar__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', gap: '12px' }}>
        <div style={{ 
          fontFamily: "'Barlow', Arial, sans-serif",
          fontSize: '18px', 
          fontWeight: 500,
          color: colors.darkOlive,
        }}>
          {label}
        </div>
        {savings > 0 && (
        <div className="comparison-bar__badge" style={{
            background: 'rgba(134, 227, 166, 0.1)',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '14px',
            fontWeight: 500,
            color: colors.gray900,
            padding: '7px 10px',
          }}>
            Save {formatCurrency(savings)} ({savingsPercent.toFixed(0)}%)
          </div>
        )}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <div className="comparison-bar__labels" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', gap: '12px' }}>
          <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14px', color: colors.darkOlive }}>Baseline</span>
          <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14px', color: colors.darkOlive }}>{formatCurrency(baseline)}</span>
        </div>
        <div style={{ height: '5px', background: 'rgba(209, 98, 75, 0.25)', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(baseline / maxValue) * 100}%`,
            background: colors.coral,
          }} />
        </div>
      </div>
      <div>
        <div style={{ height: '5px', background: 'rgba(134, 227, 166, 0.25)', overflow: 'hidden', marginBottom: '8px' }}>
          <div style={{
            height: '100%',
            width: `${(withRange / maxValue) * 100}%`,
            background: colors.mint,
          }} />
        </div>
        <div className="comparison-bar__labels" style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14px', fontWeight: 500, color: colors.gray900 }}>With Range Energy</span>
          <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '14px', fontWeight: 500, color: colors.gray900 }}>{formatCurrency(withRange)}</span>
        </div>
      </div>
    </div>
  );
};

export default function RangeSavingsCalculator() {
  // Slider inputs (from spreadsheet [SLIDE BAR] markers)
  const [milesPerDay, setMilesPerDay] = useState(250);
  const [dieselPrice, setDieselPrice] = useState(4.0);
  const [electricityCost, setElectricityCost] = useState(0.12);
  const [baselineMpg, setBaselineMpg] = useState(6.2);
  const [truHoursPerDay, setTruHoursPerDay] = useState(14);
  
  // Toggles
  const [includeTru, setIncludeTru] = useState(true);
  const [showDetailedView, setShowDetailedView] = useState(false);
  
// Fixed constants from spreadsheet
  const operatingDaysPerWeek = 6;
  const annualDaysOfOperation = operatingDaysPerWeek * 52;
  const rangeFuelSavingsPercent = 0.35;
  const energyConsumptionKwhPerMile = 0.75;
  const chargerEfficiency = 0.98;
  const maxPropulsionRange = 300;
  const nomPropulsionRange = 350;
  const assetLifetime = 12;
  const purchasePrice = 100000;
  
  // TRU constants
  const truDieselConsumptionGalPerHr = 0.9;
  const truElectricityDrawKwPerHr = 8;
  
  // Maintenance constants
  const truckTrailerMaintCostPerYr = 6000; // annual maintenance at 300 mi/day
  const truckTrailerMinMaintCostPerYr = 2000; // min annual maintenance 
  const maintSavingsPerMile = 0.02;
  const truDieselModeMaintPerHr = 1.5;
  const truElectricModeMaintPerHr = 0.5;
  const eTruMaintSavingsCredit = 0.35;
  const rangeMaintCost = 200;

  const calculations = useMemo(() => {
    const annualMileage = milesPerDay * annualDaysOfOperation;
    
    // MPG improvement
    const mpgImprovement = -1 / (1 - 1 / rangeFuelSavingsPercent);
    const withRangeMpg = baselineMpg * (1 + mpgImprovement);
    
    // Daily fuel calculations
    const baselineDailyFuel = milesPerDay / baselineMpg;

    const reeferKwhRangeReduction = truElectricityDrawKwPerHr * Math.min(truHoursPerDay, 8.0); // assume average truck driver's shift if 8 hrs -- rest of reefing should be on charger
    const realisticMaxPropulsionRange = Math.min(maxPropulsionRange, nomPropulsionRange * (1.0 - reeferKwhRangeReduction/300.0)); // smaller of (300, 350 * (battery % remaining after reefer use))
    const effectiveMiles = Math.min(milesPerDay, realisticMaxPropulsionRange);
    const dailyFuelSaved = effectiveMiles / baselineMpg - effectiveMiles / withRangeMpg;
    
    // Cost per mile
    const electricityCostPerMile = energyConsumptionKwhPerMile * electricityCost / chargerEfficiency;
    
    // TRU calculations
    const annualTruHours = truHoursPerDay * annualDaysOfOperation;
    const truDailyFuelSaved = truDieselConsumptionGalPerHr * truHoursPerDay;
    const truElectricityCostPerHour = truElectricityDrawKwPerHr * electricityCost / chargerEfficiency;
    
    // === BASELINE COSTS ===
    const baselineTractorFuel = annualMileage / baselineMpg * dieselPrice;
    const baselineTractorMaint = Math.max(truckTrailerMaintCostPerYr * milesPerDay / 250.0, truckTrailerMinMaintCostPerYr); // more mainence the more you drive
    const baselineTruFuel = truDieselConsumptionGalPerHr * truHoursPerDay * annualDaysOfOperation * dieselPrice;
    const baselineTruMaint = truDieselModeMaintPerHr * annualTruHours;
    
    // === SAVINGS ===
    const tractorDieselSavings = dailyFuelSaved * dieselPrice * annualDaysOfOperation;
    const tractorMaintSavings = maintSavingsPerMile * milesPerDay * annualDaysOfOperation;
    const truDieselSavings = baselineTruFuel;
    const truMaintSavings = (truDieselModeMaintPerHr - truElectricModeMaintPerHr) * annualTruHours * eTruMaintSavingsCredit;
    
    // === RANGE COSTS ===
    const rangeElectricityCostTractor = Math.min(milesPerDay, maxPropulsionRange) * annualDaysOfOperation * electricityCostPerMile;
    const rangeElectricityCostTru = truElectricityCostPerHour * truHoursPerDay * annualDaysOfOperation;
    
    // === NET NEW COSTS WITH RANGE ===
    const netTractorFuel = baselineTractorFuel - tractorDieselSavings + rangeElectricityCostTractor;
    const netTractorMaint = baselineTractorMaint - tractorMaintSavings + rangeMaintCost;
    const netTruFuel = rangeElectricityCostTru;
    const netTruMaint = baselineTruMaint - truMaintSavings;
    
    // === NET ANNUAL SAVINGS ===
    const ansTractorFuel = tractorDieselSavings - rangeElectricityCostTractor;
    const ansTractorMaint = tractorMaintSavings - rangeMaintCost;
    const ansTruFuel = truDieselSavings - rangeElectricityCostTru;
    const ansTruMaint = truMaintSavings;
    
    // === TOTALS ===
    const baselineTotal = baselineTractorFuel + baselineTractorMaint + 
      (includeTru ? baselineTruFuel + baselineTruMaint : 0);
    const rangeTotal = netTractorFuel + netTractorMaint + 
      (includeTru ? netTruFuel + netTruMaint : 0);
    const totalAnnualSavings = ansTractorFuel + ansTractorMaint + 
      (includeTru ? ansTruFuel + ansTruMaint : 0);
    
    // === FUEL & CO2 ===
    const tractorAnnualGallonsSaved = dailyFuelSaved * annualDaysOfOperation;
    const truAnnualGallonsSaved = truDailyFuelSaved * annualDaysOfOperation;
    const totalAnnualGallonsSaved = tractorAnnualGallonsSaved + (includeTru ? truAnnualGallonsSaved : 0);
    const annualCO2Tons = totalAnnualGallonsSaved * 22.4 / 2000;
    const lifetimeCO2Tons = annualCO2Tons * assetLifetime;
    
    // === PAYBACK ===
    const paybackYears = totalAnnualSavings > 0 ? purchasePrice / totalAnnualSavings : Infinity;
    const lifetimeSavings = totalAnnualSavings * assetLifetime;
    
    return {
      annualMileage,
      withRangeMpg,
      mpgImprovement: mpgImprovement * 100,
      
      baseline: {
        tractorFuel: baselineTractorFuel,
        tractorMaint: baselineTractorMaint,
        truFuel: baselineTruFuel,
        truMaint: baselineTruMaint,
        total: baselineTotal,
      },
      withRange: {
        tractorFuel: netTractorFuel,
        tractorMaint: netTractorMaint,
        truFuel: netTruFuel,
        truMaint: netTruMaint,
        total: rangeTotal,
      },
      savings: {
        tractorFuel: ansTractorFuel,
        tractorMaint: ansTractorMaint,
        truFuel: ansTruFuel,
        truMaint: ansTruMaint,
        total: totalAnnualSavings,
        percent: baselineTotal > 0 ? (totalAnnualSavings / baselineTotal) * 100 : 0,
      },
      fuel: {
        tractorGallons: tractorAnnualGallonsSaved,
        truGallons: truAnnualGallonsSaved,
        totalGallons: totalAnnualGallonsSaved,
        lifetimeGallons: totalAnnualGallonsSaved * assetLifetime,
      },
      co2: {
        annual: annualCO2Tons,
        lifetime: lifetimeCO2Tons,
      },
      paybackYears,
      lifetimeSavings,
    };
  }, [milesPerDay, dieselPrice, electricityCost, baselineMpg, truHoursPerDay, includeTru]);

  return (
    <div
      className="app-shell"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: colors.lightGray,
        minHeight: '100vh',
        padding: '30px 100px 40px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Inter:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        * {
          box-sizing: border-box;
        }
        .app-frame {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
        }
        .top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 75px;
        }
        .brand-img {
          width: 140px;
          height: 46px;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
        }
        .brand-link {
          display: inline-flex;
          flex-shrink: 0;
        }
        .nav-links {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: nowrap;
          gap: 30px;
        }
        .nav-link {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.3;
          color: #000000;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-cta {
          border: none;
          background: rgba(134, 227, 166, 0.25);
          border-radius: 999px;
          padding: 15px 25px;
          min-height: 46px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1;
          color: #000000;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 300ms ease;
        }
        .nav-cta:hover {
          background: #86e3a6;
        }
        .hero-header {
          text-align: left;
          margin-bottom: 75px;
          max-width: 900px;
        }
        .hero-title {
          font-size: clamp(42px, 5vw, 60px);
          line-height: 0.98;
        }
        .hero-subtitle {
          font-size: clamp(18px, 2vw, 20px);
          line-height: 1.35;
          max-width: 760px;
        }
        .main-layout {
          display: grid;
          grid-template-columns: minmax(0, 30%) minmax(0, 70%);
          gap: 75px;
          align-items: start;
        }
        .controls-column,
        .results-column,
        .metric-card,
        .ownership-panel,
        .category-panel {
          min-width: 0;
        }
        .metrics-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
        }
        .metric-card--divider {
          border-left: 1px solid rgba(117, 143, 163, 0.22);
        }
        .ownership-header,
        .totals-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .detailed-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
        }
        .bar-chart-row,
        .comparison-bar__labels {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }
        .disclaimer {
          max-width: 100%;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 1px solid rgba(117, 143, 163, 0.5);
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }
        input[type="range"]::-moz-range-thumb {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 1px solid rgba(117, 143, 163, 0.5);
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }
        @media (max-width: 1100px) {
          .app-shell {
            padding: 30px 50px 40px !important;
          }
          .top-nav {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 56px;
          }
          .brand-img {
            width: 132px;
            height: auto;
          }
          .nav-links {
            width: 100%;
            justify-content: flex-start;
            flex-wrap: wrap;
            gap: 18px 24px;
          }
          .main-layout {
            gap: 40px;
          }
          .metrics-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .metric-card--divider {
            border-left: none;
            border-top: 1px solid rgba(117, 143, 163, 0.22);
          }
          .metric-card--divider:nth-child(2) {
            border-top: none;
          }
          .detailed-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 900px) {
          .hero-header {
            margin-bottom: 48px;
          }
          .main-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }
        @media (max-width: 640px) {
          .app-shell {
            padding: 24px 20px 32px !important;
          }
          .top-nav {
            margin-bottom: 40px;
          }
          .brand-img {
            width: 124px;
          }
          .nav-links {
            width: 100%;
            gap: 14px 18px;
          }
          .nav-link {
            font-size: 15px;
          }
          .nav-cta {
            padding: 14px 22px;
            min-height: 42px;
            font-size: 15px;
          }
          .nav-links button {
            width: 100%;
          }
          .hero-header {
            margin-bottom: 36px;
          }
          .metrics-row {
            grid-template-columns: 1fr;
          }
          .metric-card--divider {
            border-top: 1px solid rgba(117, 143, 163, 0.22);
          }
          .ownership-header,
          .totals-row,
          .comparison-bar__header,
          .bar-chart-row,
          .comparison-bar__labels {
            flex-direction: column;
            align-items: flex-start;
          }
          .ownership-panel,
          .category-panel {
            padding: 20px !important;
          }
          .totals-secondary {
            text-align: left !important;
          }
        }
      `}</style>
      
      <div className="app-frame">
        <div className="top-nav">
          <a
            href="https://range-energy-dev-be6d83c64425937e95c1f3.webflow.io/"
            className="brand-link"
            aria-label="Range Energy home"
          >
            <img src={rangeEnergyLogo} alt="Range Energy" className="brand-img" />
          </a>
          <div className="nav-links">
            <a href="#" className="nav-link">Calculator</a>
            <a href="https://range-energy-dev-be6d83c64425937e95c1f3.webflow.io/team" className="nav-link">Team</a>
            <a href="https://range-energy-dev-be6d83c64425937e95c1f3.webflow.io/news" className="nav-link">News</a>
            <a href="https://range-energy-dev-be6d83c64425937e95c1f3.webflow.io/careers" className="nav-link">Careers</a>
            <button type="button" className="nav-cta">
              Contact Us
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="hero-header">
          <h1 style={{
            fontFamily: "'Barlow', Arial, sans-serif",
            fontWeight: 700,
            color: colors.gray900,
            margin: 0,
          }} className="hero-title">
            Range eTrailer Savings Calculator
          </h1>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            color: colors.gray900,
            marginTop: '14px',
            marginBottom: 0,
          }} className="hero-subtitle">
            Calculate your potential annual savings with Range Energy's electrified trailer system
          </p>
        </div>

        <div className="main-layout">
          {/* Left Panel - Inputs */}
          <div className="controls-column" style={{
            borderRadius: '10px',
            height: 'fit-content',
          }}>
            <h2 style={{
              fontFamily: "'Barlow', Arial, sans-serif",
              fontSize: '22px',
              fontWeight: 700,
              color: colors.darkOlive,
              marginTop: 0,
              marginBottom: '18px',
            }}>
              Your fleet parameters
            </h2>
            <div style={{ borderTop: '1px solid rgba(117, 143, 163, 0.45)', marginBottom: '24px' }} />
            
            <Slider
              label="Average daily miles"
              value={milesPerDay}
              onChange={setMilesPerDay}
              min={50}
              max={500}
              step={10}
              unit=" mi"
            />
            
            <Slider
              label="Diesel price"
              value={dieselPrice}
              onChange={setDieselPrice}
              min={2.5}
              max={8}
              step={0.1}
              unit="/gal"
              prefix="$"
            />
            
            <Slider
              label="Electricity cost"
              value={electricityCost}
              onChange={setElectricityCost}
              min={0.05}
              max={0.35}
              step={0.01}
              unit="/kWh"
              prefix="$"
            />
            
            <Slider
              label="Baseline fuel economy"
              value={baselineMpg}
              onChange={setBaselineMpg}
              min={4}
              max={10}
              step={0.1}
              unit=" mpg"
            />

            <div style={{ 
              borderTop: '1px solid rgba(117, 143, 163, 0.45)', 
              paddingTop: '1.5rem',
              marginTop: '0.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Toggle 
                  label="Include refrigerated trailer (TRU)" 
                  checked={includeTru} 
                  onChange={setIncludeTru}
                />
              </div>
              
              {includeTru && (
                <Slider
                  label="TRU operating hours"
                  value={truHoursPerDay}
                  onChange={setTruHoursPerDay}
                  min={4}
                  max={24}
                  step={1}
                  unit=" hrs/day"
                />
              )}
            </div>

            {/* Key Stats Summary */}
            <div style={{
              background: 'rgba(117, 143, 163, 0.05)',
              borderRadius: '0',
              padding: '15px',
              marginTop: '1rem',
            }}>
              <div style={{ fontSize: '14px', color: colors.gray900, marginBottom: '10px' }}>
                Annual mileage: <strong style={{ color: colors.gray900 }}>{formatNumber(calculations.annualMileage)} miles</strong>
              </div>
              <div style={{ fontSize: '14px', color: colors.gray900 }}>
                Improved fuel economy: <strong style={{ color: colors.gray900 }}>{calculations.withRangeMpg.toFixed(1)} mpg</strong>
                <span style={{ 
                  color: colors.gray900,
                  marginLeft: '8px',
                  background: colors.mint,
                  fontSize: '12px',
                  padding: '2px 5px',
                  display: 'inline-block'
                }}>
                  (+{calculations.mpgImprovement.toFixed(0)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="results-column">
            {/* Top Metrics Row */}
            <div className="metrics-row" style={{ 
              marginBottom: 0, 
              border: '0.5px solid rgba(117, 143, 163, 0.5)',
              borderBottom: 'none',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              overflow: 'hidden',
              background: 'rgba(134, 227, 166, 0.1)',
            }}>
              <MetricCard
                label="Annual savings"
                value={formatCurrency(calculations.savings.total)}
                subtext={`${calculations.savings.percent.toFixed(0)}% reduction in operating costs`}
                highlight
              />
              <MetricCard
                label="Fuel saved"
                value={`${formatNumber(calculations.fuel.totalGallons)} gal`}
                subtext="per year"
                divider
              />
              <MetricCard
                label="CO₂ reduced"
                value={`${formatNumber(calculations.co2.annual, 1)} tons`}
                subtext="per year"
                divider
              />
              <MetricCard
                label="CO₂ reduced"
                value={`${formatNumber(calculations.co2.lifetime, 0)} tons`}
                subtext={`over ${assetLifetime} years`}
                divider
              />
            </div>

            {/* TCO Breakdown Section */}
            <div className="ownership-panel" style={{
              background: 'white',
              border: '0.5px solid rgba(117, 143, 163, 0.5)',
              borderTop: 'none',
              borderBottom: 'none',
              borderRadius: 0,
              padding: '25px',
              marginBottom: 0,
            }}>
              <div className="ownership-header" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: colors.darkOlive,
                  margin: 0,
                }}>
                  Annual cost of ownership
                </h2>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <button
                    onClick={() => setShowDetailedView(false)}
                    style={{
                      padding: '6px 0',
                      borderRadius: 0,
                      border: 'none',
                      borderBottom: !showDetailedView ? `2px solid ${colors.mint}` : '2px solid transparent',
                      background: 'transparent',
                      color: !showDetailedView ? colors.gray900 : colors.darkOlive,
                      fontSize: '13px',
                      fontWeight: 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Category
                  </button>
                  <button
                    onClick={() => setShowDetailedView(true)}
                    style={{
                      padding: '6px 0',
                      borderRadius: 0,
                      border: 'none',
                      borderBottom: showDetailedView ? `2px solid ${colors.mint}` : '2px solid transparent',
                      background: 'transparent',
                      color: showDetailedView ? colors.gray900 : colors.darkOlive,
                      fontSize: '13px',
                      fontWeight: 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Detailed
                  </button>
                </div>
              </div>

              {!showDetailedView ? (
                /* Category View */
                <div>
                  <ComparisonBar
                    label="Tractor fuel"
                    baseline={calculations.baseline.tractorFuel}
                    withRange={calculations.withRange.tractorFuel}
                    maxValue={Math.max(calculations.baseline.tractorFuel, calculations.baseline.total * 0.6)}
                  />
                  <ComparisonBar
                    label="Tractor & trailer maintenance"
                    baseline={calculations.baseline.tractorMaint}
                    withRange={calculations.withRange.tractorMaint}
                    maxValue={Math.max(calculations.baseline.tractorFuel, calculations.baseline.total * 0.6)}
                  />
                  {includeTru && (
                    <>
                      <ComparisonBar
                        label="TRU fuel (reefer)"
                        baseline={calculations.baseline.truFuel}
                        withRange={calculations.withRange.truFuel}
                        maxValue={Math.max(calculations.baseline.tractorFuel, calculations.baseline.total * 0.6)}
                      />
                      <ComparisonBar
                        label="TRU maintenance"
                        baseline={calculations.baseline.truMaint}
                        withRange={calculations.withRange.truMaint}
                        maxValue={Math.max(calculations.baseline.tractorFuel, calculations.baseline.total * 0.6)}
                      />
                    </>
                  )}
                </div>
              ) : (
                /* Detailed View */
                <div className="detailed-grid">
                  <div>
                    <h3 style={{
                      fontFamily: "'Barlow', Arial, sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: colors.coral,
                      marginTop: 0,
                      marginBottom: '1rem',
                    }}>
                      Baseline annual costs
                    </h3>
                    <div style={{ fontSize: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.lightGray}` }}>
                        <span style={{ color: colors.gray700 }}>Tractor diesel fuel</span>
                        <span style={{ fontWeight: 500 }}>{formatCurrency(calculations.baseline.tractorFuel)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.lightGray}` }}>
                        <span style={{ color: colors.gray700 }}>Tractor/trailer maintenance</span>
                        <span style={{ fontWeight: 500 }}>{formatCurrency(calculations.baseline.tractorMaint)}</span>
                      </div>
                      {includeTru && (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.lightGray}` }}>
                            <span style={{ color: colors.gray700 }}>TRU diesel fuel</span>
                            <span style={{ fontWeight: 500 }}>{formatCurrency(calculations.baseline.truFuel)}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.lightGray}` }}>
                            <span style={{ color: colors.gray700 }}>TRU maintenance</span>
                            <span style={{ fontWeight: 500 }}>{formatCurrency(calculations.baseline.truMaint)}</span>
                          </div>
                        </>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 600, color: colors.coral }}>
                        <span>Total baseline</span>
                        <span>{formatCurrency(calculations.baseline.total)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 style={{
                      fontFamily: "'Barlow', Arial, sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: colors.forest,
                      marginTop: 0,
                      marginBottom: '1rem',
                    }}>
                      With Range eTrailer
                    </h3>
                    <div style={{ fontSize: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.lightGray}` }}>
                        <span style={{ color: colors.gray700 }}>Tractor fuel + electricity</span>
                        <span style={{ fontWeight: 500 }}>{formatCurrency(calculations.withRange.tractorFuel)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.lightGray}` }}>
                        <span style={{ color: colors.gray700 }}>Tractor/trailer maintenance</span>
                        <span style={{ fontWeight: 500 }}>{formatCurrency(calculations.withRange.tractorMaint)}</span>
                      </div>
                      {includeTru && (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.lightGray}` }}>
                            <span style={{ color: colors.gray700 }}>eTRU electricity</span>
                            <span style={{ fontWeight: 500 }}>{formatCurrency(calculations.withRange.truFuel)}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.lightGray}` }}>
                            <span style={{ color: colors.gray700 }}>eTRU maintenance</span>
                            <span style={{ fontWeight: 500 }}>{formatCurrency(calculations.withRange.truMaint)}</span>
                          </div>
                        </>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontWeight: 600, color: colors.forest }}>
                        <span>Total with Range</span>
                        <span>{formatCurrency(calculations.withRange.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Total Savings Summary Bar */}
              <div className="totals-row" style={{
                background: '#ffffff',
                borderTop: '1px solid rgba(117, 143, 163, 0.2)',
                padding: '10px 0 20px',
                marginTop: '10px',
              }}>
                <div>
                  <div style={{ 
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontSize: '16px',
                    fontWeight: 400,
                    color: colors.softBlue,
                    marginBottom: '5px',
                  }}>
                    Net annual savings
                  </div>
                  <div style={{
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontSize: '42px',
                    fontWeight: 600,
                    color: colors.gray900,
                  }}>
                    {formatCurrency(calculations.savings.total)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }} className="totals-secondary">
                  <div style={{ fontFamily: "'Barlow', Arial, sans-serif", fontSize: '16px', color: colors.softBlue, marginBottom: '5px' }}>
                    Lifetime savings ({assetLifetime} years)
                  </div>
                  <div style={{
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontSize: '42px',
                    fontWeight: 600,
                    color: colors.gray900,
                  }}>
                    {formatCurrency(calculations.lifetimeSavings)}
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Breakdown Cards */}
            <div className="category-panel" style={{
              background: 'rgba(255, 255, 255, 0.5)',
              border: '0.5px solid rgba(117, 143, 163, 0.5)',
              borderTop: 'none',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              padding: '25px',
            }}>
              <h2 style={{
                fontFamily: "'Barlow', Arial, sans-serif",
                fontSize: '20px',
                fontWeight: 700,
                color: colors.darkOlive,
                marginTop: 0,
                marginBottom: '30px',
              }}>
                Annual savings by category
              </h2>
              
              <BarChart 
                data={[
                  { label: 'Tractor fuel savings', value: calculations.savings.tractorFuel, color: colors.mint },
                  { label: 'Maintenance savings', value: calculations.savings.tractorMaint, color: colors.sage },
                  ...(includeTru ? [
                    { label: 'TRU fuel savings', value: calculations.savings.truFuel, color: colors.tealAccent },
                    { label: 'TRU maintenance savings', value: calculations.savings.truMaint, color: colors.softBlue },
                  ] : []),
                ]}
                maxValue={Math.max(
                  calculations.savings.tractorFuel,
                  calculations.savings.truFuel || 0,
                  calculations.savings.tractorMaint,
                  1000
                ) * 1.1}
              />
            </div>



            {/* Disclaimer */}
            <p className="disclaimer" style={{
              fontSize: '12px',
              color: colors.gray600,
              marginTop: '1.5rem',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              Actual results may vary depending on operations, conditions, and environment. Results are not guaranteed and are for reference only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
