export const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="font-bold flex flex-col justify-center text-lg h-full ml-4">
        PayTM App
      </div>
      <div className="flex">
        <div className="font-semibold text-lg flex flex-col justify-center mr-4 h-full">
          Hello,
        </div>
        <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-2 mr-2">
          <div className="flex flex-col justify-center h-10 text-l">
            {localStorage.getItem("fName")[0]}
          </div>
        </div>
      </div>
    </div>
  );
};
