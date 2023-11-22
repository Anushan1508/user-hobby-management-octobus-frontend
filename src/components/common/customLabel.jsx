import {Typography} from 'antd';

const {Text} = Typography;
export const CustomLabel = ({title, value}) => (
    <div>
        <Text strong>{title}:</Text> {/* Use the strong prop to make the text bold */}
        <Text>{value}</Text>
    </div>
);
