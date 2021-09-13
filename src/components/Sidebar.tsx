import { RootStateOrAny, useSelector } from "react-redux";

export function Sidebar() {
  const left = useSelector((state: RootStateOrAny) => state.modal.left);
  return (
    <div className="sticky top-36 right-10 h-8">
      <div className="fixed w-1/6 right-10 bg-card border-2 border-solid">
        <div className=" border-b border-solid pl-2">
          <p>Comparing pokemon </p>
        </div>
        <div className="pl-2">
          <p>{String(left.name).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}
