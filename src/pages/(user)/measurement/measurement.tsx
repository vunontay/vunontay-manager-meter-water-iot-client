import useMeasurement from "@/hooks/measurement";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

const UserMeasurementPage = () => {
    const userId = useSelector((state: RootState) => state?.auth?._id);
    const { getMeasurementUserQuery } = useMeasurement();
    const { data } = getMeasurementUserQuery(userId as string);
    console.log(data?.data);
    return <div>UserMeasurementPage</div>;
};

export default UserMeasurementPage;
