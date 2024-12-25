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
        price_per_unit: number;
        total_amount: number;
        timestamp: string;
        flow: number;
        volume: number;
    }[];
    totalFlow: number;
    totalVolume: number;
    totalAmount: number;
};
