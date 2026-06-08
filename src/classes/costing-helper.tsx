import Assist from "./assist";

class CostHelper {
  //--------- TESTS ---------------------

  static getTestAnnualVolume(
    testCredit: number | undefined,
    testNHIMA: number | undefined,
    testWalkin: number | undefined,
    testResearch: number | undefined,
  ) {
    return (
      (testCredit ?? 0) +
      (testNHIMA ?? 0) +
      (testWalkin ?? 0) +
      (testResearch ?? 0)
    );
  }

  static getTestAnticipatedAnnualTestVolume(
    annualTestVolume: number | undefined,
    testPercentShift: number | undefined,
  ) {
    return Assist.applyPercent(annualTestVolume ?? 0, testPercentShift ?? 0);
  }

  static getTestAnnualRuns(
    testRunsDayPerWeek: number | undefined,
    testRunsShiftPerWeek: number | undefined,
  ) {
    return 52 * (testRunsDayPerWeek ?? 0) * (testRunsShiftPerWeek ?? 0);
  }

  static getTestVolumePerRun(
    anticipatedAnnualTestVolume: number | undefined,
    annualRuns: number | undefined,
  ) {
    return (annualRuns ?? 0) == 0
      ? 0
      : (anticipatedAnnualTestVolume ?? 0) / annualRuns!;
  }

  static getTestSampleTotalLaborMinutesPerYear(
    setupMinutes: number | undefined,
    analysisMinutes: number | undefined,
    resultReviewMinutes: number | undefined,
    resultDocumentationMinutes: number | undefined,
    retention: number | undefined,
  ) {
    return (
      (setupMinutes ?? 0) +
      (analysisMinutes ?? 0) +
      (resultReviewMinutes ?? 0) +
      (resultDocumentationMinutes ?? 0) +
      (retention ?? 0)
    );
  }

  static getTestSampleTotalLaborPerYear(
    sampleTotalLaborMinutesPerYear: number | undefined,
    anticipatedAnnualTestVolume: number | undefined,
  ) {
    return (
      (sampleTotalLaborMinutesPerYear ?? 0) * (anticipatedAnnualTestVolume ?? 0)
    );
  }

  static getTestResultTotalLaborMinutesPerYear(
    resultEntryMinutes: number | undefined,
    reportPreparationMinutes: number | undefined,
    reportDistributionMinutes: number | undefined,
  ) {
    return (
      (resultEntryMinutes ?? 0) +
      (reportPreparationMinutes ?? 0) +
      (reportDistributionMinutes ?? 0)
    );
  }

  static getTestResultTotalLaborPerYear(
    resultTotalLaborMinutesPerYear: number | undefined,
    avgHourWageReportStaff: number | undefined,
  ) {
    return (
      ((resultTotalLaborMinutesPerYear ?? 0) / 60) *
      (avgHourWageReportStaff ?? 0)
    );
  }

  //--------- INSTRUMENTS ---------------------
  //Calculate annual instrument cost
  static getInstrumentAnnualCost(
    instrumentAmortization: number | undefined,
    instrumentCost: number | undefined,
  ): number {
    if (
      instrumentAmortization != undefined &&
      instrumentAmortization > 0 &&
      instrumentCost != undefined &&
      instrumentCost > 0
    ) {
      const annualCost = instrumentCost / instrumentAmortization;

      return annualCost;
    } else {
      return 0;
    }
  }

  //Calculate instrument maintenance cost
  static getInstrumentAnnualMaintenanceCost(
    instrumentAnnualMaintenanceCost: number | undefined,
  ) {
    if (instrumentAnnualMaintenanceCost != undefined) {
      return instrumentAnnualMaintenanceCost;
    } else {
      return 0;
    }
  }

  //calibration cost
  static getInstrumentAnnualCalibrationCost(
    instrumentCalibrationCycle: number | undefined,
    instrumentCalibrationKitCost: number | undefined,
    instrumentCalibrationServiceCost: number | undefined,
  ) {
    if (
      instrumentCalibrationCycle != undefined &&
      instrumentCalibrationKitCost != undefined &&
      instrumentCalibrationServiceCost != undefined
    ) {
      const calibrationCost =
        (instrumentCalibrationKitCost + instrumentCalibrationServiceCost) *
        instrumentCalibrationCycle;

      return calibrationCost;
    } else {
      return 0;
    }
  }

  //Calculate total annual instrument cost
  static getInstrumentAnnualTotalCost(
    annualInstrumentCost: number,
    annualMaintenanceCost: number,
    annualCalibrationCost: number,
  ) {
    const totalCost =
      annualInstrumentCost + annualMaintenanceCost + annualCalibrationCost;

    return totalCost;
  }
}
export default CostHelper;
