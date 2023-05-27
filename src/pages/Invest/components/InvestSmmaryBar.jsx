import React from 'react';
import { Col, Row, Skeleton, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import useMeasure from 'react-use-measure';
import { INVEST_TPYE_BUY_LONG } from '@/enum/investType';

const HEIGHT = 50;
const BAR_HEIGHT = HEIGHT * 1.2;
const TICKING_BAR_HEIGHT = HEIGHT * 1.6;

const AutomateOrderPoint = (props) => {
  const { color, height, left, showPrice = false, text } = props;
  const Top = showPrice ? (
    <Text underline>${text}</Text>
  ) : (
    <div style={{ backgroundColor: color, borderRadius: '100%', height: 5, width: 5 }} />
  );

  return (
    <div style={{ position: 'absolute', left, bottom: 0 }}>
      <Tooltip title={`$${text}`}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          {Top}
          <div style={{ backgroundColor: 'grey', height, width: 1 }} />
        </div>
      </Tooltip>
    </div>
  );
};

const CurrentAutomateOrderBar = (props) => {
  const { barWidth, investSteps, rangeMax, rangeMin } = props;
  const bars = investSteps
    ? investSteps
        .filter(({ hasOrder }) => hasOrder)
        .map(({ from, hasOrder, profit, to }) => {
          const leftValue = calculateAbsoluteLeftValue(barWidth, rangeMax, rangeMin, to);
          return (
            <AutomateOrderPoint
              key="bar"
              color={profit ? 'green' : 'red'}
              height={BAR_HEIGHT}
              left={leftValue}
              text={to}
            />
          );
        })
    : [];
  return bars;
};

const CurrentTickingPoint = (props) => {
  const { barWidth, currentTickingPrice, invest, rangeMax, rangeMin } = props;
  const { investType, ticking } = invest;
  if (!ticking) {
    return null;
  }
  const leftValue = calculateAbsoluteLeftValue(barWidth, rangeMax, rangeMin, currentTickingPrice);
  return (
    <AutomateOrderPoint
      color="purple"
      height={TICKING_BAR_HEIGHT}
      left={leftValue}
      showPrice
      text={currentTickingPrice}
    />
  );
};

const AutomateOrderBar = (props) => {
  const [ref, bounds] = useMeasure();
  if (!props.invest || !props.invest.ticking) {
    return <Skeleton active />;
  }
  const { investSteps, investType, maxPrice, minPrice, ticking } = props.invest;
  const currentTickingPrice =
    investType === INVEST_TPYE_BUY_LONG ? ticking.bidPrice : ticking.offerPrice;
  const rangeMin = Math.min(minPrice, currentTickingPrice);
  const rangeMax = Math.max(maxPrice, currentTickingPrice);
  const barWidth = bounds?.width ?? 0;
  return (
    <div style={{ marginTop: TICKING_BAR_HEIGHT - HEIGHT + 20 }}>
      <Row align="middle" justify="middle">
        <Col flex="none" style={{ padding: 5 }}>
          <Text>{rangeMin}</Text>
        </Col>
        <Col flex="auto">
          <div
            ref={ref}
            style={{
              borderColor: 'lightGrey',
              borderRadius: 3,
              borderStyle: 'solid',
              borderWidth: 0.5,
              position: 'relative',
              height: HEIGHT,
            }}
          >
            <CurrentTickingPoint
              barWidth={barWidth}
              currentTickingPrice={currentTickingPrice}
              invest={props.invest}
              rangeMax={rangeMax}
              rangeMin={rangeMin}
            />
            <CurrentAutomateOrderBar
              barWidth={barWidth}
              investSteps={investSteps}
              rangeMax={rangeMax}
              rangeMin={rangeMin}
            />
          </div>
        </Col>
        <Col flex="none" style={{ padding: 5 }}>
          <Text>{rangeMax}</Text>
        </Col>
      </Row>
    </div>
  );
};

function calculateAbsoluteLeftValue(width, maxValue, minValue, currentValue) {
  const range = maxValue - minValue;
  return ((currentValue - minValue) / range) * width;
}

export default AutomateOrderBar;
