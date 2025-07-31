import "./animatePlus.css";
interface ContainerProps {
  classPlus1: string;
}
const AnimatePlus: React.FC<ContainerProps> = ({ classPlus1 }) => {
  return <span className={`${classPlus1}`}>+1</span>;
};

export default AnimatePlus;
