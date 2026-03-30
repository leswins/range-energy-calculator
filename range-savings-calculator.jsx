import React, { useState, useMemo } from 'react';

// Range Energy Brand Colors
const colors = {
  warmWhite: '#fef9f3',
  lightGray: '#f3f3f3',
  darkOlive: '#353831',
  deepTeal: '#0f262d',
  mint: '#86e3a6',
  softBlue: '#abc2d2',
  sage: '#5eaa98',
  forest: '#21543b',
  tealAccent: '#03666c',
  coral: '#d1624b',
  gold: '#e2a347',
  lime: '#ede76e',
  mutedSage: '#7b896f',
  gray900: '#212121',
  gray700: '#464646',
  gray600: '#646464',
  gray400: '#969696',
  gray200: '#c8c8c8',
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
  <div style={{ marginBottom: '1.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
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
        color: colors.tealAccent 
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
        borderRadius: '3px',
        background: `linear-gradient(to right, ${colors.mint} 0%, ${colors.mint} ${((value - min) / (max - min)) * 100}%, ${colors.gray200} ${((value - min) / (max - min)) * 100}%, ${colors.gray200} 100%)`,
        outline: 'none',
        cursor: 'pointer',
        WebkitAppearance: 'none',
      }}
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
      <span style={{ fontSize: '11px', color: colors.gray600 }}>{prefix}{min}{unit}</span>
      <span style={{ fontSize: '11px', color: colors.gray600 }}>{prefix}{max}{unit}</span>
    </div>
  </div>
);

