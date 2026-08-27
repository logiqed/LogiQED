# Scientific Sensors

## One Line

Trucks as mobile science labs for verified environmental data collection.

## Problem

Researchers lack dense, real-world data across large areas.

Fixed monitoring stations are sparse and expensive. Satellite data has limited resolution. Mobile collection fleets are costly to operate.

Trucks already cover millions of kilometres across cities, highways, and industrial zones. They can carry scientific sensors and collect data continuously during normal operations.

## Solution

LogiQED turns the existing truck fleet into a verified mobile sensor network.

Sensors are installed on trucks: air quality, weather, radiation, road surface temperature. Each sensor signs data locally. Data enters the LogiQED Evidence Graph with full provenance. Researchers query verified datasets through an API or data marketplace. Drivers and fleet operators earn compensation or reputation.

Every measurement is attributable to a calibrated device, a location, and a time window.

## How It Works

Sensors on trucks collect environmental data during trips. Each sensor signs data locally. Data enters LogiQED through the standard ingest pipeline. The Evidence Graph records provenance and calibration chain. Researchers query verified datasets. Drivers and fleets receive compensation or reputation.

For a typical route:

1. Truck with PM2.5 and temperature sensors drives Berlin to Warsaw.
2. Sensors collect measurements every 30 seconds.
3. Each batch is signed by the device and pushed to LogiQED.
4. LogiQED validates source identity, sensor calibration, and location.
5. Data is aggregated into anonymised datasets.
6. Researchers query the dataset with full provenance.
7. Fleet operator receives compensation per verified kilometre.

## Example Sensors

| Sensor | Data |
|--------|------|
| PM2.5 and PM10 | Air quality |
| Temperature and humidity | Weather |
| Pressure | Altitude and weather patterns |
| Radiation dosimeter | Background radiation |
| Road surface temperature | Infrastructure monitoring |

## Use Cases

- Environmental research
- Smart city planning
- Public health studies
- Climate monitoring
- Infrastructure maintenance

## Technical Dependencies

- Device attestation
- Sensor calibration chain
- Evidence Assurance
- Data licensing layer
- Anonymization pipeline
- Marketplace or data API

## Integration with Core

Scientific sensors are another source type in the LogiQED Trust Model.

- SourceType: SCIENTIFIC_SENSOR
- Trust Level: E3 attested device, then E4 with calibration and corroboration
- Data: signed environmental measurements
- Evidence: calibration chain and provenance recorded in Evidence Graph

Sensor calibration is critical. A sensor without calibration is just a number. A calibrated sensor with provenance is scientific evidence.

## Challenges and Risks

| Risk | Mitigation |
|------|------------|
| Sensor calibration | Calibration chain recorded in Evidence Graph |
| Data quality | Multi-sensor cross-validation |
| Privacy | Anonymize location and fleet identity |
| Sensor drift | Regular recalibration and drift detection |
| Regulatory | Environmental data may have specific legal requirements |

## Why Later

Sensor calibration and data quality are hard.

Start with core freight evidence.

Scientific sensors become relevant when research or smart city partners request verified mobile data.

## Status

Research. On hold until core evidence layer is proven and a research partner is identified.