import Loading1 from "./Loading1";
import Loading2 from "./Loading2";

const Loading = ({ loading, textOn = false, text }: { loading: number; textOn?: boolean; text?: string }) => {
  return (
    <div className="flex flex-col items-center mt-4">
      {loading === 1 && <Loading1 />}
      {loading === 2 && <Loading2 />}
      {textOn && <p className="font-poppins font-semibold text-base lg:text-2xl text-white">{text}</p>}
    </div>
  );
};

export default Loading;

// Credit
// https://codepen.io/Manoz/pen/kyWvQw
