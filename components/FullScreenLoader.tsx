// style imports
import style from "./styles/FullScreenLoader.module.css";

const FullScreenLoader = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="relative my-24 mx-auto w-10 h-10">
          <div
            className={`${style.cube1} bg-slate-300 absolute top-0 left-0 w-4 h-4`}></div>
          <div
            className={`${style.cube2} bg-slate-300 absolute top-0 left-0 w-4 h-4`}></div>
        </div>
      </div>
    </>
  );
};
export default FullScreenLoader;
