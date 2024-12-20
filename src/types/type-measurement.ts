export type TMeasurement = {
    _id: string;
    code_meter: string;
    flow: number;
    volume: number;
    measurementsCount: number;
    timestamp: string;
};

export type TMeasurementUser = {
    userId: string;
    meters: {
        code_meter: string;
        measurements: TMeasurement[];
        totalFlow: number;
        totalVolume: number;
    }[];
    totalFlow: number;
    totalVolume: number;
};
