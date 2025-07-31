import "./animateMinus.css";
interface ContainerProps {
  classMinus1: string;
}
const AnimateMinus: React.FC<ContainerProps> = ({ classMinus1 }) => {
  return <span className={`${classMinus1}`}>+1</span>;
};

export default AnimateMinus;
