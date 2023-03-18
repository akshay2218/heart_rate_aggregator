const fs = require('fs/promises');
const HeartRate = require('../models/heartRateModel');

async function getData() {
  const data = await fs.readFile('./data/clinical_metrics.json');
  const jsonData = JSON.parse(data);
  return jsonData;
}

async function aggregateHeartRates() {
  const heartRateData = await getData();

  const heartRates = heartRateData?.clinical_data?.HEART_RATE?.data ?? [];

  const interval = 15 * 60 * 1000; // 15 minutes in milliseconds
  const startTime = new Date(heartRates[0]?.on_date);
  const endTime = new Date(heartRates[heartRates.length - 1]?.on_date);

  let currentIntervalStartTime = new Date(startTime);
  const intervals = [];

  while (currentIntervalStartTime < endTime) {
    const currentIntervalEndTime = new Date(currentIntervalStartTime.getTime() + interval);

    const readingsInInterval = heartRates.filter((reading) => {
      const readingTime = new Date(reading.on_date);
      return readingTime >= currentIntervalStartTime && readingTime < currentIntervalEndTime;
    });

    if (readingsInInterval.length > 0) {
      const min = Math.min(...readingsInInterval.map((reading) => Number(reading.measurement)));
      const max = Math.max(...readingsInInterval.map((reading) => Number(reading.measurement)));

      intervals.push({
        from_date: currentIntervalStartTime.toISOString(),
        to_date: currentIntervalEndTime.toISOString(),
        measurement: {
          low: String(min),
          high: String(max),
        },
      });
    }

    currentIntervalStartTime = currentIntervalEndTime;
  }

  return {
    patient_id: heartRateData.patient_id,
    aggregated_data: intervals
  };
};


async function saveHeartRateData() {
  try {
    const heartRateData = await aggregateHeartRates();
    const { patient_id, aggregated_data } = heartRateData;

    const heartRates = aggregated_data.map((data) => ({
      patientId: patient_id,
      fromDate: data.from_date,
      toDate: data.to_date,
      low: data.measurement.low,
      high: data.measurement.high,
    }));
    await HeartRate.bulkCreate(heartRates);

    return { message: 'Heart rate data saved successfully' };
  } catch (error) {
    return { message: 'Error occurred while saving heart rate data', error: error };
  }
};

module.exports = {
  getData,
  aggregateHeartRates,
  saveHeartRateData
};
