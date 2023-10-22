import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const totalPriority = new Array(5).fill(true);

const PriorityDisplay = ({ priority }) => {
  return (
    <div className="flex justify-start align-baseline ">
      {totalPriority.map((val, index) => (
        <FontAwesomeIcon
          icon={faFire}
          key={index}
          className={`pr-1 ${
            index <= totalPriority.length - priority
              ? "text-red-400"
              : "text-slate-400"
          }`}
        />
      ))}
    </div>
  );
};

export default PriorityDisplay;
