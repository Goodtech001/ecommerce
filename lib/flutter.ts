import { useFlutterwave } from 'flutterwave-react-v3';


if (!process.env.FLUTTERWAVE_PUBLIC_KEY) {
    throw new Error("FLUTTERWAVE_SECRET_KEY is not set");
}
const flutter =  useFlutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY) {
    apiVersion: '2025-03-02.acacia',
}

export default flutter;