// Toggle Switch Component
const Toggle = ({ label, checked, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <span style={{ 
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '14px', 
      color: colors.darkOlive 
    }}>
      {label}
    </span>
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '48px',
        height: '26px',
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
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        top: '2px',
        left: checked ? '24px' : '2px',
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  </div>
);

// Metric Card Component
const MetricCard = ({ label, value, subtext, highlight = false, icon }) => (
  <div style={{
    background: highlight ? colors.deepTeal : colors.lightGray,
    borderRadius: '12px',
    padding: '1.25rem',
    flex: 1,
    minWidth: '140px',
  }}>
    {icon && <div style={{ marginBottom: '8px', fontSize: '24px' }}>{icon}</div>}
    <div style={{ 
      fontFamily: "'Barlow', Arial, sans-serif",
      fontSize: '11px', 
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: highlight ? colors.sage : colors.gray600,
      marginBottom: '4px',
    }}>
      {label}
    </div>
    <div style={{ 
      fontFamily: "'Barlow', Arial, sans-serif",
      fontSize: '28px', 
      fontWeight: 500, 
      color: highlight ? colors.warmWhite : colors.darkOlive,
      lineHeight: 1.1,
    }}>
      {value}
    </div>
    {subtext && (
      <div style={{ 
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '12px', 
        color: highlight ? colors.softBlue : colors.gray600,
        marginTop: '4px',
      }}>
        {subtext}
      </div>
    )}
  </div>
);

// Bar Chart Component
const BarChart = ({ data, maxValue }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {data.map((item, i) => (
      <div key={i}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ 
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '13px', 
            color: colors.darkOlive 
          }}>
            {item.label}
          </span>
          <span style={{ 
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '13px', 
            fontWeight: 500,
            color: colors.darkOlive 
          }}>
            {formatCurrency(item.value)}
          </span>
        </div>
        <div style={{ 
          height: '24px', 
          background: colors.gray200, 
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${Math.max(0, (item.value / maxValue) * 100)}%`,
            background: item.color,
            borderRadius: '4px',
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
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ 
        fontFamily: "'Barlow', Arial, sans-serif",
        fontSize: '14px', 
        fontWeight: 500,
        color: colors.darkOlive,
        marginBottom: '8px',
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', color: colors.gray600, width: '70px' }}>Baseline</span>
        <div style={{ flex: 1, height: '20px', background: colors.gray200, borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(baseline / maxValue) * 100}%`,
            background: colors.coral,
            borderRadius: '4px',
          }} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 500, width: '80px', textAlign: 'right' }}>{formatCurrency(baseline)}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: colors.gray600, width: '70px' }}>With Range</span>
        <div style={{ flex: 1, height: '20px', background: colors.gray200, borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(withRange / maxValue) * 100}%`,
            background: colors.mint,
            borderRadius: '4px',
          }} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 500, width: '80px', textAlign: 'right' }}>{formatCurrency(withRange)}</span>
      </div>
      {savings > 0 && (
        <div style={{ 
          textAlign: 'right', 
          marginTop: '4px',
          fontSize: '12px',
          color: colors.forest,
          fontWeight: 500,
        }}>
          Save {formatCurrency(savings)} ({savingsPercent.toFixed(0)}%)
        </div>
      )}
    </div>
  );
};

export default function RangeSavingsCalculator() {
  // Slider inputs (from spreadsheet [SLIDE BAR] markers)
  const [milesPerDay, setMilesPerDay] = useState(250);
  const [dieselPrice, setDieselPrice] = useState(3.5);
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
  const assetLifetime = 12;
  const purchasePrice = 100000;
  
  // TRU constants
  const truDieselConsumptionGalPerHr = 0.9;
  const truElectricityDrawKwPerHr = 8;
  
  // Maintenance constants
  const truckTrailerMaintCostPerYr = 6000;
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
    const effectiveMiles = Math.min(milesPerDay, maxPropulsionRange);
    const dailyFuelSaved = effectiveMiles / baselineMpg - effectiveMiles / withRangeMpg;
    
    // Cost per mile
    const electricityCostPerMile = energyConsumptionKwhPerMile * electricityCost / chargerEfficiency;
    
    // TRU calculations
    const annualTruHours = truHoursPerDay * annualDaysOfOperation;
    const truDailyFuelSaved = truDieselConsumptionGalPerHr * truHoursPerDay;
    const truElectricityCostPerHour = truElectricityDrawKwPerHr * electricityCost / chargerEfficiency;
    
    // === BASELINE COSTS ===
    const baselineTractorFuel = annualMileage / baselineMpg * dieselPrice;
    const baselineTractorMaint = truckTrailerMaintCostPerYr;
    const baselineTruFuel = truDieselConsumptionGalPerHr * truHoursPerDay * annualDaysOfOperation * dieselPrice;
    const baselineTruMaint = truDieselModeMaintPerHr * annualTruHours;
    
    // === SAVINGS ===
    const tractorDieselSavings = dailyFuelSaved * dieselPrice * annualDaysOfOperation;
    const tractorMaintSavings = maintSavingsPerMile * annualMileage;
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
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      background: colors.warmWhite,
      minHeight: '100vh',
      padding: '2rem',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;700&family=Inter:wght@400;500&display=swap');
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${colors.tealAccent};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${colors.tealAccent};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontFamily: "'Barlow', Arial, sans-serif",
            fontSize: '36px',
            fontWeight: 400,
            color: colors.darkOlive,
            margin: 0,
          }}>
            Range eTrailer Savings Calculator
          </h1>
          <p style={{
            fontSize: '16px',
            color: colors.gray600,
            marginTop: '8px',
          }}>
            Calculate your potential annual savings with Range Energy's electrified trailer system
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2rem' }}>
          {/* Left Panel - Inputs */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            height: 'fit-content',
          }}>
            <h2 style={{
              fontFamily: "'Barlow', Arial, sans-serif",
              fontSize: '18px',
              fontWeight: 500,
              color: colors.darkOlive,
              marginTop: 0,
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: `2px solid ${colors.mint}`,
            }}>
              Your fleet parameters
            </h2>
            
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
              max={6}
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
              borderTop: `1px solid ${colors.gray200}`, 
              paddingTop: '1.5rem',
              marginTop: '0.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
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
              background: colors.lightGray,
              borderRadius: '12px',
              padding: '1rem',
              marginTop: '1rem',
            }}>
              <div style={{ fontSize: '12px', color: colors.gray600, marginBottom: '8px' }}>
                Annual mileage: <strong style={{ color: colors.darkOlive }}>{formatNumber(calculations.annualMileage)} miles</strong>
              </div>
              <div style={{ fontSize: '12px', color: colors.gray600 }}>
                Improved fuel economy: <strong style={{ color: colors.forest }}>{calculations.withRangeMpg.toFixed(1)} mpg</strong>
                <span style={{ color: colors.mint, marginLeft: '6px' }}>
                  (+{calculations.mpgImprovement.toFixed(0)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div>
            {/* Top Metrics Row */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
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
              />
              <MetricCard
                label="CO₂ reduced"
                value={`${formatNumber(calculations.co2.annual, 1)} tons`}
                subtext="per year"
              />
              <MetricCard
                label="CO₂ reduced"
                value={`${formatNumber(calculations.co2.lifetime, 0)} tons`}
                subtext={`over ${assetLifetime} years`}
              />
            </div>

            {/* TCO Breakdown Section */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontFamily: "'Barlow', Arial, sans-serif",
                  fontSize: '18px',
                  fontWeight: 500,
                  color: colors.darkOlive,
                  margin: 0,
                }}>
                  Annual cost of ownership
                </h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setShowDetailedView(false)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: !showDetailedView ? colors.tealAccent : colors.lightGray,
                      color: !showDetailedView ? 'white' : colors.gray700,
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Category
                  </button>
                  <button
                    onClick={() => setShowDetailedView(true)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: showDetailedView ? colors.tealAccent : colors.lightGray,
                      color: showDetailedView ? 'white' : colors.gray700,
                      fontSize: '13px',
                      fontWeight: 500,
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
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
              <div style={{
                background: colors.deepTeal,
                borderRadius: '12px',
                padding: '1.25rem',
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <div style={{ 
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontSize: '13px', 
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: colors.sage,
                    marginBottom: '4px',
                  }}>
                    Net annual savings
                  </div>
                  <div style={{
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontSize: '32px',
                    fontWeight: 500,
                    color: colors.mint,
                  }}>
                    {formatCurrency(calculations.savings.total)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', color: colors.softBlue, marginBottom: '4px' }}>
                    Lifetime savings ({assetLifetime} years)
                  </div>
                  <div style={{
                    fontFamily: "'Barlow', Arial, sans-serif",
                    fontSize: '24px',
                    fontWeight: 500,
                    color: colors.warmWhite,
                  }}>
                    {formatCurrency(calculations.lifetimeSavings)}
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Breakdown Cards */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }}>
              <h2 style={{
                fontFamily: "'Barlow', Arial, sans-serif",
                fontSize: '18px',
                fontWeight: 500,
                color: colors.darkOlive,
                marginTop: 0,
                marginBottom: '1.25rem',
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
            <p style={{
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
